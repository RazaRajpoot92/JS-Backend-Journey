import passport from 'passport'
import { Strategy } from 'passport-local'
//import { mockUsers } from '../utils/constants.js'
import { User } from '../mongoose/schema/user.js'
import { comparePassword } from '../utils/helpers.js'


passport.serializeUser((user,done)=>{
    console.log("Inside serilizeUser!")
    console.log(user)
    done(null, user.id)
})

passport.deserializeUser(async (id,done)=>{
    
    console.log("Inside deserilizeUser")
    console.log(`Deserilize User id : ${id}`)
    
    try{
        const findUser = await User.findById(id)
        if(!findUser) throw new Error("User not found")
        done(null,findUser) 
        }catch(err){
        done(err, null)
    }
})

export default passport.use(
    new Strategy( async (username, password,done)=>{
        console.log(`Username: ${username}`)
        console.log(`Password: ${password}`)

        try {
            const findUser = await User.findOne({username})
            if(!findUser) throw new Error("User not found")
            if(!comparePassword(password,findUser.password)) throw new Error("Invalid Credentials")
            done(null, findUser)
        } catch (error) {
            done(error, null)
        }
    })
)