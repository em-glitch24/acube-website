// Shared service data. Edit services here; the main page and services.html both read from it.
window.ACUBE = (() => {
  const svg = (p) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;

  const ICONS = {
    code: svg(
      '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    ),
    globe: svg(
      '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20"/>',
    ),
    cpu: svg(
      '<rect x="6" y="6" width="12" height="12" rx="1"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
    ),
    bot: svg(
      '<rect x="4" y="9" width="16" height="11" rx="2"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/><path d="M12 9V5M9 5h6"/>',
    ),
    factory: svg('<path d="M3 21V10l6 4v-4l6 4V7l6 4v10H3z"/>'),
    drone: svg(
      '<rect x="9" y="9" width="6" height="6" rx="1"/><circle cx="4" cy="4" r="2"/><circle cx="20" cy="4" r="2"/><circle cx="4" cy="20" r="2"/><circle cx="20" cy="20" r="2"/><path d="M9 9L5.5 5.5M15 9l3.5-3.5M9 15l-3.5 3.5M15 15l3.5 3.5"/>',
    ),
    book: svg(
      '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    ),
    box: svg(
      '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
    ),
    zap: svg('<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>'),
    chat: svg(
      '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    ),
    layout: svg(
      '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
    ),
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
    arrow: svg(
      '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    ),
  };

  const categories = [
    {
      id: "training",
      icon: "book",
      label: "Training & Education",
      blurb:
        "Hands-on IoT, AI, and robotics bootcamps for students and professionals, custom programs for schools, and short courses on request.",
    },
    {
      id: "hardware",
      icon: "bot",
      label: "Robotics & Hardware",
      blurb:
        "Educational robotics kits, programmable AI drones, and the BANTAI quadruped robot, built for classrooms, labs, and research.",
    },
    {
      id: "industrial",
      icon: "factory",
      label: "Industrial & AI Automation",
      blurb:
        "SentriCORE IoT monitoring and AI automation that put agents, chatbots, and predictive maintenance to work in real operations.",
    },
    {
      id: "software",
      icon: "code",
      label: "Software & Web",
      blurb:
        "Custom ERP systems, internal tools, websites, and web apps designed around how your business actually runs.",
    },
  ];

  const CTA_BY_CAT = {
    training: "Ask about this program",
    hardware: "Request a quote",
    industrial: "Discuss your project",
    software: "Start a project",
  };

  // `action` entries have no detail page: "contact" opens the contact modal, "work" goes to #work.
  const services = [
    // ---- Training & Education ----
    {
      slug: "iot-training",
      cat: "training",
      icon: "cpu",
      title: "IoT Training & Solutions",
      short: "Hands-on IoT education, from bootcamps to lab setups.",
      overview:
        "A complete IoT pathway: hands-on training to build the skills, and School of IoT Philippines kits and dashboards to put them into practice.",
      tags: ["From ₱1,500", "Monthly 3-day bootcamps"],
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
    {
      slug: "ai-robotics-training",
      cat: "training",
      icon: "bot",
      title: "AI & Robotics Training",
      short: "Practical robotics and AI training, in-person or online.",
      overview:
        "Learn robotics, AI, and machine learning in person or fully online, and equip your school with the kits and software to teach it at scale.",
      tags: ["In-person", "Fully online"],
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
          link: { label: "See all robotics kits", slug: "robotics-kits" },
        },
      ],
    },
    {
      slug: "other-trainings",
      cat: "training",
      icon: "book",
      title: "Other Trainings",
      short: "Coding and AI courses, delivered on request.",
      tags: ["On request"],
      blurb:
        "Need something specific? We run short courses on request, covering Arduino and Python coding for robotics and AI, Machine Learning certification, Generative AI, and API building, scheduled around your group.",
      features: [
        "Arduino coding",
        "Python coding for robotics and AI applications",
        "Machine Learning certification",
        "Generative AI",
        "API building",
      ],
      images: [
        "assets/images/others.jpg",
        "assets/images/services/other-training-2.jpg",
      ],
    },

    // ---- Robotics & Hardware ----
    {
      slug: "robotics-kits",
      cat: "hardware",
      icon: "box",
      title: "Educational Robotics Kits",
      short: "SMORPHI, miniAuto and miniArm kits for classrooms and labs.",
      blurb:
        "Modular kits for classrooms and competitions, from the entry-level miniAuto car and miniArm robotic arm to the SMORPHI family for advanced research and prototyping. Pair them with an AI Online License to bring AI and ML into your curriculum at scale.",
      features: [
        "SMORPHI, SMORPHI 2 & SMORPHI Imaginary: educational and advanced robotics kits",
        "miniAuto: entry-level AI vision robot car with mecanum wheels",
        "miniArm: open-source robotic arm for beginners",
        "Custom hardware builds for classrooms & R&D",
      ],
      images: ["assets/images/arduino2.png", "assets/images/arduino1.jpg"],
    },
    {
      slug: "aidrone",
      cat: "hardware",
      icon: "drone",
      title: "AIDrone",
      short: "An educational drone with AI vision you can program.",
      tags: ["Edu Drone", "AI Drone"],
      blurb:
        "A programmable educational drone built on a Raspberry Pi Zero 2 W. Fly it with a transmitter or code it in blocks, Scratch, or Python, then add face tracking and real-time object detection using AI vision.",
      features: [
        "Face and object tracking with intelligent vision",
        "Deep learning for real-time object detection",
        "Available as Edu Drone and AI Drone versions",
      ],
      images: ["assets/images/drone.png"],
      contain: true,
    },
    {
      slug: "bantai",
      cat: "hardware",
      icon: "bot",
      title: "BANTAI Quadruped Robot",
      short: "A first-of-its-kind quadruped for research and inspection.",
      tags: ["Up to 2.5 m/s", "7 kg payload"],
      blurb:
        "An agile quadruped robot with 3D LiDAR and an HD wide-angle camera, designed for research, automation, and inspection in challenging environments. The first of its kind in the Philippine market.",
      features: [
        "Agile mobility up to 2.5 m/s with a 7 kg payload",
        "3D LiDAR and HD wide-angle camera",
        "Built for research, automation, and inspection",
      ],
      images: [
        "assets/images/bantai.png",
        "assets/images/services/bantai-2.png",
      ],
    },

    // ---- Industrial & AI Automation ----
    {
      slug: "sentricore",
      cat: "industrial",
      icon: "factory",
      title: "SentriCORE Industrial IoT",
      short: "IoT monitoring built for industrial and commercial use.",
      tags: ["Pricing by project scope"],
      blurb:
        "An industrial IoT monitoring platform that gives students, researchers, and factories a real-world environment to prototype and validate systems, with data sharing and benchmarking across academia and industry.",
      features: [
        "Real-world test environment for students & researchers",
        "Faster prototyping and validation for industry partners",
        "Data sharing and benchmarking across academia & factories",
      ],
      images: ["assets/images/industrial.jpg", "assets/images/industrial2.png"],
    },
    {
      slug: "ai-automation",
      cat: "industrial",
      icon: "zap",
      title: "AI Automation Solutions",
      short: "AI agents, chatbots, and predictive maintenance.",
      blurb:
        "We build AI agents that handle tasks and workflows on their own, RAG chatbots that give accurate, context-aware answers, and predictive maintenance models that flag equipment issues early, all surfaced on real-time dashboards.",
      features: [
        "Agentic AI that manages tasks, processes, and workflows",
        "RAG chatbots for accurate, context-aware answers",
        "Predictive maintenance models that flag issues early",
        "Smart workflow systems and real-time AI dashboards",
      ],
      images: ["assets/images/automation1.png", "assets/images/automation.png"],
    },
    {
      slug: "custom",
      cat: "industrial",
      icon: "chat",
      action: "contact",
      title: "Need something custom?",
      short: "Tell us the problem and we'll scope the solution.",
    },

    // ---- Software & Web ----
    {
      slug: "custom-software-erp",
      cat: "software",
      icon: "code",
      title: "Custom Software & ERP Systems",
      short: "Business software built around how you actually operate.",
      blurb:
        "From internal tools to full ERP systems, we connect inventory, payroll, sales, and accounting so every department works from the same data, with dashboards that show how the business is really running.",
      features: [
        "Inventory & operations management systems",
        "Employee & workflow tools",
        "Reporting and analytics dashboards",
        "Legacy system modernization",
      ],
      images: ["assets/images/ui.jpg", "assets/images/ui4.jpg"],
    },
    {
      slug: "web-apps",
      cat: "software",
      icon: "globe",
      title: "Website & Web Applications",
      short: "Custom-built sites and apps, designed around your workflow.",
      blurb:
        "Ecommerce platforms, client portals, booking systems, and admin dashboards, designed around your workflow rather than a template. Browse our Work section for sites we've shipped.",
      features: [
        "Ecommerce platforms",
        "Client & customer portals",
        "Booking and scheduling systems",
        "Admin dashboards",
      ],
      images: ["assets/images/ui4.png", "assets/images/ui6.png"],
    },
    {
      slug: "see-work",
      cat: "software",
      icon: "layout",
      action: "work",
      title: "See what we've built",
      short: "Our training albums, robotics, and software in action.",
    },
  ];

  // Videos on the main page. The first one shows by default; the rest appear as
  // small thumbnails under it. The preview image is taken from the video itself.
  //   src:     path to the .mp4 (required)
  //   title:   label on the play button and thumbnail tooltip (required)
  //   preview: second of the video to show as the preview frame (optional, default 0.5)
  //   poster:  your own image instead of the auto preview (optional)
  const videos = [
    { src: "assets/images/acubevid.mp4", title: "Watch our overview" },

    // { src: "assets/videos/iot-bootcamp.mp4", title: "IoT bootcamp", preview: 3 },
    // { src: "assets/videos/robotics-kits.mp4", title: "Robotics kits" },
  ];

  // Single-part services get one default part built from their own fields.
  services.forEach((s) => {
    if (!s.action && !s.parts) {
      s.parts = [
        {
          text: s.blurb,
          features: s.features,
          images: s.images,
          contain: s.contain,
          cta: CTA_BY_CAT[s.cat],
        },
      ];
    }
  });

  return { ICONS, categories, services, CTA_BY_CAT, videos };
})();
