function setupStepper() {
	let count = 0
	const display = document.getElementById('stepper-value')
	document.getElementById('stepper-minus').addEventListener('click', () => {
		count = Math.max(0, count - 1)
		display.textContent = count
	})
	document.getElementById('stepper-plus').addEventListener('click', () => {
		count++
		display.textContent = count
	})
}
setupStepper()
