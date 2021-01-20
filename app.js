const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb://localhost:27017/jwt';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/tickets', requireAuth, (req, res) => res.render('tickets'));
app.get('/addTicket',(req,res) => {
  res.render('addTicket')
});
app.post('/addTicket',(req,res)=>{
  let data = {
    title:req.body.title,
    description:req.body.description,
    status:req.body.status
  }
  console.log(data);
})
app.use(authRoutes);