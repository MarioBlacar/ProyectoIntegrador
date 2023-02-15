// Funciones para el menu
let burger = document.getElementById("burger");
let overlay = document.querySelector("section");
let showMenu = false;

if (sessionStorage.getItem("token") == null) {
  document.getElementById("icono").innerHTML =
    '<a href="../logIn/logIn.php"><svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="#6A994E" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" /></svg></a>';
} else {
  document.getElementById("icono").innerHTML =
    '<a href="../editarPerfil/editarPerfil.php"><svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="#6A994E" class="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg></a>';
}

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

// Funciones para el registro

let boton = document.querySelector("#boton");
boton.addEventListener("click", editarDatosSesion);

function editarDatosSesion() {
  let contraseña = document.getElementById("changePassword").value;
  let email = document.getElementById("changeEmail").value;
  let altura = document.getElementById("changeAltura").value;
  let peso = document.getElementById("changePeso").value;
  let fecha = document.getElementById("changeFecha").value;

  let correr = document.getElementById("correr").checked ? "correr" : "";
  let alpinismo = document.getElementById("alpinismo").checked ? "alpinismo" : "";
  let barranquismo = document.getElementById("barranquismo").checked ? "barranquismo" : "";
  let kayakin = document.getElementById("kayakin").checked ? "kayakin" : "";
  let senderismo = document.getElementById("senderismo").checked ? "senderismo" : "";
  let ciclismo = document.getElementById("ciclismo").checked ? "ciclismo" : "";

  let url = `../../api/usuarios/modificarUsuario.php`;

  let changedUser = {
    usuario:localStorage.getItem("usuario"),
    email: email,
    contraseña: contraseña,
    altura: altura,
    peso: peso,
    fecha: fecha,
    actividades: [
      correr,
      alpinismo,
      barranquismo,
      kayakin,
      senderismo,
      ciclismo
    ],
  };
  console.log(sessionStorage.getItem("usuario"));

  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Authorization": sessionStorage.getItem("token"),
    },
    body: JSON.stringify(changedUser),
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      if ((json.status = 200)) {
        alert("accion realizada");
      } else {
        alert("accion no realizada");
      }
    })
    .catch((error) => console.log(error));
}
