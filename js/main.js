/* =============================================================
   株式会社ミタックス コーポレートサイト
   main.js  —  インタラクション全般
   -------------------------------------------------------------
   1. ヘッダーのスクロール挙動
   2. モバイルメニュー（ハンバーガー）
   3. スクロールアニメーション（フェードイン）
   4. 数字カウントアップ
   5. ナビの現在地ハイライト
   6. ページトップボタン
   7. 簡易フォーム送信（デモ動作）
   ============================================================= */
(function () {
  "use strict";

  const header = document.querySelector(".header");
  const body = document.body;

  /* ----------------------------------------------------------
     1. ヘッダー：スクロールで背景を付ける
     ※ 下層ページ（.header.is-solid）は常に白背景
  ---------------------------------------------------------- */
  const isSolidHeader = header && header.classList.contains("is-solid");
  function onScrollHeader() {
    if (!header || isSolidHeader) return;
    if (window.scrollY > 60) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* ----------------------------------------------------------
     2. モバイルメニュー
  ---------------------------------------------------------- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      body.classList.toggle("menu-open");
      const open = body.classList.contains("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // メニュー内のリンクをタップしたら閉じる
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ----------------------------------------------------------
     3. スクロールアニメーション
     .reveal / .reveal-left / .reveal-right を持つ要素を監視
  ---------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ----------------------------------------------------------
     4. 数字カウントアップ
     <span data-count="15" data-decimals="0" data-duration="1800">0</span>
  ---------------------------------------------------------- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const duration = parseInt(el.dataset.duration || "1800", 10);
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      // イージング（easeOutExpo）
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const value = target * eased;
      el.textContent = value
        .toFixed(decimals)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 3桁区切り
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    requestAnimationFrame(tick);
  }

  const counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    const co = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            co.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.dataset.count; });
  }

  /* ----------------------------------------------------------
     5. ナビの現在地ハイライト（1ページ内アンカー用）
  ---------------------------------------------------------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    const map = {};
    navLinks.forEach(function (link) {
      const id = link.getAttribute("href").slice(1);
      if (id) map[id] = link;
    });
    const so = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          const link = map[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.classList.remove("is-active"); });
            link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) { so.observe(s); });
  }

  /* ----------------------------------------------------------
     6. ページトップボタン
  ---------------------------------------------------------- */
  const pagetop = document.querySelector(".pagetop");
  if (pagetop) {
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 600) pagetop.classList.add("show");
        else pagetop.classList.remove("show");
      },
      { passive: true }
    );
    pagetop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ----------------------------------------------------------
     7. 簡易フォーム送信（デモ）
     ※ 実際の送信処理（メール送信・フォームサービス連携）は
        サーバー側 or フォームサービスで実装してください。
  ---------------------------------------------------------- */
  const forms = document.querySelectorAll("form[data-demo-form]");
  forms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn ? btn.innerHTML : "";
      if (btn) { btn.disabled = true; btn.innerHTML = "送信中…"; }
      setTimeout(function () {
        form.reset();
        if (btn) { btn.disabled = false; btn.innerHTML = original; }
        const done = form.querySelector(".form__done");
        if (done) { done.hidden = false; }
        alert("お問い合わせありがとうございます。\n（これはデモ表示です。実際の送信機能は別途設定してください）");
      }, 900);
    });
  });

  /* ----------------------------------------------------------
     8. 現在の年を自動表示（フッターのコピーライト）
  ---------------------------------------------------------- */
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
