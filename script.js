console.log("Aplikasi Daily Tasks dimulai.");

const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("jumlahTugas");
const emptyMessage = document.getElementById("emptyMessage");

console.log("DOM berhasil dimuat dan elemen HTML berhasil diambil.");

let tasks = JSON.parse(localStorage.getItem("dailyTasks")) || [];

console.log("Data tugas dari Local Storage:", tasks);

function displayTasks() {
    console.log("Menampilkan daftar tugas...");

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.className = "task-item";

        if (task.completed) {
            listItem.classList.add("completed");
        }

        const checkButton = document.createElement("button");

        checkButton.className = "check-button";

        checkButton.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;

            if (tasks[index].completed) {
                console.log(
                    `Tugas "${tasks[index].name}" ditandai sebagai SELESAI.`
                );
            } else {
                console.log(
                    `Tugas "${tasks[index].name}" ditandai sebagai BELUM SELESAI.`
                );
            }

            saveTasks();
            displayTasks();
        });

        const taskText = document.createElement("span");

        taskText.className = "task-text";
        taskText.textContent = task.name;

        taskText.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;

            if (tasks[index].completed) {
                console.log(
                    `Tugas "${tasks[index].name}" ditandai sebagai SELESAI.`
                );
            } else {
                console.log(
                    `Tugas "${tasks[index].name}" ditandai sebagai BELUM SELESAI.`
                );
            }

            saveTasks();
            displayTasks();
        });

        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-button";
        deleteButton.textContent = "×";

        deleteButton.addEventListener("click", () => {
            console.log(
                `Tugas "${tasks[index].name}" akan dihapus.`
            );

            tasks.splice(index, 1);

            saveTasks();
            displayTasks();

            console.log("Tugas berhasil dihapus.");
        });

        listItem.appendChild(checkButton);
        listItem.appendChild(taskText);
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });

    taskCounter.textContent = tasks.length;

    console.log(
        `Statistik diperbarui → Total Tugas: ${tasks.length}`
    );

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
        console.log("Belum ada tugas.");
    } else {
        emptyMessage.style.display = "none";
        console.log("Daftar tugas berhasil ditampilkan.");
    }
}

function addTask() {
    const taskName = taskInput.value.trim();

    console.log(
        `Proses menambahkan tugas: "${taskName}"`
    );

    if (taskName === "") {
        console.log(
            "Penambahan tugas dibatalkan: input kosong."
        );

        alert("Silakan masukkan tugas terlebih dahulu!");

        taskInput.focus();

        return;
    }

    const newTask = {
        name: taskName,
        completed: false
    };

    tasks.push(newTask);

    console.log(
        `Tugas "${taskName}" berhasil ditambahkan ke dalam daftar.`
    );

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskInput.focus();

    console.log(
        "Input dikosongkan dan fokus dikembalikan ke kolom tugas."
    );
}

function saveTasks() {
    localStorage.setItem(
        "dailyTasks",
        JSON.stringify(tasks)
    );

    console.log(
        "Data tugas berhasil disimpan ke Local Storage."
    );
}

addTaskButton.addEventListener("click", () => {
    console.log("Tombol TAMBAH diklik.");
    addTask();
});

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        console.log("Tombol ENTER ditekan.");
        addTask();
    }
});

displayTasks();

console.log("Aplikasi Daily Tasks siap digunakan.");