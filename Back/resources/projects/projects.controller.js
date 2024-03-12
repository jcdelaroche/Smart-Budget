const projectModel = require('./projects.model');
const userModel = require('../users/users.model');

module.exports = {
    async createProject(req, res) {
        const { id } = req.user;
        req.body.users = [id];
        req.body.date = new Date();
        req.body.incomes = [];
        req.body.expenses = [];
        try {
            const project = await projectModel.create(req.body);
            const user = await userModel.findById(id);
            user.projects.push(project._id);
            await user.save();
            return res.status(201).json({ ok: true, data: project });
        } catch (error) {
            return res.status(500).json({ ok: false, data: error.message });
        }
    },
    async getProjects(req, res) {
        try {
            const projects = await projectModel.find();
            return res.status(200).json({ ok: true, data: projects });
        } catch (error) {
            return res.status(500).json({ ok: false, data: error.message });
        }
    },
    async getProject(req, res) {
        try {
            const project = await projectModel.findById(req.params.id).populate('incomes').populate('expenses');
            if (!project) {
                return res.status(404).json({ ok: false, data: 'Project not found' });
            }
            return res.status(200).json({ ok: true, data: project });
        } catch (error) {
            return res.status(500).json({ ok: false, data: error.message });
        }
    },
    async getProjectsByUser(req, res) {
        const { id } = req.user;
        try {
            const projects = await projectModel.find({ users: id });
            return res.status(200).json({ ok: true, data: projects });
        } catch (error) {
            return res.status(500).json({ ok: false, data: error.message });
        }
    },
    async updateProject(req, res) {
        try {
            const project = await projectModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!project) {
                return res.status(404).json({ ok: false, data: 'Project not found' });
            }
            return res.status(200).json({ ok: true, data: project });
        } catch (error) {
            return res.status(500).json({ ok: false, data: error.message });
        }
    },
    async deleteProject(req, res) {
        try {
            const project = await projectModel.findByIdAndDelete(req.params.id);
            if (!project) {
                return res.status(404).json({ ok: false, data: 'Project not found' });
            }
            return res.status(200).json({ ok: true, data: project });
        } catch (error) {
            return res.status(500).json({ ok: false, data: error.message });
        }
    },
    async join(req, res) {
        const { id } = req.user;
        try {
            const project = await projectModel.findById(req.params.id);
            if (!project) {
                return res.status(404).json({ ok: false, data: 'Project not found' });
            }
            if (project.users.includes(id)) {
                return res.status(400).json({ ok: false, data: 'Already joined' });
            }
            project.users.push(id);
            await project.save();
            const user = await userModel.findById(id);
            user.projects.push(project._id);
            await user.save();
            return res.status(200).json({ ok: true, data: project });
        } catch (error) {
            return res.status(500).json({ ok: false, data: error.message });
        }
    }
}