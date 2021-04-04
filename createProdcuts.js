const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbname='warehouse'
const url ='mongodb://localhost:27017'

let state ={
    db: null
}
const getDb = ()=>{
    return state.db
}
const options={useNewUrlParser: true,useUnifiedTopology:true}
const getprimaryKey = (_id)=>{
    return ObjectID(_id)
}
if(getDb()==null)
    mongoClient.connect(url,options,(err,client)=>{
        if(err)
            console.log(err);
        else {
            state.db = client.db(dbname)
            createshoes(shoe)
        }
    })


function insert(obj) {
    getDb().collection('products').insertOne(obj)
}

function createshoes(x){
    for(let i=0;i<x.length;i++) {
        console.log(x[i])
        let name = x[i][0]
        let brand = x[i][1]
        let price = x[i][2]
        let shoe_type = x[i][3]
        let currency = x[i][4]
        let type = x[i][5]
        let size = x[i][6]
        let colors = x[i][7]
        let product_details ={
            "Product_dimensions": '23.8cmX10.5cmX11cm',
            "Item_weight": '1.5kg',
            "Manufacturer": 'Puma',
        }
        let rating = x[i][9]
        let s1 = x[i][10]
        let s2 = x[i][11]
        let s3 = x[i][12]
        let s4 = x[i][13]
        let s5 = x[i][14]
        let totreviews = x[i][15]
        let seller=x[i][16]
        let obj = {
            'name': name,
            'brand': brand,
            'price': price,
            'shoe_type': shoe_type,
            'currency': currency,
            'type': type,
            'size': size,
            'colours': colors,
            'details': product_details,
            'rating': rating,
            's1': s1,
            's2': s2,
            's3': s3,
            's4': s4,
            's5': s5,
            'totreview': totreviews,
            'seller':seller
        }
        insert(obj)
    }
}
let shoe =[
    ['RS-Fast Trainers','Puma',Math.floor(Math.random()*10000),'sport','rs','shoe',[8,9,10,11],['red','black','blue'],{'dimensions':'','weight':'','Manufacturer':'Puma'},
    0,0,0,0,0,0,0,'Puma'],
    ['Future Rider Galaxy IMEVA Shoes','Puma',Math.floor(Math.random()*10000),'sport','rs','shoe',[8,9,10,11],['red','black','blue'],{'dimensions':'','weight':'','Manufacturer':'Puma'},
    0,0,0,0,0,0,0,'Puma'],
    ['PUMA x FIRST MILE LQDCELL Method Xtreme Men\'s Training Shoes','Puma',Math.floor(Math.random()*10000),'sport','rs','shoe',[8,9,10,11],['red','black','blue'],{'dimensions':'','weight':'','Manufacturer':'Puma'},
    0,0,0,0,0,0,0,'Puma'],
    ['PUMA x FIRST MILE LQDCELL Method Xtreme Men\'s Training Shoes','Puma',Math.floor(Math.random()*10000),'sport','rs','shoe',[8,9,10,11],['red','black','blue'],{'dimensions':'','weight':'','Manufacturer':'Puma'},
    0,0,0,0,0,0,0,'Puma'],
    ['RS-2K Internet Exploring Sneakers','Puma',Math.floor(Math.random()*10000),'sport','rs','shoe',[8,9,10,11],['red','black','blue'],{'dimensions':'','weight':'','Manufacturer':'Puma'},
    0,0,0,0,0,0,0,'Puma'],
    ['RS-2K Messaging Shoes','Puma',Math.floor(Math.random()*10000),'sneakers','rs','shoe',[8,9,10,11],['red','black','blue'],{'dimensions':'','weight':'','Manufacturer':'Puma'},
    0,0,0,0,0,0,0,'Puma'],
    ['RS-X Prism Shoes','Puma',Math.floor(Math.random()*10000),'sneakers','rs','shoe',[8,9,10,11],['red','black','blue'],{'dimensions':'','weight':'','Manufacturer':'Puma'},
    0,0,0,0,0,0,0,'Puma'],
    ['Performer VTG CMEVA Shoes','Puma',Math.floor(Math.random()*10000),'sneakers','rs','shoe',[8,9,10,11],['red','black','blue'],{'dimensions':'','weight':'','Manufacturer':'Puma'},
    0,0,0,0,0,0,0,'Puma'],
    ['RS-X Japanorama Shoes','Puma',Math.floor(Math.random()*10000),'sneakers','rs','shoe',[8,9,10,11],['red','black','blue'],{'dimensions':'','weight':'','Manufacturer':'Puma'},
    0,0,0,0,0,0,0,'Puma'],
    ['LQDCELL Extol CMEVA Japanorama Shoes','Puma',Math.floor(Math.random()*10000),'sneakers','rs','shoe',[8,9,10,11],['red','black','blue'],{'dimensions':'','weight':'','Manufacturer':'Puma'},
    0,0,0,0,0,0,0,'Puma'],
    ['PUMA x EMOJI RS-2K Sneakers','Puma',Math.floor(Math.random()*10000),'sneakers','rs','shoe',[8,9,10,11],['red','black','blue'],{'dimensions':'','weight':'','Manufacturer':'Puma'},
    0,0,0,0,0,0,0,'Puma'],
    ['Harbour Fashion DP Running Shoes','Puma',Math.floor(Math.random()*10000),'walking','rs','shoe',[8,9,10,11],['red','black','blue'],{'dimensions':'','weight':'','Manufacturer':'Puma'},
    0,0,0,0,0,0,0,'Puma'],
    ['Ember TRL Men\'s Running Shoes','Puma',Math.floor(Math.random()*10000),'walking','rs','shoe',[8,9,10,11],['red','black','blue'],{'dimensions':'','weight':'','Manufacturer':'Puma'},
    0,0,0,0,0,0,0,'Puma'],
    ['PUMA Stamp IDP Flip Flops','Puma',Math.floor(Math.random()*10000),'flip flops','rs','shoe',[8,9,10,11],['red','black','blue'],{'dimensions':'','weight':'','Manufacturer':'Puma'},
    0,0,0,0,0,0,0,'Puma'],
    ['Flip X2 IDP Flip Flops','Puma',Math.floor(Math.random()*10000),'flip flops','rs','shoe',[8,9,10,11],['red','black','blue'],{'dimensions':'','weight':'','Manufacturer':'Puma'},
    0,0,0,0,0,0,0,'Puma'],
    ['Maystar V2 IDP Flip Flops','Puma',Math.floor(Math.random()*10000),'flip flops','rs','shoe',[8,9,10,11],['red','black','blue'],{'dimensions':'','weight':'','Manufacturer':'Puma'},
    0,0,0,0,0,0,0,'Puma'],
    ['Flip X2 IDP Flip Flops','Puma',Math.floor(Math.random()*10000),'flip flops','rs','shoe',[8,9,10,11],['red','black','blue'],{'dimensions':'','weight':'','Manufacturer':'Puma'},
    0,0,0,0,0,0,0,'Puma'],
    ['UltraRide ProFoam Men\'s Running Shoes','Puma',Math.floor(Math.random()*10000),'running','rs','shoe',[8,9,10,11],['red','black','blue'],{'dimensions':'','weight':'','Manufacturer':'Puma'},
    0,0,0,0,0,0,0,'Puma'],
    ['SOFTRIDE Rift Men\'s Running Shoes','Puma',Math.floor(Math.random()*10000),'running','rs','shoe',[8,9,10,11],['red','black','blue'],{'dimensions':'','weight':'','Manufacturer':'Puma'},
    0,0,0,0,0,0,0,'Puma'],
    ['PUMA Spike 19.2 Men\'s Cricket Boots','Puma',Math.floor(Math.random()*10000),'running','rs','shoe',[8,9,10,11],['red','black','blue'],{'dimensions':'','weight':'','Manufacturer':'Puma'},
    0,0,0,0,0,0,0,'Puma'],
    ['SOFTRIDE Rift Men\'s Running Shoes','Puma',Math.floor(Math.random()*10000),'running','rs','shoe',[8,9,10,11],['red','black','blue'],{'dimensions':'','weight':'','Manufacturer':'Puma'},
    0,0,0,0,0,0,0,'Puma'],
    ['PUMA x one8 Virat Kohli SOFTRIDE Rift Tech Shoes','Puma',Math.floor(Math.random()*10000),'running','rs','shoe',[8,9,10,11],['red','black','blue'],{'dimensions':'','weight':'','Manufacturer':'Puma'},
    0,0,0,0,0,0,0,'Puma'],
    ['NRGY Star New Core Running Shoes','Puma',Math.floor(Math.random()*10000),'running','rs','shoe',[8,9,10,11],['red','black','blue'],{'dimensions':'','weight':'','Manufacturer':'Puma'},
    0,0,0,0,0,0,0,'Puma'],
    ['NRGY Star New Core Running Shoes','Puma',Math.floor(Math.random()*10000),'running','rs','shoe',[8,9,10,11],['red','black','blue'],{'dimensions':'','weight':'','Manufacturer':'Puma'},
    0,0,0,0,0,0,0,'Puma'],
]

function createearphones(){

}
