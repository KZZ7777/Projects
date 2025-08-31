const ul = document.querySelector("#list")
const btn = document.querySelector("#btn")
const clearBtn = document.querySelector("#clear-btn")
const input = document.querySelector("#task")

function taskItems() {
    return ul.querySelectorAll("li:not(.empty)")
}

function showEmpty() {
    if (taskItems().length === 0 && !ul.querySelector(".empty")) {
        const li = document.createElement("li")
        li.className = "empty"
        li.textContent = "Er zijn nog geen taken"
        ul.appendChild(li)
    }
}

function hideEmpty() {
    const e = ul.querySelector(".empty")
    if (e) e.remove()
}

function saveTasks() {
    const data = []
    taskItems().forEach(li => {
        data.push({
            text: li.querySelector(".tasktekst").textContent,
            checked: li.querySelector(".checkbox").checked
        })
    })
    localStorage.setItem("tasks", JSON.stringify(data))
}

function loadTasks() {
    const raw = localStorage.getItem("tasks")
    if (!raw) {
        showEmpty()
        return
    }
    const items = JSON.parse(raw)
    if (items.length === 0) {
        showEmpty()
        return
    }
    items.forEach(t => addTask(t.text, t.checked, false))
}

function addTask(text, checked = false, save = true) {
    hideEmpty()

    const li = document.createElement("li")

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.className = "checkbox"
    checkbox.checked = checked

    const span = document.createElement("span")
    span.className = "tasktekst"
    span.textContent = text

    const del = document.createElement("button")
    del.className = "delete-btn"
    del.textContent = "X"

    // doorstrepen bij check
    if (checkbox.checked) li.classList.add("is-done")
    checkbox.addEventListener("change", () => {
        li.classList.toggle("is-done", checkbox.checked)
        saveTasks()
    })

    del.addEventListener("click", () => {
        li.remove()
        saveTasks()
        if (taskItems().length === 0) showEmpty()
    })

    li.appendChild(checkbox)
    li.appendChild(span)
    li.appendChild(del)

    ul.appendChild(li)
    if (save) saveTasks()
}

btn.addEventListener("click", e => {
    e.preventDefault()
    const text = input.value.trim()
    if (!text) {
        alert("You must write something!")
        return
    }
    addTask(text, false, true)
    input.value = ""
    input.focus()
})

clearBtn.addEventListener("click", e => {
    e.preventDefault()
    ul.innerHTML = ""
    saveTasks()
    showEmpty()
})

// datum
const d = new Date()
const dd = String(d.getDate()).padStart(2, "0")
const mm = String(d.getMonth() + 1).padStart(2, "0")
const el = document.getElementById("today-date")
if (el) el.textContent = `${dd}/${mm}`

// start
loadTasks()
