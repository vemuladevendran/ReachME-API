const Student = require('../model/students')

module.exports = function (app) {

    // create

    app.post('/api/v1/students', async (req, res, next) => {
        try {
            const rollNumber = await Student.findOne({ rollNumber: req.body.rollNumber });
            if (rollNumber) {
                return res.status(400).json({ message: 'RollNumber Already exist', code: 'ROLLNUMBER_EXIST' });
            }

            const examNumber = await Student.findOne({ examNumber: req.body.examNumber });
            if (examNumber) {
                return res.status(400).json({ message: 'ExamNumber Already exist', code: 'EXAMNumber_EXIST' });
            }

            const result = await Student.create(req.body);

            res.json(result);

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message, code: 'INTERNAL_ERROR' });
        }
    });



    // retrive data

    app.get('/api/v1/students', async (req, res, next) => {
        try {
            const q = {};

            if (req.query.year) {
                q.year = req.query.year;
            };

            if (req.query.branch) {
                q.branch = req.query.branch;
            }

            const data = await Student.find(q);
            res.json(data);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    });

    // update data

    app.put('/api/v1/students/:id', async (req, res, next) => {
        try {

            const results = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(results);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    });

    // Delete data

    app.delete('/api/v1/students/:id', async (req, res, next) => {
        try {

            const results = await Student.findByIdAndRemove(req.params.id);
            res.json({ message: results.firstName + 'student deleted' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    });

}