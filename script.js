class WebOSNova {
  constructor() {
    this.init();
    this.quickSettingsVisible = false;
    this.currentSong = null;
    this.musicPlaying = false;
    this.initQuickSettings();

    window.addEventListener("message", (event) => {
      if (event.data.type === "music") {
        this.handleMusicMessage(event.data);
      }
    });
  }

  /* Inicialización del sistema */
  init() {
    this.initTime();
    this.initDock();
    this.initNotifications();
    this.initEventListeners();
    this.showWelcomeNotification();
  }

  /* Sistema de hora y fecha */
  initTime() {
    this.updateTime();
    setInterval(() => this.updateTime(), 60000);
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

  /* Sistema del Dock de aplicaciones */
  initDock() {
    const dockItems = document.querySelectorAll(".dock-item");
    const dock = document.getElementById("dock");

    dockItems.forEach((item) => {
      item.addEventListener("mouseenter", (e) => {
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

    /* Funcionalidad de la Papelera */
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

  /* Sistema de notificaciones */
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

  handleMusicMessage(data) {
    if (data.action === "songChange") {
      this.currentSong = {
        file: data.songFile,
        title: data.title,
      };
      this.updateMusicPanel(data.title, data.isPlaying);
    } else if (data.action === "playState") {
      this.musicPlaying = data.isPlaying;
      this.updateMusicPanel(
        this.currentSong ? this.currentSong.title : null,
        data.isPlaying
      );
    }
  }

  updateMusicPanel(title, isPlaying) {
    const musicTitle = document.querySelector(".music-info h4");
    const musicArtist = document.querySelector(".music-artist");
    const playIcon = document.getElementById("play-icon");

    if (title) {
      const parts = title.split(" - ");
      musicTitle.textContent = parts[0] || title;
      musicArtist.textContent = parts[1] || "";
    }

    if (isPlaying) {
      playIcon.className = "fas fa-pause";
    } else {
      playIcon.className = "fas fa-play";
    }

    this.musicPlaying = isPlaying;
  }

  /* Event Listeners del sistema */
  initEventListeners() {
    /* Controles de ventana (cerrar, minimizar, maximizar) */
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

    /* Menú de Apple */
    document.querySelector(".apple-menu").addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-item")) {
        this.handleAppleMenu(e.target.textContent);
      }
    });

    /* Atajos de teclado */
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "q") {
        this.showNotification("Saliendo de WebOS Nova...", "info");
        setTimeout(() => {
          alert("WebOS Nova cerrado. ¡Hasta pronto!");
        }, 1000);
      }
    });
  }

  /* Gestión de ventanas de aplicaciones */
  closeAppWindow() {
    const iframe = document.getElementById("ventana-app");
    const container = document.querySelector(".app-window-container");
    const finderIcon = document.getElementById("finder-icon");

    if (iframe.src.includes("calculator")) {
      restaurarEstiloVentana();
    }

    if (finderIcon) {
      finderIcon.classList.add("hidden");
    }

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

    this.lastAppState = {
      url: iframe.src,
      title: windowTitle,
      visible: true,
    };

    container.style.transform = "translateX(-50%) translateY(100vh)";
    container.style.opacity = "0";

    setTimeout(() => {
      container.style.display = "none";

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

  /* Manejo del menú Apple */
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

  /* Panel de Configuración Rápida (Control Center) */
  initQuickSettings() {
    const timeElement = document.getElementById("current-time");
    const dateElement = document.getElementById("current-date");
    const timeDateContainer = timeElement.parentElement;

    timeDateContainer.addEventListener("click", (e) => {
      if (
        e.target === timeElement ||
        e.target === dateElement ||
        e.target.closest(".status-item")
      ) {
        this.toggleQuickSettings();
      }
    });

    this.setupQuickSettingsControls();

    document.addEventListener("click", (e) => {
      const panel = document.getElementById("quick-settings");
      const isClickInside = panel.contains(e.target);
      const isTimeDateClick = timeDateContainer.contains(e.target);

      if (!isClickInside && !isTimeDateClick && this.quickSettingsVisible) {
        this.hideQuickSettings();
      }
    });

    this.updateTime();
  }

  toggleQuickSettings() {
    if (this.quickSettingsVisible) {
      this.hideQuickSettings();
    } else {
      this.showQuickSettings();
    }
  }

  showQuickSettings() {
    const panel = document.getElementById("quick-settings");
    panel.classList.remove("hidden");
    panel.style.animation = "fadeInUp 0.3s ease";
    this.quickSettingsVisible = true;
  }

  hideQuickSettings() {
    const panel = document.getElementById("quick-settings");
    panel.style.animation = "none";
    setTimeout(() => {
      panel.classList.add("hidden");
    }, 50);
    this.quickSettingsVisible = false;
  }

  setupQuickSettingsControls() {
    /* Control de brillo de pantalla */
    const brightnessSlider = document.getElementById("display-brightness");
    const brightnessValue = document.getElementById("brightness-value");

    brightnessSlider.addEventListener("input", (e) => {
      const value = e.target.value;
      brightnessValue.textContent = `${value}%`;
      document.body.style.filter = `brightness(${value}%)`;
    });

    /* Control de volumen */
    const volumeSlider = document.getElementById("volume-control");
    const volumeValue = document.getElementById("volume-value");

    volumeSlider.addEventListener("input", (e) => {
      const value = e.target.value;
      volumeValue.textContent = `${value}%`;
      const volumeIcon = document.querySelector(".fa-volume-up");
      if (volumeIcon) {
        volumeIcon.className =
          value == 0
            ? "fas fa-volume-mute"
            : value < 50
            ? "fas fa-volume-down"
            : "fas fa-volume-up";
      }
    });
  }

  /* Funciones de toggle para conectividad */
  toggleWifi() {
    const wifiSwitch = document.getElementById("wifi-switch");
    const wifiStatus = document.getElementById("wifi-status");
    const isActive = wifiSwitch.classList.toggle("active");

    if (isActive) {
      wifiStatus.textContent = "Rimi Coders";
      this.showNotification("Wi-Fi conectado a Rimi Coders", "success");
    } else {
      wifiStatus.textContent = "Off";
      this.showNotification("Wi-Fi desactivado", "warning");
    }
  }

  /* Bluetooth */
  toggleBluetooth() {
    const bluetoothStatus = document.getElementById("bluetooth-status");
    const bluetoothSwitch = document.getElementById("bluetooth-switch");
    const isOn = bluetoothStatus.textContent === "On";

    if (isOn) {
      bluetoothStatus.textContent = "Off";
      bluetoothSwitch.classList.remove("active");
      this.showNotification("Bluetooth desactivado", "warning");
    } else {
      bluetoothStatus.textContent = "On";
      bluetoothSwitch.classList.add("active");
      this.showNotification("Bluetooth activado", "success");
    }
  }

  toggleAirdrop() {
    const airdropStatus = document.getElementById("airdrop-status");
    const airdropSwitch = document.getElementById("airdrop-switch");
    const current = airdropStatus.textContent;

    if (current === "Contacts Only") {
      airdropStatus.textContent = "Everyone";
      airdropSwitch.classList.add("active");
      this.showNotification("AirDrop configurado para Todos", "info");
    } else if (current === "Everyone") {
      airdropStatus.textContent = "Off";
      airdropSwitch.classList.remove("active");
      this.showNotification("AirDrop desactivado", "warning");
    } else {
      airdropStatus.textContent = "Contacts Only";
      airdropSwitch.classList.add("active");
      this.showNotification("AirDrop configurado para Solo Contactos", "info");
    }
  }

  /* Funciones de toggle para modos del sistema */
  toggleFocus() {
    const focusStatus = document.getElementById("focus-status");
    const isOn = focusStatus.textContent === "On";

    if (isOn) {
      focusStatus.textContent = "Off";
      this.showNotification("Focus desactivado", "info");
    } else {
      focusStatus.textContent = "On";
      this.showNotification("Focus activado - No molestar", "success");
    }
  }

  toggleStageManager() {
    const stageStatus = document.getElementById("stage-status");
    const isOn = stageStatus.textContent === "On";

    if (isOn) {
      stageStatus.textContent = "Off";
      this.showNotification("Stage Manager desactivado", "info");
    } else {
      stageStatus.textContent = "On";
      this.showNotification("Stage Manager activado", "success");
    }
  }

  toggleScreenMirroring() {
    const mirrorStatus = document.getElementById("mirror-status");
    const isOn = mirrorStatus.textContent === "On";

    if (isOn) {
      mirrorStatus.textContent = "Off";
      this.showNotification("Screen Mirroring desactivado", "info");
    } else {
      mirrorStatus.textContent = "On";
      this.showNotification(
        "Buscando dispositivos para Screen Mirroring...",
        "info"
      );
    }
  }

  togglePlay() {
    const iframe = document.getElementById("ventana-app");

    if (iframe && iframe.src.includes("music.html") && iframe.contentWindow) {
      try {
        iframe.contentWindow.togglePlay();
      } catch (e) {
        const playIcon = document.getElementById("play-icon");
        this.musicPlaying = !this.musicPlaying;

        if (this.musicPlaying) {
          playIcon.className = "fas fa-pause";
          this.showNotification("Reproduciendo: The Edge Of Glory", "success");
        } else {
          playIcon.className = "fas fa-play";
          this.showNotification("Música en pausa", "info");
        }
      }
    } else {
      const playIcon = document.getElementById("play-icon");
      this.musicPlaying = !this.musicPlaying;

      if (this.musicPlaying) {
        playIcon.className = "fas fa-pause";
        this.showNotification("Reproduciendo: The Edge Of Glory", "success");
      } else {
        playIcon.className = "fas fa-play";
        this.showNotification("Música en pausa", "info");
      }
    }
  }

  openMusicApp() {
    abrirApp("apps/musica/music.html", "Reproductor de Música");
    this.hideQuickSettings();
  }
}

/* Función para abrir aplicaciones */
function abrirApp(url, titulo) {
  const iframe = document.getElementById("ventana-app");
  const container = document.querySelector(".app-window-container");
  const finderIcon = document.getElementById("finder-icon");

  const currentIframeSrc = iframe.src;
  const urlToCompare = url.startsWith("http")
    ? url
    : window.location.origin + "/" + url;

  const isSameApp =
    currentIframeSrc.includes(url) ||
    (url.includes(".html") && currentIframeSrc.includes(url.split("/").pop()));
  const isWindowVisible =
    container.style.display === "block" ||
    getComputedStyle(container).display === "block";

  if (isSameApp && isWindowVisible) {
    webOS.minimizeAppWindow();
    webOS.showNotification(`"${titulo}" minimizada`, "info");
    return;
  }

  if (isSameApp && finderIcon && !finderIcon.classList.contains("hidden")) {
    restoreWindow();
    return;
  }

  if (finderIcon) {
    finderIcon.classList.add("hidden");
  }

  if (
    container.style.display === "none" ||
    getComputedStyle(container).display === "none"
  ) {
    container.style.display = "block";
    container.style.opacity = "0";
    container.style.transform = "translateX(-50%) scale(0.95)";
    container.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
  }

  iframe.src = url;
  webOS.updateWindowTitle(titulo);

  if (url.includes("calculator")) {
    setTimeout(() => {
      ajustarVentanaCalculadora();
    }, 100);
  }

  iframe.style.opacity = "0";

  setTimeout(() => {
    iframe.style.opacity = "1";
    container.style.opacity = "1";
    container.style.transform = "translateX(-50%) scale(1)";
  }, 150);

  webOS.showNotification(`Aplicación "${titulo}" abierta`, "success");
}

function ajustarVentanaCalculadora() {
  const container = document.querySelector(".app-window-container");
  const iframe = document.getElementById("ventana-app");

  if (!window.originalWindowStyle) {
    window.originalWindowStyle = {
      width: container.style.width,
      height: container.style.height,
      top: container.style.top,
      left: container.style.left,
      transform: container.style.transform,
      borderRadius: container.style.borderRadius,
    };
  }

  // Ajustes para la calculadora
  container.style.width = "395px";
  container.style.height = "580px";
  container.style.top = "50px";
  container.style.left = "500px";
  container.style.transform = "none";
  container.style.borderRadius = "16px";

  iframe.style.width = "100%";
  iframe.style.height = "100%";
}

function restaurarEstiloVentana() {
  const container = document.querySelector(".app-window-container");

  if (window.originalWindowStyle) {
    container.style.width = window.originalWindowStyle.width;
    container.style.height = window.originalWindowStyle.height;
    container.style.top = window.originalWindowStyle.top;
    container.style.left = window.originalWindowStyle.left;
    container.style.transform = window.originalWindowStyle.transform;
    container.style.borderRadius = window.originalWindowStyle.borderRadius;
  } else {
    container.style.width = "90%";
    container.style.height = "75vh";
    container.style.top = "50px";
    container.style.left = "50%";
    container.style.transform = "translateX(-50%)";
    container.style.borderRadius = "16px";
  }
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

/* Función para restaurar ventana minimizada */
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

      if (finderIcon) {
        finderIcon.classList.add("hidden");
      }

      webOS.showNotification("Ventana restaurada", "success");
    }, 50);
  } else {
    webOS.showNotification("La ventana ya está abierta", "info");
  }
}

/* Funciones globales para controles del sistema */
function toggleQuickSettings() {
  if (webOS) {
    webOS.toggleQuickSettings();
  }
}

function toggleWifi() {
  if (webOS) webOS.toggleWifi();
}

/* Bluetooth */
function toggleBluetooth() {
  if (webOS) webOS.toggleBluetooth();
}

function toggleAirdrop() {
  if (webOS) webOS.toggleAirdrop();
}

function toggleFocus() {
  if (webOS) webOS.toggleFocus();
}

function toggleStageManager() {
  if (webOS) webOS.toggleStageManager();
}

function toggleScreenMirroring() {
  if (webOS) webOS.toggleScreenMirroring();
}

function togglePlay() {
  if (webOS) webOS.togglePlay();
}

function openMusicApp() {
  if (webOS) webOS.openMusicApp();
}

function cambiarFondoPrincipal(urlFondo) {

    document.body.style.backgroundImage = urlFondo;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    

    try {
        localStorage.setItem('fondoEscritorio', urlFondo);
    } catch (e) {
        console.log("No se pudo guardar el fondo:", e);
    }
}
window.addEventListener('message', function(event) {
    
    if (event.data && event.data.type === 'CAMBIAR_FONDO') {
        cambiarFondoPrincipal(event.data.fondo);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const fondoGuardado = localStorage.getItem('fondoEscritorio');
    if (fondoGuardado) {
        cambiarFondoPrincipal(fondoGuardado);
    }
});

/* Inicialización del sistema */
let webOS;
document.addEventListener("DOMContentLoaded", () => {
  webOS = new WebOSNova();

  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});
