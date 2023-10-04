const http = require("http");
const fs=require('fs');
const server = http.createServer((req, res) => {
    if(req.url==='/favicon.ico'){
        res.statusCode=204;
        res.end();
    }
  else if (req.url === "/about") {
    res.statusCode = 200;
    res.end("about");
  } else if (req.url === "/home") {

    res.statusCode = 200;
    res.end("home");
  } 
  else {
    const logEntry = `${new Date().toISOString()} | URL: ${req.url}\n`;
    
    // fs.writeFile("errors.log", logEntry, (error) => {
    //   if (error) {
    //     console.error("Error logging request:", error);
    //   }
    // });
    // res.end("Request logged successfully.");
    fs.readFile('errors.log','utf-8',(err,data)=>{
        if (err) throw err;

          const errLines=data.trim().split('\n').slice(-4); //convert into an array by split and -4 indicates the index from the backward

          const updateErrorlog=[...errLines,logEntry].join('\n'); //store last 4 entries + combined new entries

          fs.writeFile('errors.log', updateErrorlog, (err) => {
            if (err) throw err;
            else
            res.end('Error logged successfully.');
          });
    })

  }
});
server.listen(3000, (err) => {
  if (err) throw err;
  else console.log("server started...");
});
