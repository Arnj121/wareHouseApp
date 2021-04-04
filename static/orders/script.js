let sort=0,price=1,star=0
let userdetails={'name':0,'userid':0}
let popup=0,showing=0
document.getElementById('orders').style.color ='#FFA000'
inituserdetails()
initOrders()
console.log('orders')
function inituserdetails(){
    let cookies = document.cookie
    cookies  = cookies.split(';')
    for(let i=0;i<cookies.length;i++){
        let v = cookies[i].split('=')
        let key =v[0].replaceAll(' ','')
        if(key == 'name') userdetails['name'] = v[1]
        if(key == 'userid') userdetails['userid'] = v[1]
    }
    console.log(userdetails)
    if(userdetails['name']==0){
        document.getElementById('signin-warning').innerText = 'Sign In'
    }
    else {
        document.getElementById('signin-warning').innerText = 'Sign out'
        document.getElementById('username').innerText =userdetails['name']
    }
}
document.getElementById('search-input').oninput = (e)=>{
    if(e.target.value.length > 1){
        clearsearch()
        document.getElementById('search-clear').className = 'fas fa-search'
        showsearch(e.target.value)
    }
    else{
        document.getElementById('search-clear').className = 'fas fa-times cursor'
        clearsearch()
    }
}
document.getElementById('search-clear').onclick = ()=>{
    document.getElementById('search-input').value =''
    document.getElementById('search-clear').className = 'fas fa-search'
}
document.getElementById('signin-warning').onclick =()=>{
    window.location='http://store.warehouse.com:2000/login'
}

document.getElementById('cart').onclick = ()=>{
    showcart()
}
document.getElementById('settings').onclick = ()=>{
    showsettings()
}


document.getElementById('home').onclick = ()=>{
    showhome()
}
document.getElementById('orders').onclick = ()=>{
    showorders()
}

document.getElementById('payment').onclick = ()=>{
    showpayment()
}
document.getElementById('address').onclick = ()=>{
    showaddress()
}

function showhome() {
    window.location.assign(`http://store.warehouse.com:2000`)
}

function showorders() {
    window.location.assign(`http://store.warehouse.com:2000/orders?userid=${userdetails['userid']}`)
}
function showpayment() {
    window.location.assign(`http://store.warehouse.com:2000/payments?userid=${userdetails['userid']}`)
}
function showaddress() {
    window.location.assign(`http://store.warehouse.com:2000/address?userid=${userdetails['userid']}`)
}

function showsearch(s) {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if(xhr.readyState==4){
            console.log(xhr.response)
            let res = JSON.parse(xhr.response)[0]
            if(res.length>0){
                showing=1
                for(let i=0;i<res.length;i++){
                    let ele = document.createElement('div')
                    ele.innerText = res[i]['name']
                    ele.onclick = (e)=>{
                        let x = e.target.id.split('!!')
                        window.location.assign(`http://store.warehouse.com:2000/${x[1]}/${x[0]}`)
                    }
                    ele.id=res[i]['id']+'!!'+res[i]['type']
                    ele.className='search-obj'
                    document.getElementById('search-results').append(ele)
                }
                document.getElementById('search-results').style.display = 'flex'
            }
        }
    }
    xhr.open('GET',`http://localhost:2000/s?s=${s}`)
    xhr.send()
}
function clearsearch() {
    document.getElementById('search-div').removeChild(document.getElementById('search-results'))
    let ele = document.createElement('div');ele.id='search-results'
    document.getElementById('search-div').append(ele)
}

function showcart() {
    window.location.assign(`http://store.warehouse.com:2000/cart?userid=${userdetails['userid']}`)
}

function showsettings() {
    
}

function initOrders() {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if(xhr.readyState==4){
            let r = JSON.parse(xhr.response)[0]
            if(r.length>0){
                for(let i=0;i<r.length;i++){
                    let xhr1 = new XMLHttpRequest()
                    xhr1.onreadystatechange = function () {
                        if(xhr1.readyState==4){
                            let s = JSON.parse(xhr1.response)
                            createorderObj({'id':s.id,'orderid':r[i],'name':s.name,'type':s.type,'address':s.deliver})
                        }
                    }
                    xhr1.open('GET',`http://localhost:2000/getorderdetails?orderid=${r[i]}`)
                    xhr1.send()
                }
            }
            else{
                let ele = document.createElement('label')
                ele.style.margin = 'auto'
                ele.innerText = 'No Orders'
                ele.style.fontSize='larger'
                document.getElementById('container-lvl2').append(ele)
            }
        }
    }
    xhr.open('GET',`http://localhost:2000/getorders?userid=${userdetails['userid']}`)
    xhr.send()
}
function createorderObj(obj) {
    console.log(obj)
    let div = document.createElement('div')
    div.className = 'orderobj'
    let trans = document.createElement('div')
    trans.className = 'trans cursor'
    trans.id = obj.id+'!!'+obj.type
    let img = document.createElement('i')
    img.className = 'fal fa-image fa-7x'
    img.style.gridArea = '1/1/span 2/ span 2'
    img.style.margin = 'auto'

    let name = document.createElement('label')
    name.innerText= obj.name
    name.style.gridArea = '1/3/span 2/span 2'
    name.style.wordBreak='break-all'
    name.style.margin = 'auto'
    name.style.fontSize ='larger'

    let address = document.createElement('label')
    address.innerText = 'deliver to : \n'+obj.address
    address.style.gridArea = '3/3/3/span 2'
    address.style.wordBreak = 'break-all'

    let cancel = document.createElement('label')
    cancel.style.gridArea='4/4/4/4'
    cancel.style.margin = 'auto'
    cancel.id=obj.id+'!!'+obj.type+'!!'+obj.orderid
    cancel.innerText = 'Cancel'
    cancel.className ='cursor'
    trans.onclick = (e)=>{
        let x = e.target.id.split('!!')
        window.location.assign(`http://store.warehouse.com:2000/${x[1]}/${x[0]}`)
    }
    cancel.onclick = (e)=>{
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if(xhr.readyState == 4){
                console.log(xhr.response)
                document.getElementById('container-lvl2').removeChild(document.getElementById(e.target.id.split('!!')[0]+'!!'+e.target.id.split('!!')[1]).parentElement )
            }
        }
        xhr.open('DELETE',`http://localhost:2000/cancelorder?orderid=${e.target.id.split('!!')[2]}&userid=${userdetails['userid']}`)
        xhr.send()
    }
    div.append(img,name,cancel,trans,address)
    document.getElementById('container-lvl2').append(div)
}

function f() {
    
}

function displaypopup(msg) {
    if(popup==1){
        popup=0
        displaypopup(msg)
    }
    else{
        popup=1
        document.getElementById('msg').innerText=msg
        document.getElementById('pop-up').style.animationName = 'showpopup'
        setTimeout(()=>{
            document.getElementById('pop-up').style.animationName = 'hidepopup'
        },3000)
    }
}


