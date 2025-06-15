const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;
    const pathname = parsedUrl.pathname;

    console.log(query);
    console.log(pathname)

    res.setHeader("Content-type", "text/plain");

    if(pathname == "/createFile" && req.method == "GET"){
        const fileName = query.fileName;
        const content = query.content;
        const filePath = path.join(__dirname, fileName);

        fs.writeFile(filePath, content, (err) => {
            if(err){
                res.end("Error");
            }
        });

        res.end("success "+ content);
    }else if(pathname == "/readFile" && req.method == "GET"){
        const fileName = query.fileName;
        const filePath = path.join(__dirname, fileName);

        fs.readFile(filePath, 'utf8', (err, data) => {
            res.end("Content is :"+data);
        })
    }else if(pathname == "/deleteFile" && req.method == "GET"){
        const fileName = query.fileName;
        const filePath = path.join(__dirname, fileName);

        fs.unlink(filePath, (err) => {
            res.end("Success");
        })
    }else if(pathname == "/" && req.method == "GET"){
        res.end("Welcome");
    }else{
        res.end("Invalid")
    }
});

server.listen(3000);