

export const userValidationSchema = {
    userName:{
        notEmpty:{
            errorMessage:"Username not be empty"
        },
        isString:{
            errorMessage:"Username must be string"
        },
        isLength:{
            options:{min:4},
            errorMessage:"Username must be at least 4 chars"
        }
    },
    country:{
        notEmpty:{
            errorMessage:"Country not be empty"
        },
        isString:{
            errorMessage:"Country must be string"
        },
        
    }
}