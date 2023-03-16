const express = require("express");
const path = require("path");
const bodyParser = require("body-parser"); 
const app = express();
const port = 80;

const mongoose = require('mongoose');
main().catch(err => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contact_form_dance');
}

// Define Mongoose schema
const formSchema = new mongoose.Schema({
    Name: String,
    phone: Number,
    email: String,
    address: String,
    concerns: String,
});
// Compiling our schema into model
const contact = mongoose.model('contact', formSchema);

app.use('/static' , express.static('static')); // to serve static files

app.set('view engine' , 'pug');
app.set('views', path.join(__dirname , 'views'));

// END-POINTS
app.get('/' , (req,res)=>{
    const params = {};
    res.status(202).render('home.pug', params );
})
app.get('/contact' , (req,res)=>{
    const params = {};
    res.status(200).render('contact.pug', params );
})
app.post('/contact' , (req,res)=>{
    // const params = {};
    const myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("Item could not be saved");
    });
    // res.status(200).render('contact.pug');
});

//LISTEN THE SERVER
app.listen(port , ()=>{
    console.log(`The application started successfully on port ${port}`);
});