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
    "<div class='datos' id='divA'><label for='LogInUser'>Usuario</label><br><input id='LogInUser' type='text'></input></div>";
  inputs.innerHTML +=
    "<div class='datos' id='divB'><label for='LogInPassword'>Contraseña</label><br><input id='LogInPassword' type='password'></input></div>";
  inputs.innerHTML +=
    "<div class='datos' id='divC'><input id='iniciarSesion' type='button' value='iniciar Sesion'></div>";
  let btnLogIn = document.getElementById("iniciarSesion");
  btnLogIn.addEventListener("click", iniciarSesion);
}
function Registro() {
  inputs.style = "padding:0px";
  inputs.innerHTML =
    "<div class='datos' id='div1'><label for='createName'>Nombre</label><br><input id='createName' type='text'></input></div>";
  inputs.innerHTML +=
    "<div class='datos' id='div2'><label for='createUser'>Usuario</label><br><input id='createUser' type='text'></input></div>";
  inputs.innerHTML +=
    "<div class='datos' id='div3'><label for='createPassword'>Contraseña</label><br><input id='createPassword' type='password'></input></div>";
  inputs.innerHTML +=
    "<div class='datos' id='div4'><label for='craeateEmail'>E-mail</label><br><input id='craeateEmail' type='email'></input></div>";
  inputs.innerHTML +=
    "<div class='datos' id='div5'><label for='createPeso'>Peso</label><br><input id='createPeso' type='num'></input></div>";
  inputs.innerHTML +=
    "<div class='datos' id='div6'><label for='createAltura'>Altura</label><br><input id='createAltura' type='num'></input></div>";
  inputs.innerHTML +=
    "<div class='datos' id='div7'><label for='createFecha'>Fecha</label><br><input id='createFecha' type='date'></input></div>";
  inputs.innerHTML +=
    "<div class='datos' id='div8'><label class='actividades' for='correr'>Correr</label><input id='correr' type='checkbox'></input><br><label class='actividades' for='alpinismo'>alpinismo</label><input id='alpinismo' type='checkbox'></input><br><label class='actividades' for='barranquismo'>barranquismo</label><input id='barranquismo' type='checkbox'></input><br></div>";
  inputs.innerHTML +=
    "<div class='datos' id='div9'><label class='actividades' for='kayakin'>kayakin</label><input id='kayakin' type='checkbox'></input><br><label class='actividades' for='senderismo'>senderismo</label><input id='senderismo' type='checkbox'></input><br><label class='actividades' for='ciclismo'>ciclismo</label><input id='ciclismo' type='checkbox'></input><br></div>";
  inputs.innerHTML +=
    "<div class='datos' id='div10'><input id='crearSesion' type='button' value='Registrarse'></div>";
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
  let url = `../../api/usuarios/obtenerUsuario.php`;

  let user = {
    usuario: usuario,
    contraseña: contraseña,
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
        sessionStorage.setItem("usuario", usuario);
        if (sessionStorage.getItem("token") == null) {
          document.getElementById("icono").innerHTML =
            '<a href="../logIn/logIn.php"><svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="#6A994E" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" /></svg></a>';
        } else {
          document.getElementById("icono").innerHTML =
            '<a href="../editarPerfil/editarPerfil.php"><svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="#6A994E" class="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg></a>';
        }
        alert("Has iniciado sesion correctamente");
      } else {
        console.log(json.msg);
        alert(json.msg);
        alert("Datos incorrectos");
      }
    });
  //.catch((error) => console.log(error));
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

  let urlRegistro = `../../api/usuarios/anadirUsuario.php`;

  let user = {
    nombre: nombre,
    usuario: usuario,
    email: email,
    contraseña: contraseña,
    altura: altura,
    peso: peso,
    fecha: fechaNac,
    actividades: actividades,
  };

  console.log(JSON.stringify(user));

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
    });
  // .catch((error) => console.log(error));
}
