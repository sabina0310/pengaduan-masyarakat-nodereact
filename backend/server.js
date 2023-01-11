const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())


const product = require("./router/product")
const masyarakat = require("./router/masyarakat")
const admin = require("./router/admin")
const tanggapan = require("./router/tanggapan")
app.use("/store/api/v1/product", product)
app.use("/store/api/v1/admin", admin)
app.use("/store/api/v1/tanggapan", tanggapan)
app.use("/store/api/v1/masyarakat", masyarakat)
app.use(express.static(__dirname))


app.listen(8000, () => {
    console.log("Server run on port 8000");
})