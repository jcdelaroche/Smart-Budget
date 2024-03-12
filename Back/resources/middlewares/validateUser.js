const Joi = require('joi');

const validateUser = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().regex(new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ\\s-]+$')).required(),
        surname: Joi.string().regex(new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ\\s-]+$')).required(),
        email: Joi.string().email().required(),
        password: Joi.string().regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()_+{}|:\"<>?/]).{8,}$')).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ ok: false, data: error.details[0].message });
    }
    next();
}

module.exports = { validateUser }