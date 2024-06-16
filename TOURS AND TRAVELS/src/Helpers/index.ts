import Joi from 'joi'

export const ValidateRegistration = Joi.object({
    name: Joi.string().required().messages({
        'string.name': "Please enter valid username"
    }),
    email: Joi.string().required().email().messages({
        'string.email': "Please enter valid email"
    }),
    password: Joi.string().required().pattern(
        new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
    ).messages({
        'string.password': "Please enter valid password"
    })
})