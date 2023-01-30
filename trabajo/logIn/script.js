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

// Funciones para el registro
let botonGuardar = document.getElementById("botonGuardar");
let botonCambiar = document.getElementById("botonCambiar");
let inicio = true;
let paginado = true;
botonCambiar.addEventListener("click", cambioRegistro);

function cambioRegistro() {
  inicio = !inicio;
  if (inicio) {
    document.getElementById("nombreRegistro").innerHTML =
      "<p><strong>EMPEZAR</strong></p>";
    botonCambiar.innerHTML = "<p><strong>INICIAR SESION</strong></p>";
    document.querySelector(".container form").innerHTML =
      "<p><strong>Crear cuenta</strong></p>";
    document.querySelector(".container form").innerHTML +=
      '<input id="createName" type="text" placeholder="Nombre completo"><br>';
    document.querySelector(".container form").innerHTML +=
      '<input id="createUser" type="text" placeholder="Usuario"><br>';
    document.querySelector(".container form").innerHTML +=
      '<input id="createPassword" type="password" placeholder="Contraseña"><br>';
    document.querySelector(".container form").innerHTML +=
      '<input id="createEmail" type="email" placeholder="E-mail"><br>';
    document.querySelector(".container form").innerHTML +=
      '<input id="botonSiguiente" type="button" value="Siguiente"><br>';
    document
      .getElementById("botonSiguiente")
      .addEventListener("click", siguientePagina);
  } else {
    document.getElementById("nombreRegistro").innerHTML =
      "<p><strong>INICIO</strong></p>";

    botonCambiar.innerHTML = "<p><strong>REGISTRARSE</strong></p>";
    document.querySelector(".container form").innerHTML =
      "<p><strong>Bienvenido de nuevo</strong></p>";

    document.querySelector(".container form").innerHTML +=
      '<input id="LogInUser" type="username" placeholder="usuario"><br>';

    document.querySelector(".container form").innerHTML +=
      '<input id="LogInPassword" type="password" placeholder="Contraseña"><br>';

    document.querySelector(".container form").innerHTML +=
      '<input id="botonLog" type="button" value="Iniciar"><br>';
    document
      .getElementById("botonLog")
      .addEventListener("click", iniciarSesion);
  }
}

function siguientePagina() {
  let nombre = document.getElementById("createName").value;
  let usuario = document.getElementById("createUser").value;
  let contraseña = document.getElementById("createPassword").value;
  let email = document.getElementById("createEmail").value;
  document.querySelector(".container form").innerHTML =
    '<input id="seeName" type="hidden" value="' +
    nombre +
    '"><input id="seeUser" type="hidden" value="' +
    usuario +
    '"><input id="seePassword" type="hidden" value="' +
    contraseña +
    '"><input id="seeEmail" type="hidden" value="' +
    email +
    '">';

  // ----------------------------------------------------------------

  paginado = false;
  document.getElementById("nombreRegistro").innerHTML =
    "<p><strong>EMPEZAR</strong></p>";

  botonCambiar.innerHTML = "<p><strong>INICIAR SESION</strong></p>";
  document.querySelector(".container form").innerHTML +=
    "<p><strong>Crear cuenta</strong></p>";

  document.querySelector(".container form").innerHTML +=
    '<input id="createAltura" type="text" placeholder="Altura"><br>';

  document.querySelector(".container form").innerHTML +=
    '<input id="createPeso" type="text" placeholder="Peso"><br>';

  document.querySelector(".container form").innerHTML +=
    '<input id="createFecha" type="date" placeholder="Fecha nacimiento"><br>';

  document.querySelector(".container form").innerHTML +=
    '<input id="createActividades" type="text" placeholder="Actividades"><br>';

  document.querySelector(".container form").innerHTML +=
    '<input id="botonCreate" type="button" value="Finalizar"><br>';
  document.getElementById("botonCreate").addEventListener("click", crearSesion);
}

//Funcionalidad entre la api y la página
// ----------------------------------------------------------------------------------------------------------
function iniciarSesion() {
  let usuario = document.getElementById("LogInUser").value;
  let contraseña = document.getElementById("LogInPassword").value;
  console.log(usuario);
  console.log(contraseña);
}

function crearSesion() {
  let nombre = document.getElementById("seeName").value;
  let usuario = document.getElementById("seeUser").value;
  let contraseña = document.getElementById("seePassword").value;
  let email = document.getElementById("seeEmail").value;
  let altura = document.getElementById("createAltura").value;
  let peso = document.getElementById("createPeso").value;
  let fechaNac = document.getElementById("createFecha").value;
  let actividades = document.getElementById("createActividades").value;
  console.log(nombre);
  console.log(usuario);
  console.log(contraseña);
  console.log(email);
  console.log(altura);
  console.log(peso);
  console.log(fechaNac);
  console.log(actividades);
  // localhost:3000/api/user

  let url = `https://localhost:3000/api/register/`;

  let user = {
    fullname: nombre,
    username: usuario,
    email: email,
    pass: contraseña,
    height: altura,
    weight: peso,
    birthday: fechaNac,
    activities: actividades,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  });
}
