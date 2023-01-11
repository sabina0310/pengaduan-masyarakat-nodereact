const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const models = require("../models/index")
const admin = models.admin

const md5 = require("md5")

const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeJSItuMenyengankan"

app.get("/", auth, async(req, res) => {
    let result = await admin.findAll()
    res.json(result)
})

app.post("/",(req, res) => {
    let data = {
        name: req.body.name,
        username: req.body.username,
        telepon: req.body.telepon,
        level: req.body.level,
        password: md5(req.body.password)
    }

    admin.create(data)
    .then(result => {
        res.json({
            message: "data has been inserted"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.put("/", auth, async(req, res) => {
    let param = { id_petugas: req.body.id_petugas}
    let data = {
        name: req.body.name,
        username: req.body.username,
        telepon: req.body.telepon,
        level: req.body.level
      
    }

    if (req.body.password) {
        data.password = md5(req.body.password)
    }

    admin.update(data, {where: param})
    .then(result => {
        res.json({
            message: "data has been updated"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.delete("/:id_petugas", auth, async(req, res) => {
    let param = {id_petugas: req.params.id_petugas}
    admin.destroy({where: param})
    .then(result => {
        res.json({
            message: "data has been deleted"
           
         
            
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/auth", async (req,res) => {
    let params = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await admin.findOne({where: params})
    if(result){
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }else{
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})

module.exports = app