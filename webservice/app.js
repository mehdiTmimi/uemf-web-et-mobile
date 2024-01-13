const http = require("http")
const fs = require("fs")
const PORT = 3001
const server = http.createServer((req,res)=>{
     // Website you wish to allow to connect
     res.setHeader('Access-Control-Allow-Origin', '*');

     // Request methods you wish to allow
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
     // Request headers you wish to allow
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 
    let url = req.url
    let method= req.method
    if(method=="GET" && url=="/produits"){
        fs.readFile("./bd/produits.json",(err,data)=>{
            if(err)
            {
                res.statusCode=500
                res.write("desole, probleme dans le serveur")
                return res.end()
            }
            res.setHeader("Content-Type","application/json")
            res.statusCode=200
            let {produits} = JSON.parse(data.toString())

            res.write(JSON.stringify(produits))
            res.end()
        })
    }
    else if(method=="GET" && (url=="/home" || url=="/" || url=="index"))
    {
        fs.readFile("./site/index.html",(err,data)=>{
            if(err)
            {
                res.statusCode=500
                res.write("desole, probleme dans le serveur")
                return res.end()
            }
            res.statusCode=200
            res.write(data.toString())
            res.end()
        })
    }
    else if(method=="GET" && url=="/css/main.css")
    {
        fs.readFile("./site/css/main.css",(err,data)=>{
            if(err)
            {
                res.statusCode=500
                res.setHeader("Content-Type","text/css")
                res.write("desole, probleme dans le serveur")
                return res.end()
            }
            res.statusCode=200
            res.write(data.toString())
            res.end()
        })
    }
    else{
        res.statusCode=404
        res.write("not foudn sorry")
        res.end()
    }
})
// const server = http.createServer((request,response)=>{
//     console.log("requete recu")
//     console.log(request.headers.ok)
//     console.log(request.method)
//     console.log(request.url)
//     response.setHeader("Content-type","text/html")
//     response.setHeader("teste","ok")
//     response.write("<div><h1>salut</h1>")// remplir le body de response
//     response.write("<p>ok uemf</p></div>")
//     response.end()// sending response
// })
server.listen(PORT,()=>{
    console.log("started at ", PORT)
})