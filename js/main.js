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

  // Services: category tabs → card grid → detail view, all data-driven.
  const servicesGrid = document.querySelector("#servicesGrid");
  const servicesTabs = document.querySelector("#servicesTabs");

  if (servicesGrid && servicesTabs) {
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
      book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
      box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
      zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
      chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
      layout:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
    };

    const categories = [
      { id: "training", label: "Training & Education" },
      { id: "hardware", label: "Robotics & Hardware" },
      { id: "industrial", label: "Industrial & AI Automation" },
      { id: "software", label: "Software & Web" },
    ];

    // `action` cards don't open a detail view: "contact" opens the
    // contact modal, "work" scrolls to the Work section.
    const servicesData = [
      // ---- Training & Education ----
      {
        cat: "training",
        icon: "cpu",
        title: "IoT Training & Solutions",
        short: "Hands-on IoT education, from bootcamps to lab setups.",
        desc: "Monthly bootcamps, institutional training programs, and consulting, paired with School of IoT Philippines learning kits and dashboards that bring real IoT experience into the classroom or workplace.",
        image: "assets/images/iot1.png",
        features: [
          "Monthly 3-day IoT bootcamps for students & professionals",
          "Custom institutional programs for schools and organizations",
          "IoT lab setup, smart projects & pilot-system consulting",
          "Modular learning kits plus IoT dashboards & tools",
        ],
      },
      {
        cat: "training",
        icon: "bot",
        title: "AI & Robotics Training",
        short: "Practical robotics and AI training, in-person or online.",
        desc: "From in-person bootcamps to fully online simulation courses that need no hardware, plus AI Academy programs and AI Online License subscriptions for schools building out a curriculum.",
        image: "assets/images/ai.png",
        features: [
          "Bootcamps: robotics programming, AI applications, machine learning",
          "Fully online AI robotics simulation course, available nationwide",
          "AI Academy: Machine Learning, AI apps, and LLMs",
          "AI Online License (SaaS) for schools, at scale",
        ],
      },
      {
        cat: "training",
        icon: "book",
        title: "Other Trainings",
        short: "Coding and AI courses, delivered on request.",
        desc: "Focused short courses for students, educators, and professionals, scheduled around your group's needs.",
        image: "assets/images/others.jpg",
        features: [
          "Arduino coding",
          "Python coding for robotics and AI applications",
          "Machine Learning certification",
          "Generative AI",
          "API building",
        ],
      },

      // ---- Robotics & Hardware ----
      {
        cat: "hardware",
        icon: "box",
        title: "Educational Robotics Kits",
        short: "SMORPHI, miniAuto and miniArm kits for classrooms and labs.",
        desc: "Modular kits for learning and competitions, from beginner Arduino-compatible builds to advanced robotics platforms for research and prototyping.",
        image: "assets/images/automation.png",
        features: [
          "SMORPHI, SMORPHI 2 & SMORPHI Imaginary: educational and advanced robotics kits",
          "miniAuto: entry-level AI vision robot car with mecanum wheels",
          "miniArm: open-source robotic arm for beginners",
          "Custom hardware builds for classrooms & R&D",
        ],
      },
      {
        cat: "hardware",
        icon: "drone",
        title: "AIDrone",
        short: "An educational drone with AI vision you can program.",
        desc: "A Raspberry Pi Zero 2 W drone you can fly with a transmitter or program with block-based coding, Scratch, and Python.",
        image: "assets/images/aidrone.png",
        features: [
          "Face and object tracking with intelligent vision",
          "Deep learning for real-time object detection",
          "Available as Edu Drone and AI Drone versions",
        ],
      },
      {
        cat: "hardware",
        icon: "bot",
        title: "BANTAI Quadruped Robot",
        short: "A first-of-its-kind quadruped for research and inspection.",
        desc: "BANTAI (Bionic Adaptive Navigation & Tactical Assistant Intelligence) is an agile quadruped robot for both education and industry, and the first of its kind in the Philippine market.",
        image: "assets/images/bantai.png",
        features: [
          "Agile mobility up to 2.5 m/s with a 7 kg payload",
          "3D LiDAR and HD wide-angle camera",
          "Built for research, automation, and inspection",
        ],
      },

      // ---- Industrial & AI Automation ----
      {
        cat: "industrial",
        icon: "factory",
        title: "SentriCORE Industrial IoT",
        short: "IoT monitoring built for industrial and commercial use.",
        desc: "SentriCORE gives students, researchers, and industry partners a real-world test environment for monitoring, prototyping, and validating IoT systems.",
        image: "assets/images/sentricore.png",
        features: [
          "Real-world test environment for students & researchers",
          "Faster prototyping and validation for industry partners",
          "Data sharing and benchmarking across academia & factories",
          "Pricing based on project scope",
        ],
      },
      {
        cat: "industrial",
        icon: "zap",
        title: "AI Automation Solutions",
        short: "AI agents, chatbots, and predictive maintenance.",
        desc: "Agentic AI frameworks and Retrieval-Augmented Generation systems that take over repetitive work and give you clearer operational control.",
        image: "assets/images/ai-automation.png",
        features: [
          "Agentic AI that manages tasks, processes, and workflows",
          "RAG chatbots for accurate, context-aware answers",
          "Predictive maintenance models that flag issues early",
          "Smart workflow systems and real-time AI dashboards",
        ],
      },
      {
        cat: "industrial",
        icon: "chat",
        action: "contact",
        title: "Need something custom?",
        short: "Tell us the problem and we'll scope the solution.",
        cta: "Contact us",
      },

      // ---- Software & Web ----
      {
        cat: "software",
        icon: "code",
        title: "Custom Software & ERP Systems",
        short: "Business software built around how you actually operate.",
        desc: "From internal tools to full ERP systems, we build software that keeps every department on the same page: inventory, payroll, sales, and accounting, all connected.",
        image: "assets/images/ui.jpg",
        features: [
          "Inventory & operations management systems",
          "Employee & workflow tools",
          "Reporting and analytics dashboards",
          "Legacy system modernization",
        ],
      },
      {
        cat: "software",
        icon: "globe",
        title: "Website & Web Applications",
        short: "Custom-built sites and apps, designed around your workflow.",
        desc: "Ecommerce platforms, client portals, booking systems, and admin dashboards, built to fit how your business runs rather than squeezed into a template.",
        image: "assets/images/ui2.png",
        features: [
          "Ecommerce platforms",
          "Client & customer portals",
          "Booking and scheduling systems",
          "Admin dashboards",
        ],
      },
      {
        cat: "software",
        icon: "layout",
        action: "work",
        title: "See what we've built",
        short: "Our training albums, robotics, and software in action.",
        cta: "View our work",
      },
    ];

    const BLURBS = {
      "IoT Training & Solutions":
        "Our monthly 3-day bootcamps teach students and professionals how to design, build, and deploy IoT systems. Schools and organizations can also commission custom programs, or have us help set up an IoT lab backed by modular learning kits and dashboards.",
      "AI & Robotics Training":
        "Learn robotics programming, AI applications, and machine learning through hands-on bootcamps, or take the fully online simulation course from anywhere in the country with no hardware needed. AI Academy goes deeper into ML and LLMs for educators and professionals.",
      "Other Trainings":
        "Need something specific? We run short courses on request, covering Arduino and Python coding for robotics and AI, Machine Learning certification, Generative AI, and API building, scheduled around your group.",
      "Educational Robotics Kits":
        "Modular kits for classrooms and competitions, from the entry-level miniAuto car and miniArm robotic arm to the SMORPHI family for advanced research and prototyping. Pair them with an AI Online License to bring AI and ML into your curriculum at scale.",
      AIDrone:
        "A programmable educational drone built on a Raspberry Pi Zero 2 W. Fly it with a transmitter or code it in blocks, Scratch, or Python, then add face tracking and real-time object detection using AI vision.",
      "BANTAI Quadruped Robot":
        "An agile quadruped robot with 3D LiDAR and an HD wide-angle camera, designed for research, automation, and inspection in challenging environments. The first of its kind in the Philippine market.",
      "SentriCORE Industrial IoT":
        "An industrial IoT monitoring platform that gives students, researchers, and factories a real-world environment to prototype and validate systems, with data sharing and benchmarking across academia and industry.",
      "AI Automation Solutions":
        "We build AI agents that handle tasks and workflows on their own, RAG chatbots that give accurate, context-aware answers, and predictive maintenance models that flag equipment issues early, all surfaced on real-time dashboards.",
      "Need something custom?":
        "Every operation is different. Tell us about the process you want to automate or the system you want to monitor, and we'll scope an IoT, AI, or software solution around it.",
      "Custom Software & ERP Systems":
        "From internal tools to full ERP systems, we connect inventory, payroll, sales, and accounting so every department works from the same data, with dashboards that show how the business is really running.",
      "Website & Web Applications":
        "Ecommerce platforms, client portals, booking systems, and admin dashboards, designed around your workflow rather than a template. Browse our Work section for sites we've shipped.",
      "See what we've built":
        "Browse our training album and see how our bootcamps, robotics kits, automation, and software solutions look in real use.",
    };
    servicesData.forEach((s) => {
      s.blurb = BLURBS[s.title] || s.short;
    });

    // Detail-page images, stacked in this order. Missing files are skipped.
    const IMAGES = {
      "IoT Training & Solutions": [
        "assets/images/iot1.png",
        "assets/images/iot2.png",
      ],
      "AI & Robotics Training": [
        "assets/images/services/ai-training-1.jpg",
        "assets/images/services/ai-training-2.jpg",
      ],
      "Other Trainings": [
        "assets/images/others.jpg",
        "assets/images/services/other-training-2.jpg",
      ],
      "Educational Robotics Kits": [
        "assets/images/arduino2.png",
        "assets/images/arduino1.jpg",
      ],
      AIDrone: ["assets/images/drone.png"],
      "BANTAI Quadruped Robot": [
        "assets/images/bantai.png",
        "assets/images/services/bantai-2.png",
      ],
      "SentriCORE Industrial IoT": [
        "assets/images/industrial.jpg",
        "assets/images/industrial2.png",
      ],
      "AI Automation Solutions": [
        "assets/images/automation1.png",
        "assets/images/automation.png",
      ],
      "Custom Software & ERP Systems": [
        "assets/images/ui.jpg",
        "assets/images/ui4.jpg",
      ],
      "Website & Web Applications": [
        "assets/images/ui4.png",
        "assets/images/ui6.png",
      ],
    };

    const CTA_BY_CAT = {
      training: "Ask about this program",
      hardware: "Request a quote",
      industrial: "Discuss your project",
      software: "Start a project",
    };

    // Services whose images are landscape and should stack instead of sitting
    // side by side. Titles must match servicesData exactly.
    const STACKED = [
      "Educational Robotics Kits",
      "SentriCORE Industrial IoT",
      "Custom Software & ERP Systems",
      "Website & Web Applications",
    ];
    // Only services that have BOTH a services side and a products side.
    const SECTIONS = {
      "IoT Training & Solutions": {
        overview:
          "A complete IoT pathway: hands-on training to build the skills, and School of IoT Philippines kits and dashboards to put them into practice.",
        parts: [
          {
            label: "Training & Services",
            text: "Programs that teach students and professionals how to design, build, and deploy IoT systems.",
            features: [
              "IoT Bootcamps (monthly, 3 days): hands-on workshops",
              "Institutional programs: custom training aligned with your school or organization",
              "Consulting & integration: IoT labs, smart projects, and pilot systems",
            ],
            images: ["assets/images/iot1.png", "assets/images/iot3.jpg"],

            contain: true,
            cta: "Enroll in a bootcamp",
          },
          {
            label: "Products",
            text: "School of IoT Philippines is a complete learning package, from skills training to practical tools.",
            features: [
              "IoT Learning Kits: affordable, modular kits for fundamentals and real-world projects",
              "IoT Dashboards & Tools: software for monitoring, analyzing, and managing IoT data",
            ],
            images: ["assets/images/iot2.png"],
            contain: true,
            cta: "Request a kit quote",
          },
        ],
      },
      "AI & Robotics Training": {
        overview:
          "Learn robotics, AI, and machine learning in person or fully online, and equip your school with the kits and software to teach it at scale.",
        parts: [
          {
            label: "Training & Services",
            text: "Practical programs for educators, students, and professionals.",
            features: [
              "AI & Robotics Bootcamps: robotics programming, AI applications, machine learning",
              "Online AI Robotics: fully virtual and nationwide, no hardware needed",
              "AI Academy: Machine Learning, AI applications, and LLMs",
            ],
            images: ["assets/images/ai2.jpg", "assets/images/ai3.jpg"],
            cta: "Enroll in a bootcamp",
          },
          {
            label: "Products",
            text: "Robotics kits and software that give institutions modern training infrastructure without heavy costs.",
            features: [
              "SMORPHI, SMORPHI 2 & SMORPHI Imaginary: educational and advanced robotics kits",
              "AI Online License (SaaS): subscription access so schools can bring AI and ML into their curriculum at scale",
            ],
            images: ["assets/images/ai.png"],
            contain: true,
            cta: "Request a quote",
            link: {
              label: "See all robotics kits",
              title: "Educational Robotics Kits",
            },
          },
        ],
      },
    };

    let activeCat = categories[0].id;
    let lastFocused = null;
    // Service images open in the existing #imageLightbox (the same one the
    // project showcase uses). The Work code is not touched.
    const svcLightbox = document.querySelector("#imageLightbox");
    const svcLightboxImg = document.querySelector("#imageLightboxImg");

    const openServiceImage = (src, alt) => {
      if (!svcLightbox || !svcLightboxImg) return;
      svcLightboxImg.src = src;
      svcLightboxImg.alt = alt || "";
      svcLightbox.classList.add("is-open");
      svcLightbox.setAttribute("aria-hidden", "false");
    };

    const closeServiceImage = () => {
      if (!svcLightbox || !svcLightboxImg) return;
      svcLightbox.classList.remove("is-open");
      svcLightbox.setAttribute("aria-hidden", "true");
      svcLightboxImg.src = "";
    };

    if (svcLightbox) {
      svcLightbox.querySelectorAll("[data-close]").forEach((el) => {
        el.addEventListener("click", closeServiceImage);
      });

      // Registered before the service page's own Escape handler, so Esc
      // closes only the preview and not the service page behind it.
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && svcLightbox.classList.contains("is-open")) {
          closeServiceImage();
          e.stopImmediatePropagation();
        }
      });
    }

    const renderTabs = () => {
      servicesTabs.innerHTML = categories
        .map((c) => {
          const on = c.id === activeCat;
          return `<button type="button" role="tab" class="services__tab${on ? " is-active" : ""}" data-cat="${c.id}" aria-selected="${on}" tabindex="${on ? 0 : -1}">${c.label}</button>`;
        })
        .join("");
    };

    const renderCards = () => {
      servicesGrid.innerHTML = servicesData
        .map((s, i) => ({ s, i }))
        .filter(({ s }) => s.cat === activeCat)
        .map(
          ({ s, i }) => `
            <article class="services__card${s.action ? " services__card--action" : ""}" role="listitem" data-index="${i}" tabindex="0">
              <span class="services__card-icon">${ICONS[s.icon]}</span>
              <h3 class="services__card-title">${s.title}</h3>
              <p class="services__card-lead">${s.short}</p>
              <p class="services__card-desc">${s.blurb}</p>
              <span class="services__card-link">${s.cta || "Learn more"} <span aria-hidden="true">→</span></span>
            </article>
          `,
        )
        .join("");
    };

    // ---- Detail "page" (full-screen overlay, never affects section height) ----
    const page = document.querySelector("#servicePage");

    const pageSections = document.querySelector("#servicePageSections");
    const pageBackLabel = document.querySelector("#servicePageBackLabel");

    let currentService = null;
    let currentParts = [];

    const buildSection = (part, idx, headHtml) => {
      const sec = document.createElement("section");
      sec.className = "service-page__section";
      sec.id = `servicePart${idx}`;

      const media = document.createElement("div");
      media.className =
        "service-page__media" + (part.stack ? " is-stacked" : "");
      (part.images || []).forEach((src, n) => {
        const fig = document.createElement("figure");
        fig.className =
          "service-page__shot" + (part.contain ? " is-contain" : "");
        const img = document.createElement("img");
        img.alt = `${currentService.title} photo ${n + 1}`;
        img.loading = "lazy";
        img.onerror = () => {
          fig.remove();
          if (!media.children.length) sec.classList.add("no-media");
        };
        img.addEventListener("click", () =>
          openServiceImage(img.currentSrc || img.src, img.alt),
        );
        img.src = src;
        fig.appendChild(img);
        media.appendChild(fig);
      });
      if (!part.images || !part.images.length) sec.classList.add("no-media");

      const linkIndex = part.link
        ? servicesData.findIndex((x) => x.title === part.link.title)
        : -1;

      const text = document.createElement("div");
      text.className = "service-page__text";
      text.innerHTML = `
        ${headHtml || ""}
        ${part.label ? `<p class="service-page__label">${part.label}</p>` : ""}
        ${part.text ? `<p class="service-page__desc">${part.text}</p>` : ""}
        <ul class="service-page__list">
          ${part.features.map((f) => `<li>${f}</li>`).join("")}
        </ul>
        <div class="service-page__actions">
          <button type="button" class="btn btn--primary" data-ask="${idx}">${part.cta}</button>
          ${
            linkIndex > -1
              ? `<button type="button" class="btn btn--outline" data-open="${linkIndex}">${part.link.label}</button>`
              : ""
          }
        </div>
      `;

      // Text on the left, images on the right
      sec.append(text, media);
      return sec;
    };

    const openDetail = (index) => {
      const s = servicesData[index];
      const cat = categories.find((c) => c.id === s.cat);
      const cfg = SECTIONS[s.title];
      const alreadyOpen = page.classList.contains("is-open");

      currentService = s;
      currentParts = cfg
        ? cfg.parts
        : [
            {
              text: s.desc,
              features: s.features,
              images: IMAGES[s.title] || (s.image ? [s.image] : []),
              cta: CTA_BY_CAT[s.cat] || "Ask about this service",
              stack: STACKED.includes(s.title), // new
            },
          ];

      // Title block lives at the top of the first text column
      const headHtml = `
        <header class="service-page__head">
          <span class="service-page__icon">${ICONS[s.icon]}</span>
          <div>
            <p class="service-page__kicker">${cat.label}</p>
            <h2 class="service-page__title" id="servicePageTitle">${s.title}</h2>
          </div>
        </header>
        ${cfg ? `<p class="service-page__overview">${cfg.overview}</p>` : ""}
        ${
          currentParts.length > 1
            ? `<nav class="service-page__jump" aria-label="Sections">${currentParts
                .map(
                  (p, i) =>
                    `<button type="button" class="service-page__jump-btn" data-jump="${i}">${p.label}</button>`,
                )
                .join("")}</nav>`
            : ""
        }
      `;

      pageSections.innerHTML = "";
      currentParts.forEach((p, i) =>
        pageSections.appendChild(buildSection(p, i, i === 0 ? headHtml : "")),
      );
      pageBackLabel.textContent = `Back to ${cat.label}`;

      if (!alreadyOpen) {
        lastFocused = document.activeElement;
        page.classList.add("is-open");
        page.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        history.pushState({ svc: true }, "");
      }
      page.scrollTop = 0;
      document.querySelector("#servicePageBack").focus({ preventScroll: true });
    };

    // Jump pills, cross-links, and per-row contact buttons
    page.addEventListener("click", (e) => {
      const jump = e.target.closest("[data-jump]");
      if (jump) {
        const target = page.querySelector(`#servicePart${jump.dataset.jump}`);
        if (target)
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      const open = e.target.closest("[data-open]");
      if (open) {
        openDetail(Number(open.dataset.open));
        return;
      }

      const ask = e.target.closest("[data-ask]");
      if (ask) {
        const part = currentParts[Number(ask.dataset.ask)];
        const msg = document.querySelector("#contactForm [name='message']");
        if (msg && !msg.value.trim()) {
          const what = part.label
            ? `${currentService.title} (${part.label})`
            : currentService.title;
          msg.value = `Hi, I'd like to know more about ${what}.`;
        }
        const trigger = document.querySelector(
          ".site-footer .js-contact-trigger",
        );
        if (trigger) trigger.click();
      }
    });

    const hideDetail = () => {
      page.classList.remove("is-open");
      page.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus({ preventScroll: true });
    };

    // Closing goes through history so the browser/phone Back button works too.
    const closeDetail = () => {
      if (history.state && history.state.svc) history.back();
      else hideDetail();
    };

    window.addEventListener("popstate", () => {
      if (page.classList.contains("is-open")) hideDetail();
    });

    document
      .querySelector("#servicePageBack")
      .addEventListener("click", closeDetail);
    document
      .querySelector("#servicePageClose")
      .addEventListener("click", closeDetail);

    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        page.classList.contains("is-open") &&
        !document.querySelector("#contactModal.is-open")
      ) {
        closeDetail();
      }
    });

    const activateCard = (index) => {
      const s = servicesData[index];
      if (s.action === "contact") {
        const trigger = document.querySelector(
          ".header__actions .js-contact-trigger",
        );
        if (trigger) trigger.click();
      } else if (s.action === "work") {
        const work = document.querySelector("#work");
        if (work) work.scrollIntoView({ behavior: "smooth" });
      } else {
        openDetail(index);
      }
    };

    const selectTab = (id, focusTab) => {
      activeCat = id;
      renderTabs();
      renderCards();
      if (focusTab) servicesTabs.querySelector(`[data-cat="${id}"]`).focus();
    };

    servicesTabs.addEventListener("click", (e) => {
      const tab = e.target.closest("[data-cat]");
      if (tab && tab.dataset.cat !== activeCat) selectTab(tab.dataset.cat);
    });

    servicesTabs.addEventListener("keydown", (e) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
      e.preventDefault();
      const last = categories.length - 1;
      const i = categories.findIndex((c) => c.id === activeCat);
      const next =
        e.key === "ArrowRight"
          ? i === last
            ? 0
            : i + 1
          : e.key === "ArrowLeft"
            ? i === 0
              ? last
              : i - 1
            : e.key === "Home"
              ? 0
              : last;
      selectTab(categories[next].id, true);
    });

    servicesGrid.addEventListener("click", (e) => {
      const card = e.target.closest(".services__card");
      if (card) activateCard(Number(card.dataset.index));
    });

    servicesGrid.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const card = e.target.closest(".services__card");
      if (!card) return;
      e.preventDefault();
      activateCard(Number(card.dataset.index));
    });

    renderTabs();
    renderCards();

    // Tilt effect, pointer devices only
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
          servicesGrid
            .querySelectorAll(".services__card")
            .forEach((card) => (card.style.transform = ""));
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
});
