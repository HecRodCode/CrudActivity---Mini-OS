<p align="center">
  <img src="/assets/NovaOS.png" width="1000">
</p>

<h1 align="center">Nova OS</h1>

---

## 💻 Integrantes del equipo de desarrollo 

- Héctor Hernán Ríos Rodríguez (Documentación - Gestión de PRs) - Lider
- Sebastián Vargas Ramírez (Diseño de escritorio - Sistema Operativo)
- Verónica Martínez Cadavid (Desarrollo de Apps - Reproductor de música, Calculadora & Block de Notas)
- Edwar Jamison Ríos Tobón (Desarrollo de Apps - Galeria de imagenes)

---

## 🚀 Breve descripción

Nova OS es un sistema operativo web inspirado en macOS, diseñado para ofrecer una experiencia de escritorio completamente funcional desde el navegador.
Recrea elementos clásicos de un entorno operativo real como el escritorio, el dock, ventanas dinámicas, un centro de control interactivo y notificaciones del sistema.

Incluye varias aplicaciones internas (Calculadora, Notas, Galería, Música, Navegador simulado, Juegos y más) así como un sistema de ventanas con comportamiento realista.
Su diseño combina un estilo moderno, animaciones suaves y una estructura modular pensada para facilitar la expansión del sistema.

---

## 📁 Estructura del proyecto

    /Apps
    │
    ├── /calculator
    │     ├── calculator.html
    │     └── cal_styles.css
    │
    ├── /doom
    │     └── doom.html
    │
    ├── /galery
    │     ├── image_gallery.html
    │     ├── style_image.css
    │     ├── 1-1.svg
    │     ├── 2-2.svg
    │     ├── 3-3.svg
    │     ├── 4-4.svg
    │     └── 5-5.svg
    │
    ├── /music
    │     ├── music.html
    │     ├── music_styles.css
    │     ├── afgan_k.jpeg
    │     ├── born_this_way.jpeg
    │     ├── empty_like.png
    │     ├── filled_like.png
    │     ├── rodolfo.jpeg
    │
    ├── /navegador
    │     ├── navegador.html
    │     ├── navegador.css
    │     └── navegador.js
    │
    └── /notas
          ├── notita.html
          ├── notas.css
          └── notas.js

    /assets
    │
    └── /media
          ├── apple-logo.svg
          ├── doom.png
          └── wallpaper.jpg

    /styles
    │
    └── control-panel.css

    index.html
    styles.css
    script.js
    README.md

---

## 📦 Aplicaciones disponibles

| Aplicación                | Archivos                                                                                     | Funciones                                                                           | Descripción                                                                                                                 |
| ------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Calculadora**           | Apps/calculator/calculator.html<br>Apps/calculator/cal_styles.css                            | - Suma, resta, multiplicación y división<br>- Números decimales<br>- Borrar display | Herramienta básica del sistema para realizar operaciones rápidas con una interfaz clara y práctica.                         |
| **Doom (mini-juego)**     | Apps/doom/doom.html                                                                          | - Reproducir juego DOOM embebido                                                    | Aplicación recreativa del sistema, pensada para ofrecer una experiencia retro directamente en el escritorio web.            |
| **Galería de Imágenes**   | Apps/galery/image_gallery.html<br>Apps/galery/style_image.css<br>(+ imágenes .svg)           | - Visualización de imágenes<br>- Ajuste de zoom<br>- Diseño tipo macOS              | Vista moderna y organizada de las imágenes del sistema, con interfaz limpia y navegación fluida tipo biblioteca multimedia. |
| **Reproductor de Música** | Apps/music/music.html<br>Apps/music/music_styles.css<br>(+ imágenes de carátulas)            | - Reproducción de audio<br>- Botón de “like” interactivo<br>- Cambio de canciones   | Aplicación multimedia que permite escuchar música con una interfaz amigable y visualmente atractiva.                        |
| **Navegador Web**         | Apps/navegador/navegador.html<br>Apps/navegador/navegador.css<br>Apps/navegador/navegador.js | - Barra de navegación<br>- Carga de sitios integrados<br>- Interfaz simulada        | Navegador simulado que replica funciones básicas para navegar dentro del entorno del sistema.                               |
| **Block de Notas**        | Apps/notas/notita.html<br>Apps/notas/notas.css<br>Apps/notas/notas.js                        | - Escribir y guardar notas (localStorage)<br>- Editor simple                        | Aplicación ligera para tomar notas rápidas dentro del sistema, ideal para ideas o recordatorios.                            |

## 🧩 Features principales 

### 🎛️ Sistema de escritorio

- Escritorio con iconos interactivos.
- Fondo personalizable (wallpaper).
- Organización visual tipo macOS.

### 🌐 Barra superior

- Ícono estilo Apple con menú desplegable.
- Menús de navegación: Finder, Archivo, Editar, Ver, Ir, Ventana, Ayuda.
- Indicadores de estado: Wi-Fi, volumen, batería.
- Reloj en tiempo real (hora y fecha).
- Panel de usuario.

### ⚙️ Centro de Control (Control Center)

- Incluye switches funcionales y estilos animados:
- Wi-Fi (toggle)
- Bluetooth (toggle)
- AirDrop (toggle)
- Focus Mode
- Stage Manager
- Screen Mirroring

### 💡 Controles de hardware (sliders)

- Control de brillo de pantalla.
- Control de volumen.
- Indicadores visuales actualizados en tiempo real.

### 🎵 Mini reproductor dentro del Control Center

- Vista previa de música.
- Play/Pause funcional.
- Información de la canción.

### 🪟 Sistema de ventanas

Ventana principal con:

- Botón cerrar
- Minimizar
- Maximizar
- Cambio dinámico del título según la app.
- Visualización de apps dentro de un <iframe>.
- Restauración de ventanas desde el dock.

### 🧭 Dock de aplicaciones (estilo macOS)

- Íconos interactivos con hover “zoom”.
- Separadores estilo macOS.
- Icono para restaurar ventanas.
- Papelera.
- Sistema de notificaciones
- Notificación de bienvenida animada.
- Botón para cerrarla.

### 🖼️ Apps integradas (Mini OS Apps)

- Calculadora
- Bloc de Notas
- Galería de imágenes
- Reproductor de Música
- Navegador Web (simulado)
- DOOM (icono y launcher)
- Juegos (app base)
- Configuración