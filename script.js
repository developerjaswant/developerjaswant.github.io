/* ===================================================
   JASWANT KUMAR — PORTFOLIO INTERACTIONS & ANIMATIONS
   =================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ─────────────────────────────────────
     1. HEADER SCROLL + TOP PROGRESS BAR
  ───────────────────────────────────── */
  const header = document.getElementById("header");
  const progress = document.querySelector(".scroll-progress");

  window.addEventListener("scroll", () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 30);
    }
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = h > 0 ? (window.scrollY / h * 100) + "%" : "0%";
    }
  }, { passive: true });

  /* ─────────────────────────────────────
     2. MOBILE NAV TOGGLE
  ───────────────────────────────────── */
  const menuBtn = document.getElementById("menu");
  const navLinks = document.getElementById("navLinks");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
    document.querySelectorAll(".nav-links a").forEach(link =>
      link.addEventListener("click", () => navLinks.classList.remove("open"))
    );
  }

  /* ─────────────────────────────────────
     3. ACTIVE NAV ON SCROLL
  ───────────────────────────────────── */
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a[href^='#']");

  window.addEventListener("scroll", () => {
    let current = "home";
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 180) current = s.id;
    });
    navItems.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
  }, { passive: true });

  /* ─────────────────────────────────────
     4. CURSOR GLOW
  ───────────────────────────────────── */
  const glow = document.querySelector(".cursor-glow");
  if (glow) {
    document.addEventListener("mousemove", e => {
      glow.style.left = e.clientX + "px";
      glow.style.top  = e.clientY + "px";
    });
  }

  /* ─────────────────────────────────────
     5. TYPEWRITER ANIMATION
  ───────────────────────────────────── */
  const typingEl = document.getElementById("typingText");
  const words = [
    "Full Stack Web Developer",
    "PHP 8.x & Laravel Architect",
    "School ERP / SaaS Specialist",
    "REST API & Payment Gateway Engineer",
    "WordPress & Shopify Developer"
  ];
  let wIdx = 0, cIdx = 0, deleting = false;

  function type() {
    if (!typingEl) return;
    const w = words[wIdx];
    if (!deleting) {
      typingEl.textContent = w.substring(0, ++cIdx);
      if (cIdx === w.length) { deleting = true; setTimeout(type, 1500); return; }
    } else {
      typingEl.textContent = w.substring(0, --cIdx);
      if (cIdx === 0) { deleting = false; wIdx = (wIdx + 1) % words.length; }
    }
    setTimeout(type, deleting ? 38 : 72);
  }
  type();

  /* ─────────────────────────────────────
     6. SCROLL REVEAL (INTERSECTION OBSERVER)
  ───────────────────────────────────── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => revealObs.observe(el));

  /* ─────────────────────────────────────
     7. SECTION HEADING REVEAL (separate observer)
  ───────────────────────────────────── */
  const headObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        headObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll(".section-head").forEach(el => headObs.observe(el));

  /* ─────────────────────────────────────
     8. STAT COUNTER ANIMATION + PULSE
  ───────────────────────────────────── */
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = +el.dataset.count;
      const isPerc = target === 100;
      let current  = 0;
      const step   = Math.max(1, Math.ceil(target / 32));

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
          // trigger glow pulse on parent card
          const card = el.closest("article");
          if (card) {
            card.classList.add("count-done");
            card.addEventListener("animationend", () => card.classList.remove("count-done"), { once: true });
          }
        }
        el.textContent = isPerc ? current + "%" : current + "+";
      }, 35);

      counterObs.unobserve(el);
    });
  }, { threshold: 0.6 });

  document.querySelectorAll("[data-count]").forEach(el => counterObs.observe(el));

  /* ─────────────────────────────────────
     9. SKILL PROGRESS BARS + PERCENTAGE COUNTER
  ───────────────────────────────────── */
  const skillObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const bar  = e.target;
      const pct  = parseInt(bar.getAttribute("data-progress") || "90", 10);
      const card = bar.closest("article.skill");
      const pctEl = card ? card.querySelector(".skill-pct") : null;

      // Animate the bar width
      bar.style.width = pct + "%";

      // Animate the percentage counter
      if (pctEl) {
        let count = 0;
        const step = Math.max(1, Math.ceil(pct / 30));
        const timer = setInterval(() => {
          count += step;
          if (count >= pct) { count = pct; clearInterval(timer); }
          pctEl.textContent = count + "%";
        }, 40);
      }

      skillObs.unobserve(bar);
    });
  }, { threshold: 0.4 });

  document.querySelectorAll(".skill-progress-bar span").forEach(bar => skillObs.observe(bar));

  /* ─────────────────────────────────────
     10. TIMELINE ENERGY BEAM TRIGGER
  ───────────────────────────────────── */
  const beam = document.querySelector(".timeline-beam");
  if (beam) {
    const beamObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          beam.classList.add("active");
          beamObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    const timeline = document.querySelector(".timeline");
    if (timeline) beamObs.observe(timeline);
  }

  /* ─────────────────────────────────────
     11. METRIC CARD 3D TILT (mouse-move)
  ───────────────────────────────────── */
  document.querySelectorAll(".metric-grid article").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(600px) rotateY(${dx * 7}deg) rotateX(${-dy * 7}deg) translateY(-5px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  /* ─────────────────────────────────────
     12. GATEWAY STAGGER REVEAL
  ───────────────────────────────────── */
  const gateways = document.querySelectorAll(".gateway");
  const gatewayObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        gatewayObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  gateways.forEach((gw, i) => {
    gw.style.setProperty("--delay", (i * 0.04) + "s");
    gatewayObs.observe(gw);
  });

  /* ─────────────────────────────────────
     13. COPY CODE BUTTON
  ───────────────────────────────────── */
  const copyBtn = document.getElementById("copyCodeBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const code = copyBtn.closest(".payment-code")?.querySelector("pre code")?.innerText || "";
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(() => {
          copyBtn.textContent = "✓ Copied!";
          copyBtn.classList.add("copied");
          setTimeout(() => {
            copyBtn.textContent = "⎘ Copy";
            copyBtn.classList.remove("copied");
          }, 2200);
        });
      }
    });
  }

  /* ─────────────────────────────────────
     14. PROJECT CARD MAGNETIC HOVER
  ───────────────────────────────────── */
  document.querySelectorAll(".project").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const dx   = (e.clientX - rect.left) / rect.width  - 0.5;
      const dy   = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `translateX(8px) perspective(800px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  /* ─────────────────────────────────────
     15. FOOTER YEAR
  ───────────────────────────────────── */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
