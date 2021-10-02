//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

function verificar() {
    let dato = document.getElementById("user");
    let password = document.getElementById("password");
    let msj = document.getElementById("msj");
    let usuario = {};

    if (dato.value.trim () === '' || password.value.trim() === '') {
        dato.classList.add("isInvalid");
        password.classList.add("isInvalid");
        msj.innerHTML= "Usuario o contraseña incorrectos";
        msj.style.color="black";
        msj.style.display="block";
        
    }else{
        location.href= "inicio.html";
        usuario.nombre = dato.value;
        usuario.estado = "conectado";


        localStorage.setItem('usuario', JSON.stringify(usuario));
       
    }
    }

    function desconectar () {
        localStorage.clear();
       

    }   