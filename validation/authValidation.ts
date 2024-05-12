import Joi from 'joi';

const login_schema = Joi.object({
    email: Joi.string().email().required().max(50),
    password: Joi.string().required().min(5),
});

export {
    login_schema
}