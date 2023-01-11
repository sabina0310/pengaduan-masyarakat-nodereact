const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const models = require("../models/index")
const masyarakat = models.masyarakat

const md5 = require("md5")

const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeJSItuMenyengankan"

app.get("/", auth, async(req, res) => {
    let result = await masyarakat.findAll()
    res.json(result)
})

app.post("/",(req, res) => {
    let data = {
        nama: req.body.nama,
        username: req.body.username,
        nik: req.body.nik,
        password: md5(req.body.password)
    }

    masyarakat.create(data)
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
    let param = { nik: req.body.nik}
    let data = {
        nama: req.body.nama,
        username: req.body.username,
        nik: req.body.nik,
      
    }

    if (req.body.password) {
        data.password = md5(req.body.password)
    }

    masyarakat.update(data, {where: param})
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

app.delete("/:nik", auth, async(req, res) => {
    let param = {nik: req.params.nik}
    masyarakat.destroy({where: param})
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

    let result = await masyarakat.findOne({where: params})
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