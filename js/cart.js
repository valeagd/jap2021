
 var banco = false;
 var credito = false;
  
//mostrar elementos del carrito
let articlesArray = []

function mostrarcarrito(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
    let  article = array[i];
  
     
    htmlContentToAppend +=
    `
      <div class="list-group-item list-group-item-action">
              <div class="row">
                  <div class="col-3">
                      <img src="` +
                      article.src +
    `" alt="` +
    article.name +
    `" class="img-thumbnail">
                  </div>
                  <div class="col">
                      <div class="d-flex w-100 justify-content-between">
                          <h4 class="mb-1">` +
                          article.name  + `</h4> ` +          
    ` </div>
                      <p class="mb-1">` +
                      article.currency +  '</p>' + '<p class="precio">' + article.unitCost + '</p>' + 
                      '<p>' + 'Cantidad' + '</p>' + '<input type= "number" value=2 min="0"  onchange="subtotal()">' + '</div></div></div>'
             

  document.getElementById("carrito").innerHTML =
    htmlContentToAppend;
}
}

//calcula subtotal, costo de envío y total
  
function subtotal() {
    let precios = document.getElementsByClassName('precio');
    let cantidad = document.getElementsByTagName('input');
    let envio = document.getElementsByName("envio");

 
    let subtotal = 0;
    let costoenvio = 0;
    

    for (let i=0; i< precios.length; i++){
        subtotal += parseFloat(precios[i].innerHTML) * parseFloat(cantidad[i].value);
        document.getElementById('ver-subtotal').innerHTML=(subtotal).toFixed(2);
    }

    for (let j=0; j < envio.length; j++){
        if(envio[j].checked){
            costoenvio += parseFloat(envio[j].value) * subtotal;
            document.getElementById("ver-costo-envio").innerHTML=(costoenvio).toFixed(2);
        }
    }
    
    document.getElementById("ver-total").innerHTML=(subtotal + costoenvio).toFixed(2);

}



//modal

document.getElementById("tar").addEventListener("change", function () {
    document.getElementById("num-cuenta").disabled = true;
    document.getElementById("venc-tarjeta").disabled = false;
    document.getElementById("num-tarjeta").disabled =false;
    document.getElementById("cvv-tarjeta").disabled =false;

    credito = true
    banco = false
   
});

document.getElementById("transf").addEventListener("change", function () {
    document.getElementById("num-cuenta").disabled = false;
    document.getElementById("num-tarjeta").disabled = true;
    document.getElementById("cvv-tarjeta").disabled = true;
    document.getElementById("venc-tarjeta").disabled = true;

   
    credito = false
    banco = true
});


function validar() {
    let numtarjeta = document.getElementById("num-tarjeta");
    let vencimiento = document.getElementById("venc-tarjeta");
    let cvv = document.getElementById("cvv-tarjeta");
    let numcuenta = document.getElementById("num-cuenta")
    
    if(credito){
        if (numtarjeta.value.trim () === '' || vencimiento.value.trim() === '' || cvv.value.trim() === '' ) {
            numtarjeta.classList.add("invalido");
            vencimiento.classList.add("invalido");
            cvv.classList.add("invalido");
        }else{
            cuenta.classList.remove("invalido");
            vencimiento.classList.remove("invalido");
            cvv.classList.remove("invalido");
        }
    }
    if (banco){
        if (numcuenta.value.trim() === ''){
            numcuenta.classList.add("invalido");
        }else{
            numcuenta.classList.remove("invalido");
        }
    };
    };

    //validar direccion

    function validardir(){
        let calle = document.getElementById("calle");
        let num = document.getElementById("nump");
        let esq = document.getElementById("esq");

        if(calle.value.trim() === '' || num.value.trim() === '' || esq.value.trim() === ''){
            calle.classList.add("invalido");
            num.classList.add("invalido");
            esq.classList.add("invalido");

        };
    };

 //Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok"){
            articlesArray =  resultObj.data.articles;
            mostrarcarrito(articlesArray);
            subtotal();

      }
    });
  });
  


 