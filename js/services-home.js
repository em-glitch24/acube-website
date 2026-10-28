// Main page Services section: promo video (left) + category cards / service list (right).
document.addEventListener("DOMContentLoaded", () => {
  const panel = document.querySelector("#svcHomePanel");
  if (!panel || !window.ACUBE) return;

  const { ICONS, categories, services } = window.ACUBE;
  let lastCat = null;

  // ---- Video player: the preview frame comes from the video file itself ----
  // true  = plays (muted) when the video scrolls into view, pauses when it leaves
  // false = off, visitors press play themselves
  const AUTOPLAY_ON_SCROLL = true;

  const stage = document.querySelector("#svcVideo");
  const thumbsEl = document.querySelector("#svcThumbs");
  const videos = window.ACUBE.videos || [];
  const PREVIEW_AT = 0.5; // seconds into the video, used for the preview frame
  const SHOW_THUMBS = false; // the "Up next" card replaces the thumbnail strip
  const nextEl = document.querySelector("#svcNext"); // "Up next" card slot, under the video
  if (stage && videos.length) {
    const previewAt = (v) => (v.preview !== undefined ? v.preview : PREVIEW_AT);
    const srcAt = (v) => `${v.src}#t=${previewAt(v)}`;

    let inView = false;
    let userPaused = false; // visitor paused it themselves, so don't force it to resume
    let autoPaused = false; // we paused it because it scrolled away

    // Browsers only allow autoplay when muted. Visitors can unmute in the controls.
    const startMuted = (el) => {
      el.muted = true;
      el.controls = true;
      if (el.ended || el.currentTime < 1) el.currentTime = 0;
      stage.classList.add("is-playing");
      el.play().catch(() => {
        stage.classList.remove("is-playing"); // autoplay blocked: show the play button
        el.controls = false;
      });
    };

    const showVideo = (i, autoplay) => {
      const v = videos[i];
      const hasNext = i + 1 < videos.length; // true = there is a video after this one
      const next = videos.length > 1 ? videos[(i + 1) % videos.length] : null; // wraps back to video 1 after the last      userPaused = false;
      autoPaused = false;
      stage.classList.remove("is-playing");
      stage.innerHTML = `
        <video src="${srcAt(v)}" preload="metadata" playsinline muted ${v.poster ? `poster="${v.poster}"` : ""}></video>
        <button type="button" class="svc-video__play" aria-label="Play: ${v.title}">
          <span class="svc-video__icon">${ICONS.play}</span>
          <span class="svc-video__label">${v.title}</span>
        </button>`;

      // "Up next" card lives under the video, outside the player
      if (nextEl) {
        nextEl.innerHTML = next
          ? `<button type="button" class="svc-next" aria-label="Play ${hasNext ? "next" : "again"}: ${next.title}">
              <span class="svc-next__thumb"><video src="${srcAt(next)}" preload="auto" muted playsinline tabindex="-1"></video></span>
              <span class="svc-next__text"><small>${hasNext ? "Up next" : "Watch again"}</small><strong>${next.title}</strong></span>
            </button>`
          : "";
        nextEl
          .querySelector(".svc-next")
          ?.addEventListener("click", () =>
            showVideo((i + 1) % videos.length, true),
          );
      }
      const el = stage.querySelector("video");

      // Clicking the play button plays with sound
      const play = () => {
        stage.classList.add("is-playing");
        el.muted = false;
        el.controls = true;
        el.currentTime = 0;
        el.play().catch(() => {
          // browser blocked sound (no click yet), so play muted instead
          el.muted = true;
          el.play().catch(() => {});
        });
      };
      stage.querySelector(".svc-video__play").addEventListener("click", play);

      el.addEventListener("play", () => {
        userPaused = false;
      });
      el.addEventListener("pause", () => {
        if (el.ended) return;
        if (autoPaused) autoPaused = false;
        else userPaused = true;
      });

      // When it finishes: autoplay the next video, or reset if this is the last one
      el.addEventListener("ended", () => {
        if (hasNext) {
          showVideo(i + 1, true); // autoplay the next video
          return;
        }
        // last video: back to its preview frame + play button (no endless loop)
        el.controls = false;
        el.muted = true;
        el.currentTime = previewAt(v);
        stage.classList.remove("is-playing");
      });

      if (autoplay) play();
      else if (AUTOPLAY_ON_SCROLL && inView) startMuted(el);

      if (thumbsEl) {
        thumbsEl
          .querySelectorAll(".svc-thumb")
          .forEach((t, n) => t.classList.toggle("is-active", n === i));
      }
    };

    // Thumbnails (off by default now, set SHOW_THUMBS to true to bring them back)
    if (SHOW_THUMBS && thumbsEl && videos.length > 1) {
      thumbsEl.innerHTML = videos
        .map(
          (
            v,
            n,
          ) => `<button type="button" class="svc-thumb${n === 0 ? " is-active" : ""}" data-i="${n}" aria-label="Play: ${v.title}" title="${v.title}">
            <video src="${srcAt(v)}" preload="metadata" muted playsinline tabindex="-1"></video>
          </button>`,
        )
        .join("");
      thumbsEl.addEventListener("click", (e) => {
        const thumb = e.target.closest("[data-i]");
        if (thumb) showVideo(Number(thumb.dataset.i), true);
      });
    }

    // Play when at least half of the video is on screen, pause when it leaves
    if (AUTOPLAY_ON_SCROLL && "IntersectionObserver" in window) {
      new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
          const el = stage.querySelector("video");
          if (!el) return;
          if (inView) {
            if (!userPaused && el.paused) startMuted(el);
          } else {
            userPaused = false; // next visit plays again
            if (!el.paused) {
              autoPaused = true;
              el.pause();
            }
          }
        },
        { threshold: 0.5 },
      ).observe(stage);
    }

    showVideo(0, false);
  }

  // ---- Cards + list share one grid cell, so the section height never changes ----
  panel.innerHTML = `<div class="svc-cats"></div><div class="svc-list" inert></div>`;
  const catsEl = panel.querySelector(".svc-cats");
  const listEl = panel.querySelector(".svc-list");

  catsEl.innerHTML = categories
    .map((c) => {
      const count = services.filter((s) => s.cat === c.id && !s.action).length;
      return `<button type="button" class="svc-cat" data-cat="${c.id}">
        <span class="svc-cat__head">
          <span class="svc-cat__icon">${ICONS[c.icon]}</span>
          <span class="svc-cat__title">${c.label}</span>
        </span>
        <span class="svc-cat__desc svc-cat__desc--full">${c.blurb}</span>
        <span class="svc-cat__desc svc-cat__desc--short">${c.short || c.blurb}</span>        <span class="svc-cat__count">${count} services <span aria-hidden="true">→</span></span>
        <span class="svc-cat__more" aria-hidden="true">Learn more ${ICONS.arrow}</span>
      </button>`;
    })
    .join("");

  const showCards = () => {
    panel.classList.remove("is-list");
    catsEl.inert = false;
    listEl.inert = true;
    if (lastCat)
      catsEl
        .querySelector(`[data-cat="${lastCat}"]`)
        ?.focus({ preventScroll: true });
  };

  // Each row links to its section on services.html
  const showList = (catId) => {
    const cat = categories.find((c) => c.id === catId);
    const rows = services
      .filter((s) => s.cat === catId)
      .map((s) => {
        const inner = `<span class="svc-item__icon">${ICONS[s.icon]}</span>
          <span class="svc-item__text"><strong>${s.title}</strong><span>${s.short}</span></span>
          <span class="svc-item__arrow">${ICONS.arrow}</span>`;
        if (s.action === "contact")
          return `<button type="button" class="svc-item" data-contact>${inner}</button>`;
        if (s.action === "work")
          return `<a class="svc-item" href="#work">${inner}</a>`;
        return `<a class="svc-item" href="services.html#${s.slug}">${inner}</a>`;
      })
      .join("");

    listEl.innerHTML = `
      <button type="button" class="svc-list__back" data-back>← All categories</button>
      <h3 class="svc-list__title">${cat.label}</h3>
      <div class="svc-list__rows">${rows}</div>`;

    panel.classList.add("is-list");
    catsEl.inert = true;
    listEl.inert = false;
    listEl.querySelector("[data-back]").focus({ preventScroll: true });
  };

  panel.addEventListener("click", (e) => {
    const card = e.target.closest("[data-cat]");
    if (card) {
      lastCat = card.dataset.cat;
      showList(lastCat);
      return;
    }
    if (e.target.closest("[data-back]")) {
      showCards();
      return;
    }
    if (e.target.closest("[data-contact]")) {
      document.querySelector(".header__actions .js-contact-trigger")?.click();
    }
  });
});
