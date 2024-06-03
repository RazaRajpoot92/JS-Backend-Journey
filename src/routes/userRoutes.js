import { Router } from "express";
import { mockUsers } from "../utils/constants.js";
import { userValidationSchema } from "../utils/userValidator.js";
import { checkSchema, validationResult } from "express-validator";
import { checkUserById } from "../utils/middlewares/checkUserById.js";
import passport from "passport";

const router = Router()

router.get("/",(request, response)=>{
    console.log(request.session)
    console.log(request.session.id)
    request.session.visited = true

    response.cookie("key","open",{maxAge:6000 * 60, signed:true})
    
    return response.status(200).send("Welcome on Backend")
})

// get all users
router.get('/api/users',(request,response)=>{
    //console.log(request.cookies)
    console.log(request.session)
    console.log(request.session.id)
    request.sessionStore.get(request.sessionID,(err,sessdionData)=>{
        if(err){
            console.log(err)
            throw err
        }
        console.log(sessdionData)
    })
    if(request.signedCookies && request.signedCookies.key==="open")
        return response.status(200).send(mockUsers)
    return response.status(401).send({"msg":"Not a valid cookie"})
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


// Authentication with session

// router.post("/api/auth",(request, response)=>{
//     const {body:{username,password}} = request

//     const findUser = mockUsers.find(user=> user.userName === username)
//     console.log(!findUser)
//     if(!findUser || findUser.password !== password) return response.status(400).send("msg:Not a valid auth")
    
//     request.session.user = findUser

//     return response.status(200).send(findUser)

// })

// router.get("/api/auth/status",(request,response)=>{
//     return request.session.user? response.status(200).send(request.session.user):response.status(401).send("Not Authenticated")
// })

// Cart example

// router.post("/api/cart",(request, response)=>{
//     if(!request.session.user) return response.status(401)
//     const {body:item} = request
//     const {cart} = request.session 
//     if(cart){
//         cart.push(item)
//     }else{
//         request.session.cart = [item]
//     }
    
//     return response.status(201).send(cart)
// })

// router.get("/api/cart/status",(request, response)=>{
//     if(!request.session.user) return response.status(401)
//     return response.status(200).send(request.session.cart ?? [])
// })

// Authentication through Passport
router.post("/api/auth",passport.authenticate('local'),(request,response)=>{
    response.sendStatus(200)

})

router.get("/api/auth/status",(request, response)=>{
    
    return request.user? response.status(200).send(request.user):response.sendStatus(401)
})

router.post("/api/auth/logout",(request,response)=>{
    if(!request.user) return response.sendStatus(401)
    
    request.logout((err)=>{
        return err? response.send(err):response.sendStatus(200)
    })
})


export default router