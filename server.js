import express from "express"
import routes from "./src/routes/index.js"
import cookieParser from "cookie-parser"
import session from "express-session"
import passport from "passport"
import mongoose from "mongoose"
import MongoStore from "connect-mongo"
import "./src/strategies/localStrategy.js"

const server = express()

mongoose.connect("mongodb://0.0.0.0:27017/express")
.then(()=>console.log("Database connected"))
.catch((error)=>console.log(`Error while connecting database error: ${error}`))

const PORT = process.env.PORT || 3000
server.use(express.json())
server.use(cookieParser("working"))
server.use(session({
    secret:"this is secret key",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge: 60000 * 60
    },
    store: MongoStore.create({
        client:mongoose.connection.getClient()
    })
}))

server.use(passport.initialize())
server.use(passport.session())


server.use(routes)

server.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT} successfully`)
})