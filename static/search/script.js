let sort=0,price=1,star=0
let userdetails={'name':0,'userid':0}
let currentAdd=0
let popup=0
let addressc=1
let debitids =['debit1','debit2','debit3','debit4','debitcvv','dmonth','dyear']
let creditids = ['credit1','credit2','credit3','credit4','creditcvv','cmonth','cyear']
let dn=0,cn=0
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
    if(e.target.value.length == 0){
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

document.getElementById('sort').onclick = ()=> {
    if (sort == 0) {
        document.getElementById('sort-price').style.display = 'block'
        document.getElementById('sort-star').style.display = 'block'
        sort=1
        document.getElementById('sort').style.backgroundColor = '#263238'
        document.getElementById('sort-circle').style.color='white'
        document.getElementById('sort').style.color ='white'
    }
    else {
        sort =0
        document.getElementById('sort-price').style.display = 'none'
        document.getElementById('sort-star').style.display = 'none'
        document.getElementById('sort').style.backgroundColor = 'whitesmoke'
        document.getElementById('sort-circle').style.color='#263238'
        document.getElementById('sort').style.color ='#263238'
    }
}

document.getElementById('sort-price').onclick = ()=>{
    if(price==0){
        price=1
        document.getElementById('sort-price-icon').className='fas fa-sort-up'
    }
    else{
        price=0
        document.getElementById('sort-price-icon').className = 'fas fa-sort-down'
    }
}
document.getElementById('sort-star').onclick = ()=>{
    if(star==0){
        document.getElementById('sort-star-icon').className='fas fa-sort-up'
        star=1
    }
    else{
        document.getElementById('sort-star-icon').className='fas fa-sort-down'
        star=0
    }
}

document.getElementById('home').onclick = ()=>{
    showhome()
}
document.getElementById('orders').onclick = ()=>{
    showorders()
}
document.getElementById('wishlist').onclick = ()=>{
    showwishlist()
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
function showwishlist() {
    window.location.assign(`http://store.warehouse.com:2000/wishlist?userid=${userdetails['userid']}`)
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

function createpartition() {
    let part1 = document.createElement('div')
    let part2 = document.createElement('div')
    part1.style.width='30%'
    part2.style.width = '70%'
    part2.style.display = 'flex'
    part2.style.flexDirection='column'
    part1.id='part1'
    part2.id='part2'
    document.getElementById('container-lvl2').append(part1,part2)
}
function createPaymentlabel() {
    let div = document.createElement('div')
    let lbl = document.createElement('label')
    let lblicon = document.createElement('i')

    div.style.margin = '20px auto'
    lbl.innerText = 'Cards'
    lbl.style.fontSize = 'x-large'
    lblicon.className = 'far fa-credit-card'
    lblicon.style.marginRight='15px'

    div.append(lblicon,lbl)
    document.getElementById('part2').append(div)
}
function createpaymentobj(obj) {
    if(obj.type == 'debit' || obj.type == 'credit') {
        console.log(obj)
        let ele = document.createElement('div')
        ele.className = 'payment-obj'
        let name = obj.name
        let cardno = obj.cardno
        let exp = obj.exp
        let type = obj.type

        let namelbl = document.createElement('label')
        let cardnolbl = document.createElement('cardno')
        let explbl = document.createElement('label')
        let typelbl = document.createElement('label')

        namelbl.innerText = name
        cardnolbl.innerHTML = `<b>${cardno.slice(0,4)} ${cardno.slice(4,8)} ${cardno.slice(8,12)} ${cardno.slice(12,)}</b>`
        explbl.innerText = exp
        typelbl.innerHTML = type.toUpperCase()+' card' + "<i class='far fa-credit-card' style='transform: scale(1);margin-left: 10px'></i>"

        typelbl.style.gridArea = '1/1/1/span 2'
        namelbl.style.gridArea = '2/1/2/2'
        cardnolbl.style.gridArea='3/1/3/span 2'
        explbl.style.gridArea = '4/2/4/3'

        typelbl.style.margin = 'auto 0'
        namelbl.style.margin = 'auto'
        cardnolbl.style.margin = 'auto'
        explbl.style.margin = 'auto'

        explbl.style.fontFamily = cardnolbl.style.fontFamily = 'monospace'
        explbl.style.fontSize = cardnolbl.style.fontSize = 'large'


        typelbl.style.fontSize='larger'
        typelbl.style.borderStyle = 'solid'
        typelbl.style.borderColor='#d1d1d0'
        typelbl.style.borderWidth ='0 0 thin 0'
        typelbl.style.maxWidth = '100%'
        typelbl.style.paddingLeft='20px'

        namelbl.style.fontFamily='monospace'
        namelbl.style.fontSize='larger'

        ele.append(typelbl,namelbl,cardnolbl,explbl)
        document.getElementById('part2').append(ele)
    }
    else{

    }
}
function createnewpayment() {
    let div = document.createElement('div')
    div.className='addpayment'

    let lbl = document.createElement('label')
    lbl.innerHTML="<i class='fas fa-plus' style='margin-right: 10px;transform: scale(1)'></i>Add a payment method" +
        "<i class='fas fa-cash-register' style='transform: scale(1);margin-left: 10px'></i>"
    lbl.style.marginLeft = '10px'
    lbl.style.borderWidth='thin'
    lbl.style.borderStyle='solid'
    lbl.style.borderColor = '#d1d1d0'
    lbl.style.padding='10px 20px'
    lbl.style.borderRadius='50px'

    let debitlbl = document.createElement('label')
    debitlbl.innerHTML = "<i class='fas fa-plus' style='margin-right: 10px;transform: scale(1)'></i>Add a Debit card" +
        "<i class='far fa-credit-card' style='margin-left: 10px;transform: scale(1)'></i>"
    debitlbl.className='addpayment-obj cursor'
    debitlbl.onclick =()=>{
        if(currentAdd==0) {
            document.getElementById('debit').style.display = 'grid'
            currentAdd = 'debit'
        }
        else{
            document.getElementById(currentAdd).style.display = 'none'
            document.getElementById('debit').style.display = 'grid'
            currentAdd= 'debit'
        }
    }

    let debit = document.createElement('div')
    debit.style.display = 'none'
    debit.className = 'addpayment-obj-card'
    debit.id='debit'

    let dname = document.createElement('input')
    dname.type = 'text'
    dname.placeholder = 'Name on the card'
    dname.id= 'dname'
    dname.style.gridArea ='1/1/1/span 4'
    dname.style.width='95%'

    let debit1= document.createElement('input')
    debit1.type = 'number'
    debit1.id = 'debit1'
    debit1.style.gridArea = '2/1/2/2'
    let debit2= document.createElement('input')
    debit2.type = 'number'
    debit2.id = 'debit2'
    debit2.style.gridArea = '2/2/2/3'
    let debit3= document.createElement('input')
    debit3.type = 'number'
    debit3.id = 'debit3'
    debit3.style.gridArea = '2/3/2/4'
    let debit4= document.createElement('input')
    debit4.type = 'number'
    debit4.id = 'debit4'
    debit4.style.gridArea = '2/4/2/4'
    let debitcvv= document.createElement('input')
    debitcvv.type = 'number'
    debitcvv.id = 'debitcvv'
    debitcvv.style.gridArea = '3/1/3/2'
    debitcvv.placeholder='cvv'
    let debitexpiry= document.createElement('div')
    let month = document.createElement('input')
    let year = document.createElement('input')
    let divider = document.createElement('label')

    month.type = 'number'
    month.placeholder = 'MM'
    month.style.borderWidth = 'thin'
    month.style.borderStyle ='solid'
    month.style.borderColor= '#d1d1d0'
    month.style.borderRadius = '5px'
    month.id='dmonth'
    month.style.width = '20%'

    year.type = 'number'
    year.placeholder = 'YY'
    year.style.borderWidth = 'thin'
    year.style.borderStyle ='solid'
    year.style.borderColor= '#d1d1d0'
    year.style.borderRadius = '5px'
    year.id='dyear'
    year.style.width = '20%'

    divider.innerText = '/'
    divider.style.margin= '0 3px'
    debitexpiry.style.gridArea = '3/3/3/span 2'
    debitexpiry.append(month,divider,year)

    let debitadd = document.createElement('label')
    debitadd.innerText = 'Add'
    debitadd.style.gridArea = '4/1/4/span 4'
    debitadd.id='debit-add'
    debitadd.className='cursor'
    debitadd.onclick = ()=>{
        let d1 = document.getElementById('debit1').value
        let d2 = document.getElementById('debit2').value
        let d3 = document.getElementById('debit3').value
        let d4 = document.getElementById('debit4').value
        let dcvv = document.getElementById('debitcvv').value
        let dmonth = document.getElementById('dmonth').value
        let dyear = document.getElementById('dyear').value
        let dname = document.getElementById('dname').value
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange =function () {
            if(xhr.readyState==4){
                console.log(xhr.response)
                document.getElementById(currentAdd).style.display = 'none'
                currentAdd=0
                displaypopup('card has been added')
                document.getElementById('payment').click()
            }
        }
        xhr.open('POST','http://store.warehouse.com:2000/addpaymentmethod')
        xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8')
        xhr.send(JSON.stringify({'d1':d1,'d2':d2,'d3':d3,'d4':d4,'dcvv':dcvv,
            'dexp':dmonth.toString()+'/'+dyear.toString(),'type':'debit','name':dname,'userid':userdetails['userid']}))
    }
    debit1.oninput = debit2.oninput = debit3.oninput = debit4.oninput =(e)=>{
        if(e.target.value.length >=4){
            document.getElementById(debitids[dn]).value = e.target.value.slice(0,4)
            dn+=1
            if(dn>5){
                dn=0
            }
            document.getElementById(debitids[dn]).focus()
        }
    }
    debitcvv.oninput = (e)=>{
        if(e.target.value.length >=3){
            document.getElementById(debitids[dn]).value = e.target.value.slice(0,3)

            dn+=1
            if(dn>5){
                dn=0
            }
            document.getElementById(debitids[dn]).focus()
        }
    }
    month.oninput = (e) = year.oninput = (e)=>{
        if(e.target.value.length>=2){
            document.getElementById(debitids[dn]).value = e.target.value.slice(0,2)

            dn+=1
            if(dn>6){
                dn=0
            }
            document.getElementById(debitids[dn]).focus()
        }
    }
    debit.append(dname,debit1,debit2,debit3,debit4,debitcvv,debitexpiry,debitadd)

    let creditlbl = document.createElement('label')
    creditlbl.innerHTML = "<i class='fas fa-plus' style='margin-right: 10px;transform: scale(1)'></i>Add a Credit card" +
        "<i class='fas fa-credit-card' style='transform: scale(1);margin-left: 10px'></i>"
    creditlbl.className='addpayment-obj cursor'
    creditlbl.onclick = ()=>{
        if(currentAdd==0) {
            document.getElementById('credit').style.display = 'grid'
            currentAdd='credit'
        }
        else{
            document.getElementById(currentAdd).style.display = 'none'
            document.getElementById('credit').style.display='grid'
            currentAdd='credit'
        }
    }

    let credit = document.createElement('div')
    credit.style.display = 'none'
    credit.className = 'addpayment-obj-card'
    credit.id='credit'

    let cname = document.createElement('input')
    cname.type = 'text'
    cname.placeholder = 'Name on the card'
    cname.id= 'cname'
    cname.style.gridArea ='1/1/1/span 4'
    cname.style.width = '95%'

    let credit1= document.createElement('input')
    credit1.type = 'number'
    credit1.id = 'credit1'
    credit1.style.gridArea = '2/1/2/2'
    let credit2= document.createElement('input')
    credit2.type = 'number'
    credit2.id = 'credit2'
    credit2.style.gridArea = '2/2/2/3'
    let credit3= document.createElement('input')
    credit3.type = 'number'
    credit3.id = 'credit3'
    credit3.style.gridArea = '2/3/2/4'
    let credit4= document.createElement('input')
    credit4.type = 'number'
    credit4.id = 'credit4'
    credit4.style.gridArea = '2/4/2/4'
    let creditcvv= document.createElement('input')
    creditcvv.type = 'number'
    creditcvv.id = 'creditcvv'
    creditcvv.style.gridArea = '3/1/3/2'
    creditcvv.placeholder='cvv'
    let creditexpiry= document.createElement('div')

    let cmonth = document.createElement('input')
    let cyear = document.createElement('input')
    let cdivider = document.createElement('label')

    cmonth.type = 'number'
    cmonth.placeholder = 'MM'
    cmonth.style.borderWidth = 'thin'
    cmonth.style.borderStyle ='solid'
    cmonth.style.borderColor= '#d1d1d0'
    cmonth.style.borderRadius = '5px'
    cmonth.id='cmonth'
    cmonth.style.width = '20%'

    cyear.type = 'number'
    cyear.placeholder = 'YY'
    cyear.style.borderWidth = 'thin'
    cyear.style.borderStyle ='solid'
    cyear.style.borderColor= '#d1d1d0'
    cyear.style.borderRadius = '5px'
    cyear.id='cyear'
    cyear.style.width = '20%'

    cdivider.innerText = '/'
    cdivider.style.margin= '0 3px'
    creditexpiry.style.gridArea = '3/3/3/span 2'
    creditexpiry.append(cmonth,cdivider,cyear)


    let creditadd = document.createElement('label')
    creditadd.innerText = 'Add'
    creditadd.style.gridArea = '4/1/4/span 4'
    creditadd.id='credit-add'
    creditadd.className = 'cursor'
    creditadd.onclick = ()=>{
        let c1 = document.getElementById('credit1').value
        let c2 = document.getElementById('credit2').value
        let c3 = document.getElementById('credit3').value
        let c4 = document.getElementById('credit4').value
        let ccvv = document.getElementById('creditcvv').value
        let cmonth = document.getElementById('cmonth').value
        let cyear = document.getElementById('cyear').value
        let cname = document.getElementById('cname').value
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange =function () {
            if(xhr.readyState==4){
                console.log(xhr.response)
                document.getElementById(currentAdd).style.display = 'none'
                currentAdd=0
                displaypopup('card has been added')
                document.getElementById('payment').click()
            }
        }
        xhr.open('POST','http://store.warehouse.com:2000/addpaymentmethod')
        xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8')
        xhr.send(JSON.stringify({'d1':c1,'d2':c2,'d3':c3,'d4':c4,'dcvv':ccvv,
            'dexp':cmonth.toString()+'/'+cyear.toString(),'type':'credit','name':cname,'userid':userdetails['userid']}))
    }
    credit1.oninput = credit2.oninput = credit3.oninput = credit4.oninput =(e)=>{
        if(e.target.value.length >=4){
            document.getElementById(creditids[cn]).value = e.target.value.slice(0,4)
            cn+=1
            if(cn>6){
                cn=0
            }
            document.getElementById(creditids[cn]).focus()
        }
    }
    creditcvv.oninput = (e)=>{
        if(e.target.value.length >=3){
            document.getElementById(creditids[cn]).value = e.target.value.slice(0,3)

            cn+=1
            if(cn>6){
                cn=0
            }
            document.getElementById(creditids[cn]).focus()
        }
    }
   cmonth.oninput = (e) = cyear.oninput = (e)=>{
        if(e.target.value.length>=2){
            document.getElementById(creditids[cn]).value = e.target.value.slice(0,2)

            cn+=1
            if(cn>6){
                cn=0
            }
            document.getElementById(creditids[cn]).focus()
        }
   }
    credit.append(cname,credit1,credit2,credit3,credit4,creditcvv,creditexpiry,creditadd)

    let upilbl = document.createElement('label')
    upilbl.className = 'addpayment-obj cursor'
    upilbl.innerHTML = "<i class='fas fa-plus' style='margin-right: 10px;transform: scale(1)'></i>Link upi id" +
        "<i class='fas fa-link' style='margin-left: 10px;transform: scale(1)'></i>"
    upilbl.onclick = ()=>{
        if(currentAdd==0) {
            document.getElementById('upi').style.display = 'flex'
            currentAdd='upi'
        }
        else{
            document.getElementById(currentAdd).style.display = 'none'
            document.getElementById('upi').style.display = 'flex'
            currentAdd='upi'
        }
    }
    let upi = document.createElement('div')
    upi.style.display='none'
    upi.style.flexDirection = 'column'
    upi.style.justifyContent='center'
    upi.style.maxWidth ='100%'
    upi.id='upi'
    upi.style.borderWidth='thin'
    upi.style.borderColor = '#d1d1d0'
    upi.style.borderStyle = 'solid'
    upi.style.borderRadius='5px'
    upi.style.marginLeft ='40px'
    upi.style.padding='10px'

    let upiid = document.createElement('input')
    upiid.type = 'text'
    upiid.id = 'upiid'
    upiid.placeholder='name@bank.com'
    upiid.style.margin='15px auto'
    upiid.style.width = '90%'

    let upiadd = document.createElement('label')
    upiadd.id='upi-add'
    upiadd.innerText = 'Add'
    upiadd.className = 'cursor'
    upiadd.onclick = ()=>{
        let name = document.getElementById('upiid').value
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if(xhr.readyState==4){
                console.log(xhr.response)
                document.getElementById(currentAdd).style.display = 'none'
                currentAdd=0
                displaypopup(` upi id ${name} has been added`)
                document.getElementById('payment').click()
            }
        }
        xhr.open('POST','http://store.warehouse.com:2000/addpaymentmethod')
        xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8')
        xhr.send(JSON.stringify({'name':name,'type':'upi','userid':userdetails['userid']}))
    }

    upi.append(upiid,upiadd)

    div.append(lbl,debitlbl,debit,creditlbl,credit,upilbl,upi)
    document.getElementById('part1').append(div)

}
function createAddresslabel() {
    let div = document.createElement('div')
    let lbl = document.createElement('label')
    let lblicon = document.createElement('i')

    div.style.margin = '20px auto'
    lbl.innerText = 'Address Book'
    lbl.style.fontSize = 'x-large'
    lblicon.className = 'fas fa-address-book'
    lblicon.style.marginRight='15px'

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
    lbl.innerHTML="<i class='fas fa-plus' style='margin-right: 10px;transform: scale(1)'></i>Add Address" +
        "<i class='fas fa-address-card' style='transform: scale(1);margin-left: 10px'></i>"
    lbl.style.marginLeft = '10px'
    lbl.style.borderWidth='thin'
    lbl.style.borderStyle='solid'
    lbl.style.borderColor = '#d1d1d0'
    lbl.style.textAlign ='center'
    lbl.style.padding='10px 20px'
    lbl.style.borderRadius='50px'
    lbl.style.marginBottom = '20px'

    let houselbl = document.createElement('label')
    let houseinput = document.createElement('input')
    houseinput.type = 'text'
    houseinput.placeholder = 'House #no'
    houseinput.id='houseno'
    let hicon = document.createElement('i')
    hicon.className='fas fa-house-user'
    hicon.style.marginLeft='-30px'
    houselbl.append(houseinput,hicon)

    let streetlbl = document.createElement('label')
    let street =document.createElement('input')
    street.type= 'text'
    street.placeholder = 'Street'
    street.id='street'
    let sticon = document.createElement('i')
    sticon.className = 'fas fa-street-view'
    sticon.style.marginLeft = '-30px'
    streetlbl.append(street, sticon)

    let landmarklbl=document.createElement('label')
    let landmark = document.createElement('input')
    landmark.placeholder = 'Landmark'
    landmark.type ='text'
    landmark.id='landmark'
    let laicon = document.createElement('i')
    laicon.className = 'fas fa-landmark'
    laicon.style.marginLeft='-30px'
    landmarklbl.append(landmark,laicon)

    let addresslbl=document.createElement('label')
    let address = document.createElement('input')
    address.id='addressinp'
    address.type ='text'
    address.placeholder = 'Address'
    let adicon = document.createElement('i')
    adicon.className = 'fas fa-map-marker-alt'
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
    teicon.className = 'fas fa-mobile'
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
    addicon.className = 'fas fa-plus'
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
        xhr.open('POST','http://store.warehouse.com:2000/addaddress')
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


