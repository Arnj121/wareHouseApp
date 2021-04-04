let sort=0,price=1,star=0
let userdetails={'name':0,'userid':0}
let popup=0,showing=0
inituserdetails()
initcart()
console.log('cart')
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

function f() {
    
}
function initcart() {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if(xhr.readyState==4){
            console.log(xhr.response)
            let res = JSON.parse(xhr.response)[0]
            if(res.length!=0) {
                for(let i=0;i<res.length;i++){
                    let xhr = new XMLHttpRequest()
                    xhr.onreadystatechange = function () {
                        if(xhr.readyState ==4){
                            createWishlistObj(JSON.parse(xhr.response))
                        }
                    }
                    xhr.open('GET',`http://localhost:2000/getproductdetails?id=${res[i]}`)
                    xhr.send()
                }
            }
        }
    }
    xhr.open('GET',`http://localhost:2000/getcart?userid=${userdetails['userid']}`)
    xhr.send()
}
function createWishlistObj(obj){
    let div = document.createElement('div')
    let name = document.createElement('label')
    let img = document.createElement('i')
    img.className = 'fal fa-image fa-10x'
    img.style.gridArea = '1/1/span 2/1'
    name.innerText = obj.name
    img.style.margin ='auto'
    name.style.gridArea = '1/2/1/2'
    div.className = 'wishlistobj'
    name.style.margin = 'auto'
    let trans = document.createElement('div')
    trans.className ='trans cursor'
    let remove = document.createElement('label')
    remove.innerText='Delete'
    remove.className='cursor'
    remove.style.paddingTop='5px'
    remove.style.textAlign = 'center'
    remove.style.fontSize = 'large'
    remove.style.fontWeight = 'bold'
    remove.style.backgroundColor = '#CFD8DC'
    remove.style.color='#263238'
    remove.style.paddingTop='10px'
    remove.style.gridArea = '3/1/3/2'
    remove.id = obj.id+'remove'
    remove.onclick = (e)=>{
        let x = e.target.id.slice(0,-5)
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if(xhr.readyState==4){
                console.log(xhr.response)
                displaypopup('Item removed from cart')
                document.getElementById('container-lvl2').removeChild(document.getElementById(e.target.id).parentElement)
            }
        }
        xhr.open('DELETE',`http://localhost:2000/removecart`)
        xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8')
        xhr.send(JSON.stringify({'userid':userdetails['userid'],'id':x}))
    }
    trans.id = obj.id+'!!'+obj.type
    trans.onclick =(e)=>{
        let x = e.target.id.split('!!')
        window.location.assign(`http://store.warehouse.com:2000/${x[1]}s/${x[0]}`)
    }
    let buynow = document.createElement('label')
    buynow.innerText = 'Buy now'
    buynow.className='cursor'
    buynow.style.paddingTop='5px'
    buynow.style.textAlign = 'center'
    buynow.style.fontSize = 'large'
    buynow.style.fontWeight = 'bold'
    buynow.style.backgroundColor = '#ECEFF1'
    buynow.style.color='#263238'
    buynow.style.gridArea = '3/2/3/span 2'
    buynow.id = obj.id+'buynow'
    buynow.style.paddingTop = '10px'
    buynow.style.borderRadius = '0 0 5px 0'
    remove.style.borderRadius = '0 0 0 5px'
    buynow.onclick = (e)=>{
        let x = e.target.id.slice(0,-6)
        window.location.assign(`http://store.warehouse.com:2000/buy_now/${userdetails['userid']}/${x}`)
    }
    div.append(name,img,trans,remove,buynow)
    document.getElementById('container-lvl2').append(div)
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


