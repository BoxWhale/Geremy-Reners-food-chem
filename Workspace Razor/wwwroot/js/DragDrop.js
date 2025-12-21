let draggedItem = null

function pickup(event) {
	draggedItem = event.target
	event.dataTransfer.setData("text/plain", event.target.innerText)
	event.dataTransfer.effectAllowed = "move"
	console.log("Picked up:", event.target.innerText)
}

function allowDrop(event) {
	event.preventDefault()
}

function drop(event) {
	event.preventDefault()
	if (!draggedItem) return
	event.currentTarget.appendChild(draggedItem)
	draggedItem = null
	console.log("Dropped item")
}

// Expose pickup globally for inline ondragstart handlers in Razor
window.pickup = pickup

// Ensure listeners are attached after DOM is ready (script may load in head)
document.addEventListener("DOMContentLoaded", () => {
	const PICK = document.getElementById("pickupList")
	const DROP = document.getElementById("dropList")

	if (PICK) {
		PICK.addEventListener("dragover", allowDrop)
		PICK.addEventListener("drop", drop)
	}
	if (DROP) {
		DROP.addEventListener("dragover", allowDrop)
		DROP.addEventListener("drop", drop)
	}
})
