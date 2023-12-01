window.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#add-task");
    const delPendingBtn = document.querySelector("#deletePending");
    const delCompletedBtn = document.querySelector("#deleteCompleted");
    const updateStatusBtn = document.querySelector("#status");


    addBtn.addEventListener("click", async () => {
        let task = document.querySelector("#task").value;
        const category = document.querySelector("#category").value;
        task = task.toLowerCase();

        await axios({
            method: "post",
            url: "/task",
            data: {
                task: task[0].toUpperCase() + task.slice(1),
                category: category
            }
        })
    })

    updateStatusBtn.addEventListener("click", async () => {

        await axios({
            method: "put",
            url: "/task",
            data: {
                id: updateStatusBtn.value,
                status: "Done"
            }
        })
    })

    delPendingBtn.addEventListener("click", async () => {
        const id = document.querySelector("#deletePendingId").value;

        await axios({
            method: "delete",
            url: "/task",
            data: {
                id: id
            }
        })
    })

    delCompletedBtn.addEventListener("click", async () => {
        const id = document.querySelector("#deleteCompletedId").value;

        await axios({
            method: "delete",
            url: "/task",
            data: {
                id: id
            }
        })
    })
})