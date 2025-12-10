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
      ├── /bienvenida
      │     ├── bienvenida.html
      │     └── bienvenida.css
      │
      ├── /calculator
      │     ├── calculator.html
      │     └── cal_styles.css
      │
      ├── /configuracion
      │     ├── configuracion.html
      │     ├── configuracion.css
      │     └── configuracion.js
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
      ├── /juegos
      │     ├── juegos.html
      │     └── juegos.css
      │
      ├── /music
      │     ├── music.html
      │     ├── music_styles.css
      │     ├── afgan_k.jpeg
      │     ├── born_this_way.jpeg
      │     ├── empty_like.png
      │     ├── filled_like.png
      │     ├── rodolfo.jpeg
      │     │
      │     └── /songs
      │           ├── afgan K.mp3
      │           ├── CARIÑITO-RODOLFO AICARDI.mp3
      │           ├── Lady Gaga - The Edge Of Glory.mp3
      │           └── (otros audios si se agregan)
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

| Aplicación                 | Archivos                                                                                                             | Funciones                                                                                | Descripción                                                                                                               |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Bienvenida**             | Apps/bienvenida/bienvenida.html<br>Apps/bienvenida/bienvenida.css                                                    | - Vista inicial del sistema<br>- Enlaces a todas las aplicaciones                        | Pantalla inicial del Mini OS que actúa como hub central, mostrando accesos rápidos a cada aplicación instalada.           |
| **Configuración**          | Apps/configuracion/configuracion.html<br>Apps/configuracion/configuracion.css<br>Apps/configuracion/configuracion.js | - Cambiar fondo del Mini OS<br>- Ajustes gráficos<br>- Controles interactivos            | Centro de control del sistema donde el usuario puede personalizar la apariencia del Mini OS, incluyendo wallpaper.        |
| **Centro de Juegos**       | Apps/juegos/juegos.html<br>Apps/juegos/juegos.css                                                                    | - Lanzador de juegos integrados<br>- Interfaz de selección visual                        | Menú que organiza los diferentes juegos retro disponibles, permitiendo abrirlos fácilmente desde una misma ventana.       |
| **Calculadora**            | Apps/calculator/calculator.html<br>Apps/calculator/cal_styles.css                                                    | - Suma, resta, multiplicación y división<br>- Decimales<br>- Borrar display              | Herramienta básica del sistema para operaciones rápidas con una interfaz clara y sencilla.                                |
| **Doom (mini-juego)**      | Apps/doom/doom.html                                                                                                  | - Ejecutar DOOM clásico embebido                                                         | Juego retro icónico disponible directamente desde la ventana del Mini OS.                                                 |
| **Galería de Imágenes**    | Apps/galery/image_gallery.html<br>Apps/galery/style_image.css<br>(+ imágenes .svg)                                   | - Visualización de imágenes<br>- Zoom<br>- Diseño macOS                                  | Galería visual elegante con imágenes organizadas tipo biblioteca multimedia.                                              |
| **Reproductor de Música**  | Apps/music/music.html<br>Apps/music/music_styles.css<br>Apps/music/songs/(*.mp3)                                     | - Reproducción de canciones<br>- Like interactivo<br>- Lista de temas                    | Un reproductor sencillo y atractivo que permite escuchar música del sistema (incluye carpeta *songs* con pistas en .mp3). |
| **Navegador Web Simulado** | Apps/navegador/navegador.html<br>Apps/navegador/navegador.css<br>Apps/navegador/navegador.js                         | - Barra de URL<br>- Navegación interna<br>- Interfaz visual del navegador                | Navegador simulado que permite explorar contenido predefinido dentro del Mini OS.                                         |
| **Block de Notas**         | Apps/notas/notita.html<br>Apps/notas/notas.css<br>Apps/notas/notas.js                                                | - Escribir y guardar notas (localStorage)<br>- Editor básico                             | Bloc de notas simple para apuntes rápidos dentro del Mini OS.                                                             |
| **Juegos Retro** (iframe)  | Apps/juegos/*(integrados)*                                                                                           | - Minecraft Classic<br>- Tetris<br>- Pac-Man<br>- Snake<br>- Space Invaders<br>- Ajedrez | Colección de juegos clásicos incrustados mediante iframes, accesibles desde el menú de juegos.                            |


# 🧩 Features principales 

## 🎛️ Sistema de escritorio

- Escritorio con íconos interactivos al estilo macOS.
- Ventana de bienvenida al iniciar, mostrando las apps disponibles.
- Fondo personalizable desde la app de Configuración.
- Organización visual limpia tipo macOS.

## 🌐 Barra superior

- Ícono estilo Apple con menú desplegable.
- Menús: Finder, Archivo, Editar, Ver, Ir, Ventana, Ayuda.
- Indicadores de estado: Wi-Fi, volumen, batería.
- Reloj en tiempo real (hora y fecha).
- Panel de usuario.

## ⚙️ Centro de Control (Control Center)

Incluye controles funcionales y animados:
- Wi-Fi (toggle)
- Bluetooth (toggle)
- AirDrop (toggle)
- Focus Mode
- Stage Manager
- Screen Mirroring

## 💡 Controles de hardware

- Brillo de pantalla (slider)
- Volumen (slider)
- Indicadores visuales en tiempo real.

## 🎵 Mini reproductor dentro del Control Center

- Vista previa de música.
- Play/Pause funcional.
- Información de la canción.

## 🪟 Sistema de ventanas avanzado

- Sistema basado en iframes (todas las apps se cargan dentro de la ventana principal).
- Botones: cerrar, minimizar, maximizar.
- Cambio dinámico del título según la app abierta.
- Restauración de ventanas desde el Dock.
- Animaciones fluidas estilo macOS.

## 🧭 Dock de aplicaciones (estilo macOS)

- Íconos con hover “zoom” (efecto muelle).
- Separadores visuales.
- Icono para restaurar ventanas.
- Papelera funcional.
- Notificaciones animadas, incluyendo la notificación de bienvenida.

## 🖼️ Apps integradas (Mini OS Apps)

### 📌 Apps clásicas
Calculadora
Bloc de Notas
Galería de Imágenes
Reproductor de Música
Navegador Web (simulado)
DOOM (juego embebido)

🆕 Apps nuevas
- Bienvenida → Muestra las apps disponibles del Mini OS.
- Configuración → Cambiar fondo de pantalla y ajustes visuales.
- Juegos → Menú interactivo con enlaces a:
      - Minecraft Classic
      - Tetris
      - DOOM
      - Pac-Man
      - Ajedrez
      - Space Invaders
      - Snake