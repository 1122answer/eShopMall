let http = require("http");
let url = require("url");
let util = require('util');
let fs = require('fs')
http.createServer((req, res)=>{
/*	res.statusCode = 200;
	console.log("url:" + req.url)
	res.setHeader("Content-Type", "text/plain; charset=utf-8");*/
	var pathname=url.parse(req.url).pathname
	fs.readFile(pathname.substring(1),(err,data)=>{
		if (err) {
			res.writeHead(404,{

				"Content-Type":'text/html'
			})
			console.log(404)
		}else{
			res.writeHead(200,{
				"Content-Type":'text/html'
			})
			res.write(data.toString())
		}
		res.end();
	})
	// res.end(util.inspect(url.parse(req.url)));
}).listen(3000,'127.0.0.1', ()=>{
	console.log("服务器已经运行")
})