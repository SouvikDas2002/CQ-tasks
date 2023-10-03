const express=require('express');
const app=express();
const fs=require('fs');
const path=require('path');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

let i=0;
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/signup.html'));
})
app.get('/signup',(req,res)=>{
    res.send("Invalid request method -"+ i++);

})
app.post('/signup',(req,res)=>{
    // console.log(req.body);
    fs.readFile('users.txt','utf-8',(err,data)=>{
        if(err) throw err;
        let details=JSON.parse(data);
        // console.log(details);
        details.push(req.body);
        fs.writeFile('users.txt',JSON.stringify(details),(err)=>{
            if(err) throw err;
            else
            console.log("New user signup");
        })
    })
})

app.listen(3000);