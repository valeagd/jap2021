//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      product = resultObj.data;
    


      let productnameHTML = document.getElementById("productname");
      let productcostHTML = document.getElementById("productcost");
      let productdescriptionHTML = document.getElementById("productdescription");
      let prodcountHTML = document.getElementById("prodcount");
      let productcategoryHTML = document.getElementById("productcategory");

      productnameHTML.innerHTML = product.name;
      productcostHTML.innerHTML = product.currency + product.cost;
      productdescriptionHTML.innerHTML = product.description;
      prodcountHTML.innerHTML = product.soldCount;
      productcategoryHTML.innerHTML = product.category;

      //Muestro las imagenes en forma de galería
      //showproductinfo(product.images);
      showimgs(prodimagenes)

    }
  });
});
let product = [];

//mostrar imágenes

var productinfo = {};
let prodimagenes = [];

prodimagenes = product.images

function showimgs() {
  let htmlContentToAppend = "";

  for (let i = 0; i < product.images.length; i++) {
  
    if (i == 0) {
      htmlContentToAppend +=
      `
      <div class="carousel-item active">
      <img src="` + product.images[i] +  `"class="d-block w-100" alt="...">
              </div>

        `;
    }else{
      htmlContentToAppend +=
      `
      <div class="carousel-item">
      <img src="` + product.images[i] +  `" class="d-block w-100" alt="">
    </div>
        `;
    }


    document.getElementById("carrusel").innerHTML = htmlContentToAppend;
  }
}


//mostrar comentarios
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      commentsArray = resultObj.data;
      showComments(commentsArray);
    }
  });
});

let commentsArray = [];

function showComments() {
  let htmlContentToAppend = "";
  for (let i = 0; i < commentsArray.length; i++) {
    let comment = commentsArray[i];

    htmlContentToAppend +=
      `
        <div class="list-group-item list-group-item-action">
               
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">` +
      comment.user +
      "  ";

    let heart = "";
    let numheart = commentsArray[i].score;
    for (let i = 1; i <= 5; i++) {
      if (i <= numheart) {
        heart += '<i class="fas fa-heart"></i>';
      } else {
        heart += '<i class="far fa-heart"></i>';
      }
    }

    htmlContentToAppend +=
      heart +
      `</h5>
                            <small class="text-muted">` +
      comment.dateTime +
      `</small>
                        </div>
                        <p class="mb-1">` +
      comment.description +
      `</p>
                    </div>
                </div>
            </div>
        
            `;

    document.getElementById("comments").innerHTML = htmlContentToAppend;
  }
}

function calificar (numheart) {
  let heart = " ";
  for (let i = 1; i <= 5; i++) {
    if (i <= numheart) {
      heart += '<i class="fas fa-heart"></i>';
    } else {
      heart += '<i class="far fa-heart"></i>';
    }
  }
  return heart
} 


//nuevos comentarios
function send() {
    document.getElementById("newcomsend").addEventListener("click", () => {
        sendcomment();
    });
  }

function sendcomment () {
  let comment = {};

  let usuario = JSON.parse(localStorage.getItem("usuario"));
  var tiempo = new Date();
  var año = tiempo.getFullYear();
  var mes = tiempo.getMonth() +1;
  var dia = tiempo.getDate();
  var hours = tiempo.getHours();
  var minute = tiempo.getMinutes();
  var seconds = tiempo.getSeconds();
  temp = año;
  temp += ((mes < 10) ? '-0' : '-') + mes;
  temp += ((dia < 10) ? '-0' : '-') + dia;
  temp += " ";
  temp += ((hours < 10) ? '0' : ' ') + hours;
  temp += ((minute < 10) ? ':0' : ':') + minute;
  temp += ((seconds < 10) ? ':0' : ':') + seconds;
  

  comment.user = usuario.nombre;
  comment.score =  parseInt(document.getElementById("newcommentpoints").value)
  comment.dateTime = temp;
  comment.description = document.getElementById("newcomtext").value;

    commentsArray.push(comment)
    showComments(commentsArray);

};

//productos relacionados

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      prodsrelacionados = resultObj.data;
      
      showRelatedProducts(prodsrelacionados)
     
    }
  });
});

let prodsrelacionados = []

function showRelatedProducts(array) {
  let htmlContentToAppend = "";
  for (let i = 0; i < product.relatedProducts.length; i++) {
    let indice = product.relatedProducts[i];
    producto = array[indice]

    htmlContentToAppend +=
      `
        <a href="products.html" div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` +
                        producto.imgSrc +
      `" alt="` +
      producto.description +
      `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` +
                            producto.name +
      " USD$" +
      producto.cost +
      `</h4>
                            <small class="text-muted">` +
                            producto.soldCount +
      ` artículos</small>
                        </div>
                        <p class="mb-1">` +
                        producto.description +
      `</p>
                    </div>
                </div>
            </div>
            </a>
            `;

    document.getElementById("related-products").innerHTML =
      htmlContentToAppend;

  }
}

  
  
    
