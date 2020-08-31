const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true , useUnifiedTopology: true });
// getting-started.js

const port = 8000;

//Define Mongoose schema 
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  Email: String,
  Address: String,
  desc: String,
});

const contact = mongoose.model('Contact', contactSchema);


//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))//Setting template engine as pug 
app.use(express.urlencoded())
//PUG SPECIFIC STUFF
app.set('view engine' , 'pug')//Setting template engine as pug 
app.set('views' , path.join( __dirname ,'views'));//Set the view directory

 
//END POINTS
app.get( '/',(req , res )=>{
  
  const params = {};
  res.status(200).render(`home.pug` , params);
})
app.get( '/contact',(req , res )=>{
  
  const params = {};
  res.status(200).render(`contact.pug` , params);
})
app.post( '/contact',(req , res )=>{
  var myData = new contact(req.body);
  myData.save().then(() => {
    res.send("This Data has been saved  successfully  ")
  }).catch (() => {
    res.status(400).send("The Data has been not saved successfully")
  });
  // res.status(200).render(`contact.pug` );
})
//START THE SERVER
app.listen(port, () => {
    console.log(`The app is running succesfully on port ${port}`);
 })