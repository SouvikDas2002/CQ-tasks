const http=require('http');
const path=require('path');
const fs=require('fs');
const server=http.createServer((req,res)=>{
    if(req.url==='/'){
        res.statusCode=200;
        fs.readFile('./home.html','utf-8',(err,data)=>{
            // console.log(data);
            res.write(data);
            res.end();
        })
    }else if(req.url==='/style.css'){
        fs.readFile('./style.css','utf-8',(err,data)=>{
            res.write(data);
            res.end();
        })
    }else{
        res.statusCode=404;
        res.end();
    }
})

server.listen(3001,(err)=>{
    if(err) console.error("unable to start server");
    else
    console.log("Server started...");
});