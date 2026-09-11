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

  // Services: card grid → detail view, data-driven like the Work section.
  const servicesGrid = document.querySelector("#servicesGrid");
  const servicesStage = document.querySelector("#servicesStage");
  const servicesDetail = document.querySelector("#servicesDetail");
  const servicesBack = document.querySelector("#servicesBack");

  if (servicesGrid && servicesDetail) {
    const ICONS = {
      code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
      globe:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20"/></svg>',
      cpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="6" y="6" width="12" height="12" rx="1"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg>',
      bot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="9" width="16" height="11" rx="2"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/><path d="M12 9V5M9 5h6"/></svg>',
      factory:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 21V10l6 4v-4l6 4V7l6 4v10H3z"/></svg>',
      drone:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="9" y="9" width="6" height="6" rx="1"/><circle cx="4" cy="4" r="2"/><circle cx="20" cy="4" r="2"/><circle cx="4" cy="20" r="2"/><circle cx="20" cy="20" r="2"/><path d="M9 9L5.5 5.5M15 9l3.5-3.5M9 15l-3.5 3.5M15 15l3.5 3.5"/></svg>',
    };

    const servicesData = [
      {
        icon: "code",
        title: "Custom Software & ERP Systems",
        short: "Business software built around how you actually operate.",
        desc: "From internal tools to full ERP systems, we build software that keeps every department on the same page — inventory, payroll, sales, and accounting, all connected.",
        image: "assets/images/ui.jpg",
        features: [
          "Inventory & operations management systems",
          "Employee & workflow tools",
          "Reporting and analytics dashboards",
          "Legacy system modernization",
        ],
      },
      {
        icon: "globe",
        title: "Website & Web Applications",
        short: "Custom-built sites and apps, designed around your workflow.",
        desc: "Ecommerce platforms, client portals, booking systems, and admin dashboards — built to fit how your business runs, not squeezed into a template.",
        image: "assets/images/ui2.png",
        features: [
          "Ecommerce platforms",
          "Client & customer portals",
          "Booking and scheduling systems",
          "Admin dashboards",
        ],
      },
      {
        icon: "cpu",
        title: "IoT Training & Solutions",
        short: "Hands-on IoT education, from bootcamps to lab setups.",
        desc: "Monthly bootcamps, institutional training programs, and consulting services — paired with modular learning kits and dashboards that bring real IoT experience into the classroom or the workplace.",
        image: "assets/images/iot-training.jpg",
        features: [
          "Monthly IoT bootcamps for students & professionals",
          "Custom institutional IoT training programs",
          "IoT lab setup & consulting services",
          "Modular IoT learning kits & dashboards",
        ],
      },
      {
        icon: "bot",
        title: "AI & Robotics Training & Solutions",
        short: "Practical robotics and AI training, in-person or online.",
        desc: "From in-person bootcamps to fully online simulation courses, backed by SMORPHI robotics kits and AI Online License subscriptions for schools building out a curriculum.",
        image: "assets/images/ai-robotics.jpg",
        features: [
          "AI & robotics bootcamps: programming, robotics, ML",
          "Fully online AI robotics simulation courses",
          "AI Academy: Machine Learning, AI apps, LLMs",
          "SMORPHI educational & advanced robotics kits",
        ],
      },
      {
        icon: "factory",
        title: "Industrial IoT & AI Automation",
        short: "Industrial-grade IoT and AI automation for real operations.",
        desc: "SentriCORE monitoring systems, agentic AI workflows, RAG chatbots, and predictive maintenance models built around your operations, not a generic template.",
        image: "assets/images/industrial-iot.jpg",
        features: [
          "SentriCORE IoT solutions for industrial monitoring",
          "Agentic AI automation for tasks & workflows",
          "RAG chatbots & predictive maintenance models",
          "Real-time AI dashboards for operational visibility",
        ],
      },
      {
        icon: "drone",
        title: "Robotics & AI Hardware",
        short: "Purpose-built hardware for learning and R&D.",
        desc: "From entry-level Arduino kits to the AIDrone and the BANTAI quadruped robot, for classrooms, competitions, and advanced robotics applications.",
        image: "assets/images/robotics-hardware.jpg",
        features: [
          "Arduino learning kits: miniAuto & miniArm",
          "AIDrone — educational drone with AI vision",
          "BANTAI — quadruped robot for research & inspection",
          "Custom hardware builds for classrooms & R&D",
        ],
      },
    ];

    servicesGrid.innerHTML = servicesData
      .map(
        (s, i) => `
          <article class="services__card" role="listitem" data-index="${i}" tabindex="0">
            <span class="services__card-icon">${ICONS[s.icon]}</span>
            <h3 class="services__card-title">${s.title}</h3>
            <p class="services__card-desc">${s.short}</p>
            <span class="services__card-link">Learn more <span aria-hidden="true">→</span></span>
          </article>
        `,
      )
      .join("");

    const cards = servicesGrid.querySelectorAll(".services__card");
    const detailImg = document.querySelector("#servicesDetailImg");
    const detailIcon = document.querySelector("#servicesDetailIcon");
    const detailTitle = document.querySelector("#servicesDetailTitle");
    const detailDesc = document.querySelector("#servicesDetailDesc");
    const detailList = document.querySelector("#servicesDetailList");

    const openDetail = (index) => {
      const s = servicesData[index];
      detailImg.src = s.image;
      detailImg.alt = `${s.title} illustration`;
      detailIcon.innerHTML = ICONS[s.icon];
      detailTitle.textContent = s.title;
      detailDesc.textContent = s.desc;
      detailList.innerHTML = s.features.map((f) => `<li>${f}</li>`).join("");

      servicesStage.classList.add("is-detail");
      servicesDetail.setAttribute("aria-hidden", "false");
      servicesDetail.scrollTo(0, 0);
    };

    const closeDetail = () => {
      servicesStage.classList.remove("is-detail");
      servicesDetail.setAttribute("aria-hidden", "true");
    };

    cards.forEach((card) => {
      card.addEventListener("click", () =>
        openDetail(Number(card.dataset.index)),
      );
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDetail(Number(card.dataset.index));
        }
      });
    });

    if (servicesBack) {
      servicesBack.addEventListener("click", closeDetail);
    }

    // Tilt effect — pointer devices only
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const MAX_TILT = 8;

      servicesGrid.addEventListener("mousemove", (e) => {
        const card = e.target.closest(".services__card");
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(700px) rotateX(${(-py * MAX_TILT).toFixed(2)}deg) rotateY(${(px * MAX_TILT).toFixed(2)}deg) translateY(-4px)`;
      });

      servicesGrid.addEventListener(
        "mouseleave",
        () => {
          cards.forEach((card) => (card.style.transform = ""));
        },
        true,
      );

      servicesGrid.addEventListener("mouseout", (e) => {
        const card = e.target.closest(".services__card");
        if (card && !card.contains(e.relatedTarget)) {
          card.style.transform = "";
        }
      });
    }
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
    const workProjects = [
      {
        title: "HRIS — HR & Payroll System",
        desc: "Our own HR platform, built to run company-wide. Payroll is fully automated, pulling directly from employee and attendance records, with dedicated payroll settings for automatic computation and bulk payroll draft generation.",
        features: [
          "Automated payroll computation tied to attendance",
          "Bulk payroll draft generation",
          "Employee, attendance, and payroll fully integrated",
        ],
        tags: ["ERP", "Automation", "Custom software"],
        image: "assets/images/ui.jpg",
      },
      {
        title: "Sales — CRM & Lead Pipeline",
        desc: "Tracks every lead from first contact to close, with a staged pipeline (New, Follow-up, Qualified, Proposal, Won/Lost) that requires logged activity and proof of follow-up before a lead can advance.",
        features: [
          "Staged pipeline: New → Follow-up → Qualified → Proposal → Won/Lost",
          "Requires logged activity + proof of follow-up to advance a lead",
          "Quotations, invoices, and stage-change history tied to each lead",
        ],
        tags: ["ERP", "CRM", "Sales pipeline"],
        image: "assets/images/ui3.jpg",
      },
      {
        title: "Accounting — Financial Dashboard",
        desc: "Company-wide financial visibility in one view — revenue, expenses, net income, and cash balance alongside AR/AP outstanding, overdue invoices, and pending approvals.",
        features: [
          "Live revenue, expenses, net income, and cash balance",
          "AR/AP outstanding, overdue invoices, pending approvals",
          "Cash flow, invoice status, and monthly revenue charted from the ledger",
        ],
        tags: ["ERP", "Accounting", "Reporting"],
        image: "assets/images/ui4.jpg",
      },
      {
        title: "Filipino Inventors Society, Inc.",
        desc: "Site for the Philippines' oldest organization of patent-holding inventors, established 1943.",
        features: [
          "Leadership profiles and organizational history",
          "Events section featuring National Inventors Week",
          "Contact form for membership inquiries",
        ],
        tags: ["Web app", "Nonprofit site"],
        image: "assets/images/ui4.png",
        link: "https://zedtech79-png.github.io/fis-web/home.html",
      },
      {
        title: "AETECH Innovations Singapore",
        desc: "Corporate site for a Singapore-based technology and consulting firm working in smart cities, education, and digital transformation.",
        features: [
          "Video hero and corporate storytelling",
          "Industry-partners section",
          "Events showcase for conferences and forums",
        ],
        tags: ["Web app", "Corporate site"],
        image: "assets/images/ui5.png",
        link: "https://aetech-innovations-singapore-websit.vercel.app/",
      },
      {
        title: "Engr. Edwin Astorga — Portfolio",
        desc: "Personal portfolio for a sustainability consultant and engineer.",
        features: [
          "Areas of expertise: ESG consulting, smart cities, green engineering",
          "Running list of professional affiliations",
          "Leadership roles and career highlights",
        ],
        tags: ["Web app", "Portfolio site"],
        image: "assets/images/ui2.png",
        link: "https://engr-edwin-astorga.github.io/portfolio/index.html",
      },
    ];

    workGrid.innerHTML = workProjects
      .map((project, i) => {
        const reverseClass = i % 2 === 1 ? " work__row--reverse" : "";
        const visitLink = project.link
          ? `<a class="work__visit" href="${project.link}" target="_blank" rel="noopener">
               Visit <i class="ti ti-external-link" aria-hidden="true" style="font-size:14px"></i>
             </a>`
          : "";

        return `
          <article class="work__row${reverseClass}">
            <span class="work__row-marker" aria-hidden="true"></span>
            <div class="work__row-image">
              <img src="${project.image}" alt="${project.title} screenshot" />
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

        workGrid.querySelectorAll(".work__row-image img").forEach((img) => {
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
        })
        .then(() => {
          contactStatus.textContent =
            "Message sent — we'll get back to you soon.";
          contactStatus.dataset.state = "success";
          contactForm.reset();
          submitBtn.disabled = false;
        })
        .catch(() => {
          contactStatus.textContent =
            "Something went wrong. Please try again or email us directly.";
          contactStatus.dataset.state = "error";
          submitBtn.disabled = false;
        });
    });
  }
});
