const express = require('express');
const cors = require('cors');
const { authenticate } = require('./Middleware/Auth');
const { login, get_emp, emp_det } = require('./Controllers/User');
const { all_train } = require('./Controllers/Training')

const app = express();
app.use(express.json());
app.use(cors());

// User login
app.post('/login', login);

// Get employee details
app.post('/emp', authenticate, get_emp);

app.get('/all', authenticate, emp_det)

app.get('/trainings', authenticate,  all_train)

app.listen(5000, () => console.log('Server running on port 5000'));