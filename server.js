import express from "express"
import router from "./src/routes/index.js"


const server = express()

const PORT = process.env.PORT || 3000
server.use(express.json())
server.use(router)



server.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT} successfully`)
})