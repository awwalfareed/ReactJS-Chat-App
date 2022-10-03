const express = require('express')
const dotenv = require('dotenv')
const { chats } = require('./data/data')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const { notFound, errorHandler } = require('../backend/middlewares/errorMiddleware')
const app = express()
app.use(express.json())
dotenv.config()
connectDB();

app.get("/", (req, res) => {
    res.send("API is running successfully")
})

app.use("/api/user", userRoutes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server started on PORT ${5000}`))