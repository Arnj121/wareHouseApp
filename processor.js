const db= require('./db')
const home =(req,res)=>{

}
const cart = (req,res)=> {
    db.getDb().collection('users').findOne({'userid': req.query.userid},async (err, result) => {
        let x =result.cart
        res.send({0:x})
    })
}
const orders = (req,res)=>{
    let userid = req.query.userid
    console.log(userid)
    db.getDb().collection('users').findOne({'userid':userid},(err,result)=>{
        res.send({0:result.orders})
    })
}
const payment = (req,res)=>{
    db.getDb().collection('users').findOne({'userid': req.query.userid},(err, result) => {
        res.send({0:result.payments})
    })
}
const address = (req,res)=>{
    let responseJson ={}
    db.getDb().collection('users').findOne({'userid':req.query.userid},(err,result)=>{
        if(result.address.length==0)
            responseJson[0] = []
        else
            responseJson[0] = result.address
        res.send(responseJson)
    })
}

const login = (req,res)=>{
    let email = req.body.email
    let password = req.body.password
    db.getDb().collection('users').findOne({'email':email,'password':password},(err,result)=>{
        if(result['userid']){
            res.send({'status':1,'name':result.name,'userid':result.userid})
        }
        else{
            res.send({'status':0})
        }
    })
}
const signup =(req,res)=>{
    let email = req.body.email
    let password = req.body.password
    let name = req.body.name
    let userid = Math.floor(Math.random()*1000)+'userid'
    db.getDb().collection('users').insertOne({'email':email,'name':name
    ,'password':password,'userid':userid})
    res.send({'status':1,'userid':userid})
}

const addpaymentmethod = (req,res)=>{
    let type=req.body.type
    if(type =='credit'||type == 'debit') {
        let d1 = req.body.d1
        let d2 = req.body.d2
        let d3 = req.body.d3
        let d4 = req.body.d4
        let d = d1.toString() + d2.toString() + d3.toString() + d4.toString()
        let dcvv = req.body.dcvv
        let dexp = req.body.dexp
        let userid = req.body.userid
        let name = req.body.name
        db.getDb().collection('users').findOneAndUpdate({'userid':userid},{$push:{'payments':{
            'cardno': d, 'cvv': dcvv, 'exp': dexp
            , 'name': name, 'type': type}}})
        res.send('done')
    }
    else{
        let userid = req.body.userid
        let name = req.body.name
        db.getDb().collection('users').findOneAndUpdate({'userid':userid},{$push:{'payments':{'name':name,'type':type}}})
    }
}
const addaddress = (req,res)=>{
    let houseno=req.body.houseno
    let street = req.body.street
    let landmark = req.body.landmark
    let address = req.body.address
    let pincode = req.body.pincode
    let tel = req.body.tel
    let userid=req.body.userid
    db.getDb().collection('users').findOneAndUpdate({'userid':userid},{$push:{'address':{
        'houseno':houseno,'street':street,'landmark':landmark,'address':address,'pincode':pincode,'tel':tel
            }}})
    res.send('done')
}
const readshoes = (req,res)=>{
    let id= req.params.id
    db.getDb().collection('products').findOne({'_id':db.getprimaryKey(id)},(err,result)=>{
        res.render('shoe_view',{result})
    })
}
const search=(req,res)=>{
    let s = req.query.s
    let responseJson = []
    let x = new RegExp(s,'i')
    db.getDb().collection('products').find({$or:[{'name':{$regex:x}},{'type':{$regex:x}},{'brand':{$regex:x}},{'shoe_type':{$regex:x}}]}).toArray((req,result)=>{
        for(let i=0;i<result.length;i++) {
            responseJson.push({'name':result[i].name,'type':result[i].type,'id':result[i]._id})
            if(i==10)
                break
        }
        res.send({0:responseJson})
    })
}
const addtocart=(req,res)=>{
    let id = req.body.id
    let userid = req.body.userid
    db.getDb().collection('users').findOne({'userid':userid},(err,result)=>{
        let cart = result.cart
        if(!cart.includes(id)) {
            db.getDb().collection('users').findOneAndUpdate({'userid': userid},
                {
                    $push: {'cart': id}
                })
            res.send('done')
        }
        else{
            res.send('error')
        }
    })

}
const addtocartlist= (req,res)=>{
    let id = req.body.id
    let userid = req.body.userid
    db.getDb().collection('users').findOne({'userid':userid},(err,result)=>{
        let w = result.cart
        if(!w.includes(id)){
            db.getDb().collection('users').findOneAndUpdate({'userid':userid},
                {$push:{'cart':id}})
            res.send('done')
        }
        else
            res.send('error')
    })
}
const getproductdetails = (req,res)=>{
    db.getDb().collection('products').findOne({_id:db.getprimaryKey(req.query.id)},(err,result)=>{
        res.send({'name':result.name,'id':result._id,'type':result.type})
    })
}
const removecart =(req,res)=>{
    let id = req.body.id
    let userid = req.body.userid
    db.getDb().collection('users').findOne({'userid':userid},(err,result)=>{
        let x = result.cart
        let y = x.slice(0,x.indexOf(id)).concat(x.slice(x.indexOf(id)+1,x.length-1))
        db.getDb().collection('users').findOneAndUpdate({'userid':userid},{$set:{'cart':y}})
        res.send('done')
    })
}
const buynow = (req,res)=>{
    let userid = req.params.userid
    let prodid = req.params.prodid
    db.getDb().collection('users').findOne({'userid':userid},(ree,result)=>{
        let p = result.payments
        let a = result.address
        db.getDb().collection('products').findOne({'_id':db.getprimaryKey(prodid)},(err,result)=>{
            res.render('buynow',{'payment':p,'address':a,'name':result.name,'brand':result.brand,'seller':result.seller,'price':result.price,
                'currency':result.currency,'rating':result.rating,'color':result.colours,'size':result.size,'id':result._id,'type':result.type})
        })
    })
}
const placeorder = (req,res)=>{
    let userid = req.body.userid
    let prodid =req.body.prodid
    let cvv = req.body.cvv
    let curcolor=req.body.color
    let size = req.body.size.slice(4,)
    let cardno = req.body.cardno
    let address=req.body.address
    let type=req.body.type
    let flag=0
    console.log(userid,prodid,cvv,curcolor,size,cardno,address,type)
    db.getDb().collection('users').findOne({'userid':userid},(err,result)=>{
        let p = result.payments
        for(let i=0;i<p.length;i++){
            if(p[i]['cardno'].slice(12,)==cardno){
                if(p[i]['cvv']==cvv){
                    flag=1
                    break
                }
            }
        }
        if(flag){
            db.getDb().collection('orders').insertOne({'userid':userid,'prodid':prodid,'color':curcolor,'size':size,'paid':cardno,'address':address,'type':type},(req,result)=>{
                db.getDb().collection('users').findOneAndUpdate({'userid':userid},{$push:{'orders':result.insertedId.toString()}})
                res.send(result.insertedId.toString())
            })
        }
        else{
            res.send('error')
        }
    })
}
const cancelorder =(req,res)=>{
    let orderid=req.query.orderid
    let userid = req.query.userid
    db.getDb().collection('users').findOne({'userid':userid},(err,result)=>{
        let o = result.orders
        o = o.slice(0,o.indexOf(orderid)).concat(o.slice(o.indexOf(orderid)+1,o.length-1))
        db.getDb().collection('users').findOneAndUpdate({'userid':userid},{
            $set:{'orders':o}
        })
        db.getDb().collection('orders').deleteOne({'_id':db.getprimaryKey(orderid)})
        res.send('done')
    })
}
const orderdetails = (req,res)=>{
    let orderid = req.query.orderid
    console.log(orderid,1)
    db.getDb().collection('orders').findOne({'_id':db.getprimaryKey(orderid)},(err,result)=>{
        console.log(result,1)
        db.getDb().collection('products').findOne({'_id':db.getprimaryKey(result.prodid)},(err,result1)=>{
            res.send({'name':result1.name,'id':result1._id,'type':result1.type,'deliver':result.address})
        })
    })
}
module.exports = {home,cart,orders,addtocart,addtocartlist,removecart,payment,address,login,getproductdetails,signup,
    buynow,addpaymentmethod,addaddress,readshoes,search,placeorder,cancelorder,orderdetails}
