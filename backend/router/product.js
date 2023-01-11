const express = require("express")
const models = require("../models/index")
const product = models.pengaduan
const app = express()

const multer = require("multer")
const path = require("path")
const fs = require("fs")

const auth = require("../auth")
app.use(auth)


// config storage image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"./product_image")
    },
    filename: (req, file, cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({storage: storage})


app.get("/", (req, res) =>{
    product.findAll()
    .then(product => {
        res.json(product)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.get("/:id_pengaduan", (req, res) =>{
    product.findOne({ where: {id_pengaduan: req.params.id_pengaduan}})
    .then(product => {
        res.json(product)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.post("/", upload.single("image"), (req, res) =>{
    if (!req.file) {
        res.json({
            message: "No uploaded file"
        })
    } else {
        let data = {
            nik: req.body.nik,
            isi_laporan: req.body.isi_laporan,
            status: req.body.status,
            image: req.file.filename,
            pelapor: req.body.pelapor,
          
        }
        product.create(data)
        .then(result => {
            res.json({
                message: "data has been inserted",
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })

        
    }
})

app.put("/", upload.single("image"), async (req, res) =>{
    let param = { id_pengaduan: req.body.id_pengaduan}
    let data = {
        nik: req.body.nik,
        isi_laporan: req.body.isi_laporan,
        status: req.body.status,
        pelapor: req.body.pelapor,
      tanggapan:req.body.tanggapan,
      petugas:req.body.petugas,
    }
    if (req.file) {
        // get data by id
        const row = await product.findOne({where: param})
        let oldFileName = row.image
            
        // delete old file
        let dir = path.join(__dirname,"../product_image",oldFileName)
        fs.unlink(dir, err => console.log(err))
        

        // set new filename
        data.image = req.file.filename
    }

    product.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has been updated",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.delete("/:id_pengaduan", async (req, res) =>{
    try {
        let param = { id_pengaduan: req.params.id_pengaduan}
        let result = await product.findOne({where: param})
        let oldFileName = result.image
            
        // delete old file
        let dir = path.join(__dirname,"../product_image",oldFileName)
        fs.unlink(dir, err => console.log(err))

        // delete data
        product.destroy({where: param})
        .then(result => {
            res.json({
                message: "data has been deleted",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
        
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

app.get("/get/:nik", async (req, res) =>{
    let param = { nik: req.params.nik}
    let result = await product.findAll({
        where: param,
        
    })
    res.json(result)
})

module.exports = app