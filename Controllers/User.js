const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

//Function for user login verifying the password and generating jwt token for authentication
const login = async(req, res) => {
    const { email, password } = req.body;
    const user = await prisma.employee.findUnique({ where: { email } });
    //if (!user || !(await bcrypt.compare(password, user.password))) {
    if (!user || password !== user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    const token = jwt.sign({ id: user.id}, 'secret_key', { expiresIn: '1h' });
    res.json({ token });
}

// Fetching emp details
const get_emp = async(req, res) => {
    try{
        const { email } = req.body;
        const details = await prisma.employee.findUnique({ where: { email }});
        res.json(details);
    }catch(error){
        res.json("Error in fetching");
    }
}
//Fetch all emp
const emp_det = async(req, res) => {
    const details = await prisma.employee.findMany({ });
    res.json(details);
}

module.exports = {login, get_emp, emp_det}