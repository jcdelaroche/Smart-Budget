const Joi = require('joi');

const validateProject = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ ok: false, data: error.details[0].message });
    }
    next();
}

module.exports = { validateProject }