if (sessionStorage.getItem("token") == null) {
  document.getElementById("icono").innerHTML =
    '<a href="../logIn/logIn.php"><svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="#6A994E" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" /></svg></a>';
} else {
  document.getElementById("icono").innerHTML =
  '<a href="../editarPerfil/editarPerfil.php"><svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="#6A994E" class="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg></a>';
}

let burger = document.getElementById("burger");
let overlay = document.querySelector("section");
let heroInfoA = document.querySelector(".hero-a");
let heroInfoB = document.querySelector(".hero-b");
let heroInfoC = document.querySelector(".hero-c");
let heroInfoD = document.querySelector(".hero-d");
let heroInfoE = document.querySelector(".hero-e");
let heroInfoF = document.querySelector(".hero-f");
let heroImage = document.querySelector(".hero-image");
let showMenu = false;
let del = 3;
let i = 1;

let tl = gsap.timeline({
  repeat: -1,
  yoyo: true,
  ease: "expo.out",
});

overlay.style.display = "none";

burger.addEventListener("click", (e) => {
  showMenu = !showMenu;
  if (showMenu) {
    // desplazamiento de las letras móviles
    heroInfoA.style.left = "50%";
    heroInfoB.style.left = "50%";
    heroInfoC.style.left = "50%";
    heroInfoD.style.left = "50%";
    heroInfoE.style.left = "50%";
    heroInfoF.style.left = "50%";
    burger.classList.add("active");
    overlay.style.display = "block";
    // Desplegable para dentro
    gsap.to(overlay, 1, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ease: "expo.in",
    });
  } else {
    // para que el boton de menu se mueva
    burger.classList.remove("active");
    // desplazamiento de las letras móviles
    heroInfoA.style.left = "5%";
    heroInfoB.style.left = "5%";
    heroInfoC.style.left = "5%";
    heroInfoD.style.left = "5%";
    heroInfoE.style.left = "5%";
    heroInfoF.style.left = "5%";
    // desplegable para afuera
    gsap.to(overlay, 1, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      ease: "expo.out",
      onComplete: () => (overlay.style.display = "none"),
    });
  }
});

// movimiento inicial de las letras
gsap.set(["#hero-1 h2, #hero-1 h1, #hero-1 h3"], {
  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
});

gsap.set(
  [
    `#hero-2 h2, #hero-3 h2, #hero-4 h2, #hero-5 h2, #hero-6 h2,
     #hero-2 h1, #hero-3 h1, #hero-4 h1, #hero-5 h1, #hero-6 h1,
     #hero-2 h3, #hero-3 h3, #hero-4 h3, #hero-5 h3, #hero-6 h3`,
  ],
  {
    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
  }
);

// movimiento continuo por cada fondo
while (i < 6) {
  tl.to(`#hero-${i} h2`, 0.9, {
    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    delay: del,
  })
    .to(
      `#hero-${i} h1`,
      0.9,
      {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      },
      "-=0.3"
    )
    .to(
      `#hero-${i} h3`,
      0.9,
      {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      },
      "-=0.3"
    )
    .to(
      `#hero-${i} .hi-${i}`,
      0.7,
      {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      },
      "-=1"
    )
    .to(`#hero-${i + 1} h2`, 0.9, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    })
    .to(
      `#hero-${i + 1} h1`,
      0.9,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      },
      "-=0.3"
    )
    .to(
      `#hero-${i + 1} h3`,
      0.9,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      },
      "-=0.3"
    );

  i++;
}
