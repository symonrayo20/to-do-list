window.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#add-task");
    const delPendingBtn = document.querySelectorAll("[name='deletePending']");
    const delCompletedBtn = document.querySelector("#deleteCompleted");
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

            // window.location.reload();
        })
    })

    // updateStatusBtn.addEventListener("click", async () => {


    //     await axios({
    //         method: "put",
    //         url: "/task",
    //         data: {
    //             id: updateStatusBtn.value,
    //             status: "Done"
    //         }
    //     })
    //     window.location.reload();

    // })

    // delPendingBtn.addEventListener("click", async () => {
    //     const id = document.querySelector("#deletePendingId").value;

    //     await axios({
    //         method: "delete",
    //         url: "/task",
    //         data: {
    //             id: id
    //         }
    //     })
    // })
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