export const userValidationSchema = {
    username:{
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
    displayname:{
        notEmpty:{
            errorMessage:"display name not be empty"
        },
        isString:{
            errorMessage:"display name must be string"
        },
        
    },
    password:{
        notEmpty:{
            errorMessage:"Password not be empty"
        }
    }
}