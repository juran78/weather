let apikey = '11d536055e4c7cc09b06b4605359b97f'
let city = document.querySelector('input')


const zip = document.querySelector('#zip')
const form = document.querySelector('form')
const submitButton = document.querySelector('#submit')
const randomButton = document.querySelector('#randomButton')

console.log(submitButton)
submitButton.addEventListener('click', async (e) => {
    e.preventDefault()
    let cityfinder;
    if (!zip.value && city.value) {
        cityfinder = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=imperial&appid=${apikey}`)
    }
    if (!city.value && zip.value) {
        cityfinder = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zip.value}&units=imperial&appid=${apikey}`)
    }
    if (!city.value && !zip.value) {
        return alert('you need to enter something')
    } if (city.value && zip.value) {
        cityfinder = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zip.value}&q=${city.value}&units=imperial&appid=${apikey}`)
    }
    console.log(cityfinder.data)
    let weatherArray = [cityfinder.data.main, cityfinder.data.weather]
    console.log(weatherArray)
    let weatherDiv = document.querySelector('#weatherDiv')
    let innerDiv = document.createElement('div')
    innerDiv.classList.add('d-flex', 'w-50', 'justify-content-center', 'card', 'bg-primary', 'text-center', 'mt-3', 'ms-2', 'py-2', 'px-2')
    weatherDiv.appendChild(innerDiv)
    let locationH2 = document.createElement('h2')
    locationH2.innerText = cityfinder.data.name
    let tempH3 = document.createElement('h3')
    let symbol = '\u2109'
    tempH3.innerHTML = `temperature: ${weatherArray[0].temp}${symbol}`
    innerDiv.appendChild(locationH2)
    innerDiv.appendChild(tempH3)
    let cardBody = document.createElement('div')
    cardBody.classList.add('card-body', 'justify-content-between')
    cardBody.innerHTML = `<p> feels like: <b>${cityfinder.data.main.feels_like}</b></p>
    <p>description: <b>${weatherArray[1][0].description}</b></p>
    `
    innerDiv.appendChild(cardBody)
    let stats = document.createElement('p')
    stats.innerText = weatherArray[0].temp
    innerDiv.appendChild(stats)
    innerDiv.addEventListener('click', () => {
        innerDiv.remove()
    })


})
randomButton.addEventListener('click', async (e) => {

    e.preventDefault()
    let cityfinder;
    function randomZipGenerator() { return Math.floor(Math.random() * 99950) }

    cityfinder = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${randomZipGenerator()}&units=imperial&appid=${apikey}`)
    if (!cityfinder) {
        while (!cityfinder) {
            cityfinder = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${randomZipGenerator()}&units=imperial&appid=${apikey}`)
        }
    }



    console.log(cityfinder.data)
    let weatherArray = [cityfinder.data.main, cityfinder.data.weather]
    console.log(weatherArray)
    let weatherDiv = document.querySelector('#weatherDiv')
    let innerDiv = document.createElement('div')
    innerDiv.classList.add('d-flex', 'w-50', 'justify-content-center', 'card', 'bg-primary', 'text-center', 'mt-3', 'ms-2', 'py-2', 'px-2')
    weatherDiv.appendChild(innerDiv)
    let locationH2 = document.createElement('h2')
    locationH2.innerText = cityfinder.data.name
    let tempH3 = document.createElement('h3')
    let symbol = '\u2109'
    tempH3.innerHTML = `temperature: ${weatherArray[0].temp}${symbol}`
    innerDiv.appendChild(locationH2)
    innerDiv.appendChild(tempH3)
    let cardBody = document.createElement('div')
    cardBody.classList.add('card-body', 'justify-content-between')
    cardBody.innerHTML = `<p> feels like: <b>${cityfinder.data.main.feels_like}</b></p>
    <p>description: <b>${weatherArray[1][0].description}</b></p>
    `
    innerDiv.appendChild(cardBody)
    let stats = document.createElement('p')
    stats.innerText = weatherArray[0].temp
    innerDiv.appendChild(stats)
    innerDiv.addEventListener('click', () => {
        innerDiv.remove()
    })

})


