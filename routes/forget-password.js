const User = require('../model/user-model');
const Otp = require('../model/otp');
const otpGenerator = require('otp-generator');
const emailServe = require('../services/email');

module.exports = function (app) {

    // email check
    app.post('/api/v1/forget-password', async (req, res, next) => {

        try {

            const doc = await User.findOne({ email: req.body.email })
            if (!doc) {
                console.error('Email id  not found');
                return res.status(400).json({ message: 'Invalid Details' });
            }

            const otpDoc = await Otp.create({
                otp: otpGenerator.generate(6, { upperCase: false, alphabets: false, specialChars: false }),
                userId: doc._id,
            });
            emailServe.sendOtp({ reciver: doc.email, otp: `http://localhost:5000/passwordOtp/${otpDoc._id}/${otpDoc.otp}` });

            res.json(doc.email);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });

        }
    });



    // otp check
    app.get('/passwordOtp/:id/:otp', async (req, res) => {
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
                // new password page
                return res.status(400).send(`
                <h1>new password page</h1>
                `)

            }

            return res.status(400).send(`
            <h1>Invalid Link</h1>
            `);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    });


    // reset password


    app.post('api/v1/reset-password/:id', async(req, res) => {
        try {
            const user = await User.findOne({ id: req.params.id });
            if(!user){
                console.error('invalid details');
                res.json('invaild details');
            }

            user.password = await req.body.password;

            res.json(user);
        } catch (error) {
            console.error(error);
        }
    })


}