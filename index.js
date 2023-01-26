const express=require("express");
const mysql=require("mysql");
const fastcsv=require("fast-csv");
const cors=require('cors');

const app=express();

app.use(express.static('view'))//call the frontend

//output the csv file
const fs=require("fs");
// const fs2=require("fs2");
const ws=fs.createWriteStream("Energy3.csv");//write data to file (refere to writestream and readstream)
// const ws2=fs2.createWriteStream("test5.json");//export json file
//create a connection to DB
// console.log(JSON.parse(localStorage.getItem('host')));

const connection=mysql.createConnection({
    host: "127.0.0.1",
    user: "Engineering",
    password:"Eng12345",
    database:"sk_tenau"

});
//api

// app.get("/",(req,res)=>{
//     res.send("Hello")
// })

app.get("/",(req,res)=>{
    res.status(200).send('<h1>test</h1>')
})

app.get("/exportcsv",(req,res)=>{ //get data
    connection.query("SELECT * FROM sk_tenau.energy_table;", function(err,data){
        if(err) throw err;

        //JSON
        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData", jsonData);

        //csv
        fastcsv.write(jsonData, {headers:true})
        .on("finish",function(){
            res.send(jsonData);
            console.log("Json File write succesfully!");
            console.log("CSV File Write succesfully!");
        
        })
        .pipe(ws);

    });
});

// app.post();//add

// app.put();//edit

// app.delete()//delete data

//PORT

app.listen(3000, function(){
    console.log("system app is running at port 3000");//show the system is connected
})