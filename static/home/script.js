let sort=0,price=1,star=0
let userdetails={'name':0,'userid':0}
let popup=0,showing=0
document.getElementById('home').style.color ='#FFA000'
inituserdetails()
console.log('home')
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
        document.getElementById('search-clear').className = 'fal fa-times cursor'
        showsearch(e.target.value)
    }
    else{
        document.getElementById('search-clear').className = 'fal fa-search'
        clearsearch()
    }
}
document.getElementById('search-clear').onclick = ()=>{
    document.getElementById('search-input').value =''
    document.getElementById('search-clear').className = 'fal fa-search'
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


