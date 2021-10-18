
 
  
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
                          article.name  +`</h4> ` +          
    ` </div>
                      <p class="mb-1">` +
                      article.currency +  '</p>' + '<p class="precio">' + article.unitCost + '</p>' + 
                      '<p>' + 'Cantidad' + '</p>' + '<input type= "number" value=2 min="0"  onchange="subtotal()">' + '</div></div></div>'
             

  document.getElementById("carrito").innerHTML =
    htmlContentToAppend;
}
}
  
function subtotal() {
    let precios = document.getElementsByClassName('precio');
    let cantidad = document.getElementsByTagName('input');

    let total = 0;
    let subtotal = 0;

    for (let i=0; i< precios.length; i++){
        total+= parseFloat(precios[i].innerHTML);

        subtotal += parseFloat(precios[i].innerHTML) * parseFloat(cantidad[i].value);
    }
    document.getElementById('ver-subtotal').innerHTML=(subtotal).toFixed(2);

}
  

 //Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok"){
            articlesArray =  resultObj.data.articles;
            mostrarcarrito(articlesArray);

      }
    });
  });
  