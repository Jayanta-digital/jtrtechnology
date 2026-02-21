// ============================================================
//  ██████╗ ██╗   ██╗███╗   ██╗ █████╗ ███╗   ███╗██╗ ██████╗
//  ██╔══██╗╚██╗ ██╔╝████╗  ██║██╔══██╗████╗ ████║██║██╔════╝
//  ██║  ██║ ╚████╔╝ ██╔██╗ ██║███████║██╔████╔██║██║██║
//  ██║  ██║  ╚██╔╝  ██║╚██╗██║██╔══██║██║╚██╔╝██║██║██║
//  ██████╔╝   ██║   ██║ ╚████║██║  ██║██║ ╚═╝ ██║██║╚██████╗
//  ╚═════╝    ╚═╝   ╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝ ╚═════╝
//
//  DYNAMIC DEMO CONTROLLER  –  v2.0
//  Single brain of the entire personalization system.
//
//  Two activation modes:
//    MODE 1 – Demo profile:  ?demo=school-slug
//             → loads /demo/{slug}/config.json then patches CONFIG
//    MODE 2 – Direct params: ?school=Name&logo=...&hero=...&...
//             → patches CONFIG from URL directly
//
//  SECURITY:  all external values are sanitized before use.
//             Never assigned via innerHTML unless sanitized.
//             Only whitelisted fields accepted.
//             All URLs validated before assigning to src/href.
// ============================================================

(function () {
    "use strict";

    // ──────────────────────────────────────────────────────
    //  SECURITY UTILITIES
    // ──────────────────────────────────────────────────────

    /** Escape HTML entities – prevents XSS in text content */
    function esc(str) {
        if (!str && str !== 0) return "";
        var d = document.createElement("div");
        d.textContent = String(str);
        return d.innerHTML;
    }

    /** Validate URL – must start with https:// or http:// or relative path */
    function safeUrl(raw) {
        if (!raw) return null;
        var s = String(raw).trim();
        // Allow Google Drive preview, direct links, relative paths, and https/http
        if (
            /^https?:\/\//i.test(s) ||
            /^\/[^/]/i.test(s) ||           // relative /path
            /^\.\//i.test(s)                // relative ./path
        ) {
            return s;
        }
        console.warn("[DynamicDemo] Blocked unsafe URL:", s);
        return null;
    }

    /** Sanitize plain text – strip all HTML */
    function sanitizeText(val) {
        if (!val && val !== 0) return "";
        var d = document.createElement("div");
        d.textContent = String(val);
        return d.textContent;
    }

    /** Parse a URL-encoded JSON string safely */
    function parseJsonParam(val) {
        try {
            return JSON.parse(decodeURIComponent(val));
        } catch (e) {
            console.warn("[DynamicDemo] Invalid JSON param:", val);
            return null;
        }
    }

    // ──────────────────────────────────────────────────────
    //  URL PARAMETER READER
    // ──────────────────────────────────────────────────────

    var _params = null;
    function getParams() {
        if (_params) return _params;
        _params = {};
        var search = window.location.search.slice(1);
        if (!search) return _params;
        search.split("&").forEach(function (pair) {
            var idx = pair.indexOf("=");
            if (idx < 0) return;
            var key = decodeURIComponent(pair.slice(0, idx)).trim();
            var val = decodeURIComponent(pair.slice(idx + 1)).trim();
            _params[key] = val;
        });
        return _params;
    }

    function param(name) {
        return getParams()[name] || null;
    }

    // ──────────────────────────────────────────────────────
    //  DEEP MERGE helper
    // ──────────────────────────────────────────────────────

    function deepMerge(target, source) {
        if (!source || typeof source !== "object") return;
        Object.keys(source).forEach(function (k) {
            if (
                source[k] !== null &&
                typeof source[k] === "object" &&
                !Array.isArray(source[k]) &&
                typeof target[k] === "object" &&
                !Array.isArray(target[k])
            ) {
                deepMerge(target[k], source[k]);
            } else {
                target[k] = source[k];
            }
        });
    }

    // ──────────────────────────────────────────────────────
    //  WHITELISTED DIRECT URL PARAMS  →  CONFIG patch map
    //  Only these keys are accepted from the URL bar.
    // ──────────────────────────────────────────────────────

    var URL_WHITELIST = {
        // School identity
        school:           function (v) { CONFIG.school.name         = sanitizeText(v); },
        short_name:       function (v) { CONFIG.school.shortName     = sanitizeText(v); },
        tagline:          function (v) { CONFIG.school.tagline       = sanitizeText(v); },
        description:      function (v) { CONFIG.school.description   = sanitizeText(v); },
        established:      function (v) { CONFIG.school.established   = sanitizeText(v); },
        affiliation:      function (v) { CONFIG.school.affiliation   = sanitizeText(v); },
        board_code:       function (v) { CONFIG.school.boardCode     = sanitizeText(v); },
        session_year:     function (v) { CONFIG.admission.currentSession = sanitizeText(v); },
        // Contact
        phone:            function (v) { CONFIG.school.contact.phone    = sanitizeText(v); },
        phone2:           function (v) { CONFIG.school.contact.phone2   = sanitizeText(v); },
        email:            function (v) { CONFIG.school.contact.email    = sanitizeText(v); },
        email2:           function (v) { CONFIG.school.contact.email2   = sanitizeText(v); },
        whatsapp:         function (v) { CONFIG.school.contact.whatsapp = sanitizeText(v); },
        // Location
        address:          function (v) { CONFIG.school.location.address     = sanitizeText(v); CONFIG.school.location.fullAddress = sanitizeText(v); },
        city:             function (v) { CONFIG.school.location.city        = sanitizeText(v); },
        state:            function (v) { CONFIG.school.location.state       = sanitizeText(v); },
        pincode:          function (v) { CONFIG.school.location.pincode     = sanitizeText(v); },
        landmark:         function (v) { CONFIG.school.location.landmark    = sanitizeText(v); },
        map_embed:        function (v) { var u = safeUrl(v); if (u) CONFIG.school.location.mapEmbed = u; },
        // Images
        logo:             function (v) { var u = safeUrl(v); if (u) CONFIG.images.logo = u; },
        logo_white:       function (v) { var u = safeUrl(v); if (u) CONFIG.images.logoWhite = u; },
        favicon:          function (v) { var u = safeUrl(v); if (u) CONFIG.images.favicon = u; },
        hero:             function (v) { var u = safeUrl(v); if (u) CONFIG.images.hero = u; },
        about_img:        function (v) { var u = safeUrl(v); if (u) CONFIG.images.about = u; },
        // Branding
        hero_badge:       function (v) { CONFIG.school.hero.badge      = sanitizeText(v); },
        hero_heading:     function (v) { CONFIG.school.hero.heading     = sanitizeText(v); },
        hero_highlight:   function (v) { CONFIG.school.hero.highlight   = sanitizeText(v); },
        // Leadership
        principal_name:   function (v) { CONFIG.leadership.principal.name        = sanitizeText(v); },
        principal_photo:  function (v) { var u = safeUrl(v); if (u) CONFIG.leadership.principal.photo = u; },
        principal_msg:    function (v) { CONFIG.leadership.principal.message      = sanitizeText(v); },
        director_name:    function (v) { CONFIG.leadership.director.name          = sanitizeText(v); },
        director_photo:   function (v) { var u = safeUrl(v); if (u) CONFIG.leadership.director.photo = u; },
        director_msg:     function (v) { CONFIG.leadership.director.message       = sanitizeText(v); },
        md_name:          function (v) { if (!CONFIG.leadership.md) CONFIG.leadership.md = {}; CONFIG.leadership.md.name        = sanitizeText(v); },
        md_photo:         function (v) { if (!CONFIG.leadership.md) CONFIG.leadership.md = {}; var u = safeUrl(v); if (u) CONFIG.leadership.md.photo = u; },
        md_msg:           function (v) { if (!CONFIG.leadership.md) CONFIG.leadership.md = {}; CONFIG.leadership.md.message     = sanitizeText(v); },
        md_enabled:       function (v) { if (!CONFIG.leadership.md) CONFIG.leadership.md = {}; CONFIG.leadership.md.enabled     = (v !== "false" && v !== "0"); },
        // Documents
        prospectus:       function (v) { var u = safeUrl(v); if (u) { CONFIG.documents.prospectus = u; CONFIG.school.hero.btn2Link = u; } },
        // Admission
        enquiry_form:     function (v) { var u = safeUrl(v); if (u) CONFIG.admission.enquiryFormEmbed = u; },
        contact_form:     function (v) { var u = safeUrl(v); if (u) CONFIG.admission.contactFormEmbed = u; },
        // Teachers (JSON array)
        teachers:         function (v) { var t = parseJsonParam(v); if (Array.isArray(t)) CONFIG.faculty = sanitizeTeachers(t); },
        // Notices (JSON array)
        notices:          function (v) { var n = parseJsonParam(v); if (Array.isArray(n)) CONFIG.notices = sanitizeNotices(n); },
        // Streams visibility
        streams:          function (v) { var s = parseJsonParam(v); if (s) applyStreamVisibility(s); },
        // Stats
        years_excellence: function (v) { CONFIG.stats.yearsOfExcellence = parseInt(v, 10) || CONFIG.stats.yearsOfExcellence; },
        alumni_count:     function (v) { CONFIG.stats.alumniCount        = parseInt(v, 10) || CONFIG.stats.alumniCount; },
        pass_percentage:  function (v) { CONFIG.stats.passPercentage     = parseInt(v, 10) || CONFIG.stats.passPercentage; },
    };

    // ──────────────────────────────────────────────────────
    //  SANITIZE ARRAYS (teachers / notices from URL)
    // ──────────────────────────────────────────────────────

    function sanitizeTeachers(arr) {
        return arr.slice(0, 50).map(function (t) {
            return {
                name:          sanitizeText(t.name          || ""),
                subject:       sanitizeText(t.subject       || ""),
                qualification: sanitizeText(t.qualification || ""),
                experience:    sanitizeText(t.experience    || ""),
                designation:   sanitizeText(t.designation   || ""),
                stream:        sanitizeText(t.stream        || ""),
                photo:         safeUrl(t.photo)             || "https://ui-avatars.com/api/?name=" + encodeURIComponent(t.name || "Teacher") + "&background=1e2a3e&color=3d8ef0&size=200",
                email:         sanitizeText(t.email         || ""),
                showOnHome:    !!t.showOnHome,
            };
        });
    }

    function sanitizeNotices(arr) {
        return arr.slice(0, 30).map(function (n) {
            return {
                id:              parseInt(n.id, 10) || Math.floor(Math.random() * 9999),
                title:           sanitizeText(n.title       || ""),
                date:            sanitizeText(n.date        || ""),
                category:        sanitizeText(n.category    || "General"),
                description:     sanitizeText(n.description || ""),
                pdfUrl:          safeUrl(n.pdfUrl)          || "#",
                isImportant:     !!n.isImportant,
                showOnHome:      n.showOnHome      !== false,
                showOnNoticePage: n.showOnNoticePage !== false,
            };
        });
    }

    // ──────────────────────────────────────────────────────
    //  STREAM VISIBILITY CONTROL
    // ──────────────────────────────────────────────────────

    function applyStreamVisibility(cfg) {
        // cfg = { arts: true, science: true, commerce: false }
        var map = {
            arts:     ["[data-stream='arts']",     ".arts-section",     "a[href='arts.html']"],
            science:  ["[data-stream='science']",  ".science-section",  "a[href='science.html']"],
            commerce: ["[data-stream='commerce']", ".commerce-section", "a[href='commerce.html']"],
        };
        Object.keys(cfg).forEach(function (stream) {
            if (cfg[stream] === false) {
                (map[stream] || []).forEach(function (sel) {
                    document.querySelectorAll(sel).forEach(function (el) {
                        el.style.display = "none";
                    });
                });
                // Hide program card
                delete CONFIG.programs[stream];
            }
        });
    }

    // ──────────────────────────────────────────────────────
    //  MODE 1 – Apply direct URL params to CONFIG
    // ──────────────────────────────────────────────────────

    function applyUrlParams() {
        var p = getParams();
        Object.keys(p).forEach(function (key) {
            if (URL_WHITELIST[key]) {
                try {
                    URL_WHITELIST[key](p[key]);
                } catch (e) {
                    console.warn("[DynamicDemo] Error applying param:", key, e);
                }
            }
        });
    }

    // ──────────────────────────────────────────────────────
    //  MODE 2 – Load config.json from /demo/{slug}/config.json
    // ──────────────────────────────────────────────────────

    function loadDemoConfig(slug, callback) {
        // Only allow alphanumeric, dash, underscore in slug
        if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
            console.warn("[DynamicDemo] Invalid demo slug:", slug);
            callback(false);
            return;
        }
        var url = "/demo/" + slug + "/config.json";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onload = function () {
            if (xhr.status === 200) {
                try {
                    var cfg = JSON.parse(xhr.responseText);
                    callback(cfg);
                } catch (e) {
                    console.error("[DynamicDemo] Invalid JSON in config:", url, e);
                    callback(false);
                }
            } else {
                console.warn("[DynamicDemo] Config not found:", url);
                callback(false);
            }
        };
        xhr.onerror = function () {
            console.warn("[DynamicDemo] Network error loading config:", url);
            callback(false);
        };
        xhr.send();
    }

    // Patch CONFIG from a loaded JSON config object
    function patchConfigFromJson(cfg) {
        if (!cfg || typeof cfg !== "object") return;

        var s = cfg.school;
        if (s) {
            if (s.name)          CONFIG.school.name             = sanitizeText(s.name);
            if (s.shortName)     CONFIG.school.shortName        = sanitizeText(s.shortName);
            if (s.tagline)       CONFIG.school.tagline          = sanitizeText(s.tagline);
            if (s.description)   CONFIG.school.description      = sanitizeText(s.description);
            if (s.established)   CONFIG.school.established      = sanitizeText(s.established);
            if (s.affiliation)   CONFIG.school.affiliation      = sanitizeText(s.affiliation);
            if (s.boardCode)     CONFIG.school.boardCode        = sanitizeText(s.boardCode);
            if (s.websiteUrl)    CONFIG.school.websiteUrl       = sanitizeText(s.websiteUrl);
            if (s.hero)          deepMerge(CONFIG.school.hero,  s.hero);
            if (s.contact)       deepMerge(CONFIG.school.contact, s.contact);
            if (s.location)      deepMerge(CONFIG.school.location, s.location);
            if (s.social)        deepMerge(CONFIG.school.social, s.social);
        }

        var b = cfg.branding;
        if (b) {
            if (b.logo      && safeUrl(b.logo))      CONFIG.images.logo      = safeUrl(b.logo);
            if (b.logoWhite && safeUrl(b.logoWhite)) CONFIG.images.logoWhite = safeUrl(b.logoWhite);
            if (b.favicon   && safeUrl(b.favicon))   CONFIG.images.favicon   = safeUrl(b.favicon);
            if (b.hero      && safeUrl(b.hero))      CONFIG.images.hero      = safeUrl(b.hero);
            if (b.about     && safeUrl(b.about))     CONFIG.images.about     = safeUrl(b.about);
            if (Array.isArray(b.infrastructure))     CONFIG.images.infrastructure = b.infrastructure.filter(function (i) { return safeUrl(i.url); });
        }

        if (cfg.people) {
            if (cfg.people.principal) deepMerge(CONFIG.leadership.principal, cfg.people.principal);
            if (cfg.people.director)  deepMerge(CONFIG.leadership.director,  cfg.people.director);
            if (cfg.people.md) {
                if (!CONFIG.leadership.md) CONFIG.leadership.md = {};
                deepMerge(CONFIG.leadership.md, cfg.people.md);
            }
        }

        if (Array.isArray(cfg.teachers)) {
            CONFIG.faculty = sanitizeTeachers(cfg.teachers);
        }

        if (cfg.streams) {
            applyStreamVisibility(cfg.streams);
        }

        if (Array.isArray(cfg.notices)) {
            CONFIG.notices = sanitizeNotices(cfg.notices);
        }

        if (cfg.academic) {
            if (cfg.academic.session)  CONFIG.admission.currentSession = sanitizeText(cfg.academic.session);
            if (cfg.academic.lastDate) CONFIG.admission.lastDate       = sanitizeText(cfg.academic.lastDate);
            if (cfg.academic.seats)    deepMerge(CONFIG.admission.seats, cfg.academic.seats);
        }

        if (cfg.documents) {
            if (safeUrl(cfg.documents.prospectus)) {
                CONFIG.documents.prospectus = safeUrl(cfg.documents.prospectus);
                CONFIG.school.hero.btn2Link = safeUrl(cfg.documents.prospectus);
            }
            if (safeUrl(cfg.documents.applicationForm)) CONFIG.documents.applicationForm = safeUrl(cfg.documents.applicationForm);
            if (safeUrl(cfg.documents.brochure))        CONFIG.documents.brochure        = safeUrl(cfg.documents.brochure);
        }

        if (cfg.forms) {
            if (safeUrl(cfg.forms.enquiry)) CONFIG.admission.enquiryFormEmbed = safeUrl(cfg.forms.enquiry);
            if (safeUrl(cfg.forms.contact)) CONFIG.admission.contactFormEmbed = safeUrl(cfg.forms.contact);
        }

        if (cfg.stats) deepMerge(CONFIG.stats, cfg.stats);

        if (cfg.gallery) deepMerge(CONFIG.images.gallery, cfg.gallery);

        if (cfg.theme) deepMerge(CONFIG.theme, cfg.theme);

        // Store demo_id for form injection
        window._DEMO_ID = sanitizeText(cfg._demoId || param("demo") || "");
    }

    // ──────────────────────────────────────────────────────
    //  NOTICE SECTION BUILDER
    // ──────────────────────────────────────────────────────

    var NOTICE_MODAL_ID = "dd-notice-modal";

    function isNoticeNew(dateStr) {
        if (!dateStr) return false;
        var d = new Date(dateStr);
        if (isNaN(d)) return false;
        var diff = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24);
        return diff <= 30;
    }

    function buildNoticeSection() {
        if (!CONFIG.notices || CONFIG.notices.length === 0) return;

        // ── Create the Notice section HTML ──
        var section = document.createElement("section");
        section.id = "dd-notice-section";
        section.className = "dd-notice-section";
        section.setAttribute("data-aos", "fade-up");

        var noticeListHTML = "";
        CONFIG.notices.forEach(function (n) {
            var isNew = isNoticeNew(n.date);
            var dateFmt = n.date ? new Date(n.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "";
            noticeListHTML +=
                '<li class="dd-notice-item" data-pdfurl="' + esc(n.pdfUrl) + '" data-title="' + esc(n.title) + '" data-desc="' + esc(n.description) + '">' +
                    '<div class="dd-notice-left">' +
                        '<span class="dd-notice-icon"><i class="fas fa-file-pdf"></i></span>' +
                    '</div>' +
                    '<div class="dd-notice-body">' +
                        '<p class="dd-notice-title">' + esc(n.title) +
                            (isNew ? ' <span class="dd-new-badge">NEW</span>' : "") +
                        '</p>' +
                        '<span class="dd-notice-meta">' +
                            '<i class="fas fa-tag"></i> ' + esc(n.category) +
                            (dateFmt ? ' &nbsp;|&nbsp; <i class="fas fa-calendar-alt"></i> ' + esc(dateFmt) : "") +
                        '</span>' +
                    '</div>' +
                    '<div class="dd-notice-right">' +
                        '<i class="fas fa-eye"></i>' +
                    '</div>' +
                '</li>';
        });

        section.innerHTML =
            '<div class="container">' +
                '<div class="section-header" data-aos="fade-up">' +
                    '<span class="section-subtitle">Important</span>' +
                    '<h2>Notice Board</h2>' +
                    '<p>Stay updated with the latest announcements, exam schedules, and events.</p>' +
                '</div>' +
                '<div class="dd-notice-wrapper">' +
                    '<div class="dd-notice-scroll-wrapper">' +
                        '<ul class="dd-notice-list" id="dd-notice-list">' +
                            noticeListHTML +
                        '</ul>' +
                    '</div>' +
                '</div>' +
            '</div>';

        // ── Insert just above "Our Legacy" section ──
        var legacySubtitle = null;
        document.querySelectorAll(".section-subtitle").forEach(function (el) {
            if (el.textContent.trim() === "Our Legacy") {
                legacySubtitle = el;
            }
        });

        var insertTarget = legacySubtitle
            ? legacySubtitle.closest("section") || legacySubtitle.closest(".about-preview")
            : null;

        if (insertTarget) {
            insertTarget.parentNode.insertBefore(section, insertTarget);
        } else {
            // Fallback – insert before footer
            var footer = document.querySelector("footer");
            if (footer) footer.parentNode.insertBefore(section, footer);
        }

        // ── Click handler – open modal ──
        document.getElementById("dd-notice-list").addEventListener("click", function (e) {
            var item = e.target.closest(".dd-notice-item");
            if (!item) return;
            openNoticeModal(
                item.getAttribute("data-title"),
                item.getAttribute("data-pdfurl"),
                item.getAttribute("data-desc")
            );
        });

        // ── Auto-scroll logic ──
        startNoticeScroll();

        // ── Inject notice modal into DOM (once) ──
        buildNoticeModal();

        // ── Inject CSS ──
        injectNoticeCSS();
    }

    function startNoticeScroll() {
        var list = document.getElementById("dd-notice-list");
        if (!list) return;
        var speed = 0.8; // px per frame
        var pos = 0;
        var paused = false;

        list.addEventListener("mouseenter", function () { paused = true; });
        list.addEventListener("mouseleave", function () { paused = false; });
        list.addEventListener("touchstart",  function () { paused = true; }, { passive: true });
        list.addEventListener("touchend",    function () { paused = false; });

        var wrapper = list.closest(".dd-notice-scroll-wrapper");
        if (!wrapper) return;

        function tick() {
            if (!paused) {
                pos += speed;
                var maxScroll = list.scrollHeight / 2;
                if (pos >= maxScroll) pos = 0;
                wrapper.scrollTop = pos;
            }
            requestAnimationFrame(tick);
        }
        // Duplicate list items for seamless loop
        list.innerHTML = list.innerHTML + list.innerHTML;
        requestAnimationFrame(tick);
    }

    function buildNoticeModal() {
        if (document.getElementById(NOTICE_MODAL_ID)) return;
        var modal = document.createElement("div");
        modal.id = NOTICE_MODAL_ID;
        modal.className = "dd-modal-overlay";
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.innerHTML =
            '<div class="dd-modal-box">' +
                '<div class="dd-modal-header">' +
                    '<h3 id="dd-modal-title" class="dd-modal-title"></h3>' +
                    '<button class="dd-modal-close" id="dd-modal-close" aria-label="Close">&times;</button>' +
                '</div>' +
                '<p class="dd-modal-desc" id="dd-modal-desc"></p>' +
                '<div class="dd-modal-pdf-wrap">' +
                    '<iframe id="dd-modal-iframe" src="" frameborder="0" allowfullscreen></iframe>' +
                '</div>' +
                '<div class="dd-modal-footer">' +
                    '<a id="dd-modal-download" href="#" class="btn btn-primary" download>' +
                        '<i class="fas fa-download"></i> Download PDF' +
                    '</a>' +
                    '<button class="btn dd-btn-close-modal" id="dd-modal-close2">Close</button>' +
                '</div>' +
            '</div>';
        document.body.appendChild(modal);

        document.getElementById("dd-modal-close").addEventListener("click",  closeNoticeModal);
        document.getElementById("dd-modal-close2").addEventListener("click", closeNoticeModal);
        modal.addEventListener("click", function (e) {
            if (e.target === modal) closeNoticeModal();
        });
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") closeNoticeModal();
        });
    }

    function openNoticeModal(title, pdfUrl, desc) {
        var modal = document.getElementById(NOTICE_MODAL_ID);
        if (!modal) return;

        // Set text content safely
        document.getElementById("dd-modal-title").textContent = title || "Notice";
        document.getElementById("dd-modal-desc").textContent  = desc  || "";

        // Convert Google Drive share link to preview link (no login required)
        var previewUrl = convertToPreviewUrl(pdfUrl);
        var iframe = document.getElementById("dd-modal-iframe");
        iframe.src = previewUrl || "";

        // Download button
        var dl = document.getElementById("dd-modal-download");
        if (pdfUrl && pdfUrl !== "#") {
            dl.href = convertToDownloadUrl(pdfUrl);
            dl.style.display = "inline-flex";
        } else {
            dl.style.display = "none";
        }

        modal.classList.add("dd-modal-open");
        document.body.style.overflow = "hidden";
    }

    function closeNoticeModal() {
        var modal = document.getElementById(NOTICE_MODAL_ID);
        if (!modal) return;
        modal.classList.remove("dd-modal-open");
        document.getElementById("dd-modal-iframe").src = "";
        document.body.style.overflow = "";
    }

    /** Convert Google Drive share link to embeddable preview (no login needed) */
    function convertToPreviewUrl(url) {
        if (!url || url === "#") return "";
        // drive.google.com/file/d/FILE_ID/view  →  .../preview
        var m = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (m) return "https://drive.google.com/file/d/" + m[1] + "/preview";
        // drive.google.com/open?id=FILE_ID
        var m2 = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
        if (m2 && url.includes("drive.google.com")) return "https://drive.google.com/file/d/" + m2[1] + "/preview";
        // uc?export=download&id= → preview
        if (url.includes("export=download") && url.includes("id=")) {
            var m3 = url.match(/id=([a-zA-Z0-9_-]+)/);
            if (m3) return "https://drive.google.com/file/d/" + m3[1] + "/preview";
        }
        // Already a direct PDF – embed via Google Docs viewer
        if (/\.pdf$/i.test(url)) {
            return "https://docs.google.com/viewer?url=" + encodeURIComponent(url) + "&embedded=true";
        }
        return url;
    }

    /** Convert to download link */
    function convertToDownloadUrl(url) {
        if (!url || url === "#") return "#";
        var m = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (m) return "https://drive.google.com/uc?export=download&id=" + m[1];
        return url;
    }

    // ──────────────────────────────────────────────────────
    //  INJECT HIDDEN FIELDS INTO ALL FORMS
    // ──────────────────────────────────────────────────────

    function injectFormFields() {
        var schoolName = CONFIG.school.name || "";
        var demoId     = window._DEMO_ID    || param("demo") || "";

        document.querySelectorAll("form").forEach(function (form) {
            function addHidden(name, value) {
                if (!form.querySelector("[name='" + name + "']")) {
                    var inp = document.createElement("input");
                    inp.type  = "hidden";
                    inp.name  = name;
                    inp.value = value;
                    form.appendChild(inp);
                }
            }
            addHidden("school_name", schoolName);
            if (demoId) addHidden("demo_id", demoId);
        });
    }

    // ──────────────────────────────────────────────────────
    //  LOGO IMAGE INJECTION  (after CONFIG is ready)
    // ──────────────────────────────────────────────────────

    function applyLogoImage() {
        var logoUrl = CONFIG.images.logo;
        if (!logoUrl || logoUrl.includes("YOUR_LOGO")) return;

        document.querySelectorAll(".logo-text, .footer-logo").forEach(function (el) {
            // Insert an <img> before the text if not already present
            if (!el.querySelector("img")) {
                var img = document.createElement("img");
                img.src    = logoUrl;
                img.alt    = CONFIG.school.name + " Logo";
                img.style.cssText = "height:38px;width:auto;object-fit:contain;vertical-align:middle;margin-right:8px;border-radius:4px;";
                img.loading = "lazy";
                img.onerror = function () { this.style.display = "none"; };
                el.insertBefore(img, el.firstChild);
            }
        });
    }

    // ──────────────────────────────────────────────────────
    //  MAP EMBED
    // ──────────────────────────────────────────────────────

    function applyMapEmbed() {
        var src = CONFIG.school.location.mapEmbed;
        if (!src) return;
        var u = safeUrl(src);
        if (!u) return;
        document.querySelectorAll(".map-container iframe, iframe[data-map]").forEach(function (iframe) {
            iframe.src = u;
        });
    }

    // ──────────────────────────────────────────────────────
    //  DYNAMIC TEACHER SECTION REBUILD
    // ──────────────────────────────────────────────────────

    function rebuildTeachersSection() {
        var faculty = CONFIG.faculty;
        if (!faculty || faculty.length === 0) return;

        // Homepage: show only showOnHome:true teachers (up to 4)
        var homeGrid = document.querySelector(".faculty-grid");
        if (homeGrid) {
            var homeFaculty = faculty.filter(function (f) { return f.showOnHome; }).slice(0, 4);
            if (homeFaculty.length === 0) homeFaculty = faculty.slice(0, 4);
            var html = "";
            homeFaculty.forEach(function (f, i) {
                html += buildFacultyCardHTML(f, i * 100);
            });
            homeGrid.innerHTML = html;
        }
    }

    function buildFacultyCardHTML(f, delay) {
        delay = delay || 0;
        return (
            '<div class="faculty-card" data-aos="fade-up" data-aos-delay="' + delay + '">' +
                '<div class="faculty-image">' +
                    '<img src="' + esc(f.photo) + '" alt="' + esc(f.name) + '" loading="lazy" onerror="this.src=\'https://ui-avatars.com/api/?name=' + encodeURIComponent(f.name) + '&background=1e2a3e&color=3d8ef0&size=200\'">' +
                    '<div class="faculty-overlay"><p>' + esc(f.qualification || "") + '</p></div>' +
                '</div>' +
                '<div class="faculty-info">' +
                    '<h3>' + esc(f.name)        + '</h3>' +
                    '<p>' +  esc(f.subject)      + '</p>' +
                    (f.experience ? '<span class="faculty-exp"><i class="fas fa-briefcase"></i> ' + esc(f.experience) + '</span>' : '') +
                '</div>' +
            '</div>'
        );
    }

    // ──────────────────────────────────────────────────────
    //  DEMO BANNER – shows in top of page when demo active
    // ──────────────────────────────────────────────────────

    function showDemoBanner() {
        var demoId = param("demo") || (getParams().school ? "direct" : null);
        if (!demoId) return;

        var bar = document.createElement("div");
        bar.id = "dd-demo-banner";
        bar.innerHTML =
            '<span><i class="fas fa-eye"></i> You are viewing a <strong>DEMO</strong> for <strong id="dd-demo-school-name"></strong></span>' +
            '<button id="dd-demo-banner-close" aria-label="Close demo banner" style="background:none;border:none;color:inherit;cursor:pointer;font-size:1.2rem;padding:0 4px;">&times;</button>';
        document.getElementById("dd-demo-school-name") ; // will be set below
        document.body.insertBefore(bar, document.body.firstChild);

        // Nudge navbar down
        var navbar = document.querySelector(".navbar");
        if (navbar) navbar.style.top = "40px";

        document.getElementById("dd-demo-banner-close").addEventListener("click", function () {
            bar.remove();
            if (navbar) navbar.style.top = "";
        });

        // Fill school name after CONFIG is applied
        bar.querySelector("#dd-demo-school-name").textContent = CONFIG.school.name;

        injectDemoBannerCSS();
    }

    function injectDemoBannerCSS() {
        var style = document.createElement("style");
        style.textContent =
            "#dd-demo-banner{" +
                "position:fixed;top:0;left:0;right:0;z-index:99999;" +
                "background:linear-gradient(90deg,#1e5cbe,#3d8ef0);" +
                "color:#fff;font-size:.82rem;padding:9px 16px;" +
                "display:flex;align-items:center;justify-content:space-between;" +
                "gap:8px;box-shadow:0 2px 8px rgba(0,0,0,.3);" +
            "}" +
            "#dd-demo-banner strong{font-weight:700;}" +
            "#dd-demo-banner i{margin-right:6px;}";
        document.head.appendChild(style);
    }

    // ──────────────────────────────────────────────────────
    //  NOTICE SECTION CSS
    // ──────────────────────────────────────────────────────

    function injectNoticeCSS() {
        if (document.getElementById("dd-notice-css")) return;
        var style = document.createElement("style");
        style.id = "dd-notice-css";
        style.textContent = [
            /* ── SECTION WRAPPER ── */
            ".dd-notice-section{padding:80px 0;background:var(--bg-light,#1c2438);}",
            ".dd-notice-wrapper{max-width:820px;margin:0 auto;border-radius:16px;overflow:hidden;",
                "border:1px solid rgba(61,142,240,.18);box-shadow:0 8px 32px rgba(0,0,0,.28);}",

            /* ── SCROLL CONTAINER ── */
            ".dd-notice-scroll-wrapper{height:340px;overflow:hidden;position:relative;}",

            /* ── LIST ── */
            ".dd-notice-list{list-style:none;margin:0;padding:0;}",
            ".dd-notice-item{display:flex;align-items:center;gap:14px;padding:14px 20px;",
                "cursor:pointer;transition:background .2s;border-bottom:1px solid rgba(61,142,240,.08);}",
            ".dd-notice-item:hover{background:rgba(61,142,240,.10);}",

            /* ── ICON ── */
            ".dd-notice-icon{width:38px;height:38px;border-radius:8px;display:flex;align-items:center;justify-content:center;",
                "background:rgba(255,120,37,.15);color:#ff7825;font-size:1.1rem;flex-shrink:0;}",

            /* ── BODY ── */
            ".dd-notice-body{flex:1;min-width:0;}",
            ".dd-notice-title{margin:0 0 4px;font-size:.93rem;font-weight:600;",
                "color:var(--text-dark,#eaf0f8);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}",
            ".dd-notice-meta{font-size:.78rem;color:var(--text-muted,#637f9a);}",

            /* ── NEW BADGE ── */
            ".dd-new-badge{display:inline-block;background:#ef4444;color:#fff;font-size:.62rem;",
                "font-weight:700;padding:2px 7px;border-radius:999px;margin-left:8px;letter-spacing:.04em;",
                "animation:dd-pulse 1.6s ease-in-out infinite;}",
            "@keyframes dd-pulse{0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,.5)}50%{box-shadow:0 0 0 6px rgba(239,68,68,0)}}",

            /* ── RIGHT ARROW ── */
            ".dd-notice-right{color:var(--primary,#3d8ef0);font-size:.95rem;flex-shrink:0;}",

            /* ── MODAL OVERLAY ── */
            ".dd-modal-overlay{display:none;position:fixed;inset:0;z-index:100000;",
                "background:rgba(8,14,28,.82);backdrop-filter:blur(4px);",
                "align-items:center;justify-content:center;padding:16px;}",
            ".dd-modal-overlay.dd-modal-open{display:flex;}",
            ".dd-modal-box{background:var(--bg-card,#1e2a3e);border-radius:16px;width:100%;max-width:780px;",
                "max-height:90vh;display:flex;flex-direction:column;overflow:hidden;",
                "border:1px solid rgba(61,142,240,.2);box-shadow:0 20px 60px rgba(0,0,0,.5);}",
            ".dd-modal-header{display:flex;align-items:center;justify-content:space-between;",
                "padding:18px 24px;border-bottom:1px solid rgba(61,142,240,.1);}",
            ".dd-modal-title{margin:0;font-size:1.05rem;font-weight:700;color:var(--text-dark,#eaf0f8);}",
            ".dd-modal-close{background:none;border:none;color:var(--text-muted,#637f9a);font-size:1.6rem;",
                "cursor:pointer;line-height:1;padding:0 4px;transition:color .2s;}",
            ".dd-modal-close:hover{color:var(--text-dark,#eaf0f8);}",
            ".dd-modal-desc{margin:0;padding:8px 24px;font-size:.88rem;color:var(--text-light,#a8bdd1);}",
            ".dd-modal-pdf-wrap{flex:1;overflow:hidden;min-height:380px;}",
            ".dd-modal-pdf-wrap iframe{width:100%;height:100%;min-height:380px;border:none;display:block;}",
            ".dd-modal-footer{display:flex;gap:12px;padding:14px 24px;border-top:1px solid rgba(61,142,240,.1);",
                "flex-wrap:wrap;align-items:center;}",
            ".dd-btn-close-modal{background:var(--bg-light,#1c2438);color:var(--text-light,#a8bdd1);",
                "border:1px solid rgba(61,142,240,.2);border-radius:8px;padding:10px 20px;cursor:pointer;font-size:.9rem;}",
            ".dd-btn-close-modal:hover{background:rgba(61,142,240,.1);}",
        ].join(" ");
        document.head.appendChild(style);
    }

    // ──────────────────────────────────────────────────────
    //  MAIN INIT FLOW
    // ──────────────────────────────────────────────────────

    function init(configData) {
        if (configData) {
            patchConfigFromJson(configData);
        }
        // Always also apply direct URL params (they override JSON config)
        applyUrlParams();

        // Re-run theme engine with patched CONFIG
        if (typeof applyTheme === "function") applyTheme();

        // Wait for DOM before touching elements
        function onReady() {
            showDemoBanner();
            applyLogoImage();
            applyMapEmbed();
            rebuildTeachersSection();
            buildNoticeSection();
            injectFormFields();
        }

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", onReady);
        } else {
            onReady();
        }
    }

    // ──────────────────────────────────────────────────────
    //  BOOT
    // ──────────────────────────────────────────────────────

    var demoSlug = param("demo");
    if (demoSlug) {
        // MODE 2 – load demo config.json then init
        loadDemoConfig(demoSlug, function (cfg) {
            init(cfg || null);
        });
    } else {
        // MODE 1 – direct URL params only (or no params = default site)
        init(null);
    }

})();
