const Joi = require('joi');

const validateTransaction = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().regex(new RegExp('^[A-Za-zÀ-ÖØ-öø-ÿ\\s-]+$')).required(),
        type: Joi.string().valid("income", "expense").required(),
        category: Joi.string().valid(
            "Alimentation",
            "Shopping",
            "Salaire",
            "Assurance",
            "Loyer",
            "Loisirs",
            "Transport",
            "Santé",
            "Impôts",
            "Épargne",
            "Crédit",
            "Études",
            "Vente",
            "Autre"
            ).required(),
        date: Joi.string().required(),
        amount: Joi.number().min(0).required(),
        every: Joi.string().valid("Ponctuel", "Jour", "Mois", "Trimestre", "Semestre", "Année").required(),
        project: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ ok: false, data: error.details[0].message });
    }
    next();
}

module.exports = { validateTransaction }