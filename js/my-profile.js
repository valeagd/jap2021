//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let infoperfil = localStorage.getItem("datos");
    let infonombre = document.getElementById("nombre");
    let infoapellido = document.getElementById("apellido");
    let infoedad = document.getElementById("edad");
    let infocorreo = document.getElementById("correo");
    let infotelefono = document.getElementById("telefono");

    if (infoperfil) {
        infoperfil = JSON.parse(infoperfil);
        infonombre.value = infonombre.value + infoperfil.nombre;
        infoapellido.value = infoapellido.value + infoperfil.apellido;
        infoedad.value = infoedad.value + infoperfil.edad;
        infocorreo.value = infocorreo.value + infoperfil.correo;
        infotelefono.value = infotelefono.value + infoperfil.telefono;
    }

});

function guardarCambios() {
    let nombres = document.getElementById("nombre");
    let apellidos = document.getElementById("apellido");
    let edad = document.getElementById("edad");
    let correo = document.getElementById("correo");
    let telefono = document.getElementById("telefono");
    let datos = {};

    if (nombres.value.trim() === '' || apellidos.value.trim() === '' || edad.value.trim() === '' || correo.value.trim() === '' || telefono.value.trim() === ''){
        nombres.classList.add("error")
        apellidos.classList.add("error")
        edad.classList.add("error")
        correo.classList.add("error")
        telefono.classList.add("error")

    }else{
        datos.nombre = nombres.value
        datos.apellido = apellidos.value
        datos.edad = edad.value
        datos.correo = correo.value
        datos.telefono = telefono.value
       
        localStorage.setItem("datos", JSON.stringify(datos))

    }
}

//foto
function convertir(img) {
    img.crossOrigin="anonymous";
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var contexto = canvas.getContext("2d");
    contexto.drawImage(img, 0, 0,img.width, img.height);
    var dataURL = canvas.toDataURL("image/jpeg");
    return dataURL;
  }

  document.addEventListener('DOMContentLoaded',function(){
  var imgbase64 = convertir(document.getElementById("img"));
  localStorage.imagen=imgbase64;
  document.getElementById('imagen2').src=`${localStorage.imagen}`;

  console.log(imgbase64);
  });


  
  