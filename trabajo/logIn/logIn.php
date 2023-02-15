<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <title>El Cañarete</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins&amp;display=swap" />
  <link rel="stylesheet" href="./style.css" />
</head>

<body>
  <!-- partial:index.partial.html -->
  <div class="page-wrap">
    <header class="page-header">
      <nav>
        <h1><a href="../landingPage/index.html">El Cañarete</a></h1>
        <div>
          <ul>
            <li id="icono"></li>
            <li id="burger">
              <span></span>
              <span></span>
              <span></span>
            </li>
          </ul>
        </div>
      </nav>

      <main>
        
        <div id="formulario">
          <div id="btnCambiarLogIn">login</div>
          <div id="btnCambiarRegistro">Registrarse</div>
          <form >
          </form>
        </div>
      </main>
    </header>

    <section>
      <ul class="level-1">
        <li>
          <h3>Rutas Disponibles</h3>
          <ul class="level-2">
            <li>Andalucía</li>
            <li>Aragón</li>
            <li>Asturias</li>
            <li>Islas Baleares</li>
            <li>Canarias</li>
            <li>Cantabria</li>
            <li>Castilla León</li>
            <li>Castilla La Mancha</li>
            <li>Cataluña</li>
            <li>Extremadura</li>
            <li>Galicia</li>
            <li>Madrid</li>
            <li>Pais Vasco</li>
            <li>La Rioja</li>
          </ul>
        </li>
        <li>
          <h3>Empezar</h3>
          <ul>
            <li><a href="../logIn/logIn.php">Iniciar sesion</a></li>
            <li><a href="../rutas/rutas.php">Buscar rutas</a></li>
            <li><a href="../rutas/rutas.php">Rutas guardadas</a></li>
            <li><a href="../landingPage/index.html">Página principal</a></li>
          </ul>
          <p><small><a href="../cerrarSesion/cerrarSesion.php">Cerrar sesion</a></small></p>
        </li>
        <li>
          <h3>Recursos</h3>
          <ul>
            <li>Personalizar preferencias de viaje</li>
            <li>Idioma</li>
          </ul>
          <p><small>mas recursos...</small></p>
        </li>
        <li>
          <h3>Sobre Nosotros</h3>
          <ul>
            <li>Nuestra Historia</li>
            <li>Trabaja con nosotros</li>
            <li>Instagram</li>
          </ul>
        </li>
      </ul>
    </section>
  </div>
  <!-- partial -->
  <script src="https://unpkg.co/gsap@3/dist/gsap.min.js"></script>
  <script src="./script.js"></script>
</body>

</html>