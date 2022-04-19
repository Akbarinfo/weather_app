const body = document.querySelector('body')
const elForm = document.querySelector('#form')
const elInput = document.querySelector('#input')
const elListBox = document.querySelector('#listbox')

//Api info
let api = '0400b796d3acd1ee1c6f3301a977c52f'
let url = 'https://api.openweathermap.org/data/2.5/'
let city = 'Andijan'

//createElement

function createElements(...array) {
  return array.map(el => {
    return document.createElement(el)
  })
}

elForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let city = elInput.value
  console.log(city)
  fetch(`${url}weather?q=${city}&units=metric&APPID=${api}`)
  .then((res) => res.json())
  .then(display)
  // .then((data) =>{
  //   console.log(data)
  // })

  elInput.value = ''
  elListBox.innerHTML = null
})

// function funWeat() {
//   fetch(`${url}weather?q=${city}&units=metric&APPID=${api}`)
//   .then((res) => res.json())
//   // .then((data) =>{
//   //   console.log(data)
//   // })
//   .then(display)
// }

// funWeat()

function display(data){
  console.log(data)
  let [pcity, ptemp, pcloud, phum, pwind] = createElements('p', 'p', 'p', 'p', 'p')

  let cloud = data.weather[0].main

  //class name beramiz
  pcity.className = 'weather__city'
  ptemp.className = 'weather__temp'
  pcloud.className = 'weather__sunny'
  phum.className = 'weather__humidity'
  pwind.className = 'weather__wind'

  if(cloud == 'Clouds') {
    body.style.backgroundImage = 'url(/img/cloud.jpeg)'
  }

  if(cloud == 'Rain') {
    body.style.backgroundImage = 'url(/img/rain.jpg)'

  }
  if(cloud == 'Snow') {
    body.style.backgroundImage = 'url(/img/snaw.jpg)'
  }

  if(cloud == 'Clear') {
    body.style.backgroundImage = 'url(/img/clear.jpg)'
  }

  if(cloud == 'Fog') {
    body.style.backgroundImage = 'url(/img/fog.jpg)'
  }

  //info
  pcity.textContent = `${data.name}`
  ptemp.textContent = `${Math.floor(data.main.temp)}°C`
  pcloud.textContent = `${data.weather[0].main}`
  phum.textContent = `Humidity: ${data.main.humidity}%`
  pwind.textContent = `Wind Speed: ${Math.floor(data.wind.speed)} km/h`

  elListBox.appendChild(pcity)
  elListBox.appendChild(ptemp)
  elListBox.appendChild(pcloud)
  elListBox.appendChild(phum)
  elListBox.appendChild(pwind)
}