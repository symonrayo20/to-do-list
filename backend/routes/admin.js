const express = require("express");
const router = express.Router();
const useAdminService = require("../services/adminService");
const { 
    create, retrieveAllTasks, updateStatus, deleteTasks, 
} = useAdminService();

router.get("/index", async (req, res, next) => {
    try {
        const {pendingTasks, completedTasks} = await retrieveAllTasks();
        const AllpendingTasks = Object.keys(pendingTasks).length === 0 ? 0 : pendingTasks;
        const AllCompletedTasks = Object.keys(completedTasks).length === 0 ? 0 : completedTasks;
        res.render("index", {pendingTasks: AllpendingTasks, completedTasks: AllCompletedTasks});
    } catch (err) {
        res.status(500).json({message: "retrieve Error"});
    }
})

router.get("/work", async (req, res, next) => {
    try {
        const {pendingWorkTasks, completedWorkTasks} = await retrieveAllTasks();
        const AllpendingWorkTasks = Object.keys(pendingWorkTasks).length === 0 ? 0 : pendingWorkTasks;
        const AllCompletedPersonalTasks = Object.keys(completedWorkTasks).length === 0 ? 0 : completedWorkTasks;
        res.render("index", {pendingTasks: AllpendingWorkTasks, completedTasks: AllCompletedPersonalTasks});
    } catch (err) {
        res.status(500).json({message: "retrieve Error"});
    }
})

router.get("/personal", async (req, res, next) => {
    try {
        const {pendingPersonalTasks, completedPersonalTasks} = await retrieveAllTasks();
        const AllpendingPersonalTasks = Object.keys(pendingPersonalTasks).length === 0 ? 0 : pendingPersonalTasks;
        const AllCompletedPersonalTasks = Object.keys(completedPersonalTasks).length === 0 ? 0 : completedPersonalTasks;
        res.render("index", {pendingTasks: AllpendingPersonalTasks, completedTasks: AllCompletedPersonalTasks});
    } catch (err) {
        res.status(500).json({message: "retrieve Error"});
    }
})

router.post("/task", async (req, res, next) => {
    const { task, category } = req.body;

    try {
        const isCreated = await create(task, category);
        if (isCreated) {
            res.status(200).json({message: "Created Succesfully", data: isCreated});
        } else {
            res.status(200).json({message: "Failed Create", data: isCreated});
        }

    } catch (err) {
        res.status(500).json({message: "Create Error"});
    }
})

router.put("/task", async (req, res, next) => {
    const { id, status } = req.body;

    try {
        const isUpdated = await updateStatus(id, status);
        if (isUpdated) {
            res.status(200).json({message: "Update Succesfully", data: isUpdated});
        } else {
            res.status(200).json({message: "Failed Update", data: isUpdated});
        }

    } catch (err) {
        res.status(500).json({message: "Update Error"});
    }
})

router.delete("/task" , async (req, res, next) => {
    const { id } = req.body;

    try {
        const isDeleted = await deleteTasks(id);
        if (isDeleted) {
            res.status(200).json({message: "Delete Succesfully", data: isDeleted});
        } else {
            res.status(200).json({message: "Failed Delete", data: isDeleted});
        }
    } catch (err) {
        res.send(500).json({message: "Delete Failed"});
    }
})

module.exports = router;