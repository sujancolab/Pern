const express = require('express');
const app = express();
const cors=require('cors');
const pool=require('./db');

app.use(cors());
app.use(express.json())//->allows us o access the req.body

//ROUTES
// get all sales
app.get("/sales",async(req,res)=>{
    try {
        const allsales =await pool.query("SELECT * FROM sale");
        res.json(allsales.rows);

    } catch (error) {
        console.error(error.message)
    }
})
// get daily sales
app.get("/daily",async(req,res)=>{

    try {
        const allsales =await pool.query("SELECT * FROM sale WHERE created_at::DATE = NOW()::DATE");
        console.log(allsales.rows[0]);
        var Totalamount=0.0;
        allsales.rows.forEach(element => { 
            Totalamount+=parseFloat(element.amount);
            console.log(element.amount); 
          }); 
          console.log(Totalamount);
        var returnresponse={
            "allsales":allsales.rows,
            "totalamount":Totalamount
        };
        res.json(returnresponse);
        
    } catch (error) {
        console.error(error.message)
    }

});
// get weekly sales
app.get("/weekly",async(req,res)=>{
    const prev = new Date();
    const nowd= new Date();
    prev.setDate(prev.getDate()-7)

    console.log(prev);
    console.log(nowd);
    try {
        const allsales =await pool.query("SELECT * FROM sale WHERE created_at::DATE BETWEEN $1::DATE AND $2::DATE", [prev,nowd]);
        var Totalamount=0.0;
        allsales.rows.forEach(element => { 
            Totalamount+=parseFloat(element.amount);
            console.log(element.amount); 
          }); 
          console.log(Totalamount);
        var returnresponse={
            "allsales":allsales.rows,
            "totalamount":Totalamount
        };
        res.json(returnresponse);
        //res.json(allsales.rows);
    } catch (error) {
        console.error(error.message)
    }

});
// get daily sales
app.get("/daily",async(req,res)=>{

    try {
        const allsales =await pool.query("SELECT * FROM sale WHERE created_at::DATE = NOW()::DATE");
        console.log(allsales.rows[0]);
        var Totalamount=0.0;
        allsales.rows.forEach(element => { 
            Totalamount+=parseFloat(element.amount);
            console.log(element.amount); 
          }); 
          console.log(Totalamount);
        var returnresponse={
            "allsales":allsales.rows,
            "totalamount":Totalamount
        };
        res.json(returnresponse);
        
    } catch (error) {
        console.error(error.message)
    }

});
// get Monthly sales
app.get("/monthly",async(req,res)=>{
    const prev = new Date();
    const nowd= new Date();
    prev.setDate(prev.getDate()-30)

    console.log(prev);
    console.log(nowd);
    try {
        const allsales =await pool.query("SELECT * FROM sale WHERE created_at::DATE BETWEEN $1::DATE AND $2::DATE", [prev,nowd]);
        var Totalamount=0.0;
        allsales.rows.forEach(element => { 
            Totalamount+=parseFloat(element.amount);
            console.log(element.amount); 
          }); 
          console.log(Totalamount);
        var returnresponse={
            "allsales":allsales.rows,
            "totalamount":Totalamount
        };
        res.json(returnresponse);
        //res.json(allsales.rows);
    } catch (error) {
        console.error(error.message)
    }

});



//create a sales 
app.post("/sales",async(req,res)=>{
    try {

        const {username,amount} = req.body;
        const now = new Date()
        const newSale=await pool.query('INSERT INTO sale(username,amount,created_at,updated_at) VALUES($1,$2,$3,$4) RETURNING *',[username,amount,now,now]);
        res.json(newSale.rows[0]);
    } catch (error) {
       console.error(error.message); 
    }
})
//update a sales

//delete a sales


app.listen(5000,()=>{
    console.log("Server is listening on port 5000");
});
