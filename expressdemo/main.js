var express = require('express')
var fs = require('fs')
var app = express()

app.set('view engine','hbs')
//cho phep lay du lieu nguoi dung day len server tu cac input
app.use(express.urlencoded({extended:true}))

app.get('/',function(req,res){
    let n = new Date()
    let name = "Captain Jack"
    let studentFood = []
    fs.readFile("data.txt","utf-8",function(err,data){
        let data2 = data.trim().split('\n')
        for(i=0;i<data2.length;i++){
            let s = data2[i].split(";") // s[0]: ten s[1]:food
            let studentElement = {
                name: s[0],
                food:s[1]
            }
            studentFood.push(studentElement)
        }
        res.render('home',{'studentFood':studentFood})
    })
    //res.render('home',{'now':n,'name':name})
})

app.post('/registerLunch',function(req,res){
    //1.lay thong tin nguoi dung da nhap
    let name = req.body.txtName
    let food = req.body.food
    //2.can ghi vao file
    fs.appendFile('data.txt',name + ';'+ food + "\n",function(){
        console.log("da them moi: " + name + " ;" + food)
    })
    //3.hien thi thong tin dang ky thanh cong
    let userInfo = {
        'name' : name,
        'food': food
    }
    res.render('thank',{'user':userInfo})
})

app.get('/student',function(req,res){
    let foods = ['com','ga','bo','my tom']
    //let food2 = []
    for(i=0;i<foods.length;i++){
       foods[i] = foods[i].toUpperCase()
    }
    res.render('student',{'foods':foods})
})

app.listen(5000)
console.log('server is running!')