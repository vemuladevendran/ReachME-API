const Reports = require('../model/report');

module.exports = function(app) {

       // create

       app.post('/api/v1/reports', async (req, res, next) => {
        try {
            const result = await Reports.create(req.body);
            res.json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message, code: 'INTERNAL_ERROR' });
        }
    });


      // retrive data

      app.get('/api/v1/students', async (req, res, next) => {
        try {
            const data = await Student.find({});
            res.json(data);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    });
}