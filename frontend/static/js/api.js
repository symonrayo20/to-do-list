window.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#add-task");
    const delPendingBtn = document.querySelectorAll("[name='deletePending']");
    const delCompletedBtn = document.querySelectorAll("[name='deleteComplete']");
    const updateStatusBtn = document.querySelectorAll("[name='status']");


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
        window.location.reload();
    })

    updateStatusBtn.forEach((btn) => {
        btn.addEventListener("click", async () => {
            const id = btn.nextElementSibling.value;

            await axios({
                method: "put",
                url: "/task",
                data: {
                    id: id,
                    status: "Done"
                }
            })

            window.location.reload();
        })
    })

    delPendingBtn.forEach((btn) => {
        btn.addEventListener("click", async () => {
            const id = btn.nextElementSibling.value;

            await axios({
                method: "delete",
                url: "/task",
                data: {
                    id: id
                }
            })
            window.location.reload();
        })
    })

    delCompletedBtn.forEach((btn) => {
        btn.addEventListener("click", async () => {
            const id = btn.nextElementSibling.value;

            await axios({
                method: "delete",
                url: "/task",
                data: {
                    id: id
                }
            })
            window.location.reload();
        })
    })

})