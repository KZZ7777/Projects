// calendar.js
const calendarEl = document.querySelector(".calendar")
const yearEl = calendarEl.querySelector(".year")
const monthEl = calendarEl.querySelector(".month")
const gridEl = calendarEl.querySelector(".cal-grid")
const prevBtn = calendarEl.querySelector(".prev")
const nextBtn = calendarEl.querySelector(".next")

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

let state = getInitialState()

render()

prevBtn.addEventListener("click", () => {
    state.month--
    if (state.month < 0) { state.month = 11; state.year-- }
    render()
})
nextBtn.addEventListener("click", () => {
    state.month++
    if (state.month > 11) { state.month = 0; state.year++ }
    render()
})

gridEl.addEventListener("click", e => {
    const cell = e.target.closest(".cal-day")
    if (!cell) return
    if (cell.dataset.muted === "true") return
    state.selected = Number(cell.dataset.day)
    persist()
    updateSelected()
})

function render() {
    yearEl.textContent = state.year
    monthEl.textContent = MONTHS[state.month]
    gridEl.innerHTML = ""

    const first = new Date(state.year, state.month, 1)
    const startDay = first.getDay() // 0 Sun
    const daysInMonth = new Date(state.year, state.month + 1, 0).getDate()
    const prevMonthDays = new Date(state.year, state.month, 0).getDate()

    // fill previous month muted cells
    for (let i = 0; i < startDay; i++) {
        const d = prevMonthDays - startDay + 1 + i
        gridEl.appendChild(dayCell(d, true))
    }
    // current month
    for (let d = 1; d <= daysInMonth; d++) {
        const cell = dayCell(d, false)
        if (isToday(state.year, state.month, d)) cell.classList.add("today")
        if (state.selected === d) cell.classList.add("selected")
        gridEl.appendChild(cell)
    }
    // next month muted cells to complete grid rows
    const total = startDay + daysInMonth
    const pad = (7 - (total % 7)) % 7
    for (let i = 1; i <= pad; i++) {
        gridEl.appendChild(dayCell(i, true))
    }
}

function dayCell(d, muted) {
    const el = document.createElement("div")
    el.className = "cal-day" + (muted ? " muted" : "")
    el.textContent = d
    el.dataset.day = d
    el.dataset.muted = muted ? "true" : "false"
    return el
}

function isToday(y, m, d) {
    const t = new Date()
    return t.getFullYear() === y && t.getMonth() === m && t.getDate() === d
}

function updateSelected() {
    gridEl.querySelectorAll(".cal-day").forEach(c => c.classList.remove("selected"))
    const match = Array.from(gridEl.querySelectorAll(".cal-day"))
        .find(c => c.dataset.muted === "false" && Number(c.dataset.day) === state.selected)
    if (match) match.classList.add("selected")
}

function persist() {
    localStorage.setItem("calendarState", JSON.stringify(state))
}
function getInitialState() {
    const saved = localStorage.getItem("calendarState")
    if (saved) return JSON.parse(saved)
    const n = new Date()
    return { year: n.getFullYear(), month: n.getMonth(), selected: n.getDate() }
}
