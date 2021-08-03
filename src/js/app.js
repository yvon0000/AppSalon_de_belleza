
let pagina=1;
const cita={
    nombre:'',
    hora:'',
    fecha:'',
    servicios:[]
}

document.addEventListener('DOMContentLoaded',function(){
    IniciandoApp();
})
function IniciandoApp(){
MostrarServicios();
//
//mostrar mensanje error en caso que el usuar no ha selecionado ninguna informacion
mostrarCita();
//resaltar el div actual segun el tab que presione
mostrarSeccion();

//oculta o muestra una session  segun el table que se presione
CambiarSeccion();

//pagina siguiente
paginaSiguente();

//pagina anterio
paginaAnterior();
//oculta o mosttra la pagina
botonesPaginadores();
//validar campo nombre
nombreCita();
//validar fecha
HoraCita();
fechaCita();
//Dessabilita fecha anterior
desablitarFecha();
}
function mostrarSeccion(){

    const seccionAnterior=    document.querySelector('.mostrar-seccion');
    if (seccionAnterior){
    seccionAnterior.classList.remove('mostrar-seccion');
}  
 const seccionActual=   document.querySelector(`#paso-${pagina}`)
 seccionActual.classList.add("mostrar-seccion")

 const tabActuar= document.querySelector(".tabs .actual");
 if(tabActuar){
    tabActuar.classList.remove("actual");

 }


 const tab=document.querySelector(`[data-paso="${pagina}"]`);
 tab.classList.add("actual")
}

function CambiarSeccion(){
    const enlaces=document.querySelectorAll('.tabs button');
    enlaces.forEach( enlace => {
        enlace.addEventListener('click', e =>{
            e.preventDefault();
            pagina=parseInt(e.target.dataset.paso);
           // console.log(pagina)
            //eliminar seccion acutuar segun el tabl que presione
           //// document.querySelector('.mostrar-s que selecionareccion').classList.remove('mostrar-seccion');
//agregar mostrar-seccion al seccion

           // const mostrarSeccion=document.querySelector(`#paso-${pagina}`)
            //mostrarSeccion.classList.add('mostrar-seccion')

            //eliminar el tab acutar segun el tab que presione
           //document.querySelector(".tabs .actual").classList.remove("actual");

//agregar la clase actual en tab segun lo selecionar
//const tab=document.querySelector(`[data-paso="${pagina}"]`);
 //tab.classList.add("actual")
mostrarSeccion();
botonesPaginadores();


        })

    })

}


async function MostrarServicios(){
    try{
/*utilizamos async await  */
const url="http://localhost/xampp/cursos/JavaScript/AppSalon_inicio/servicios.php";
const resutado= await fetch(url);
const db= await resutado.json();
//distroctruing
const { servicios }=db;
//agregar html
db.forEach(servicio => {
    const { id, nombre,precio }=servicio;
    //Dom Sripting
    //generar nombre servicio
    const nombreServicio= document.createElement("P");
    nombreServicio.textContent=nombre;
    nombreServicio.classList.add("nombre-servicio")
    //generar precio servicio

    const precioServicio=document.createElement("P");
     precioServicio.textContent=`$ ${precio}`;
    precioServicio.classList.add("precio-servicio")
    //generad el div
     const ServicioDiv=document.createElement("div");
     ServicioDiv.classList.add("servicio")
     ServicioDiv.dataset.idServicio=id

     //seleccionado servicios
     ServicioDiv.onclick= selecionarSelvicios;
     


     //agregar servicios al div
     ServicioDiv.appendChild(nombreServicio)
     ServicioDiv.appendChild(precioServicio)
     //console.log(ServicioDiv)
     //Agregar en html
     document.querySelector("#servicios").appendChild(ServicioDiv)
    
    
    //console.log(precioServicio)


});


}catch(error){

console.log(error);
}
    
};
function selecionarSelvicios(e){
let elemento;
//forzar que elemento que damos click sea el div
if(e.target.tagName === "P"){
    elemento=e.target.parentElement;
}else{
    elemento=e.target;
}

if(elemento.classList.contains("seleccionado")){
    elemento.classList.remove("seleccionado");
    const id=parseInt(elemento.dataset.idServicio)
    eliminarServicio(id);
}else{
    elemento.classList.add("seleccionado")
    //console.log(elemento.firstElementChild.nextSibling.textContent)
    const serviciosObj={
id:parseInt(elemento.dataset.idServicio),
nombre:elemento.firstElementChild.textContent,
precio:elemento.firstElementChild.nextElementSibling.textContent
}
   // console.log(serviciosObj)
agregarServicio(serviciosObj);

}
}
function agregarServicio(serviciosObj){
    const { servicios } =cita;
    cita.servicios= [...servicios, serviciosObj]
    console.log(cita)
    

}
function eliminarServicio(id){
    const {servicios}=cita;
    cita.servicios=servicios.filter(servicio => servicio.id !==id)
    //console.log(cita)

}
function paginaSiguente(){
const Siguente=document.querySelector('#siguiente')
Siguente.addEventListener('click', ()=>{
pagina++;
//console.log(pagina)

botonesPaginadores();
})
}
function paginaAnterior(){
    const Anterior=document.querySelector('#anterior')
    Anterior.addEventListener('click', ()=>{
    
    pagina--;
    //console.log(pagina)
    botonesPaginadores();

    })
}
function botonesPaginadores(){
    const Siguente=document.querySelector('#siguiente')    
    const Anterior=document.querySelector('#anterior')
    if(pagina===1){
        Anterior.classList.add("ocultar")
        mostrarCita();

    }else if(pagina===3){
        Siguente.classList.add("ocultar")
        Anterior.classList.remove("ocultar")
        mostrarCita();
    } else {
        Anterior.classList.remove("ocultar")
        Siguente.classList.remove("ocultar")
        mostrarCita();

    }
    mostrarSeccion();
}
function mostrarCita(){
    //distructring
    const {nombre,hora,fecha,servicios}=cita;

    const ServicioDiv=document.querySelector('.contenido-resumen')
 //ServicioDiv.innerHTML= '';
    while(ServicioDiv.firstChild){
ServicioDiv.removeChild(ServicioDiv.firstChild)
   }
    if(Object.values(cita).includes('')){
        const noServicio=document.createElement('p')
        noServicio.textContent= "ERROR AL LLENAR CAMPO NOMBRE, FECHA,SERVICIO debes llenar";
        noServicio.classList.add("resumen")
        ServicioDiv.appendChild(noServicio)
    return;
    } 
    const HedingCita= document.createElement('H3')
    HedingCita.textContent=('RESUMEN DE cita')

const mostrarResumen=document.createElement('p')
mostrarResumen.innerHTML=`<span>Nombre :${nombre}</span`;

const mostrafecha=document.createElement('p')
mostrafecha.innerHTML=`<span>Fecha :${fecha}</span`;

const mostrarHora=document.createElement('p')
mostrarHora.innerHTML=`<span>Hora :${hora}</span`;

//insertar los servicios
const servicioCita=document.createElement('DIV')
servicioCita.classList.add('resumen-servicio')

    const HedingServicio= document.createElement('H3')
    HedingServicio.textContent=('RESUMEN DE SERVICIOS')
    servicioCita.appendChild(HedingServicio)
    let cantidad=0;

    console.log(cita)
    servicios.forEach( servicio =>{
        const {nombre,precio}=servicios;

const contenidoServicio=document.createElement('DIV')
contenidoServicio.classList.add('contenido-servicio')

const textServico=document.createElement('P')
textServico.textContent=servicio.nombre

const textPrecio=document.createElement('P')
textPrecio.textContent=servicio.precio

contenidoServicio.appendChild(textServico)
contenidoServicio.appendChild(textPrecio)
contenidoServicio.classList.add('precio')

//imprimir el precio
const totalServicio=servicio.precio.split('$');


cantidad += parseInt(totalServicio[1].trim());
servicioCita.appendChild(contenidoServicio)

    });
    ServicioDiv.appendChild(HedingCita)
ServicioDiv.appendChild(mostrarResumen)
ServicioDiv.appendChild(mostrafecha)
ServicioDiv.appendChild(mostrarHora)

ServicioDiv.appendChild(servicioCita)
const totalPagar=document.createElement('p')
totalPagar.innerHTML=`<span>Total a pagar : $${cantidad}</span>`
ServicioDiv.appendChild(totalPagar)

}
function nombreCita(){
    const nombreTexto=document.querySelector("#nombre")
    nombreTexto.addEventListener('input', e=>{
        const nombre=e.target.value.trim()
        //console.log(nombre)
        if(nombre ==='' ||nombre.length<3){
            mostraAlerta("nombre no valido",'error')
            
        }else{
            const alerta=document.querySelector('.alerta')
            if(alerta){
             alerta.remove();
            }
            cita.nombre=nombre;
            console.log(cita)
        }

    })
}

function mostraAlerta(mensaje,tipo){
    //validar para que salir mas que 1 alerta
    const eliminarAlerta=document.querySelector('.alerta')
    if(eliminarAlerta){
      return
    }
const alerta=document.createElement("DIV")
alerta.textContent=mensaje
alerta.classList.add('alerta')

if(tipo === 'error'){
alerta.classList.add('error')
}
//agregar el error en html
const mostraAlerta=document.querySelector('.formulario')
mostraAlerta.appendChild(alerta)
setTimeout(() => {
    alerta.remove();
}, 3000);
}
function fechaCita(){

    const horaCita=document.querySelector('#fecha')
horaCita.addEventListener('input',e=>{
    const dia= new Date(e.target.value).getUTCDay();
    if([0,6].includes(dia)){
        e.preventDefault();
        horaCita.value='';
        
mostraAlerta("Fines de semana no son validos",'error');
    }else{
        cita.fecha=horaCita.value;
    }

})
}
function desablitarFecha(){
    
    const fechaInput =document.querySelector('#fecha')
    const fechatActual= new Date();
    //validamos la forma que la hora sea  AAAA-MM-DD
    const year=fechatActual.getFullYear();
    const mes=fechatActual.getMonth()+1;
    const dia=fechatActual.getDate()+1;

    const fechaDesabilitar=`${year}-${mes}-${dia}`;
    fechaInput.min =fechaDesabilitar;
    
}
function HoraCita(){
    const inputHora=document.querySelector('#hora')
    inputHora.addEventListener('input',e=>{
        const hora=e.target.value;

        const validarHora=hora.split(':');
        if (validarHora[0] <10 ||validarHora[0] > 20){
mostraAlerta("Hora no valido",'error')

setTimeout(()=>{
inputHora.value='';
},3000);
}
        
cita.hora=validarHora;
    })
}