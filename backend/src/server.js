const express = require("express")
const connectDB = require("./config/db")
require("dotenv").config()

const app = express()
connectDB()


app.get("/", (req, res) => {
    res.send("DataStraw API is running...")
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

