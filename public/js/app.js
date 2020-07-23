const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const paraOne = document.querySelector('#one')
const paraTwo = document.querySelector('#two')


weatherForm.addEventListener('submit' , (e) =>
{
    e.preventDefault()

    const location = search.value

    console.log(location)

    paraOne.textContent = 'Loading...'
    paraTwo.textContent = ''

    fetch(`http://127.0.0.1:5000/weather?address=${location}`)
    .then((res) =>
    {
    return res.json()
    } )
    .then((data) =>
    {
    if(data.error)
    {
        paraOne.textContent = data.error
        console.log(data.error)
    }
    else{
        paraOne.textContent = data.location
        paraTwo.textContent = data.forecast
        console.log(data.location)
        console.log(data.forecast)
    }
    })
})
