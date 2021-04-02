const express = require ("express")
const app = express()
const MongoClient = require("mongodb").MongoClient
const PORT = 2121
require("dotenv").config()

// MongoDB Setup
let db,
    dbConnectionStr = process.env.DB_STRING,
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
app.get("/", (request, response) => {
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
        response.redirect("/")
    })
    .catch(error => console.log(error))
})

app.delete("/deleteRapper", (request, response) => {
    db.collection("rappers").deleteOne({stageName : request.body.stageNameS})
    .then(result => {
        console.log("from server line 48:rapper deleted", request.body.stageNameS)
        response.json("rapper deleted")
    })
    .catch(error => console.error(error))
})

app.put("/addOneLike", (request, response) => {
    db.collection("rappers").updateOne({stageName: request.body.stageNameS, birthName: request.body.birthNameS, likes: request.body.likesS},{
        $set: {
            likes: request.body.likesS + 1
        }
    },{
        sort: {_id: -1},
        upsert: true,
    })
    .then(result =>  {
        console.log("added one like")
        response.json("like added")
        response.redirect("/")
    })
})

app.put("/editRapper", (request, response) => {
    db.collection("rappers").updateOne({stageName : request.body.stageNameS})
    .then(result => {
        console.log("from server line 57: rapped updated", request.body.stageNameS)
        response.json("rapper updated")
        response.redirect("/")
    })
    .catch(error =>  console.log(error))
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}/`)
})