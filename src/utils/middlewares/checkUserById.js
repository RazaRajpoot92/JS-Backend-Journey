import { mockUsers } from "../constants.js"


export const checkUserById = (request,response, next)=>{
    const parsedId = parseInt(request.params.id)
    if(isNaN(parsedId)) return response.status(400).json({"msg":"Bad Request. Invalid ID"})
    const requestedUserIndex = mockUsers.findIndex(user=>user.id===parsedId)
    if(requestedUserIndex===-1) return response.status(404).json({"msg":"User not found"})
    request.requestedUser = mockUsers[requestedUserIndex]
    request.requestedUserIndex = requestedUserIndex
    request.parsedId = parsedId
    next()
}