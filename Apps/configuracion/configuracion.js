function showSection(sectionId) {
  document.querySelectorAll(".settings-section").forEach((section) => {
    section.style.display = "none";
  });

  document.querySelectorAll(".sidebar-item").forEach((item) => {
    item.classList.remove("active");
  });

  event.currentTarget.classList.add("active");
  document.getElementById(sectionId).style.display = "block";
}

function toggleSwitch(element) {
  element.classList.toggle("active");
}

document.querySelectorAll(".range-slider").forEach((slider) => {
  slider.addEventListener("input", function () {
    const value = parseInt(this.value);
    const sliderValue = this.nextElementSibling;

    sliderValue.textContent = value;
  });
});

document.querySelectorAll(".color-option").forEach((option) => {
  option.addEventListener("click", function () {
    document.querySelectorAll(".color-option").forEach((opt) => {
      opt.classList.remove("active");
    });
    this.classList.add("active");
  });
});

document.querySelectorAll(".appearance-item").forEach((item) => {
  item.addEventListener("click", function () {
    const parent = this.parentElement;
    parent.querySelectorAll(".appearance-item").forEach((i) => {
      i.classList.remove("active");
    });
    this.classList.add("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search-input");
  searchInput.addEventListener("focus", function () {
    this.parentElement.style.width = "320px";
  });

  searchInput.addEventListener("blur", function () {
    if (this.value === "") {
      this.parentElement.style.width = "240px";
    }
  });

  const backgrounds = {
    Montañas: "url('assets/media/wallpaper.jpg')",
    Ondas: "url('assets/media/waves.jpg')",
    Estrellas: "url('assets/media/stars.jpg')",
  };

  function cambiarFondoEscritorio(urlFondo) {
    if (window.parent !== window) {
      window.parent.postMessage(
        {
          type: "CAMBIAR_FONDO",
          fondo: urlFondo,
        },
        "*"
      );
    }
  }

  document
    .querySelectorAll(".settings-card .appearance-grid .appearance-item")
    .forEach((item) => {
      item.addEventListener("click", () => {
        const label = item.querySelector(".appearance-label").textContent;

        if (backgrounds[label]) {
          cambiarFondoEscritorio(backgrounds[label]);
        }

        if (label === "Personalizar") {
          const fileInput = document.createElement("input");
          fileInput.type = "file";
          fileInput.accept = "image/*";
          fileInput.style.display = "none";

          fileInput.addEventListener("change", () => {
            const file = fileInput.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = () => {
              cambiarFondoEscritorio(`url(${reader.result})`);
            };
            reader.readAsDataURL(file);
          });

          document.body.appendChild(fileInput);
          fileInput.click();
        }
      });
    });
});
