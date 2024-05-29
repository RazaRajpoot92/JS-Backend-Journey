import { Router } from "express";
import { mockUsers } from "../utils/constants.js";
import { userValidationSchema } from "../utils/userValidator.js";
import { checkSchema, validationResult } from "express-validator";
import { checkUserById } from "../utils/middlewares/checkUserById.js";

const router = Router()

// get all users
router.get('/api/users',(request,response)=>{

   return response.status(200).send(mockUsers)
})

// get user by id
router.get("/api/users/:id",checkUserById,(request, response)=>{
    
    const {requestedUser} = request   
    return response.status(202).send(requestedUser)
    
})

//add user...
router.post("/api/users", checkSchema(userValidationSchema),(request,response)=>{
    const {body} = request
    const result = validationResult(request)
    if(!result.isEmpty()) return response.status(400).send(result.array())
    if(!body) return response.status(400).json({"msg":"Bad Request"})
    const newUser = {id:mockUsers[mockUsers.length-1].id+1,...body}
    mockUsers.push(newUser)
    return response.status(201).send(newUser)

})
// update user
router.put("/api/users/:id", checkUserById, (request, response)=>{
    const {requestedUserIndex,body,parsedId} = request
    mockUsers[requestedUserIndex] = {id:parsedId,...body}
    return response.status(201).send(mockUsers[requestedUserIndex]) 
})
//patche user
router.patch("/api/users/:id",checkUserById,(request,response)=>{
    const {requestedUser,requestedUserIndex,body} = request
    mockUsers[requestedUserIndex] = {...requestedUser, ...body}
    return response.status(201).send(mockUsers[requestedUserIndex])
})
//Delete user
router.delete("/api/users/:id",checkUserById,(request, response)=>{
    const {requestedUserIndex} = request
    mockUsers.splice(requestedUserIndex,1)
    return response.status(200).send({"msg":"User has been deleted"})
})


export default router