const path = require('path')
const express = require('express')
const app = express()
const pug = require('pug')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

//define paths for express config
const publicdirectorypath = path.join(__dirname,'../public')
console.log(publicdirectorypath)

//setup handalbar engine and view location
app.set('view engine' , 'pug')


//setup static directory to serve
app.use(express.static(publicdirectorypath))

app.get('/', (req,res) =>
{
    res.render('index', {
        title:'Weather',
        name:'Uzair Ansari'
    })
})

app.get('/about' , (req,res) =>
{
    res.render('about',{
        title:'About Me',
        name:'Uzair Ansari'
    })
})

app.get('/help' , (req,res) =>
{
    res.render('help' ,{ 
        helptxt:'this is some help page!',
        title:'Help',
        name : 'Uzair Ansari'
    })
})

app.get('/weather' ,(req,res) =>
{
    if(!req.query.address)
    {
        return res.send({
            error:'you must provide an address'
        })
    }
    geocode(req.query.address , (error , {latitude,longitude,location} = {}) =>
    {
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude,longitude , (error,forecastdata) =>
        {
            if(error)
            {
                return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
        })
    })

   // res.send({location:'mumbai',forecast:'25 degree',address : req.query.address})
})



app.get ('/products' , (req,res) =>
{
    if(!req.query.search)
    {
        return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*' , (req,res) =>
{
    res.render('404' , {title : '404',message : 'help artical not found! ->> you might try /help to find one' , name:'Uzair Ansari'})
})

app.get('*' , (req,res) =>
{
    res.render('404' , {title : '404', message : 'page not found!',name:'Uzair Ansari'})
})

app.listen(5000 , ()=>
{
    console.log('server is up on port 3000.')
})