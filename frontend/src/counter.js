function setupCounter() {
  let counter = 0
  let btn_element = document.querySelector('#counter-btn')
  let cnt_element = document.querySelector('#counter')
  const setCounter = (count) => {
    counter = count
    cnt_element.innerHTML = `${counter}`
  }
  btn_element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
setupCounter()
