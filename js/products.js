let productsArray = [];

function showProducts() {
  let htmlContentToAppend = "";
  for (let i = 0; i < productsArray.length; i++) {
    let product = productsArray[i];

    htmlContentToAppend +=
      `
        <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` +
      product.imgSrc +
      `" alt="` +
      product.description +
      `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` +
      product.name +
      " USD$" +
      product.cost +
      `</h4>
                            <small class="text-muted">` +
      product.soldCount +
      ` artículos</small>
                        </div>
                        <p class="mb-1">` +
      product.description +
      `</p>
                    </div>
                </div>
            </div>
            `;

    document.getElementById("prod-list-container").innerHTML =
      htmlContentToAppend;
  }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productsArray = resultObj.data;
      //Muestro las categorías ordenadas
      showProducts(productsArray);
    }
  });

});

//filtrar según rango de precio

function rangollamar() {
  document.getElementById("filtrorango").addEventListener("click", () => {
    rangoprecios();
  });
}
function rangoprecios() {
  let rangomin = parseInt(document.getElementById("rangomin").value);
  let rangomax = parseInt(document.getElementById("rangomax").value);
  let htmlContentToAppend = "";

  for (let product of productsArray) {
    if (rangomin <= product.cost && rangomax >= product.cost) {
      htmlContentToAppend +=
        `
      <div class="list-group-item list-group-item-action">
              <div class="row">
                  <div class="col-3">
                      <img src="` +
        product.imgSrc +
        `" alt="` +
        product.description +
        `" class="img-thumbnail">
                  </div>
                  <div class="col">
                      <div class="d-flex w-100 justify-content-between">
                          <h4 class="mb-1">` +
        product.name +
        " USD$" +
        product.cost +
        `</h4>
                          <small class="text-muted">` +
        product.soldCount +
        ` artículos</small>
                      </div>
                      <p class="mb-1">` +
        product.description +
        `</p>
                  </div>
              </div>
          </div>
          `;
      document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
  }
}

function llamarlimpiarfiltro() {
  document.getElementById("Limpiarfiltro").addEventListener("click", () => {
    limpiarfiltro();
  });
}

function limpiarfiltro() {
  document.getElementById("rangomin").value = "";
  document.getElementById("rangomax").value = "";
  showProducts();
}

// ordenar por precio ascendente
function llamarasc() {
  document.getElementById("ordenarasc").addEventListener("click", () => {
    ordenarasc();
  });
}

function ordenarasc() {
  productsArray.sort((a, b) => {
    if (a.cost > b.cost) {
      return 1;
    }
    if (a.cost < b.cost) {
      return -1;
    } else {
      return 0;
    }
  });
  showProducts();
}

//ordenar por precio descendente

function llamardesc() {
  document.getElementById("ordenardesc").addEventListener("click", () => {
    ordenardesc();
  });
}

function ordenardesc() {
  productsArray.sort((a, b) => {
    if (b.cost > a.cost) {
      return 1;
    }
    if (b.cost < a.cost) {
      return -1;
    } else {
      return 0;
    }
  });
  showProducts();
}

//ordenar según relevancia en forma descendente
function llamarcant() {
  document.getElementById("ordenarcant").addEventListener("click", () => {
    ordenarcant();
  });
}

function ordenarcant() {
  productsArray.sort((a, b) => {
    if (b.soldCount > a.soldCount) {
      return 1;
    }
    if (b.soldCount < a.soldCount) {
      return -1;
    } else {
      return 0;
    }
  });
  showProducts();
}

//BUSCADOR
let prodFiltrados = [];

function buscar() {

  let textoEscrito = document.getElementById("buscador").value;
   let prodFiltrados = productsArray.filter(function (product) {
    return product.name.toLowerCase().indexOf(textoEscrito.toLowerCase()) > -1;
  });
 
  showProducts();
 
  document.getElementById('buscador').addEventListener('keyup',()=>{

    buscar();
  
  
  });
  document.getElementById('buscador').addEventListener('mouseover',()=>{
  
    buscar();
  
  
  });



}

 



 