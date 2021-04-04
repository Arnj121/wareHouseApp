const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')


const processor = require('./processor')

const app = express()
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'static')))
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'static','home','index.html'))

})
app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'static','login','index.html'))
})

app.get('/wishlist',(req,res)=>{
    res.sendFile(path.join(__dirname,'static','wishlist','index.html'))
})
app.get('/orders',(req,res)=>{
    res.sendFile(path.join(__dirname,'static','orders','index.html'))
})
app.get('/payment',(req,res)=>{
    res.sendFile(path.join(__dirname,'static','payment','index.html'))
})
app.get('/address',(req,res)=>{
    res.sendFile(path.join(__dirname,'static','address','index.html'))
})
app.get('/buy_now/:userid/:prodid',processor.buynow)

app.get('/getaddress',processor.address)
app.get('/getpayment',processor.payment)
app.get('/getcart',processor.cart)
app.get('/getorders',processor.orders)
app.post('/login',processor.login)
app.post('/signup',processor.signup)
app.post('/addpaymentmethod',processor.addpaymentmethod)
app.post('/addaddress',processor.addaddress)
app.get('/s',processor.search)
app.get('/shoe/:id',processor.readshoes)
app.post('/addtocartlist',processor.addtocartlist)
app.post('/addtocart',processor.addtocart)
app.get('/getproductdetails',processor.getproductdetails)
app.delete('/removecart',processor.removecart)
app.post('/placeorder',processor.placeorder)
app.delete('/cancelorder',processor.cancelorder)
app.get('/getorderdetails',processor.orderdetails)
app.listen(2000,()=>{
    console.log('we are live')
})
