var http = require("http");
var fs = require("fs");



http.createServer(function(a,b){

    console.log("El metodo que se invoco fue un:" + a.method);
    fs.readFile("./index.html",function(error,data){        
        b.write(data);
        b.end();        
    });    
    
}).listen(2000);
