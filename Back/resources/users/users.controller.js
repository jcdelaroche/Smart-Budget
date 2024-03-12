const userModel = require("./users.model");
const projectModel = require("../projects/projects.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

module.exports = {
  async signUp(req, res) {
    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    req.body.password = hash;
    try {
      const user = await userModel.create(req.body);
      return res.status(201).json({ ok: true, data: user });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          ok: false,
          data: "Email already exists",
        });
      }
      return res.status(500).json({ ok: false, data: error });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await userModel.find();
      return res.status(200).json({ ok: true, data: users });
    } catch (error) {
      return res.status(500).json({ ok: false, data: error });
    }
  },

  async logIn(req, res) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      remember: Joi.boolean()
    });

    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).send({ ok: false, data: error.details[0].message });
    let user = await userModel.findOne({ email: req.body.email });

    if (!user)
      return res.status(400).send({
        ok: false,
        data: "Invalid email",
      });

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch)
      return res.status(400).send({ ok: false, data: "Invalid password" });

    if (req.body.remember) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "14d",
      });
      return res.json({ ok: true, data: { token, user } });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.json({ ok: true, data: { token, user } });
    }
  },

  async deleteUser(req, res) {
    const { id } = req.user;
    try {
      await userModel.findByIdAndDelete(id);
      const projects = await projectModel.find({ users: id });
      projects.forEach(async (project) => {
        project.users = project.users.filter((user) => user != id);
        project.users.length === 0 ?
          await projectModel.findByIdAndDelete(project._id) :
          await projectModel.findByIdAndUpdate(project._id, project);});
      return res.status(200).json({ ok: true, data: "User deleted" });
    } catch (error) {
      return res.status(500).json({ ok: false, data: error });
    }
  },

  async getUser(req, res) {
    const { id } = req.user;
    try {
      const user = await userModel.findById(id);
      return res.status(200).json({ ok: true, data: user });
    } catch (error) {
      return res.status(500).json({ ok: false, data: error });
    }
  },

  async updateUser(req, res) {
    const { id } = req.user;
    const { password } = req.body;

    if (password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      req.body.password = hash;
    }
    try {
      const user = await userModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json({ ok: true, data: user });
    } catch (error) {
      return res.status(500).json({ ok: false, data: error });
    }
  }
};
