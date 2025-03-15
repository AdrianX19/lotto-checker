const background = document.querySelector('#background')

function randomFontSize() {
  return Math.round(Math.random() * 20 + 25)
}
window.addEventListener('load', () => {
  for (let i = 0; i < 600; i++) {
    const num = document.createElement('span')
    num.setAttribute('class', 'bcgNum')
    num.textContent = Math.round(Math.random() * 89 + 1)
    num.style.fontSize = `${Math.round(Math.random() * 20 + 25)}px`
    num.style.transform = `rotate(${Math.round(Math.random() * 360)}deg)`
    background.appendChild(num)
  }
})