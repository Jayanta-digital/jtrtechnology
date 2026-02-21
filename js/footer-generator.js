/* ============================================================
   FOOTER GENERATOR + ACHIEVEMENT BANNER SLIDER
   Reads CONFIG and builds:
   1. Footer grid (logo, links, contact)
   2. Gorgeous footer bottom bar (visitor counter + dev credit)
   3. Achievement banner slider between toppers and programs
   ============================================================ */
(function () {
    "use strict";

    function init() {
        if (typeof CONFIG === "undefined") {
            console.warn("[footer-generator] CONFIG not found");
            return;
        }
        buildFooter();
        buildBannerSlider();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    /* ──────────────────────────────────────────────────────────
       HELPERS
    ────────────────────────────────────────────────────────── */
    function $el(tag, cls) {
        var e = document.createElement(tag);
        if (cls) e.className = cls;
        return e;
    }
    function esc(s) {
        var d = document.createElement("div");
        d.textContent = s || "";
        return d.innerHTML;
    }

    /* ──────────────────────────────────────────────────────────
       FOOTER
    ────────────────────────────────────────────────────────── */
    function buildFooter() {
        var footer = document.querySelector("footer.footer, footer");
        if (!footer) return;

        var S   = CONFIG.school         || {};
        var C   = S.contact             || {};
        var L   = S.location            || {};
        var FT  = CONFIG.footer         || {};
        var VC  = CONFIG.visitorCounter || {};
        var DEV = CONFIG.developer      || {};
        var SOC = S.social              || {};
        var sn  = S.name || "Pragya Valley Academy";

        /* ── FOOTER GRID ── */
        var grid = $el("div", "footer-grid");

        /* Col 1 – About */
        var c1 = $el("div", "footer-col");
        var logo = $el("a", "footer-logo");
        logo.href = "index.html";
        logo.textContent = sn;
        c1.appendChild(logo);

        var desc = $el("p");
        desc.textContent = sn + " – " + (S.tagline || "") +
            ". Affiliated to " + (S.affiliation || "AHSEC") +
            " since " + (S.established || "1998") + ".";
        c1.appendChild(desc);

        var socDiv = $el("div", "social-links");
        var socMap = [
            ["facebook",  "fab fa-facebook-f",  SOC.facebook  ],
            ["instagram", "fab fa-instagram",   SOC.instagram ],
            ["youtube",   "fab fa-youtube",     SOC.youtube   ],
            ["linkedin",  "fab fa-linkedin-in", SOC.linkedin  ],
        ];
        socMap.forEach(function(sm) {
            if (!sm[2]) return;
            var a = $el("a");
            a.href = sm[2]; a.target = "_blank"; a.rel = "noopener";
            a.setAttribute("aria-label", sm[0]);
            a.innerHTML = '<i class="' + sm[1] + '"></i>';
            socDiv.appendChild(a);
        });
        c1.appendChild(socDiv);
        grid.appendChild(c1);

        /* Col 2 – Quick Links */
        var c2 = $el("div", "footer-col");
        c2.innerHTML = "<h3>Quick Links</h3>";
        var ul2 = $el("ul");
        [["About Us","about.html"],["Programs","programs.html"],["Faculty","faculty.html"],
         ["Results","results.html"],["Admission","admission.html"],["Gallery","gallery.html"],
         ["Contact","contact.html"]].forEach(function(lnk) {
            var li = $el("li");
            var a  = $el("a");
            a.href = lnk[1]; a.textContent = lnk[0];
            li.appendChild(a); ul2.appendChild(li);
        });
        c2.appendChild(ul2);
        grid.appendChild(c2);

        /* Col 3 – Programs */
        var c3 = $el("div", "footer-col");
        c3.innerHTML = "<h3>Programs</h3>";
        var ul3 = $el("ul");
        [["Arts Stream","arts.html"],["Science Stream","science.html"],["Commerce Stream","commerce.html"]].forEach(function(lnk) {
            var li = $el("li");
            var a  = $el("a");
            a.href = lnk[1]; a.textContent = lnk[0];
            li.appendChild(a); ul3.appendChild(li);
        });
        c3.appendChild(ul3);
        grid.appendChild(c3);

        /* Col 4 – Contact */
        var c4 = $el("div", "footer-col");
        c4.innerHTML = "<h3>Contact Info</h3>";
        var ul4 = $el("ul");
        ul4.className = "contact-info";
        ul4.innerHTML =
            '<li><i class="fas fa-map-marker-alt"></i> ' + esc(L.fullAddress || L.address || "") + '</li>' +
            '<li><i class="fas fa-phone"></i> <a href="tel:' + (C.phone||"").replace(/\s/g,"") + '">' + esc(C.phone||"+91 70000 00000") + '</a></li>' +
            '<li><i class="fas fa-envelope"></i> <a href="mailto:' + esc(C.email||"") + '">' + esc(C.email||"") + '</a></li>' +
            '<li><i class="fas fa-clock"></i> ' + esc(C.hours || "Mon–Sat: 8 AM – 6 PM") + '</li>';
        c4.appendChild(ul4);
        grid.appendChild(c4);

        /* ── GORGEOUS FOOTER BOTTOM ── */
        var bottom = buildGorgeousBottom(sn, VC, DEV);

        /* ── ASSEMBLE ── */
        footer.innerHTML = "";
        var wrap = $el("div", "container");
        wrap.appendChild(grid);
        wrap.appendChild(bottom);
        footer.appendChild(wrap);

        /* Start counter animation after DOM update */
        if (VC.enabled !== false) {
            setTimeout(function() { animateCounter(VC); }, 400);
        }
    }

    /* ──────────────────────────────────────────────────────────
       GORGEOUS FOOTER BOTTOM
    ────────────────────────────────────────────────────────── */
    function buildGorgeousBottom(sn, VC, DEV) {
        var wrap = $el("div", "fbg-wrap");

        /* Animated shimmer divider */
        wrap.appendChild($el("div", "fbg-divider"));

        var row = $el("div", "fbg-row");

        /* LEFT – visitor counter */
        var left = $el("div", "fbg-left");
        left.innerHTML =
            '<div class="fbg-counter" id="visitorCounterWidget">' +
                '<div class="fbg-glow-orb"></div>' +
                '<div class="fbg-counter-inner">' +
                    '<div class="fbg-eye-icon">' +
                        '<i class="fas fa-eye"></i>' +
                        '<span class="fbg-pulse-ring"></span>' +
                    '</div>' +
                    '<div class="fbg-counter-body">' +
                        '<span class="fbg-counter-label">Total Visitors</span>' +
                        '<span class="fbg-counter-num" id="visitor-count">0</span>' +
                    '</div>' +
                '</div>' +
                '<div class="fbg-bar-track"><div class="fbg-bar-fill" id="fbgBarFill"></div></div>' +
            '</div>';
        row.appendChild(left);

        /* CENTER – copyright */
        var center = $el("div", "fbg-center");
        var yr = new Date().getFullYear();
        center.innerHTML =
            '<p class="fbg-copy">' +
                '&copy; ' + yr + ' <strong>' + esc(sn) + '</strong>' +
                '<br><span>' +
                'All rights reserved &nbsp;|&nbsp; ' +
                '<a href="privacy.html">Privacy Policy</a>' +
                ' &nbsp;|&nbsp; <a href="terms.html">Terms of Use</a>' +
                '</span>' +
            '</p>';
        row.appendChild(center);

        /* RIGHT – developer credit */
        var right = $el("div", "fbg-right");
        var devEmail = "mailto:" + (DEV.email || "") +
            "?subject=" + encodeURIComponent(DEV.subject || "Website Inquiry") +
            "&body=" + encodeURIComponent(DEV.message || "Hello!");
        right.innerHTML =
            '<a href="' + devEmail + '" class="fbg-dev-card" aria-label="Contact developer">' +
                '<div class="fbg-dev-sweep"></div>' +
                '<div class="fbg-dev-body">' +
                    '<div class="fbg-dev-icon"><i class="fas fa-code"></i></div>' +
                    '<div class="fbg-dev-text">' +
                        '<span class="fbg-dev-label">Crafted with ❤️ by</span>' +
                        '<span class="fbg-dev-name">' + esc(DEV.name || "JTR Technology") + '</span>' +
                    '</div>' +
                    '<div class="fbg-dev-arrow"><i class="fas fa-arrow-right"></i></div>' +
                '</div>' +
            '</a>';
        row.appendChild(right);

        wrap.appendChild(row);
        return wrap;
    }

    /* ──────────────────────────────────────────────────────────
       VISITOR COUNTER ANIMATION
    ────────────────────────────────────────────────────────── */
    function animateCounter(VC) {
        var el    = document.getElementById("visitor-count");
        var elBar = document.getElementById("fbgBarFill");
        if (!el) return;

        var base    = parseInt(VC.initialCount || 12457, 10);
        var stored  = parseInt(localStorage.getItem("pva_v") || "0", 10);
        var total   = stored < base ? base + 1 : stored + 1;
        localStorage.setItem("pva_v", total);

        var start    = Math.max(0, total - Math.round(total * 0.12));
        var duration = parseInt(VC.animationDuration || 2000, 10);
        var t0       = null;

        function ease(x) { return 1 - Math.pow(1 - x, 3); }

        function step(ts) {
            if (!t0) t0 = ts;
            var p = Math.min((ts - t0) / duration, 1);
            var e = ease(p);
            el.textContent = Math.round(start + (total - start) * e).toLocaleString();
            if (elBar) elBar.style.width = (e * 100) + "%";
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    /* ──────────────────────────────────────────────────────────
       ACHIEVEMENT BANNER SLIDER
    ────────────────────────────────────────────────────────── */
    function buildBannerSlider() {
        var wrapper = document.getElementById("bannerSwiperWrapper");
        if (!wrapper) return;

        var slides = CONFIG.achievementSlider;
        if (!slides || !slides.length) return;

        wrapper.innerHTML = slides.map(function(s) {
            var acc = s.accent || "#3d8ef0";
            return (
                '<div class="swiper-slide bs-slide">' +
                    '<div class="bs-img-wrap">' +
                        '<img src="' + s.image + '" alt="' + esc(s.name) + '" class="bs-img">' +
                        '<div class="bs-overlay-dark"></div>' +
                        '<div class="bs-overlay-bottom"></div>' +
                    '</div>' +
                    '<div class="bs-content">' +
                        '<div class="container bs-flex">' +
                            '<div class="bs-left">' +
                                '<span class="bs-badge">' + esc(s.badge) + '</span>' +
                                '<div class="bs-stat" style="color:' + acc + ';text-shadow:0 0 40px ' + acc + '80">' + esc(s.stat) + '</div>' +
                                '<div class="bs-stat-sub">' + esc(s.statLabel) + '</div>' +
                                '<div class="bs-name">' + esc(s.name) + '</div>' +
                                '<div class="bs-detail">' + esc(s.detail) + '</div>' +
                                '<div class="bs-accent-bar" style="background:' + acc + ';box-shadow:0 0 12px ' + acc + '"></div>' +
                            '</div>' +
                            '<div class="bs-right">' +
                                '<div class="bs-ring bs-ring-1" style="border-color:' + acc + '22"></div>' +
                                '<div class="bs-ring bs-ring-2" style="border-color:' + acc + '44"></div>' +
                                '<div class="bs-ring-core" style="border-color:' + acc + '66;box-shadow:0 0 50px ' + acc + '44">' +
                                    '<i class="fas fa-trophy bs-trophy" style="color:' + acc + '"></i>' +
                                    '<div class="bs-ring-num" style="color:' + acc + '">' + esc(s.stat) + '</div>' +
                                    '<div class="bs-ring-txt">Achieved</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            );
        }).join("");

        initBannerSwiper();
    }

    function initBannerSwiper() {
        if (typeof Swiper === "undefined") {
            /* Swiper not yet loaded, try again shortly */
            setTimeout(initBannerSwiper, 200);
            return;
        }
        var el = document.querySelector(".banner-swiper");
        if (!el) return;

        var sw = new Swiper(".banner-swiper", {
            loop:   true,
            speed:  1000,
            effect: "fade",
            fadeEffect: { crossFade: true },
            autoplay: { delay: 4800, disableOnInteraction: false },
            pagination: {
                el: ".banner-pagination",
                clickable: true,
                renderBullet: function(i, cls) {
                    return '<span class="' + cls + ' bs-bullet"></span>';
                }
            },
            navigation: { nextEl: ".banner-next", prevEl: ".banner-prev" },
        });

        /* Progress bar */
        function resetBar() {
            var b = document.getElementById("bsProgressBar");
            if (!b) return;
            b.style.transition = "none";
            b.style.width = "0%";
            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    b.style.transition = "width 4.8s linear";
                    b.style.width = "100%";
                });
            });
        }
        sw.on("slideChange", resetBar);
        sw.on("autoplayStart", resetBar);
        resetBar();
    }

})();
