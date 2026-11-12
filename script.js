/* =========================================================
   Interacciones del portafolio
   - Menú móvil accesible
   - Resaltado de la sección activa
   - Formulario de contacto vía mailto
   ========================================================= */

(() => {
  "use strict";

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  if (menuToggle && mobileNav) {
    const setMenuState = (open) => {
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute(
        "aria-label",
        open ? "Cerrar menú de navegación" : "Abrir menú de navegación",
      );
      menuToggle.innerHTML = open
        ? '<i class="bi bi-x-lg" aria-hidden="true"></i>'
        : '<i class="bi bi-list" aria-hidden="true"></i>';
      mobileNav.hidden = !open;
      document.body.classList.toggle("menu-open", open);
    };

    menuToggle.addEventListener("click", () => {
      setMenuState(mobileNav.hidden);
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuState(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !mobileNav.hidden) {
        setMenuState(false);
        menuToggle.focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (
        !mobileNav.hidden &&
        !mobileNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        setMenuState(false);
      }
    });
  }

  /* Resalta el enlace de la sección visible en la navegación de escritorio. */
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navLinks = Array.from(
    document.querySelectorAll('.desktop-nav a[href^="#"]'),
  );

  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const currentId = `#${entry.target.id}`;
          navLinks.forEach((link) => {
            link.classList.toggle(
              "is-active",
              link.getAttribute("href") === currentId,
            );
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* Formulario: abre el cliente de correo con el mensaje preparado. */
  const form = document.querySelector(".contact-form");
  const formStatus = document.getElementById("form-status");

  if (form && formStatus) {
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        const firstInvalid = form.querySelector(":invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      event.preventDefault();

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const subject = String(
        data.get("subject") || "Contacto desde el portafolio",
      ).trim();
      const message = String(data.get("message") || "").trim();

      const body = [`Nombre: ${name}`, `Correo: ${email}`, "", message].join(
        "\n",
      );

      const mailto = `mailto:floezjulian05@gmail.com?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;
      formStatus.textContent =
        "Se abrió tu cliente de correo con el mensaje listo para enviar.";
    });
  }

  /* Año dinámico del pie de página. */
  const year = document.getElementById("current-year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
