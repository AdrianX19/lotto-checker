const checkResultsBtn = document.querySelector('#checkResults')
const removeTicketBtn = document.querySelector('.removeTicket')
const allTicketsDivs = document.querySelector('.tickets')
const board = document.querySelector('#board')
const numbers = document.querySelector('#board #numbers')
const addTicketBtn = document.querySelector('#addYourTicket')
const closeModal = document.querySelector('#close')
const saveTheTicket = document.querySelector('#saveYourTicket')
const overlay = document.querySelector('#overlay')

let numberOfActive = 0;
const ticketNumbers = []
const allTickets = []

function saveResultsToLocalStorage(results) {
  localStorage.setItem('tickets', JSON.stringify(results))
}

function loadResultsFromLocalStorage() {
  if (localStorage.getItem('tickets')) {
    let resultsFromLocalStorage = JSON.parse(localStorage.getItem('tickets'))
    allTickets.length = 0;
    allTickets.push(...resultsFromLocalStorage)
  } else {
    checkResultsBtn.disabled = true
    console.log('No tickets added yet')
  }
}

function addTicketOnPage(ticket, index) {
  let ticketContainer = document.createElement('div')
  ticketContainer.setAttribute('class', 'ticket')
  for (let i = 0; i < ticket.length; i++) {
    let ticketNumber = document.createElement('div')
    ticketNumber.setAttribute('class', 'ticketNumber')
    ticketNumber.textContent = ticket[i];
    ticketContainer.appendChild(ticketNumber)
  }

  let removeTicket = document.createElement('div')
  removeTicket.setAttribute('class', 'fa-solid fa-trash removeTicket')
  // removeTicket.textContent = 'X'
  removeTicket.dataset.ticketIndex = index

  removeTicket.addEventListener('click', function (event) {
    if (!removeTicket.classList.contains('inactive') && confirm('Czy chcesz usunąć zestaw?') === true) {
      let index = Number(this.dataset.ticketIndex)
      allTickets.splice(index, 1)
      saveResultsToLocalStorage(allTickets)
      loadTheTickets()
    }
  })

  ticketContainer.appendChild(removeTicket)

  allTicketsDivs.appendChild(ticketContainer)
}

function loadTheTickets() {
  loadResultsFromLocalStorage()
  // cleanup tickets before loading the list
  document.querySelectorAll('.ticket').forEach(el => {
    el.remove()
  })
  allTickets.forEach((ticket, index) => {
    addTicketOnPage(ticket, index)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  loadTheTickets()

  for (let i = 1; i < 91; i++) {
    let numBtn = document.createElement('button')
    numBtn.setAttribute('class', 'number')
    numBtn.textContent = i;
    numBtn.addEventListener('click', () => {
      if (!numBtn.classList.contains('active') && numberOfActive < 10) {
        numBtn.classList.add('active')
        numberOfActive++;
      } else if (numBtn.classList.contains('active')) {
        numBtn.classList.remove('active')
        numberOfActive--;
      }
      if (numberOfActive > 0) {
        saveTheTicket.disabled = false;
      } else {
        saveTheTicket.disabled = true;
      }
    })
    numbers.appendChild(numBtn)
  }
})

addTicketBtn.addEventListener('click', () => {
  board.style.display = 'block'
  overlay.style.display = 'block'
  saveTheTicket.disabled = true;
})

saveTheTicket.addEventListener('click', () => {
  ticketNumbers.length = 0
  document.querySelectorAll('.number.active').forEach(active => {
    ticketNumbers.push(Number(active.textContent))
    active.classList.remove('active')
  })
  numberOfActive = 0
  allTickets.push([...ticketNumbers])
  saveResultsToLocalStorage(allTickets)
  // addTicketOnPage(ticketNumbers)
  saveTheTicket.disabled = true;
  loadTheTickets()
  checkResultsBtn.disabled = false;
})

closeModal.addEventListener('click', () => {
  ticketNumbers.length = 0
  numberOfActive = 0
  document.querySelectorAll('.number.active').forEach(active => {
    active.classList.remove('active')
  })
  board.style.display = 'none'
  overlay.style.display = 'none'

})

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function checkResults(numbers) {
  // Reset all statuses
  numbers.forEach(number => {
    number.classList.remove('lost')
    number.classList.remove('won')
  })

  for (let i = 0; i < document.querySelectorAll('.removeTicket').length; i++) {
    document.querySelectorAll('.removeTicket')[i].classList.add('inactive')
  }

  checkResultsBtn.disabled = true;
  addTicketBtn.disabled = true;
  for (let i = 0; i < numbers.length; i++) {
    numbers[i].style.animation = 'trala .4s infinite'
    // await delay(i == numbers.length - 1 ? 0 : 1500);
    await delay(2000);
    numbers[i].style.animation = ''
    if (drawingResult.includes(Number(numbers[i].textContent))) {
      numbers[i].classList.add('won');
    } else {
      numbers[i].classList.add('lost');
    }
  }
  checkResultsBtn.disabled = false;
  addTicketBtn.disabled = false;

  for (let i = 0; i < document.querySelectorAll('.removeTicket').length; i++) {
    document.querySelectorAll('.removeTicket')[i].classList.remove('inactive')
  }
}

checkResultsBtn.addEventListener('click', () => {
  checkResults(document.querySelectorAll('.ticketNumber'))
})

// if (document.readyState === 'loading') {
//   document.addEventListener('DOMContentLoaded', init);
// } else {
//   init(); // Jeśli DOM już gotowy, odpal od razu
// }

// function init() {
//   console.log("✅ DOM w pełni gotowy!");
// }