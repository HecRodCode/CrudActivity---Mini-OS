class WebOSNova {
  constructor() {
    this.init();
  }

  init() {
    this.initTime();
    this.initDock();
    this.initNotifications();
    this.initEventListeners();
    this.showWelcomeNotification();
  }

  // Actualizar hora y fecha
  initTime() {
    this.updateTime();
    setInterval(() => this.updateTime(), 60000); // Actualizar cada minuto
  }

  updateTime() {
    const now = new Date();
    const timeOptions = { hour: "2-digit", minute: "2-digit" };
    const dateOptions = { weekday: "short", day: "numeric" };

    const timeStr = now.toLocaleTimeString("es-ES", timeOptions);
    const dateStr = now.toLocaleDateString("es-ES", dateOptions);

    document.getElementById("current-time").textContent = timeStr;
    document.getElementById("current-date").textContent = dateStr;
  }

  // Inicializar efectos del dock
  initDock() {
    const dockItems = document.querySelectorAll(".dock-item");
    const dock = document.getElementById("dock");

    dockItems.forEach((item) => {
      item.addEventListener("mouseenter", (e) => {
        // Efecto de onda en el dock
        const rect = dock.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const wave = document.createElement("div");
        wave.className = "dock-wave";
        wave.style.left = `${x}px`;
        wave.style.top = "50%";
        dock.appendChild(wave);

        setTimeout(() => wave.remove(), 1000);
      });
    });

    // Efecto de papelera
    const trashBin = document.getElementById("trash-bin");
    trashBin.addEventListener("click", () => {
      this.showNotification("Papelera vacía", "info");
    });

    trashBin.addEventListener("dragover", (e) => {
      e.preventDefault();
      trashBin.style.background = "rgba(255, 95, 87, 0.3)";
    });

    trashBin.addEventListener("dragleave", () => {
      trashBin.style.background = "";
    });
  }

  // Inicializar sistema de notificaciones
  initNotifications() {
    this.notificationArea = document.getElementById("notification-area");
  }

  showWelcomeNotification() {
    setTimeout(() => {
      const welcomeNotif = document.getElementById("welcome-notification");
      welcomeNotif.style.animation = "slideInRight 0.3s ease";
    }, 1000);
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <i class="fas fa-${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.remove()">×</button>
        `;

    this.notificationArea.appendChild(notification);

    // Auto-eliminar
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 5000);
  }

  getNotificationIcon(type) {
    const icons = {
      info: "info-circle",
      success: "check-circle",
      warning: "exclamation-triangle",
      error: "exclamation-circle",
    };
    return icons[type] || "info-circle";
  }

  // Inicializar event listeners
  initEventListeners() {
    // Controles de ventana
    document
      .querySelector(".control-btn.close")
      .addEventListener("click", () => {
        this.closeAppWindow();
      });

    document
      .querySelector(".control-btn.minimize")
      .addEventListener("click", () => {
        this.minimizeAppWindow();
      });

    document
      .querySelector(".control-btn.maximize")
      .addEventListener("click", () => {
        this.toggleMaximizeAppWindow();
      });

    // Menú de Apple
    document.querySelector(".apple-menu").addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-item")) {
        this.handleAppleMenu(e.target.textContent);
      }
    });

    // Teclas rápidas
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "q") {
        this.showNotification("Saliendo de WebOS Nova...", "info");
        setTimeout(() => {
          alert("WebOS Nova cerrado. ¡Hasta pronto!");
        }, 1000);
      }
    });
  }

  // Funciones para manejar ventanas
  closeAppWindow() {
    const iframe = document.getElementById("ventana-app");
    const container = document.querySelector(".app-window-container");
    const finderIcon = document.getElementById("finder-icon");

    // 1. Ocultar el icono del Finder (si está visible)
    if (finderIcon) {
      finderIcon.classList.add("hidden");
    }

    // 2. Ocultar la ventana con animación
    iframe.style.opacity = "0";
    container.style.transform = "translateX(-50%) scale(0.95)";
    container.style.opacity = "0";

    setTimeout(() => {
      container.style.display = "none";
      this.showNotification("Aplicación cerrada completamente", "info");
    }, 300);
  }

  minimizeAppWindow() {
    const container = document.querySelector(".app-window-container");
    const iframe = document.getElementById("ventana-app");
    const finderIcon = document.getElementById("finder-icon");
    const windowTitle = document.getElementById("window-title").textContent;

    // Guardar el estado actual para restaurar
    this.lastAppState = {
      url: iframe.src,
      title: windowTitle,
      visible: true,
    };

    // Minimizar con animación
    container.style.transform = "translateX(-50%) translateY(100vh)";
    container.style.opacity = "0";

    setTimeout(() => {
      container.style.display = "none";

      // MOSTRAR el icono del Finder
      if (finderIcon) {
        finderIcon.classList.remove("hidden");
        finderIcon.querySelector(
          ".dock-tooltip"
        ).textContent = `Restaurar: ${windowTitle}`;
      }
    }, 300);
  }

  toggleMaximizeAppWindow() {
    const container = document.querySelector(".app-window-container");
    const isMaximized = container.classList.toggle("maximized");

    if (isMaximized) {
      container.style.width = "100%";
      container.style.height = "calc(100vh - 30px)";
      container.style.top = "30px";
      container.style.left = "0";
      container.style.transform = "none";
      container.style.borderRadius = "0";
    } else {
      container.style.width = "90%";
      container.style.height = "75vh";
      container.style.top = "50px";
      container.style.left = "50%";
      container.style.transform = "translateX(-50%)";
      container.style.borderRadius = "16px";
    }
  }

  handleAppleMenu(option) {
    switch (option) {
      case "Acerca de WebOS Nova":
        this.showAboutDialog();
        break;
      case "Preferencias del sistema...":
        this.openSettings();
        break;
      case "Salir":
        this.showExitDialog();
        break;
    }
  }

  showAboutDialog() {
    alert(
      "WebOS Nova v1.0\n\nUn sistema operativo web moderno\n© 2025 WebOS Nova\n\nCaracterísticas:\n• Interfaz inspirada en macOS\n• Aplicaciones web integradas\n• Diseño responsivo\n• Efectos visuales avanzados"
    );
  }

  openSettings() {
    const iframe = document.getElementById("ventana-app");
    iframe.src = "apps/configuracion.html";
    this.updateWindowTitle("Configuración del Sistema");
    this.showAppWindow();
  }

  showExitDialog() {
    if (confirm("¿Estás seguro de que quieres salir de WebOS Nova?")) {
      this.showNotification("Saliendo...", "info");
      setTimeout(() => {
        document.body.innerHTML = `
                    <div style="
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        background: linear-gradient(135deg, #000428 0%, #004e92 100%);
                        color: white;
                        font-family: 'SF Pro Display', sans-serif;
                    ">
                        <div style="text-align: center;">
                            <h1 style="font-size: 48px; margin-bottom: 20px;">👋</h1>
                            <h2>WebOS Nova</h2>
                            <p>Sistema operativo cerrado</p>
                            <p style="margin-top: 30px; font-size: 12px; opacity: 0.7;">
                                Recarga la página para reiniciar
                            </p>
                        </div>
                    </div>
                `;
      }, 1000);
    }
  }

  showAppWindow() {
    const container = document.querySelector(".app-window-container");
    container.style.display = "block";
    container.style.opacity = "0";
    container.style.transform = "translateX(-50%) scale(0.95)";

    setTimeout(() => {
      container.style.opacity = "1";
      container.style.transform = "translateX(-50%) scale(1)";
    }, 50);
  }

  updateWindowTitle(title) {
    document.getElementById("window-title").textContent = title;
  }
}

// Funciones globales para uso en HTML
function abrirApp(url, titulo) {
  const iframe = document.getElementById("ventana-app");
  const container = document.querySelector(".app-window-container");
  const finderIcon = document.getElementById("finder-icon");

  // Obtener la URL actual del iframe
  const currentIframeSrc = iframe.src;
  const urlToCompare = url.startsWith("http")
    ? url
    : window.location.origin + "/" + url;

  // Verificar si la misma app ya está abierta y visible
  const isSameApp =
    currentIframeSrc.includes(url) ||
    (url.includes(".html") && currentIframeSrc.includes(url.split("/").pop()));
  const isWindowVisible =
    container.style.display === "block" ||
    getComputedStyle(container).display === "block";

  // Si la misma app ya está abierta y visible, minimizarla
  if (isSameApp && isWindowVisible) {
    webOS.minimizeAppWindow();
    webOS.showNotification(`"${titulo}" minimizada`, "info");
    return;
  }

  // Si la ventana está minimizada (Finder visible) y es la misma app, restaurarla
  if (isSameApp && finderIcon && !finderIcon.classList.contains("hidden")) {
    restoreWindow();
    return;
  }

  // Ocultar el icono del Finder (si está visible)
  if (finderIcon) {
    finderIcon.classList.add("hidden");
  }

  // Mostrar ventana si está oculta
  if (
    container.style.display === "none" ||
    getComputedStyle(container).display === "none"
  ) {
    container.style.display = "block";
    // Restablecer estilos para animación
    container.style.opacity = "0";
    container.style.transform = "translateX(-50%) scale(0.95)";
    container.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
  }

  // Cambiar URL y título
  iframe.src = url;
  webOS.updateWindowTitle(titulo);

  // Efecto de transición
  iframe.style.opacity = "0";

  setTimeout(() => {
    iframe.style.opacity = "1";
    container.style.opacity = "1";
    container.style.transform = "translateX(-50%) scale(1)";
  }, 150);

  // Notificación
  webOS.showNotification(`Aplicación "${titulo}" abierta`, "success");
}

function actualizarTitulo(titulo) {
  document.getElementById("window-title").textContent = titulo;
}

function cerrarNotificacion(id) {
  const notif = document.getElementById(id);
  if (notif) {
    notif.style.transform = "translateX(100%)";
    notif.style.opacity = "0";
    setTimeout(() => notif.remove(), 300);
  }
}

// Función global para restaurar ventana
function restoreWindow() {
  const container = document.querySelector(".app-window-container");
  const finderIcon = document.getElementById("finder-icon");

  if (
    container.style.display === "none" ||
    getComputedStyle(container).display === "none"
  ) {
    container.style.display = "block";
    container.style.opacity = "0";
    container.style.transform = "translateX(-50%) scale(0.95)";
    container.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";

    setTimeout(() => {
      container.style.opacity = "1";
      container.style.transform = "translateX(-50%) scale(1)";

      // OCULTAR el icono del Finder después de restaurar
      if (finderIcon) {
        finderIcon.classList.add("hidden");
      }

      webOS.showNotification("Ventana restaurada", "success");
    }, 50);
  } else {
    webOS.showNotification("La ventana ya está abierta", "info");
  }
}

// Inicializar WebOS Nova cuando el DOM esté listo
let webOS;
document.addEventListener("DOMContentLoaded", () => {
  webOS = new WebOSNova();

  // Efecto de carga inicial
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});
s;
