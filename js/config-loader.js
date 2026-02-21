// ============================================================
//  CONFIG LOADER  –  Reads CONFIG and populates every page
//  This file applies everything from config.js to the DOM.
//  You should never need to edit this file.
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    // ──────────────────────────────────────────────────────
    //  HELPERS
    // ──────────────────────────────────────────────────────
    // Safe text setter – never injects HTML, immune to XSS
    function setText(selector, value) {
        document.querySelectorAll(selector).forEach(function(el) {
            el.textContent = value;
        });
    }
    // Set attribute on all matching elements
    function setAttr(selector, attr, value) {
        document.querySelectorAll(selector).forEach(function(el) {
            el.setAttribute(attr, value);
        });
    }
    // Set href on all matching elements
    function setHref(selector, value) {
        setAttr(selector, "href", value);
    }
    // Safely build HTML into a container (we own this HTML, not user input)
    function buildHTML(selector, html) {
        var el = document.querySelector(selector);
        if (el) el.innerHTML = html;
    }
    // Make star icons
    function stars(n) {
        var s = "";
        for (var i = 0; i < n; i++) s += '<i class="fas fa-star"></i>';
        return s;
    }
    // Sanitize user-provided text (strips tags)
    function sanitize(str) {
        var d = document.createElement("div");
        d.textContent = str || "";
        return d.innerHTML;
    }


    // ──────────────────────────────────────────────────────
    //  1. PAGE <title> & META
    // ──────────────────────────────────────────────────────
    var sn = CONFIG.school.name;
    document.title = document.title
        .replace(/Pragya Valley Academy/g, sn)
        .replace(/PVA/g, CONFIG.school.shortName);

    var metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) metaDesc.setAttribute("content", CONFIG.school.description + " – " + CONFIG.school.tagline);

    var metaKw = document.querySelector("meta[name='keywords']");
    if (metaKw) metaKw.setAttribute("content", CONFIG.school.seo.keywords);

    // Open Graph
    var ogTitle = document.querySelector("meta[property='og:title']");
    if (ogTitle) ogTitle.setAttribute("content", sn + " – " + CONFIG.school.tagline);

    // Favicon
    if (CONFIG.images.favicon && !CONFIG.images.favicon.includes("YOUR_FAVICON")) {
        var fav = document.querySelector("link[rel='icon']");
        if (fav) fav.setAttribute("href", CONFIG.images.favicon);
    }


    // ──────────────────────────────────────────────────────
    //  2. NAVBAR  (all pages)
    // ──────────────────────────────────────────────────────
    // Text logo in navbar
    var logoText = document.querySelector(".logo .logo-text");
    if (logoText) logoText.innerHTML = sanitize(sn);

    // If there's an img logo (some pages may add one)
    document.querySelectorAll("img[data-logo]").forEach(function(img) {
        img.src = CONFIG.images.logo;
        img.alt = sn + " Logo";
    });

    // Footer logo text
    document.querySelectorAll(".footer-logo").forEach(function(el) {
        el.innerHTML = sanitize(sn);
    });


    // ──────────────────────────────────────────────────────
    //  3. HERO SECTION  (index.html)
    // ──────────────────────────────────────────────────────
    var h = CONFIG.school.hero;

    // Badge
    setText(".hero-badge", h.badge);

    // H1 – "Shape Your Future with Expert Guidance"
    var h1 = document.querySelector(".hero-content h1");
    if (h1) {
        h1.innerHTML = sanitize(h.heading) + ' <br>with <span class="highlight">' + sanitize(h.highlight) + '</span>';
    }

    // Subtext paragraph
    var heroP = document.querySelector(".hero-content > p");
    if (heroP) heroP.textContent = h.subtext;

    // Buttons
    var btn1 = document.querySelector(".hero-buttons .btn-primary");
    if (btn1) { btn1.href = h.btn1Link; btn1.innerHTML = h.btn1Text + ' <i class="fas fa-arrow-right"></i>'; }

    var btn2 = document.querySelector(".hero-buttons .btn-outline");
    if (btn2) {
        btn2.href = h.btn2Link;
        btn2.setAttribute("download", "");
        btn2.innerHTML = '<i class="fas fa-download"></i> ' + h.btn2Text;
    }

    // Info badge over hero image
    var infoBadge = document.querySelector(".hero-image-badge");
    if (infoBadge) infoBadge.innerHTML = '<i class="fas fa-check-circle"></i> ' + sanitize(h.infoBadge);

    // Hero image
    var heroImg = document.querySelector(".hero-image img");
    if (heroImg) {
        heroImg.src = CONFIG.images.hero;
        heroImg.alt = "Students at " + sn;
    }

    // Stats
    var sStats = CONFIG.stats;
    var counters = document.querySelectorAll(".counter");
    var targetMap = {
        0: sStats.yearsOfExcellence,
        1: sStats.alumniCount,
        2: sStats.passPercentage
    };
    counters.forEach(function(c, i) {
        if (targetMap[i] !== undefined) c.setAttribute("data-target", targetMap[i]);
    });

    // Whatsapp floating button
    var wa = document.querySelector(".floating-whatsapp");
    if (wa) {
        wa.href = "https://wa.me/" + CONFIG.school.contact.whatsapp +
            "?text=Hello%20" + encodeURIComponent(sn) + "%2C%20I%27m%20interested%20in%20admission";
    }


    // ──────────────────────────────────────────────────────
    //  4. ABOUT SECTION PREVIEW  (index.html)
    // ──────────────────────────────────────────────────────
    var aboutImg = document.querySelector(".about-image img");
    if (aboutImg) {
        aboutImg.src = CONFIG.images.about;
        aboutImg.alt = sn + " Building";
    }

    var expBadge = document.querySelector(".experience-badge .years");
    if (expBadge) expBadge.textContent = sStats.yearsOfExcellence + "+";


    // ──────────────────────────────────────────────────────
    //  5. WHY CHOOSE US  (index.html)
    //     The section heading uses the school name
    // ──────────────────────────────────────────────────────
    var whyH2 = document.querySelector(".why-choose .section-title h2");
    if (whyH2) whyH2.textContent = "Why " + sn + "?";


    // ──────────────────────────────────────────────────────
    //  6. INFRASTRUCTURE GRID  (index.html)
    // ──────────────────────────────────────────────────────
    var infraGrid = document.querySelector(".infra-grid");
    if (infraGrid) {
        var infraHTML = "";
        CONFIG.images.infrastructure.forEach(function(item, idx) {
            var classes = "infra-item" + (item.large ? " large" : "");
            infraHTML +=
                '<div class="' + classes + '" data-aos="zoom-in" data-aos-delay="' + (idx * 100) + '">' +
                    '<img src="' + item.url + '" alt="' + sanitize(item.title) + '" loading="lazy">' +
                    '<div class="infra-overlay">' +
                        '<h3>' + sanitize(item.title) + '</h3>' +
                        '<p>' + sanitize(item.desc) + '</p>' +
                    '</div>' +
                '</div>';
        });
        infraGrid.innerHTML = infraHTML;
    }


    // ──────────────────────────────────────────────────────
    //  7. FACULTY GRID  (homepage + faculty.html)
    // ──────────────────────────────────────────────────────
    function buildFacultyCard(f, delay) {
        delay = delay || 0;
        return (
            '<div class="faculty-card" data-aos="fade-up" data-aos-delay="' + delay + '">' +
                '<div class="faculty-image">' +
                    '<img src="' + f.photo + '" alt="' + sanitize(f.name) + ' – ' + sanitize(f.subject) + '">' +
                    '<div class="faculty-social">' +
                        (f.linkedin ? '<a href="' + f.linkedin + '" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>' : '') +
                        (f.email    ? '<a href="mailto:' + f.email + '" aria-label="Email"><i class="fas fa-envelope"></i></a>' : '') +
                    '</div>' +
                '</div>' +
                '<div class="faculty-info">' +
                    '<h3>' + sanitize(f.name) + '</h3>' +
                    '<p class="faculty-subject">' + sanitize(f.subject) + '</p>' +
                    '<p class="faculty-qualification">' + sanitize(f.qualification) + ', ' + sanitize(f.experience) + '</p>' +
                '</div>' +
            '</div>'
        );
    }

    // Homepage faculty grid (only showOnHome:true, max 4)
    var homeFacultyGrid = document.querySelector(".faculty .faculty-grid");
    if (homeFacultyGrid) {
        var homeFaculty = CONFIG.faculty.filter(function(f) { return f.showOnHome; }).slice(0, 4);
        homeFacultyGrid.innerHTML = homeFaculty.map(function(f, i) {
            return buildFacultyCard(f, i * 100);
        }).join("");
    }

    // Full faculty page grid  [data-faculty-grid]
    var fullFacultyGrid = document.querySelector("[data-faculty-grid]");
    if (fullFacultyGrid) {
        fullFacultyGrid.innerHTML = CONFIG.faculty.map(function(f, i) {
            return buildFacultyCard(f, (i % 4) * 100);
        }).join("");
    }


    // ──────────────────────────────────────────────────────
    //  8. TOPPERS / ACHIEVEMENTS SLIDERS
    // ──────────────────────────────────────────────────────
    function buildTopperSlide(t) {
        return (
            '<div class="swiper-slide">' +
                '<div class="achievement-card">' +
                    '<div class="student-photo">' +
                        '<img src="' + t.photo + '" alt="' + sanitize(t.name) + '">' +
                    '</div>' +
                    '<h3>' + sanitize(t.name) + '</h3>' +
                    '<p class="stream-label">Stream | ' + t.year + '</p>' +
                    '<div class="percentage">' + t.percentage + '%</div>' +
                    '<p class="rank">' + sanitize(t.rank) + '</p>' +
                    '<p class="success-line">"' + sanitize(t.successLine) + '"</p>' +
                '</div>' +
            '</div>'
        );
    }

    ["arts", "science", "commerce"].forEach(function(stream) {
        var wrapper = document.querySelector("[data-" + stream + "-toppers] .swiper-wrapper, #" + stream + "-slider .swiper-wrapper");
        if (wrapper && CONFIG.toppers[stream]) {
            wrapper.innerHTML = CONFIG.toppers[stream].map(buildTopperSlide).join("");
        }
    });


    // ──────────────────────────────────────────────────────
    //  9. TESTIMONIALS  (index.html)
    // ──────────────────────────────────────────────────────
    var testimonialWrapper = document.querySelector(".testimonial-swiper .swiper-wrapper");
    if (testimonialWrapper) {
        testimonialWrapper.innerHTML = CONFIG.testimonials.map(function(t) {
            return (
                '<div class="swiper-slide">' +
                    '<div class="testimonial-card">' +
                        '<div class="testimonial-rating">' + stars(t.rating) + '</div>' +
                        '<p>"' + sanitize(t.text) + '"</p>' +
                        '<div class="testimonial-author">' +
                            '<img src="' + t.photo + '" alt="' + sanitize(t.name) + '">' +
                            '<div>' +
                                '<h4>' + sanitize(t.name) + '</h4>' +
                                '<p>' + sanitize(t.role) + ', ' + sanitize(t.stream) + '</p>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            );
        }).join("");
    }


    // ──────────────────────────────────────────────────────
    //  10. CTA SEAT COUNTERS  (index.html)
    // ──────────────────────────────────────────────────────
    var sciSeats = document.getElementById("science-seats");
    var comSeats = document.getElementById("commerce-seats");
    var artSeats = document.getElementById("arts-seats");
    if (sciSeats) sciSeats.textContent = CONFIG.admission.seats.science;
    if (comSeats) comSeats.textContent = CONFIG.admission.seats.commerce;
    if (artSeats) artSeats.textContent = CONFIG.admission.seats.arts;

    var earlyBird = document.querySelector(".early-bird");
    if (earlyBird) earlyBird.textContent = "Early bird discount available until " + CONFIG.admission.earlyBirdDate;

    var ctaH2 = document.querySelector(".cta-section .cta-content h2");
    if (ctaH2) ctaH2.textContent = "Limited Seats Available for " + CONFIG.admission.currentSession;


    // ──────────────────────────────────────────────────────
    //  11. PROGRAMS GRID  (index.html + programs.html)
    // ──────────────────────────────────────────────────────
    var programsGrid = document.querySelector(".programs-grid");
    if (programsGrid) {
        var progKeys = ["arts", "science", "commerce"];
        programsGrid.innerHTML = progKeys.map(function(key, idx) {
            var p = CONFIG.programs[key];
            var isFeatured = p.featured ? "program-card featured" : "program-card";
            var popularTag = p.featured
                ? '<div class="popular-tag">Most Popular</div>'
                : "";
            var featureList = (p.features || []).map(function(f) {
                return '<p><i class="fas fa-check-circle"></i> ' + sanitize(f) + '</p>';
            }).join("");
            return (
                '<div class="' + isFeatured + '" data-aos="fade-up" data-aos-delay="' + (idx * 100) + '">' +
                    popularTag +
                    '<div class="program-icon"><i class="' + p.icon + '"></i></div>' +
                    '<h3>' + sanitize(p.name) + '</h3>' +
                    '<p class="program-desc">' + sanitize(p.description) + '</p>' +
                    '<div class="program-features">' + featureList + '</div>' +
                    '<div class="program-footer">' +
                        '<a href="' + p.link + '" class="btn-program">Learn More <i class="fas fa-arrow-right"></i></a>' +
                    '</div>' +
                '</div>'
            );
        }).join("");
    }


    // ──────────────────────────────────────────────────────
    //  12. GALLERY  (gallery.html)
    // ──────────────────────────────────────────────────────
    function buildGalleryCategory(selector, items) {
        var container = document.querySelector(selector);
        if (!container) return;
        container.innerHTML = items.map(function(item) {
            return (
                '<div class="gallery-item">' +
                    '<img src="' + item.url + '" alt="' + sanitize(item.title) + '" loading="lazy">' +
                    '<div class="gallery-overlay">' +
                        '<h4>' + sanitize(item.title) + '</h4>' +
                        '<p>' + sanitize(item.desc) + '</p>' +
                    '</div>' +
                '</div>'
            );
        }).join("");
    }

    buildGalleryCategory("[data-campus-gallery]",       CONFIG.images.gallery.campus);
    buildGalleryCategory("[data-events-gallery]",       CONFIG.images.gallery.events);
    buildGalleryCategory("[data-achievements-gallery]", CONFIG.images.gallery.achievements);


    // ──────────────────────────────────────────────────────
    //  13. CONTACT INFO  (all pages via data attributes)
    // ──────────────────────────────────────────────────────
    var c = CONFIG.school.contact;
    var l = CONFIG.school.location;

    setText("[data-school-name]",    sn);
    setText("[data-school-tagline]", CONFIG.school.tagline);
    setText("[data-phone]",          c.phone);
    setText("[data-phone2]",         c.phone2);
    setText("[data-email]",          c.email);
    setText("[data-email2]",         c.email2);
    setText("[data-address]",        l.fullAddress);
    setText("[data-city]",           l.city);
    setText("[data-state]",          l.state);
    setText("[data-pincode]",        l.pincode);
    setText("[data-landmark]",       l.landmark);
    setText("[data-hours]",          c.hours);
    setText("[data-established]",    CONFIG.school.established);
    setText("[data-board-code]",     CONFIG.school.boardCode);
    setText("[data-pass-percentage]",CONFIG.stats.passPercentage + "%");
    setText("[data-years-excellence]",CONFIG.stats.yearsOfExcellence + "+");
    setText("[data-alumni-count]",   CONFIG.stats.alumniCount.toLocaleString());
    setText("[data-faculty-count]",  CONFIG.stats.facultyCount + "+");
    setText("[data-students-count]", CONFIG.stats.studentsCount.toLocaleString());

    // href for phone / email / whatsapp links
    setAttr("a[data-phone-link]",  "href", "tel:" + c.phone.replace(/\s/g, ""));
    setAttr("a[data-email-link]",  "href", "mailto:" + c.email);
    setAttr("a[data-wa-link]",     "href",
        "https://wa.me/" + c.whatsapp + "?text=Hello%20" + encodeURIComponent(sn));

    // Footer inline contact info
    var footerContact = document.querySelector(".footer .contact-info");
    if (footerContact) {
        footerContact.innerHTML =
            '<li><i class="fas fa-map-marker-alt"></i> ' + sanitize(l.fullAddress) + '</li>' +
            '<li><i class="fas fa-phone"></i> <a href="tel:' + c.phone.replace(/\s/g, "") + '">' + sanitize(c.phone) + '</a></li>' +
            '<li><i class="fas fa-envelope"></i> <a href="mailto:' + c.email + '">' + sanitize(c.email) + '</a></li>' +
            '<li><i class="fas fa-clock"></i> ' + sanitize(c.hours) + '</li>';
    }


    // ──────────────────────────────────────────────────────
    //  14. SOCIAL LINKS  (footer + other social widgets)
    // ──────────────────────────────────────────────────────
    var s = CONFIG.school.social;
    var socialLinks = document.querySelector(".footer .social-links");
    if (socialLinks) {
        socialLinks.innerHTML =
            (s.facebook  ? '<a href="' + s.facebook  + '" target="_blank" rel="noopener" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>' : '') +
            (s.instagram ? '<a href="' + s.instagram + '" target="_blank" rel="noopener" aria-label="Instagram"><i class="fab fa-instagram"></i></a>' : '') +
            (s.youtube   ? '<a href="' + s.youtube   + '" target="_blank" rel="noopener" aria-label="YouTube"><i class="fab fa-youtube"></i></a>' : '') +
            (s.linkedin  ? '<a href="' + s.linkedin  + '" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>' : '');
    }


    // ──────────────────────────────────────────────────────
    //  15. GOOGLE MAP IFRAME  (contact.html + any page)
    // ──────────────────────────────────────────────────────
    document.querySelectorAll(".map-container iframe, [data-map-iframe]").forEach(function(frame) {
        frame.setAttribute("src", CONFIG.school.location.mapEmbed);
    });


    // ──────────────────────────────────────────────────────
    //  16. LEADERSHIP (about.html)
    //      Reads CONFIG.leadership.director / .md / .principal
    //      Uses data-attributes on HTML elements.
    //      Also rebuilds the leadership-grid dynamically
    //      so MD card appears even if about.html was hardcoded.
    // ──────────────────────────────────────────────────────
    var ldr = CONFIG.leadership;

    // Helper: apply leader data to data-attribute elements
    function applyLeader(prefix, obj) {
        if (!obj) return;
        setText("[data-" + prefix + "-name]",          obj.name          || "");
        setText("[data-" + prefix + "-designation]",   obj.designation   || "");
        setText("[data-" + prefix + "-qualification]", obj.qualification || "");
        setText("[data-" + prefix + "-experience]",    obj.experience    || "");
        setText("[data-" + prefix + "-message]",       obj.message       || "");
        setAttr("[data-" + prefix + "-photo]", "src",  obj.photo         || "");
        setAttr("[data-" + prefix + "-photo]", "alt",  obj.name          || "");
    }

    applyLeader("director",  ldr.director);
    applyLeader("md",        ldr.md);
    applyLeader("principal", ldr.principal);

    // Dynamically rebuild the leadership-grid on about.html
    var leaderGrid = document.querySelector(".leadership-grid");
    if (leaderGrid) {
        var leaders = [
            { key: "director",  data: ldr.director,  delay: 0   },
            { key: "md",        data: ldr.md,         delay: 100 },
            { key: "principal", data: ldr.principal,  delay: 200 },
        ];
        leaderGrid.innerHTML = leaders
            .filter(function(l) { return l.data && l.data.enabled !== false; })
            .map(function(l) {
                var d = l.data;
                return (
                    '<div class="leader-card" data-aos="fade-up" data-aos-delay="' + l.delay + '">' +
                        '<div class="leader-image">' +
                            '<img src="' + sanitize(d.photo || "") + '" alt="' + sanitize(d.name || "") + '" loading="lazy">' +
                        '</div>' +
                        '<div class="leader-info">' +
                            '<h3 data-' + l.key + '-name>' + sanitize(d.name || "") + '</h3>' +
                            '<p class="position" data-' + l.key + '-designation>' + sanitize(d.designation || "") + '</p>' +
                            '<p>' + sanitize(d.qualification || "") + (d.experience ? ", " + sanitize(d.experience) : "") + '</p>' +
                            (d.message ? '<blockquote class="leader-message">&ldquo;' + sanitize(d.message) + '&rdquo;</blockquote>' : '') +
                        '</div>' +
                    '</div>'
                );
            }).join("");
    }


    // ──────────────────────────────────────────────────────
    //  17. NOTICES
    //      [data-notices]         → homepage/sidebar widget  (showOnHome:true only)
    //      [data-notices-full]    → notices.html full list   (all showOnNoticePage:true)
    // ──────────────────────────────────────────────────────
    function buildNoticeItemHTML(n) {
        var dateStr = "";
        if (n.date) {
            var d = new Date(n.date);
            if (!isNaN(d.getTime())) {
                dateStr = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
            }
        }
        var isNew = (function() {
            if (!n.date) return false;
            var d = new Date(n.date);
            return !isNaN(d.getTime()) && (Date.now() - d.getTime()) / 86400000 <= 30;
        })();
        return (
            '<div class="notice-item' + (n.isImportant ? " important" : "") + '">' +
                '<div class="notice-header">' +
                    '<span class="notice-category">' + sanitize(n.category) + '</span>' +
                    (isNew ? '<span class="notice-new-badge">NEW</span>' : '') +
                    '<span class="notice-date"><i class="fas fa-calendar-alt"></i> ' + sanitize(dateStr || n.date) + '</span>' +
                '</div>' +
                '<h4 class="notice-title">' + sanitize(n.title) + '</h4>' +
                '<p class="notice-desc">' + sanitize(n.description) + '</p>' +
                (n.pdfUrl && n.pdfUrl !== "#"
                    ? '<a href="' + n.pdfUrl + '" class="notice-download" target="_blank" rel="noopener">' +
                      '<i class="fas fa-file-pdf"></i> View / Download PDF</a>'
                    : '') +
            '</div>'
        );
    }

    // Homepage widget – only showOnHome notices
    var noticeWidget = document.querySelector("[data-notices]");
    if (noticeWidget) {
        var homeNotices = CONFIG.notices.filter(function(n) { return n.showOnHome !== false; });
        noticeWidget.innerHTML = homeNotices.length
            ? homeNotices.map(buildNoticeItemHTML).join("")
            : '<p class="no-notices">No notices at this time.</p>';
    }

    // Full notice page – showOnNoticePage notices
    var noticePageList = document.querySelector("[data-notices-full]");
    if (noticePageList) {
        var pageNotices = CONFIG.notices.filter(function(n) { return n.showOnNoticePage !== false; });
        noticePageList.innerHTML = pageNotices.length
            ? pageNotices.map(buildNoticeItemHTML).join("")
            : '<p class="no-notices">No notices at this time.</p>';
    }


    // ──────────────────────────────────────────────────────
    //  18. FOOTER  (regenerated if footer-generator.js absent)
    // ──────────────────────────────────────────────────────
    // Update footer school description
    var footerDesc = document.querySelector(".footer-col:first-child > p");
    if (footerDesc) {
        footerDesc.textContent = sn + " – " + CONFIG.school.tagline + ". Affiliated to " + CONFIG.school.affiliation + " since " + CONFIG.school.established + ".";
    }

    // Footer copyright
    var footerCopy = document.querySelector(".copyright-text p, .footer-bottom > p");
    if (footerCopy) {
        footerCopy.innerHTML = "&copy; " + new Date().getFullYear() + " " + sanitize(sn) +
            ". All rights reserved. | Affiliated to " + sanitize(CONFIG.school.affiliation) +
            " (Code: " + sanitize(CONFIG.school.boardCode) + ") | " +
            '<a href="privacy.html">Privacy Policy</a> | <a href="terms.html">Terms of Use</a>';
    }


    // ──────────────────────────────────────────────────────
    //  19. GOOGLE FORMS EMBEDS
    // ──────────────────────────────────────────────────────
    var enquiryFrame = document.querySelector("[data-enquiry-form]");
    if (enquiryFrame) enquiryFrame.setAttribute("src", CONFIG.admission.enquiryFormEmbed);

    var contactFrame = document.querySelector("[data-contact-form]");
    if (contactFrame) contactFrame.setAttribute("src", CONFIG.admission.contactFormEmbed);


    // ──────────────────────────────────────────────────────
    //  20. ADMISSION PAGE
    // ──────────────────────────────────────────────────────
    setText("[data-session]",         CONFIG.admission.currentSession);
    setText("[data-app-fee]",         "₹" + CONFIG.admission.applicationFee);
    setText("[data-last-date]",       CONFIG.admission.lastDate);
    setText("[data-seats-arts]",      CONFIG.admission.seats.arts);
    setText("[data-seats-science]",   CONFIG.admission.seats.science);
    setText("[data-seats-commerce]",  CONFIG.admission.seats.commerce);


    // ──────────────────────────────────────────────────────
    //  21. DOWNLOAD LINKS
    // ──────────────────────────────────────────────────────
    setHref("[data-download-prospectus]", CONFIG.documents.prospectus);
    setHref("[data-download-form]",       CONFIG.documents.applicationForm);
    setHref("[data-download-brochure]",   CONFIG.documents.brochure);


    // ──────────────────────────────────────────────────────
    //  22. VISITOR COUNTER
    // ──────────────────────────────────────────────────────
    var vc = CONFIG.visitorCounter;
    if (vc.enabled) {
        var stored  = parseInt(localStorage.getItem("pva_visits") || vc.initialCount, 10);
        var visits  = stored + 1;
        localStorage.setItem("pva_visits", visits);

        var countEl = document.getElementById("visitor-count");
        if (countEl) {
            var start = 0;
            var end   = visits;
            var dur   = vc.animationDuration;
            var step  = dur / end;
            var timer = setInterval(function() {
                start += Math.ceil(end / (dur / 16));
                if (start >= end) { start = end; clearInterval(timer); }
                countEl.textContent = start.toLocaleString();
            }, 16);
        }
    }


    // ──────────────────────────────────────────────────────
    //  23. DEVELOPER BUTTON
    // ──────────────────────────────────────────────────────
    var devBtn = document.querySelector(".dev-btn");
    var dev    = CONFIG.developer;
    if (devBtn && dev.enabled) {
        devBtn.href = "mailto:" + dev.email +
            "?subject=" + encodeURIComponent(dev.subject) +
            "&body=" + encodeURIComponent(dev.message);
        devBtn.innerHTML = '<i class="' + dev.buttonIcon + '"></i> <strong>' + sanitize(dev.buttonText) + '</strong>';
    } else if (devBtn && !dev.enabled) {
        devBtn.parentElement && devBtn.parentElement.remove();
    }

});
