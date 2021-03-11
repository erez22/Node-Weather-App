const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geoCode = require('./utils/geocode');
const findData = require('./../public/js/app')


const app = express();
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials');


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDir));

app.get('', (req,res)=>{
  res.render('index', {
    title:'weather',
    name:'erez'
  })
})

app.get('/about', (req,res)=>{
  res.render('about', {
    title:'forest'
  })
})

app.get('/help', (req,res)=>{
  res.render('help', {
    title:'contact us'
  })
})

app.get('/weather', (req, res)=>{
  const userAddress = req.query.address;
  if (!userAddress) {
    return res.send('you must enter an address')
  }
  geoCode(userAddress, (error, {lon, lat} = {}) => {
    if(error){
      return console.log('error')
    }
    forecast(lon, lat, (error, {location, temp, desc}) =>{
      if(error){
        return console.log('error 2')
      }
      res.send({
        location,
        temp,
        desc
      })
    })
  })
  // fisndData(`http://localhost:3000${req.url}`)
})

app.get('/products', (req,res)=>{
  if(!req.query.search){
    res.send('You must provide a search term')
  } else{
    res.send({
    products:[]
    })
  }
})





app.get('/help/*',(req,res)=>{
  res.render('404page',{
    title:"404 page",
    massege:'Help article not found'
  })
})

app.get('*',(req, res) => {
  res.render('404page',{
    title:"404 page",
    massege:'Page not found'
})
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})