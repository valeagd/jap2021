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
      showproductinfo(product.images);
    }
  });
});

//mostrar imágenes

var productinfo = {};

function showproductinfo(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let imageSrc = array[i];

    htmlContentToAppend +=
      `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` +
      imageSrc +
      `" alt="">
            </div>
        </div>
        `;

    document.getElementById("productinfoimg").innerHTML = htmlContentToAppend;
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