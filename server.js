'use strict'

const express = require('express');
require('./db');
const User = require('./model/user-model');
const Otp = require('./model/otp');
const otpGenerator = require('otp-generator');
const emailServe = require('./services/email');
const passwordServe = require('./services/password');
const Token = require('./services/token');
const app = express();
const morgan = require('morgan')
const cors = require('cors');
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./routes/students')(app);
require('./routes/report')(app);
require('./routes/forget-password')(app);




// insert data
app.post('/api/v1/users', async (req, res, next) => {
    try {
        const email = await User.findOne({ email: req.body.email });
        if (email) {
            return res.status(400).json({ message: 'Email Already exist', code: 'EMAIL_EXIST' });
        }
        req.body.password = await passwordServe.hash(req.body.password);
        const result = await User.create(req.body);
        const { password, ...data } = result.toObject();
        const otpDoc = await Otp.create({
            otp: otpGenerator.generate(6, { upperCase: false, alphabets: false, specialChars: false }),
            userId: result._id,
        });

        emailServe.sendOtp({ reciver: result.email, otp: `http://localhost:3000/otp/${otpDoc._id}/${otpDoc.otp}` });

        res.json({ uid: otpDoc._id });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message, code: 'INTERNAL_ERROR' });
    }
});

// update data
app.put('/api/v1/users/:id', async (req, res, next) => {
    try {

        const results = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(results);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});



// otp check
app.get('/otp/:id/:otp', async (req, res) => {
    try {
        const otpObj = await Otp.findById(req.params.id);

        console.log(otpObj)

        if (!otpObj) {
            console.log('Invalid Link')
            return res.status(400).send(`
            <h1>Invalid Link</h1>
            `)
        }

        if (otpObj.otp === req.params.otp) {
            // exceute
            const result = await User.findByIdAndUpdate(otpObj?.userId, { isVerified: true }, { new: true });
            const removeOtp = await Otp.findByIdAndRemove(otpObj?._id);
            return res.send(`
            <h1>Success</h1>
            `);
        }



        return res.status(400).send(`
            <h1>Invalid Link</h1>
            `);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
})

// login check

app.post('/api/v1/login', async (req, res) => {
    try {
        const doc = await User.findOne({ email: req.body.email })
        if (!doc) {
            console.error('user not found');
            return res.status(400).json({ message: 'Invalid Details' });
        }

        const hashPassword = doc.password;
        const isPasswordMatching = await passwordServe.password(req.body.password, hashPassword);

        if (!isPasswordMatching) {
            console.error('password wrong');
            return res.status(400).json({ message: 'Invalid Details' });

        }


        if (!doc.isVerified) {
            console.log('user not verified');
            return res.status(400).json({ message: 'user not verified' });
        }
        const token = Token.generate({ id: doc._id, });

        return res.json({ token: token });

    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});


// verify user

app.post('/api/v1/verify', async (req, res) => {
    try {

        const doc = await User.findOne({ email: req.body.email });
        const otpDoc = await Otp.create({
            otp: otpGenerator.generate(6, { upperCase: false, alphabets: false, specialChars: false }),
            userId: doc._id,
        });

        emailServe.sendOtp({ reciver: doc.email, otp: `http://localhost:3000/otp/${otpDoc._id}/${otpDoc.otp}` });

    } catch (error) {

    }
})



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server is listering on the PORT ${PORT}`);
});