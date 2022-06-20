var express = require('express')
var session = require('express-session')
var app = express()

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret: 'my secrete !*&%$%^$%#&^%$$%#%',
    resave: false
}))

app.post('/register',(req,res)=>{
    let name = req.body.txtName
    req.session.userName = name
    res.render('profile',{'name': req.session.userName})
})

app.get('/profile',(req,res)=>{
    let chuaDangNhap = !req.session.userName
    res.render('profile',{'name': req.session.userNamem,'chuaDangNhap':chuaDangNhap})
})
app.get('/',(req,res)=>{
    let accessCount = req.session.accessCount || 0
    accessCount++
    req.session.accessCount = accessCount
    let chuaDangNhap = !req.session.userName
    res.render('home',{'accessCount':accessCount,'chuaDangNhap':chuaDangNhap,'DangNhap':DangNhap})
})
//dbo.collection("user").find({})
app.get('/')
const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Sever is running!')