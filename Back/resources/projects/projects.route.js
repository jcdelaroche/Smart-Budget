const express = require("express");
const { validateProject } = require("../middlewares/validateProjects");

const {
    createProject,
    getProjects,
    getProject,
    getProjectsByUser,
    updateProject,
    deleteProject,
    join
    } = require("./projects.controller");

const router = express.Router();

router.route("").get(getProjects).post(validateProject, createProject);
router.route("/user").get(getProjectsByUser);
router.route("/:id").get(getProject).put(updateProject).delete(deleteProject);
router.route("/join/:id").put(join);

module.exports = router;