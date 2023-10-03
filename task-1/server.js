const { json } = require('body-parser');
const express=require('express');
const app=express();
const fs=require('fs');

app.get('/',(req,res)=>{
    // console.log(req.query.category);
    fs.readFile('products.json','utf-8',(err,data)=>{
        if (err) throw err;
        let products=JSON.parse(data);

        if(req.query.category==undefined)
        res.send(products);
        else{
        let category=products.filter(item=>{
            if(item.category==req.query.category)
            return 1;
        })
        // console.log(category);
        res.send(category);
    }
    })
})

app.listen(3001,(err)=>{
    if(err) console.log("unable to start server")
    console.log("server started...")
})