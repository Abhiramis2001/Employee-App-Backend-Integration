// Task1: initiate app and run server at 3000

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'




//TODO: get single data from db  using api '/api/employeelist/:id'





//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}






//TODO: delete a employee data from db by using api '/api/employeelist/:id'





//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

// Task1: initiate app and run server at 3000

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '/dist/FrontEnd')));
app.use(bodyParser.json());

// Task2: create MongoDB connection
mongoose.connect('mongodb://localhost:27017/your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Task3: create employee schema
const employeeSchema = new mongoose.Schema({
  name: String,
  location: String,
  position: String,
  salary: Number,
});

const Employee = mongoose.model('Employee', employeeSchema);

// Task4: API endpoints with error handling

// TODO: get data from db using api '/api/employeelist'
app.get('/api/employeelist', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// TODO: get single data from db using api '/api/employeelist/:id'
app.get('/api/employeelist/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// TODO: send data to db using api '/api/employeelist'
// Request body format: { name: '', location: '', position: '', salary: '' }
app.post('/api/employeelist', async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.json(savedEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// TODO: delete an employee data from db using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }
    res.json(deletedEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// TODO: Update an employee data in db using api '/api/employeelist'
// Request body format: { name: '', location: '', position: '', salary: '' }
app.put('/api/employeelist/:id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEmployee) {
      res.status(404).json({ error: 'Employee not found' });
      return;
    }
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Don't delete this code. It connects the front end file.
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
