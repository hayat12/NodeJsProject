const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_db'
});
mysqlConnection.connect((err) => {
    if (!err) {
        console.log('DB connection successded');
    } else {
        console.log('DB connection faild' + JSON.stringify(err, undefined, 2));
    }
})

app.listen(3000,()=>console.log('Express the server running at port: 3000'));

// get all employees

app.get('/employees',(req,res)=>{
    mysqlConnection.query('SELECT * FROM employee',(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    })
})

// get an employee
app.get('/employees/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM employee WHERE EmpID =?',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
        }
    })
})

// Delete an employee
app.delete('/employees/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM employee WHERE EmpID =?',[req.params.id],(err, rows, fields)=>{
        if(!err){
            res.send("An Employee has been deleted");
        }else{
            console.log(err);
        }
    })
})