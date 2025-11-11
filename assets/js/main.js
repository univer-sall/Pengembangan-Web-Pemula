(function ($) {
  const projects = {
    1: {
      title: "Toko Online Sains dan Teknologi",
      description:
        "TOST (Toko Online Sains dan Teknologi) is an online platform managed by Universitas Jambi. I led the frontend implementation, ensuring a seamless user experience across devices, creating reusable UI components, and integrating Bootstrap with custom interactions.",
      highlights: [
        "Developed responsive layout and reusable UI components",
        "Implemented accessibility-first navigation patterns",
        "Integrated analytics tracking and performance optimisations"
      ]
    },
    2: {
      title: "Interactive Learning Dashboard",
      description:
        "A dashboard that helps lecturers and students monitor coursework progress in real time. The interface features modular cards, custom chart integrations, and theming options for accessibility.",
      highlights: [
        "Built modular card system with configurable widgets",
        "Connected REST APIs for assignments and feedback",
        "Enabled light/dark mode with persisted user preference"
      ]
    },
    3: {
      title: "Micro-Interactions Design System",
      description:
        "A collection of polished UI micro-interactions for product teams. Deliverables included documentation, animated prototypes, and production-ready React components.",
      highlights: [
        "Crafted 15+ reusable motion patterns using CSS and GSAP",
        "Collaborated with designers to codify component usage",
        "Deployed Storybook with automated visual regression tests"
      ]
    }
  };

  function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains("dark");
    body.classList.toggle("dark", !isDark);
    body.classList.toggle("light", isDark);
    localStorage.setItem("preferred-theme", isDark ? "light" : "dark");
  }

  function applyStoredTheme() {
    const stored = localStorage.getItem("preferred-theme");
    if (!stored) {
      return;
    }

    document.body.classList.remove("dark", "light");
    document.body.classList.add(stored);
  }

  function updateNavbarBackground() {
    const $navbar = $(".navbar");
    if ($(window).scrollTop() > 50) {
      $navbar.addClass("scrolled");
    } else {
      $navbar.removeClass("scrolled");
    }
  }

  function populateProjectModal(projectId) {
    const project = projects[projectId];
    if (!project) {
      $("#projectModalTitle").text("Project");
      $("#projectModalBody").html("<p class='mb-0'>Project details coming soon.</p>");
      return;
    }

    const highlightItems = project.highlights
      .map((item) => `<li>${item}</li>`)
      .join("");

    $("#projectModalTitle").text(project.title);
    $("#projectModalBody").html(`
      <p>${project.description}</p>
      <h6 class="mt-4">Highlights</h6>
      <ul class="mb-0">
        ${highlightItems}
      </ul>
    `);
  }

  function setupProjectModal() {
    $(".open-project").on("click", function () {
      const projectId = $(this).data("id");
      populateProjectModal(projectId);
      const modal = new bootstrap.Modal(document.getElementById("projectModal"));
      modal.show();
    });
  }

  function setupContactForm() {
    const $form = $("#contactForm");
    const $feedback = $("#contactFeedback");

    $form.on("submit", function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (this.checkValidity()) {
        $feedback.removeClass("d-none");
        this.reset();
        setTimeout(() => {
          $feedback.addClass("d-none");
        }, 4000);
      }

      $(this).addClass("was-validated");
    });
  }

  function init() {
    applyStoredTheme();

    const storedTheme = localStorage.getItem("preferred-theme");
    if (!storedTheme) {
      document.body.classList.add("dark");
    }

    $("#btn-theme").on("click", toggleTheme);
    $(window).on("scroll", updateNavbarBackground);
    updateNavbarBackground();

    $("#year").text(new Date().getFullYear());

    setupProjectModal();
    setupContactForm();
  }

  $(document).ready(init);
})(jQuery);
