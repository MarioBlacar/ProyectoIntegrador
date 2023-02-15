rellenarMenuLateral();

if (sessionStorage.getItem("token") == null) {
  document.getElementById("icono").innerHTML =
    '<a href="../logIn/logIn.php"><svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="#6A994E" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" /></svg></a>';
} else {
  document.getElementById("icono").innerHTML =
  '<a href="../editarPerfil/editarPerfil.php"><svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="#6A994E" class="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg></a>';
}

// Funciones para el menu
let burger = document.getElementById("burger");
let overlay = document.querySelector("section");
let showMenu = false;

let tl = gsap.timeline({
  repeat: -1,
  yoyo: true,
  ease: "expo.out",
});

overlay.style.display = "none";

burger.addEventListener("click", (e) => {
  showMenu = !showMenu;
  if (showMenu) {
    burger.classList.add("active");
    overlay.style.display = "block";
    gsap.to(overlay, 1, {
      clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
      ease: "expo.in",
    });
  } else {
    burger.classList.remove("active");
    gsap.to(overlay, 1, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      ease: "expo.out",
      onComplete: () => (overlay.style.display = "none"),
    });
  }
});

//Funcionalidad entre la api y la página
// ----------------------------------------------------------------------------------------------------------
var map = L.map("map").setView([36.83814, -2.45974], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  aattribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

let botonFiltro = document.getElementById("botonFiltrar");
botonFiltro.addEventListener("click", rellenarMenuLateral);

function rellenarMenuLateral() {
  let url = `../../api/rutas/verRutas.php`;
  let ruta = document.createElement("div");
  let menu = document.getElementById("menuLateral");

  let filtroNombre= document.getElementById("nombreRuta").value;
  let filtroDistanciaMinima= document.getElementById("distanciaMinima").value;
  let filtroDistanciaMaxima= document.getElementById("distanciaMaxima").value;
  let filtroLocalidad= document.getElementById("localidad").value;

  if(filtroNombre!=""){
    url = url + `?buscarNombre=${filtroNombre}`;
    console.log(url);
  }if(filtroDistanciaMinima!=""){
    url = url + `?buscarDistanciaMinima=${filtroDistanciaMinima}`;
    console.log(url);
  }if(filtroDistanciaMaxima!=""){
    url = url + `?buscarDistanciaMaxima=${filtroDistanciaMaxima}`;
    console.log(url);
  }if(filtroLocalidad!=""){
    url = url + `?buscarLocalidad=${filtroLocalidad}`;
    console.log(url);
  }
  menu.innerHTML = "<a href='../añadirRuta/añadirRuta.php'>Añadir ruta</a>";

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      json.forEach((element) => {
        ruta.innerHTML += `<div id="ruta">`;
        ruta.innerHTML += `<tr><td>${element.nombreRuta}</td><br><td>Distancia: ${element.distancia} m</td><br><td><a href='../detalleRuta/detalleRuta.php?id=${element.idRutas}'>Detalle</a></td><br></tr><br><br>`;
        ruta.innerHTML += `</div>`;

        var marker = L.marker([element.latitudInicio, element.longitudInicio], {
          opacity: 0.7,
          }).addTo(map);
      });
      menu.append(ruta);
    })
    .catch((error) => console.log(error));
}
