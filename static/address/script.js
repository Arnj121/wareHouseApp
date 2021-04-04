let sort=0,price=1,star=0
let userdetails={'name':0,'userid':0}
let popup=0
let addressc=1
document.getElementById('address').style.color ='#FFA000'
inituserdetails()
initaddress()
console.log('address')
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
    else{
        document.getElementById('signin-warning').innerText = 'Sign out'
        document.getElementById('username').innerText = userdetails['name']
    }
}
document.getElementById('search-input').oninput = (e)=>{
    if(e.target.value.length == 0){
        document.getElementById('search-clear').className = 'fal fa-search'
        showsearch(e.target.value)
    }
    else{
        document.getElementById('search-clear').className = 'fal fa-times cursor'
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
    window.location.assign(`http://store.warehouse.com:2000/`)
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

function initaddress() {
    let xhr=new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if(xhr.readyState==4){
            let res = JSON.parse(xhr.response)[0]
            createpartition()
            createAddresslabel()
            createnewaddress()
            if(res.length>0){
                for(let i=0;i<res.length;i++){
                    createaddressobj(res[i])
                }
            }
        }
    }
    xhr.open('GET',`http://localhost:2000/getaddress?userid=${userdetails['userid']}`)
    xhr.send()
}

function createpartition() {
    let part1 = document.createElement('div')
    let part2 = document.createElement('div')
    part1.style.width='40%'
    part2.style.width = '58%'
    part2.style.display = 'flex'
    part2.style.flexDirection='column'
    part2.style.borderStyle = 'solid'
    part2.style.borderWidth = '0 0 0 thin'
    part2.style.borderColor = '#d1d1d0'
    part1.id='part1'
    part2.id='part2'
    document.getElementById('container-lvl2').append(part1,part2)
}

function createAddresslabel() {
    let div = document.createElement('div')
    let lbl = document.createElement('label')
    let lblicon = document.createElement('i')

    div.style.margin = '20px auto'
    lbl.innerText = 'Address Book'
    lbl.style.fontSize = 'x-large'
    lblicon.className = 'fal fa-address-book'
    lblicon.style.marginRight='15px'
    lblicon.style.transform = 'scale(1.5)'
    div.append(lblicon,lbl)
    document.getElementById('part2').append(div)
}

function createaddressobj(obj){
    let houseno = obj.houseno
    let street = obj.street
    let landmark = obj.landmark
    let address =  obj.address
    let pin =obj.pincode
    let tel = obj.tel
    let div = document.createElement('div')
    div.className = 'address-obj'

    let addlbl = document.createElement('label')
    addlbl.innerText = 'Address '+ addressc.toString()+'#'
    addressc+=1
    addlbl.style.fontWeight='bold'
    addlbl.style.fontSize = 'large'
    addlbl.style.margin = '5px 0'
    div.style.margin ='20px auto'

    let lbl= document.createElement('label')
    lbl.innerText = houseno+ ' ' + address+ ', ' + street + ', '+ landmark + ', '+pin

    let lbl1 = document.createElement('label')
    lbl1.innerText = 'tel : ' + tel

    div.append(addlbl,lbl,lbl1)
    document.getElementById('part2').append(div)

}

function createnewaddress() {
    let div = document.createElement('div')
    div.className = 'addaddress-obj'
    let lbl = document.createElement('label')
    lbl.innerHTML="<i class='fal fa-plus' style='margin-right: 10px;'></i>Add Address"
    lbl.style.marginLeft = '10px'
    lbl.style.borderWidth='thin'
    lbl.style.borderStyle='solid'
    lbl.style.borderColor = '#37474F'
    lbl.style.textAlign ='center'
    lbl.style.color = 'white'
    lbl.style.padding='10px 20px'
    lbl.style.borderRadius='50px'
    lbl.style.marginBottom = '20px'
    lbl.style.backgroundColor = '#37474F'

    let houselbl = document.createElement('label')
    let houseinput = document.createElement('input')
    houseinput.type = 'text'
    houseinput.placeholder = 'House #no'
    houseinput.id='houseno'
    let hicon = document.createElement('i')
    hicon.className='fal fa-house-user'
    hicon.style.marginLeft='-30px'
    houselbl.append(houseinput,hicon)

    let streetlbl = document.createElement('label')
    let street =document.createElement('input')
    street.type= 'text'
    street.placeholder = 'Street'
    street.id='street'
    let sticon = document.createElement('i')
    sticon.className = 'fal fa-street-view'
    sticon.style.marginLeft = '-30px'
    streetlbl.append(street, sticon)

    let landmarklbl=document.createElement('label')
    let landmark = document.createElement('input')
    landmark.placeholder = 'Landmark'
    landmark.type ='text'
    landmark.id='landmark'
    let laicon = document.createElement('i')
    laicon.className = 'fal fa-landmark'
    laicon.style.marginLeft='-30px'
    landmarklbl.append(landmark,laicon)

    let addresslbl=document.createElement('label')
    let address = document.createElement('input')
    address.id='addressinp'
    address.type ='text'
    address.placeholder = 'Address'
    let adicon = document.createElement('i')
    adicon.className = 'fal fa-location'
    adicon.style.marginLeft = '-30px'
    addresslbl.append(address,adicon)

    let pincode = document.createElement('input')
    pincode.type = 'number'
    pincode.id = 'pincode'
    pincode.placeholder='Zip code'

    let telelbl = document.createElement('label')
    let tel = document.createElement('input')
    tel.type = 'tel'
    tel.placeholder ='Tel'
    tel.id='tel'
    let teicon = document.createElement('i')
    teicon.className = 'fal fa-mobile'
    teicon.style.marginLeft = '-30px'
    telelbl.append(tel,teicon)

    let addlbl = document.createElement('label')
    addlbl.className = 'cursor'
    addlbl.style.borderColor = '#d1d1d0'
    addlbl.style.borderWidth = 'thin'
    addlbl.style.borderStyle = 'solid'
    addlbl.style.borderRadius = '5px'
    addlbl.style.padding = '5px 20px'
    addlbl.style.textAlign = 'center'
    let add = document.createElement('label')
    add.innerText = 'Add'
    add.className = 'cursor'
    add.id = 'add-address'
    let addicon =document.createElement('i')
    addicon.className = 'fal fa-plus'
    addicon.style.marginRight = '10px'
    add.onclick = addlbl.onclick = ()=>{
        let houseno = document.getElementById('houseno').value
        let street = document.getElementById('street').value
        let landmark = document.getElementById('landmark').value
        let address = document.getElementById('addressinp').value
        let pincode = document.getElementById('pincode').value
        let tel = document.getElementById('tel').value
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if(xhr.readyState==4){
                console.log(xhr.response)
                document.getElementById('address').click()
            }
        }
        xhr.open('POST','http://localhost:2000/addaddress')
        xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8')
        xhr.send(JSON.stringify({
            'houseno':houseno,'street':street,'landmark':landmark,
            'address':address,'pincode':pincode,'tel':tel,'userid':userdetails['userid']
        }))
    }
    addlbl.append(addicon,add)

    div.append(lbl,houselbl,streetlbl,landmarklbl,addresslbl,pincode,telelbl,addlbl)
    document.getElementById('part1').append(div)

}

function showsearch() {
    
}
function clearsearch() {
    
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


