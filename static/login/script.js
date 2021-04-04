let eye=0,eye1=0
document.getElementById('eye').onclick = ()=>{
    if(eye==0){
        eye=1
        document.getElementById('eye').className='fas fa-eye'
        document.getElementById('password').type = 'text'
    }
    else{
        eye=0
        document.getElementById('eye').className='fas fa-eye-slash'
        document.getElementById('password').type = 'password'
    }
}
document.getElementById('eye1').onclick = ()=>{
    if(eye1==0){
        eye1=1
        document.getElementById('eye1').className='fas fa-eye'
        document.getElementById('password1').type = 'text'
    }
    else{
        eye1=0
        document.getElementById('eye1').className='fas fa-eye-slash'
        document.getElementById('password1').type = 'password'
    }
}

document.getElementById('login-btn').onclick =()=>{
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if(xhr.readyState==4){
            let res = JSON.parse(xhr.response)
            console.log(res)
            if(res['status']==1){
                let d = new Date()
                d.setMonth(d.getMonth()+1)
                document.cookie = `userid=${res['userid']};expires=${d};path=/;`
                document.cookie = `name=${res['name']};expires=${d};path=/`
                location.replace('http://store.warehouse.com:2000')
            }
            else{
                alert('error')
            }
        }
    }
    xhr.open('POST','http://store.warehouse.com:2000/login')
    xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8')
    xhr.send(JSON.stringify({'email':email,'password':password}))
}
document.getElementById('signup-btn').onclick = ()=>{
    document.getElementById('login').style.display = 'none'
    document.getElementById('signup').style.display = 'grid'
}

document.getElementById('signup-btn1').onclick = ()=>{
    let email = document.getElementById('email1').value
    let password = document.getElementById('password1').value
    let name = document.getElementById('name').value
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if(xhr.readyState==4){
            let res = JSON.parse(xhr.response)
            if(res['status']==1){
                let d = new Date()
                d.setMonth(d.getMonth()+1)
                document.cookie = `userid=${res['userid']};expires=${d};path=/;`
                document.cookie = `name=${name};expires=${d};path=/`
                location.replace('http://store.warehouse.com:2000')
            }
            else{
                alert('error')
            }
        }
    }
    xhr.open('POST','http://store.warehouse.com:2000/signup')
    xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8')
    xhr.send(JSON.stringify({'email':email,'password':password,'name':name}))
}
document.getElementById('login-btn1').onclick = ()=>{
    document.getElementById('login').style.display = 'grid'
    document.getElementById('signup').style.display = 'none'
}
document.getElementById('home').onclick = ()=>{
    window.location = 'http://store.warehouse.com:2000/'
}
