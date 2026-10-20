// Integritech Solutions Inc. — main.js

document.addEventListener("DOMContentLoaded", () => {
  // Hero typing animation
  const hero = document.querySelector(".hero");
  const title = document.querySelector(".hero__title");
  const titleText = document.querySelector(".hero__title-text");

  if (hero && title && titleText) {
    const text = title.getAttribute("aria-label") || "";

    let index = 0;

    const TYPE_SPEED = 55;

    const typeTitle = () => {
      if (index < text.length) {
        titleText.textContent += text.charAt(index);
        index++;

        setTimeout(typeTitle, TYPE_SPEED);
      }
    };

    // Start typing after the title's entrance animation
    setTimeout(typeTitle, 450);
  }

  // Hero exit animation
  if (hero) {
    const updateHeroExit = () => {
      const heroRect = hero.getBoundingClientRect();
      const heroHeight = hero.offsetHeight;

      // Start the exit animation when approximately 50%
      // of the hero has been scrolled past.
      const triggerPoint = heroHeight * 0.5;

      if (heroRect.top <= -triggerPoint) {
        hero.classList.add("is-exiting");
      } else {
        hero.classList.remove("is-exiting");
      }
    };

    window.addEventListener("scroll", updateHeroExit, {
      passive: true,
    });

    updateHeroExit();
  }
  // Hero background video crossfade
  // Hero background video crossfade
  const heroVideos = document.querySelectorAll(".hero__video");

  if (heroVideos.length === 2) {
    const [videoA, videoB] = heroVideos;

    let activeVideo = videoA;
    let nextVideo = videoB;
    let isTransitioning = false;

    const CROSSFADE_DURATION = 2;

    const crossfade = () => {
      if (isTransitioning) return;

      isTransitioning = true;

      // Make sure the next video starts from the beginning
      nextVideo.currentTime = 0;

      const playPromise = nextVideo.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          isTransitioning = false;
        });
      }

      // Crossfade
      nextVideo.style.transition = `opacity ${CROSSFADE_DURATION}s ease`;
      activeVideo.style.transition = `opacity ${CROSSFADE_DURATION}s ease`;

      nextVideo.style.opacity = "1";
      activeVideo.style.opacity = "0";

      setTimeout(() => {
        activeVideo.pause();

        // Swap the videos
        const oldActive = activeVideo;
        activeVideo = nextVideo;
        nextVideo = oldActive;

        // Reset the inactive video
        nextVideo.currentTime = 0;
        nextVideo.style.transition = "none";
        nextVideo.style.opacity = "0";

        isTransitioning = false;
      }, CROSSFADE_DURATION * 1000);
    };

    const checkVideoTime = () => {
      if (
        !isTransitioning &&
        activeVideo.duration &&
        activeVideo.currentTime >= activeVideo.duration - CROSSFADE_DURATION
      ) {
        crossfade();
      }
    };

    videoA.addEventListener("timeupdate", checkVideoTime);
    videoB.addEventListener("timeupdate", checkVideoTime);

    // Start the first video
    videoA.play().catch(() => {});
  }

  const toggle = document.querySelector(".nav__toggle");
  const linksWrap = document.querySelector(".nav__links-wrap");

  if (toggle && linksWrap) {
    toggle.addEventListener("click", () => {
      const isOpen = linksWrap.classList.toggle("nav__links-wrap--open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Work: bento grid with a swappable flagship project. Clicking a
  // tile promotes that project into the large flagship slot — same
  // "one active, rest are triggers" idea as the services accordion,
  // just spatial instead of expand/collapse.
  // Work: alternating timeline. Each project is a full-width row —
  // image on one side, title/description/features/tags on the other —
  // flipping sides every other project.
  const workGrid = document.querySelector("#workGrid");

  if (workGrid) {
    // photo: true  -> photo styling (no browser-window bar, cropped to fit)
    // contain: true -> don't crop (use for product shots on white)
    // images[0] is the large image; the rest become the thumbnail strip.
    const workProjects = [
      // ---- Training album ----
      {
        title: "Training Album: IoT Bootcamps",
        desc: "Our monthly 3-day bootcamps, plus programs we run for schools and organizations, with students building real IoT systems hands-on.",
        features: [
          "Monthly 3-day bootcamps for students and professionals",
          "Custom institutional programs on campus",
          "Hands-on builds with School of IoT Philippines kits",
        ],
        tags: ["Training", "IoT", "Bootcamp"],
        photo: true,
        images: [
          "assets/images/album2.jpg",
          "assets/images/album3.jpg",
          "assets/images/album4.jpg",
          "assets/images/album5.jpg",
        ],
      },
      {
        title: "Training Album: AI & Robotics",
        desc: "In-person bootcamps and short courses in robotics programming, AI applications, and machine learning, from Arduino to Python.",
        features: [
          "Robotics programming and AI applications",
          "Machine learning and Generative AI sessions",
          "Short courses scheduled around your group",
        ],
        tags: ["Training", "AI", "Robotics"],
        photo: true,
        images: [
          "assets/images/arduino1.jpg",
          "assets/images/album2-4.png",
          "assets/images/album2-3.jpg",
        ],
      },

      // ---- Acube services ----
      {
        title: "Educational Robotics Kits",
        desc: "Modular kits for classrooms and competitions, from the entry-level miniAuto and miniArm to the SMORPHI family.",
        features: [
          "SMORPHI, SMORPHI 2 & SMORPHI Imaginary",
          "miniAuto AI vision robot car with mecanum wheels",
          "miniArm open-source robotic arm",
        ],
        tags: ["Hardware", "Education"],
        photo: true,
        images: [
          "assets/images/arduino2.png",
          "assets/images/album3-2.jpg",
          "assets/images/album3-1.jpg",
        ],
      },
      {
        title: "AIDrone",
        desc: "An educational drone on a Raspberry Pi Zero 2 W that you can fly with a transmitter or program in blocks, Scratch, or Python.",
        features: [
          "Face and object tracking with AI vision",
          "Real-time object detection with deep learning",
          "Available as Edu Drone and AI Drone versions",
        ],
        tags: ["Hardware", "AI vision"],
        photo: true,
        contain: true,
        images: ["assets/images/drone.png"],
      },
      {
        title: "BANTAI Quadruped Robot",
        desc: "An agile quadruped robot for research, automation, and inspection, and the first of its kind in the Philippine market.",
        features: [
          "Up to 2.5 m/s with a 7 kg payload",
          "3D LiDAR and HD wide-angle camera",
          "Built for challenging environments",
        ],
        tags: ["Robotics", "Research", "Inspection"],
        photo: true,
        images: ["assets/images/bantai.png", "assets/images/album4-1.jpg"],
      },
      {
        title: "SentriCORE Industrial IoT",
        desc: "An industrial IoT monitoring platform that gives students, researchers, and factories a real-world environment to prototype and validate systems.",
        features: [
          "Real-world test environment for researchers",
          "Faster prototyping for industry partners",
          "Data sharing across academia and factories",
        ],
        tags: ["Industrial", "IoT"],
        photo: true,
        images: [
          "assets/images/industrial.jpg",
          "assets/images/industrial2.png",
          "assets/images/album6-1.jpg",
        ],
      },
      {
        title: "AI Automation Solutions",
        desc: "AI agents, RAG chatbots, and predictive maintenance models that take over repetitive work and flag problems early.",
        features: [
          "Agentic AI for tasks and workflows",
          "RAG chatbots with context-aware answers",
          "Real-time AI dashboards",
        ],
        tags: ["AI", "Automation"],
        photo: true,
        images: [
          "assets/images/automation1.png",
          "assets/images/automation.png",
        ],
      },

      // ---- Software & Web (always last) ----
      {
        title: "Software & Web Development",
        desc: "Custom ERP systems, internal tools, websites, and web apps built around how your business runs, including our own HRIS, CRM, and accounting platform.",
        features: [
          "HR and payroll, CRM, and accounting dashboards",
          "Ecommerce, client portals, and booking systems",
          "Corporate and organization websites",
        ],
        tags: ["ERP", "Web app", "Custom software"],
        images: [
          "assets/images/ui.jpg",
          "assets/images/ui3.jpg",
          "assets/images/ui4.png",
          "assets/images/ui2.png",
        ],
      },
    ];

    workGrid.innerHTML = workProjects
      .map((project, i) => {
        const reverseClass = i % 2 === 1 ? " work__row--reverse" : "";
        const images = project.images || [];
        const imageClass =
          "work__row-image" +
          (project.photo ? " is-photo" : "") +
          (project.contain ? " is-contain" : "");

        const thumbs =
          images.length > 1
            ? `<div class="work__thumbs">${images
                .map(
                  (src, n) =>
                    `<button type="button" class="work__thumb${n === 0 ? " is-active" : ""}" data-src="${src}" aria-label="Show photo ${n + 1}"><img src="${src}" alt="" loading="lazy" onerror="this.closest('.work__thumb').remove()" /></button>`,
                )
                .join("")}</div>`
            : "";

        const visitLink = project.link
          ? `<a class="work__visit" href="${project.link}" target="_blank" rel="noopener">
               Visit <i class="ti ti-external-link" aria-hidden="true" style="font-size:14px"></i>
             </a>`
          : "";

        return `
          <article class="work__row${reverseClass}">
            <span class="work__row-marker" aria-hidden="true"></span>
            <div class="${imageClass}">
              <img class="work__main-img" src="${images[0] || ""}" alt="${project.title}" />
              ${thumbs}
            </div>
            <div class="work__row-body">
              <h3 class="work__row-title">${project.title}</h3>
              <p class="work__row-desc">${project.desc}</p>
              <ul class="work__row-features">
                ${project.features.map((f) => `<li>${f}</li>`).join("")}
              </ul>
              <div class="work__tags-row">
                <ul class="work__tags">
                  ${project.tags.map((tag) => `<li>${tag}</li>`).join("")}
                </ul>
                ${visitLink}
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    // Thumbnail click swaps the large image
    workGrid.addEventListener("click", (e) => {
      const thumb = e.target.closest(".work__thumb");
      if (!thumb) return;
      const box = thumb.closest(".work__row-image");
      box.querySelector(".work__main-img").src = thumb.dataset.src;
      box.querySelectorAll(".work__thumb").forEach((t) => {
        t.classList.toggle("is-active", t === thumb);
      });
    });

    // Reveal each row (and its image) as it scrolls into view.
    const workRows = workGrid.querySelectorAll(".work__row");
    if ("IntersectionObserver" in window && workRows.length) {
      const rowObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-inview");
              rowObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 },
      );
      workRows.forEach((row) => rowObserver.observe(row));
    } else {
      workRows.forEach((row) => row.classList.add("is-inview"));
    }

    // Timeline progress line fills as the section scrolls through view.
    const timelineEl = document.querySelector(".work__timeline");
    const progressEl = document.querySelector("#workTimelineProgress");

    if (timelineEl && progressEl) {
      const updateProgress = () => {
        const rect = timelineEl.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const passed = viewportCenter - rect.top;
        const percent = Math.min(
          100,
          Math.max(0, (passed / rect.height) * 100),
        );
        progressEl.style.height = `${percent}%`;
      };

      updateProgress();
      window.addEventListener("scroll", updateProgress, { passive: true });
      window.addEventListener("resize", updateProgress);

      // Click-to-preview: any project image opens it full-size in a lightbox.
      const lightbox = document.querySelector("#imageLightbox");
      const lightboxImg = document.querySelector("#imageLightboxImg");

      if (lightbox && lightboxImg) {
        const openLightbox = (src, alt) => {
          lightboxImg.src = src;
          lightboxImg.alt = alt;
          lightbox.classList.add("is-open");
          lightbox.setAttribute("aria-hidden", "false");
        };

        const closeLightbox = () => {
          lightbox.classList.remove("is-open");
          lightbox.setAttribute("aria-hidden", "true");
          lightboxImg.src = "";
        };

        workGrid.querySelectorAll(".work__main-img").forEach((img) => {
          img.addEventListener("click", () => openLightbox(img.src, img.alt));
        });

        lightbox.querySelectorAll("[data-close]").forEach((el) => {
          el.addEventListener("click", closeLightbox);
        });

        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
            closeLightbox();
          }
        });
      }
    }
  }
  // Contact modal: opened from nav, header CTA, hero CTA, and footer
  // button (anything with .js-contact-trigger). Submits via EmailJS so
  // the whole flow — including success/error — stays inside the modal.
  const contactModal = document.querySelector("#contactModal");
  const contactForm = document.querySelector("#contactForm");
  const contactStatus = document.querySelector("#contactFormStatus");
  const contactTriggers = document.querySelectorAll(".js-contact-trigger");

  if (contactModal && contactForm) {
    const openModal = (e) => {
      e.preventDefault();
      contactModal.classList.add("is-open");
      contactModal.setAttribute("aria-hidden", "false");
      contactForm.querySelector("input[name='from_name']").focus();
    };

    const closeModal = () => {
      contactModal.classList.remove("is-open");
      contactModal.setAttribute("aria-hidden", "true");
    };

    contactTriggers.forEach((trigger) => {
      trigger.addEventListener("click", openModal);
    });

    contactModal.querySelectorAll("[data-close]").forEach((el) => {
      el.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && contactModal.classList.contains("is-open")) {
        closeModal();
      }
    });

    // Replace these three with your actual EmailJS values.
    const EMAILJS_PUBLIC_KEY = "4Q5hwHzdQjtlNOJ-G";
    const EMAILJS_SERVICE_ID = "service_zeskm3r";
    const EMAILJS_TEMPLATE_ID = "template_c44s9ux";

    if (window.emailjs) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameField = contactForm.querySelector("[name='from_name']");
      const emailField = contactForm.querySelector("[name='from_email']");
      const messageField = contactForm.querySelector("[name='message']");
      const submitBtn = contactForm.querySelector(".contact-form__submit");

      if (
        !nameField.value.trim() ||
        !emailField.value.trim() ||
        !messageField.value.trim()
      ) {
        contactStatus.textContent = "Please fill in every field.";
        contactStatus.dataset.state = "error";
        return;
      }

      contactStatus.textContent = "Sending...";
      contactStatus.dataset.state = "";
      submitBtn.disabled = true;

      emailjs
        .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name: nameField.value.trim(),
          from_email: emailField.value.trim(),
          message: messageField.value.trim(),
          time: new Date().toLocaleString(),
        })
        .then(() => {
          contactStatus.textContent =
            "Message sent — we'll get back to you soon.";
          contactStatus.dataset.state = "success";
          contactForm.reset();
          submitBtn.disabled = false;
        })
        .catch((err) => {
          console.error("EmailJS error:", err);
          contactStatus.textContent =
            "Something went wrong. Please try again or email us directly.";
          contactStatus.dataset.state = "error";
          submitBtn.disabled = false;
        });
    });
  }
  // Scroll reveal: Services + About entrance animations.
  // Tags elements with .reveal, then adds .is-visible as they scroll into view.
  const revealTargets = [];

  const reveal = (
    selector,
    { step = 80, base = 0, cols = 0, zoom = false } = {},
  ) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      const slot = cols ? i % cols : i; // cols: stagger per row, not across rows
      el.style.setProperty("--d", `${base + slot * step}ms`);
      el.classList.add("reveal");
      if (zoom) el.classList.add("reveal--zoom");
      revealTargets.push(el);
    });
  };

  // ---- Services ----
  reveal(".services__intro > *", { step: 90 });
  reveal(".svc-home"); // card stagger is handled in CSS

  // ---- About ----
  reveal(".about__intro > *", { step: 90 });
  reveal(".about__facts-head");
  reveal(".about__fact", { step: 90, cols: 3, zoom: true });
  reveal(".about__group > .about__group-label");
  reveal(".about__logo-card", { step: 100, cols: 3, zoom: true });
  reveal(".about__slogan");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }
  // Re-align to the #hash after JS-built content and images have loaded
  if (location.hash) {
    const target = document.getElementById(
      decodeURIComponent(location.hash.slice(1)),
    );
    if (target) {
      const realign = () =>
        target.scrollIntoView({ behavior: "instant", block: "start" });
      realign();
      window.addEventListener("load", realign, { once: true });
    }
  }
});
