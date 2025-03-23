const drawDateLabel = document.querySelector('#drawDate')
const drawingNumbers = document.querySelector('#drawNumbers')
const drawingResult = []

async function getLastLottoDrawingDetails() {
  const response = await fetch('https://lottery.mt/api/v1/lottery-statistics/games/history/loto?per_page=1')
  const data = await response.json()
  return data.results.data[0]
}

async function getDrawingDate() {
  const drawDetails = await getLastLottoDrawingDetails()
  const date = new Date(drawDetails.DrawDate)
  return date.toLocaleDateString('pl-PL')
}

async function getDrawingResults() {
  const drawDetails = await getLastLottoDrawingDetails()
  drawingResult.length = 0
  for (let i = 1; i < 6; i++) {
    drawingResult.push(drawDetails['Num' + i])
  }
  console.log(drawingResult)
  return drawingResult
}

window.addEventListener('load', async (event) => {
  drawDateLabel.textContent = await getDrawingDate()
  await getDrawingResults()
});

drawingNumbers.addEventListener('click', async () => {
  drawingNumbers.textContent = drawingResult
  drawingNumbers.style.backgroundColor = 'white'
  drawingNumbers.style.color = 'black'
  drawingNumbers.style.animation = 'fade 1s'
  drawingNumbers.style.cursor = 'default'
})