
window.onload=(function(){

let login= document.getElementById("buttonLogin")
let poplogin= document.getElementById("poplogin")
let btnClose= document.getElementById("btn-close")
let registro= document.getElementById("buttonCriar")
let popRegistro= document.getElementById("popRegistro")
let btnCloseRegistro= document.getElementById("btn-close-registro")



/* Pop Login*/



login.onclick=function (){
    poplogin.showModal()
}

btnClose.onclick=function(){

    poplogin.close()
}
 

// Pop Registro
registro.onclick= function (){
    popRegistro.showModal()

}

btnCloseRegistro.onclick=function(){
    popRegistro.close()
}


})
