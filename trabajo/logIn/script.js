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
let btnCambiarLogIn = document.getElementById("btnCambiarLogIn");
let btnCambiarRegistro = document.getElementById("btnCambiarRegistro");
btnCambiarLogIn.addEventListener("click", LogIn);
btnCambiarRegistro.addEventListener("click", Registro);

let inputs = document.querySelector("#formulario form");

function LogIn() {
  inputs.innerHTML =
    "<label for='LogInUser'>Usuario</label><input id='LogInUser' type='text'></input><br>";
  inputs.innerHTML +=
    "<label for='LogInPassword'>Contraseña</label><input id='LogInPassword' type='text'></input><br>";

  inputs.innerHTML += "<input id='iniciarSesion' type='button'>";
  let btnLogIn = document.getElementById("iniciarSesion");
  btnLogIn.addEventListener("click", iniciarSesion);
}
function Registro() {
  inputs.style = "padding:0px";
  inputs.innerHTML =
    "<label for='createName'>Nombre</label><input id='createName' type='text'></input>";
  inputs.innerHTML +=
    "<label for='createUser'>Usuario</label><input id='createUser' type='text'></input><br>";
  inputs.innerHTML +=
    "<label for='createPassword'>Contraseña</label><input id='createPassword' type='text'></input>";
  inputs.innerHTML +=
    "<label for='craeateEmail'>E-mail</label><input id='craeateEmail' type='text'></input><br>";
  inputs.innerHTML +=
    "<label for='createAltura'>Altura</label><input id='createAltura' type='text'></input>";
  inputs.innerHTML +=
    "<label for='createPeso'>Peso</label><input id='createPeso' type='text'></input><br>";
  inputs.innerHTML +=
    "<label for='createFecha'>Fecha</label><input id='createFecha' type='text'></input><br>";
  inputs.innerHTML +=
    "<label for='correr'>Correr</label><input id='correr' type='checkbox'></input>";
  inputs.innerHTML +=
    "<label for='alpinismo'>alpinismo</label><input id='alpinismo' type='checkbox'></input><br>";
  inputs.innerHTML +=
    "<label for='barranquismo'>barranquismo</label><input id='barranquismo' type='checkbox'></input><br>";
  inputs.innerHTML +=
    "<label for='kayakin'>kayakin</label><input id='kayakin' type='checkbox'></input><br>";
  inputs.innerHTML +=
    "<label for='senderismo'>senderismo</label><input id='senderismo' type='checkbox'></input><br>";
  inputs.innerHTML +=
    "<label for='ciclismo'>ciclismo</label><input id='ciclismo' type='checkbox'></input><br>";

  inputs.innerHTML += "<input id='crearSesion' type='button'>";
  let btnRegistro = document.getElementById("crearSesion");
  btnRegistro.addEventListener("click", crearSesion);
}

//Funcionalidad entre la api y la página
// ----------------------------------------------------------------------------------------------------------

//Funciona
function iniciarSesion() {
  let usuario = document.getElementById("LogInUser").value;
  let contraseña = document.getElementById("LogInPassword").value;
  console.log(usuario);
  console.log(contraseña);
  // localhost:{Lo que me ponga en el nodemon}/api/login/

  let url = `http://localhost:5000/api/login/`;

  let user = {
    username: usuario,
    pass: contraseña,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      if ((json.status = 200)) {
        sessionStorage.setItem("token", json.token);
        sessionStorage.setItem("id", json.id);
        console.log(sessionStorage.getItem("token"));
        if (sessionStorage.getItem("token") == null) {
          document.getElementById("icono").innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="#6A994E" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" /></svg>';
        } else {
          document.getElementById("icono").innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="#6A994E" class="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg>';
        }
      } else {
        inputs.html = `<h1>${json.msg}</h1>`;
      }
    })
    .catch((error) => console.log(error));
}

//Funciona, no tocar ni con un palo
function crearSesion() {
  let nombre = document.getElementById("createName").value;
  let usuario = document.getElementById("createUser").value;
  let contraseña = document.getElementById("createPassword").value;
  let email = document.getElementById("craeateEmail").value;
  let altura = document.getElementById("createAltura").value;
  let peso = document.getElementById("createPeso").value;
  let fechaNac = document.getElementById("createFecha").value;
  let boxCorrer = document.getElementById("correr").checked ? "correr" : "";
  let boxAlpinismo = document.getElementById("alpinismo").checked
    ? "alpinismo"
    : "";
  let boBarranquismo = document.getElementById("barranquismo").checked
    ? "barranquismo"
    : "";
  let boxSenderismo = document.getElementById("senderismo").checked
    ? "senderismo"
    : "";
  let boxKayakin = document.getElementById("kayakin").checked ? "kayakin" : "";
  let boxCiclismo = document.getElementById("ciclismo").checked
    ? "ciclismo"
    : "";
  // let boxCiclismo = document.getElementById("ciclismo").checked;

  console.log(nombre);
  console.log(usuario);
  console.log(contraseña);
  console.log(email);
  console.log(altura);
  console.log(peso);
  console.log(fechaNac);
  let actividades = [
    boxCorrer,
    boxAlpinismo,
    boBarranquismo,
    boxSenderismo,
    boxKayakin,
    boxCiclismo,
  ];
  // localhost:{Lo que me ponga en el nodemon}/api/user

  let urlRegistro = `http://localhost:5000/api/register/`;
  let token;

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

  fetch(urlRegistro, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((json) => {
      inputs.innerHTML = `<h1>${json.msg}</h1>`;
    })
    .catch((error) => console.log(error));
}

// function cerrarSesion(){
//   sessionStorage.removeItem("token");
// }
