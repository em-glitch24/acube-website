// services.html: every service on one page, grouped by category.
// The tabs at the top are shortcuts: they jump to a category and highlight as you scroll.
document.addEventListener("DOMContentLoaded", () => {
  const tabsEl = document.querySelector("#svcTabs");
  const panelEl = document.querySelector("#svcPanel");
  if (!tabsEl || !panelEl || !window.ACUBE) return;

  const { ICONS, categories, services } = window.ACUBE;
  const items = services.filter((s) => !s.action);

  // ---- Tabs (real links, so they work even before the script finishes) ----
  tabsEl.innerHTML = categories
    .map((c, i) => {
      const n = items.filter((s) => s.cat === c.id).length;
      return `<a class="svc-tab${i === 0 ? " is-active" : ""}" href="#${c.id}" data-cat="${c.id}">${c.label}<span class="svc-tab__count">${n}</span></a>`;
    })
    .join("");

  // ---- Images: show only the first one in the list that loads ----
  const loadOk = (src) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.onerror = () => resolve(null);
      img.src = src;
    });

  const firstOk = async (list) => {
    for (const src of list || []) {
      if (await loadOk(src)) return src;
    }
    return null;
  };

  const mountImage = async (row, images, alt, contain) => {
    const src = await firstOk(images);
    const media = row.querySelector(".svc-row__media");
    if (!src) {
      row.classList.add("no-media");
      media.remove();
      return;
    }
    media.innerHTML = `<div class="svc-gallery${contain ? " is-contain" : ""}">
      <button type="button" class="svc-gallery__main" aria-label="Enlarge photo: ${alt}"><img src="${src}" alt="${alt}"></button></div>`;
  };

  // ---- Sections: one per category, rows alternate image side inside each ----
  const rowHtml = ({ s, p, i, flip }) => {
    const tags = p.tags || (i === 0 ? s.tags : null);
    return `<article class="svc-row${flip ? " svc-row--flip" : ""}" id="${i === 0 ? s.slug : `${s.slug}-${i + 1}`}">
      <div class="svc-row__media"></div>
      <div class="svc-row__text">
        ${
          i === 0
            ? `<header class="svc-head"><span class="svc-head__icon">${ICONS[s.icon]}</span><h3 class="svc-head__title">${s.title}</h3></header>
               ${s.overview ? `<p class="svc-overview">${s.overview}</p>` : ""}`
            : ""
        }
        ${p.label ? `<p class="svc-label">${p.label}</p>` : ""}
        <p class="svc-desc">${p.text}</p>
        <ul class="svc-list-ul">${p.features.map((f) => `<li>${f}</li>`).join("")}</ul>
        ${tags ? `<ul class="svc-tags">${tags.map((t) => `<li>${t}</li>`).join("")}</ul>` : ""}
        <div class="svc-actions">
          <button type="button" class="btn btn--primary" data-ask="${s.slug}|${i}">${p.cta}</button>
          ${p.link ? `<button type="button" class="btn btn--outline" data-go="${p.link.slug}">${p.link.label}</button>` : ""}
        </div>
      </div>
    </article>`;
  };

  const allRows = []; // same order as the rows in the page
  panelEl.innerHTML = categories
    .map((cat, ci) => {
      const rows = [];
      let n = 0;
      items
        .filter((s) => s.cat === cat.id)
        .forEach((s) =>
          s.parts.forEach((p, i) =>
            rows.push({ s, p, i, flip: n++ % 2 === 1 }),
          ),
        );
      allRows.push(...rows);

      return `<section class="svc-section" id="${cat.id}" data-cat="${cat.id}">
        <header class="svc-section__head">
          <span class="svc-section__num">${String(ci + 1).padStart(2, "0")}</span>
          <div>
            <h2 class="svc-section__title">${cat.label}</h2>
            <p class="svc-section__blurb">${cat.blurb}</p>
          </div>
        </header>
        <div class="svc-rows">${rows.map(rowHtml).join("")}</div>
      </section>`;
    })
    .join("");

  const rowEls = panelEl.querySelectorAll(".svc-row");
  const mounts = allRows.map(({ s, p }, k) =>
    mountImage(rowEls[k], p.images, s.title, p.contain),
  );

  // ---- Highlight the tab of the category you are reading ----
  const sections = [...panelEl.querySelectorAll(".svc-section")];
  const tabEls = [...tabsEl.querySelectorAll(".svc-tab")];
  let current = categories[0].id;
  let lockUntil = 0; // ignore scrolling briefly after a tab click so it doesn't flicker

  const setActive = (id) => {
    tabEls.forEach((t) => {
      const on = t.dataset.cat === id;
      t.classList.toggle("is-active", on);
      if (on) t.setAttribute("aria-current", "true");
      else t.removeAttribute("aria-current");
    });
    const active = tabsEl.querySelector(".is-active");
    if (active && tabsEl.scrollWidth > tabsEl.clientWidth) {
      tabsEl.scrollTo({
        left: active.offsetLeft - (tabsEl.clientWidth - active.offsetWidth) / 2,
        behavior: "smooth",
      });
    }
  };

  const spy = () => {
    if (Date.now() < lockUntil) return;
    const line = window.innerHeight * 0.35;
    let id = sections[0].dataset.cat;
    sections.forEach((s) => {
      if (s.getBoundingClientRect().top <= line) id = s.dataset.cat;
    });
    if (id !== current) {
      current = id;
      setActive(id);
    }
  };

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        spy();
        ticking = false;
      });
    },
    { passive: true },
  );

  tabsEl.addEventListener("click", (e) => {
    const tab = e.target.closest("[data-cat]");
    if (!tab) return;
    current = tab.dataset.cat;
    setActive(current);
    lockUntil = Date.now() + 900;
  });

  // ---- Deep links: services.html#aidrone or #hardware ----
  const jumpToHash = (smooth) => {
    const id = decodeURIComponent(location.hash.slice(1));
    const el = id && document.getElementById(id);
    if (!el || !panelEl.contains(el)) return;
    el.scrollIntoView({
      behavior: smooth ? "smooth" : "instant",
      block: "start",
    });
    const sec = el.closest(".svc-section");
    if (sec) {
      current = sec.dataset.cat;
      setActive(current);
      lockUntil = Date.now() + 900;
    }
  };
  // Wait for the images so the page height is final, then jump
  Promise.all(mounts).then(() => jumpToHash(false));
  window.addEventListener("hashchange", () => jumpToHash(true));

  // ---- Lightbox, cross-links, contact ----
  const lightbox = document.querySelector("#imageLightbox");
  const lightboxImg = document.querySelector("#imageLightboxImg");
  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
  };
  if (lightbox) {
    lightbox
      .querySelectorAll("[data-close]")
      .forEach((el) => el.addEventListener("click", closeLightbox));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("is-open"))
        closeLightbox();
    });
  }

  panelEl.addEventListener("click", (e) => {
    const main = e.target.closest(".svc-gallery__main");
    if (main && lightbox) {
      const img = main.querySelector("img");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      return;
    }

    const go = e.target.closest("[data-go]");
    if (go) {
      location.hash = go.dataset.go;
      return;
    }

    const ask = e.target.closest("[data-ask]");
    if (ask) {
      const [slug, idx] = ask.dataset.ask.split("|");
      const svc = items.find((s) => s.slug === slug);
      const part = svc.parts[Number(idx)];
      const msg = document.querySelector("#contactForm [name='message']");
      if (msg && !msg.value.trim()) {
        const what = part.label ? `${svc.title} (${part.label})` : svc.title;
        msg.value = `Hi, I'd like to know more about ${what}.`;
      }
      document.querySelector(".site-footer .js-contact-trigger")?.click();
    }
  });
});
