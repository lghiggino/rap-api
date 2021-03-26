const express = require ("express")
const app = express()
const MongoClient = require("mongodb").MongoClient
const PORT = 2121

// MongoDB Setup
let db,
    dbConnectionStr = "mongodb+srv://lng:123456abcd@cluster0.lh9oh.mongodb.net/Rappers?retryWrites=true&w=majority",
    dbName = "rap"

MongoClient.connect(dbConnectionStr, { useUnifiedTopology : true})
    .then(client => {
        console.log(`Connected to ${dbName} database`)
        db = client.db(dbName)
    })

// Express middleware Setup
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// Routing
app.get("/index", (request, response) => {
    db.collection("rappers").find().toArray()
    .then(data => {
        response.render("index.ejs", {info:data})
    })
    .catch(error => console.log(error))
})

app.get("/formPage", (request, response) => {
    response.render("formPage.ejs")
})

app.post("/addRapper" , (request, response) => {
    db.collection("rappers").insertOne(request.body)
    .then(result => {
        console.log("rapper added", request.body)
        response.redirect("/index")
    })
    .catch(error => console.log(error))
})

app.delete("/deleteRapper", (request, response) => {
    db.collection("rappers").deleteOne({stageName : request.body.stageNameS})
    .then(result => {
        console.log("from server line 44:rapper deleted", request.body.stageNameS)
        response.json("rapper deleted")
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}/index`)
})