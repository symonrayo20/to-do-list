const express = require("express");
const router = express.Router();
const useAdminService = require("../services/adminService");
const { 
    create, retrieveAllTasks, retrieveAllCompletedTasks,
    updateStatus, deleteTasks, 
} = useAdminService();

router.get("/", async (req, res, next) => {
    try {
        const allTasks = await retrieveAllTasks();
        let allTasksResult = Object.keys(allTasks).length === 0 ? 0 : allTasks;
        // console.log(allTasksResult);
        const allCompletedTasks = await retrieveAllCompletedTasks();
        let allCompletedTasksResult = Object.keys(allCompletedTasks).length === 0 ? 0 : allCompletedTasks;
        // console.log(allCompletedTasksResult);
        res.render("index", {allTasks: allTasksResult, allCompletedTasks: allCompletedTasksResult});
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