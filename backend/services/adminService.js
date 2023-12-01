const DBConnection = require("../db/Connection");

const useAdminService = () => {
    const createTasks = async (task, category) => {
        try {
            const query = `INSERT INTO tasks VALUES(null, '${task}', null, '${category}', 'pending', null)`;
            await DBConnection(query);
            return true;
        } catch (err) {
            console.log("Error create Task", err);
            return false;
        }
    }

    const retrieveAllTasks = async () => {
        try {
            const pendingTasks = await DBConnection("SELECT * FROM tasks WHERE status = 'pending'");
            const completedTasks = await DBConnection("SELECT * FROM tasks WHERE status = 'Done'");
            const pendingWorkTasks = await DBConnection("SELECT * FROM tasks WHERE status = 'pending' AND category = 'work'");
            const completedWorkTasks = await DBConnection("SELECT * FROM tasks WHERE status = 'Done' AND category = 'work'");
            const pendingPersonalTasks = await DBConnection("SELECT * FROM tasks WHERE status = 'pending' AND category = 'personal'");
            const completedPersonalTasks = await DBConnection("SELECT * FROM tasks WHERE status = 'Done' AND category = 'personal'");

            return {
                pendingTasks: pendingTasks,
                completedTasks: completedTasks,
                pendingWorkTasks: pendingWorkTasks, 
                completedWorkTasks: completedWorkTasks,
                pendingPersonalTasks: pendingPersonalTasks, 
                completedPersonalTasks: completedPersonalTasks,
            };
        } catch (err) {
            console.log("Error retrieve Task", err);
            return [];
        }
        
    }

    const updateStatus = async (id, status) => {
        try {
            const query = `UPDATE tasks SET status = '${status}' WHERE id = ${id}`;
            await DBConnection(query);
            return true;
        } catch (err) {
            console.log("Error Update Status Task", err);
            return true;
        }
        
    }

    const deleteTasks = async (id) => {
        try {
            const query = `DELETE FROM tasks WHERE id = ${id}`;
            await DBConnection(query);
            return true;
        } catch (err) {
            console.log("Error Delete Task", err);
            return false;
        }
        
    }

    return {
        create: createTasks,
        retrieveAllTasks: retrieveAllTasks,
        updateStatus: updateStatus,
        deleteTasks: deleteTasks
    }
}

module.exports = useAdminService;