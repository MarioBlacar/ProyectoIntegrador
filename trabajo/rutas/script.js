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

function rellenarMenuLateral() {
  let url = `http://localhost:5000/api/routes`;
  let ruta = document.createElement("div");
  let menu = document.getElementById("menuLateral");
  ruta.innerHTML = "";

  fetch(url)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((json) => {
      console.log("Los datos que puedo utilizar");
      console.log(json);

      json.forEach((element) => {
        ruta.innerHTML += `<div id="ruta">`;
        ruta.innerHTML += `<tr><td>${element.route_name}</td><br><td>Distancia: ${element.distance} m</td><br></tr><br><br>`;
        ruta.innerHTML += `</div>`;
        // añadir el esto si se puede: <td>${element.desc}</td>
      });
      menu.append(ruta);
    })
    .catch((error) => console.log(error));
}
