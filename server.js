const express = require('express');
const cors = require('cors');
const { authenticate } = require('./Middleware/Auth');
const { login, get_emp, emp_det } = require('./Controllers/User');
const { all_train, add_train, update_train, del_train, train_details } = require('./Controllers/Training')

const app = express();
app.use(express.json());
app.use(cors());

// User login
app.post('/login', login);

// Get employee details
app.post('/emp', get_emp);

app.get('/all', authenticate, emp_det);

//Fetching training details for a particular trainer
app.get('/trainings', authenticate,  all_train);

//Fetching details of all available courses
app.get('/trainingDetails', authenticate, train_details);

//Creating new Trainings
app.post('/addTraining', authenticate, add_train);

//Updating Training Details
app.post('/updateTraining/:id', authenticate, update_train);

//Delete Training
app.delete('/deleteTraining/:id', authenticate, del_train);

app.listen(5000, () => console.log('Server running on port 5000'));