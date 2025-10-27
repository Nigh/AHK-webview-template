const pages = document.getElementById("pages")
// let currentPage = 0

let currentPage = 3
updatePage()
setPagination(currentPage)

const form = document.querySelector("#pagination")

export function currentPageTitle() {
	const titles=[
		"AHK WebView Template",
		"Register Example",
		"Controller Example(WIP)",
		"DaisyUI Sample"
	]
	document.getElementById("hello").innerHTML = titles[currentPage]
}

function updatePage() {
	pages.style.transform = `translateX(-${currentPage * 25}%)`
	currentPageTitle()
}

function setPagination(value) {
	const radio = document.querySelector(
		`input[name="pagination-main"][value="${value}"]`
	)
	if (radio) {
		radio.checked = true
	}
}

form.addEventListener("change", function (event) {
	if (event.target.name === "pagination-main") {
		currentPage = event.target.value
		updatePage()
	}
})

// let mouseStartX = 0
// let mouseDown = false
// pages.addEventListener("mousedown", (e) => {
// 	mouseStartX = e.clientX
// 	mouseDown = true
// })
// pages.addEventListener("mousemove", (e) => {
// 	if (!mouseDown) return
// 	const diff = e.clientX - mouseStartX
// 	if (Math.abs(diff) > 80) {
// 		if (diff < 0 && currentPage < 3) currentPage += 1
// 		else if (diff > 0 && currentPage > 0) currentPage -= 1
// 		updatePage()
// 		setPagination(currentPage)
// 		mouseDown = false
// 	}
// })
// window.addEventListener("mouseup", () => (mouseDown = false))

let lastScrollTime = 0
window.addEventListener(
	"wheel",
	(e) => {
		const now = Date.now()
		if (now - lastScrollTime < 300) return
		lastScrollTime = now

		const deltaX = e.deltaX
		const deltaY = e.deltaY

		// Allow both horizontal and vertical swipes
		const move = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY

		if (move > 40 && currentPage < 3) {
			currentPage = Number(currentPage) + Number(1)
			updatePage()
			setPagination(currentPage)
		} else if (move < -40 && currentPage > 0) {
			currentPage = Number(currentPage) - Number(1)
			updatePage()
			setPagination(currentPage)
		}
	},
	{ passive: true }
)
