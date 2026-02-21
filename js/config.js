// ============================================================
//  ███████╗██╗  ██╗ ██████╗  ██████╗ ██╗
//  ██╔════╝██║  ██║██╔═══██╗██╔═══██╗██║
//  ███████╗███████║██║   ██║██║   ██║██║
//  ╚════██║██╔══██║██║   ██║██║   ██║██║
//  ███████║██║  ██║╚██████╔╝╚██████╔╝███████╗
//  ╚══════╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝
//
//  MASTER CONFIG — EDIT THIS FILE TO CHANGE EVERYTHING
//  Every piece of text, image, contact, color on every page
//  is controlled from this one file. No other file needs
//  to be edited for regular content updates.
// ============================================================

const CONFIG = {

    // ============================================================
    // 1. SCHOOL / INSTITUTE IDENTITY
    // ============================================================
    school: {
        name:        "Pragya Valley Academy",
        shortName:   "PVA",
        tagline:     "Excellence in Higher Secondary Education",
        description: "Premier Higher Secondary Institute offering expert coaching in Arts, Science & Commerce streams. Personal mentoring for guaranteed success with 95%+ results.",
        established: "1998",
        affiliation: "AHSEC",
        boardCode:   "18007",

        // Hero / Banner section
        hero: {
            badge:     "#1 AHSEC Results in Assam",
            heading:   "Shape Your Future",
            highlight: "Expert Guidance",
            subtext:   "Premier Higher Secondary Institute offering expert coaching in Arts, Science & Commerce streams. Personal mentoring for guaranteed success with 95%+ results.",
            btn1Text:  "Apply for Admission",
            btn1Link:  "admission.html",
            btn2Text:  "Download Prospectus",
            btn2Link:  "https://drive.google.com/uc?export=download&id=YOUR_PROSPECTUS_ID",
            infoBadge: "AHSEC Affiliated",
        },

        // Contact details
        contact: {
            phone:    "+91 70000 00000",
            phone2:   "+91 70001 00001",
            email:    "info@pragyavalley.edu.in",
            email2:   "admissions@pragyavalley.edu.in",
            whatsapp: "917000000000",   // without + sign
            hours:    "Mon–Sat: 8 AM – 6 PM",
        },

        // Location
        location: {
            address:    "G.S. Road, Guwahati",
            city:       "Guwahati",
            state:      "Assam",
            pincode:    "781005",
            landmark:   "Near GMCH",
            fullAddress: "G.S. Road, Guwahati, Assam – 781005",
            // Paste your Google Maps embed src here:
            mapEmbed:   "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114822.802068465!2d91.70862432890346!3d26.144515729474988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5a7b1c7b1c7b%3A0x1c7b1c7b1c7b1c7b!2sGuwahati%2C%20Assam!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin",
            googleMapsUrl: "https://goo.gl/maps/your-link",
        },

        // Social Media
        social: {
            facebook:  "https://facebook.com/pragyavalley",
            instagram: "https://instagram.com/pragyavalley",
            youtube:   "https://youtube.com/pragyavalley",
            linkedin:  "https://linkedin.com/school/pragyavalley",
            twitter:   "https://twitter.com/pragyavalley",
        },

        // SEO
        seo: {
            keywords: "AHSEC college Assam, best higher secondary institute, Arts stream, Science stream, Commerce coaching, board exam preparation, top college Guwahati",
            googleAnalyticsId: "UA-XXXXX-Y",
        },
    },


    // ============================================================
    // 2. ALL IMAGES
    //    Replace any URL with your actual hosted image URL.
    //    Google Drive tip: File → Share → Copy link
    //    Convert: drive.google.com/file/d/FILE_ID/view
    //    → https://drive.google.com/uc?export=view&id=FILE_ID
    // ============================================================
    images: {
        // Logos
        logo:      "https://drive.google.com/uc?export=view&id=YOUR_LOGO_ID",
        logoWhite: "https://drive.google.com/uc?export=view&id=YOUR_WHITE_LOGO_ID",
        favicon:   "https://drive.google.com/uc?export=view&id=YOUR_FAVICON_ID",

        // Hero / Banner image (right side of homepage hero)
        hero:  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",

        // About section image
        about: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",

        // Infrastructure / Campus grid images
        // large:true means that item spans 2 columns
        infrastructure: [
            {
                url:   "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                title: "Smart Classrooms",
                desc:  "Digital learning with smart boards and audio-visual aids",
                large: true,
            },
            {
                url:   "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                title: "Central Library",
                desc:  "10,000+ books, journals, and digital resources",
                large: false,
            },
            {
                url:   "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                title: "Science Labs",
                desc:  "Fully equipped Physics, Chemistry & Biology labs",
                large: false,
            },
            {
                url:   "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                title: "Computer Lab",
                desc:  "100+ latest systems with high-speed internet",
                large: false,
            },
        ],

        // Gallery categories (gallery.html)
        gallery: {
            campus: [
                { url: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Main Building", desc: "Our 5-acre campus in Guwahati" },
                { url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Smart Classroom", desc: "Digital learning environment" },
                { url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Central Library", desc: "10,000+ books and journals" },
                { url: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Science Lab", desc: "Fully equipped laboratories" },
            ],
            events: [
                { url: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Annual Day 2024", desc: "Cultural celebrations" },
                { url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Sports Day", desc: "Annual sports competition" },
                { url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Workshop", desc: "Career guidance session" },
            ],
            achievements: [
                { url: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Award Ceremony", desc: "Toppers 2024" },
                { url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", title: "Scholarship Winners", desc: "Merit scholarship recipients" },
            ],
        },
    },


    // ============================================================
    // 3. STATISTICS
    // ============================================================
    stats: {
        yearsOfExcellence: 25,
        alumniCount:       5000,
        facultyCount:      50,
        passPercentage:    95,
        studentsCount:     1500,
        classrooms:        30,
        labs:              5,
        libraryBooks:      10000,
    },


    // ============================================================
    // 4. FACULTY MEMBERS
    //    stream: "arts" | "science" | "commerce"
    //    showOnHome: true → shows on homepage (max 4 displayed)
    // ============================================================
    faculty: [
        {
            name:          "Dr. Ranjan Bora",
            subject:       "Physics HOD",
            qualification: "Ph.D. – IIT Guwahati",
            experience:    "20+ years",
            photo:         "https://randomuser.me/api/portraits/men/42.jpg",
            stream:        "science",
            email:         "ranjan.bora@pragyavalley.edu.in",
            linkedin:      "#",
            showOnHome:    true,
        },
        {
            name:          "Prof. Minakshi Devi",
            subject:       "Economics Expert",
            qualification: "M.A., M.Phil",
            experience:    "15+ years",
            photo:         "https://randomuser.me/api/portraits/women/68.jpg",
            stream:        "arts",
            email:         "minakshi.devi@pragyavalley.edu.in",
            linkedin:      "#",
            showOnHome:    true,
        },
        {
            name:          "Dr. Naba Kalita",
            subject:       "Chemistry HOD",
            qualification: "Ph.D. – Gauhati University",
            experience:    "18+ years",
            photo:         "https://randomuser.me/api/portraits/men/75.jpg",
            stream:        "science",
            email:         "naba.kalita@pragyavalley.edu.in",
            linkedin:      "#",
            showOnHome:    true,
        },
        {
            name:          "Prof. Rita Sharma",
            subject:       "Accountancy Expert",
            qualification: "M.Com, CA (Inter)",
            experience:    "12+ years",
            photo:         "https://randomuser.me/api/portraits/women/33.jpg",
            stream:        "commerce",
            email:         "rita.sharma@pragyavalley.edu.in",
            linkedin:      "#",
            showOnHome:    true,
        },
        {
            name:          "Dr. Anil Das",
            subject:       "Political Science",
            qualification: "Ph.D. – DU",
            experience:    "15+ years",
            photo:         "https://randomuser.me/api/portraits/men/52.jpg",
            stream:        "arts",
            email:         "anil.das@pragyavalley.edu.in",
            showOnHome:    false,
        },
        {
            name:          "Prof. Sangeeta Bora",
            subject:       "Education",
            qualification: "M.Ed, NET",
            experience:    "12+ years",
            photo:         "https://randomuser.me/api/portraits/women/44.jpg",
            stream:        "arts",
            email:         "sangeeta.bora@pragyavalley.edu.in",
            showOnHome:    false,
        },
        {
            name:          "Dr. Kamal Nath",
            subject:       "Mathematics",
            qualification: "Ph.D. – IITG",
            experience:    "16+ years",
            photo:         "https://randomuser.me/api/portraits/men/62.jpg",
            stream:        "science",
            email:         "kamal.nath@pragyavalley.edu.in",
            showOnHome:    false,
        },
        {
            name:          "Prof. Rima Das",
            subject:       "Biology",
            qualification: "M.Sc, NET",
            experience:    "10+ years",
            photo:         "https://randomuser.me/api/portraits/women/55.jpg",
            stream:        "science",
            email:         "rima.das@pragyavalley.edu.in",
            showOnHome:    false,
        },
        {
            name:          "CA Rajesh Agarwal",
            subject:       "Accountancy",
            qualification: "CA, M.Com",
            experience:    "14+ years",
            photo:         "https://randomuser.me/api/portraits/men/22.jpg",
            stream:        "commerce",
            email:         "rajesh.agarwal@pragyavalley.edu.in",
            showOnHome:    false,
        },
        {
            name:          "Prof. Bikash Sharma",
            subject:       "Business Studies",
            qualification: "MBA, NET",
            experience:    "11+ years",
            photo:         "https://randomuser.me/api/portraits/men/32.jpg",
            stream:        "commerce",
            email:         "bikash.sharma@pragyavalley.edu.in",
            showOnHome:    false,
        },
    ],


    // ============================================================
    // 5. STUDENT TOPPERS / ACHIEVEMENTS
    // ============================================================
    toppers: {
        arts: [
            { name: "Priya Sharma",  year: 2024, percentage: 94.5, rank: "1st Rank – Political Science",    photo: "https://randomuser.me/api/portraits/women/44.jpg", successLine: "Topped AHSEC in Political Science" },
            { name: "Rahul Das",     year: 2024, percentage: 92.8, rank: "State Rank 3 – Education",         photo: "https://randomuser.me/api/portraits/men/32.jpg",   successLine: "Excellence in Education" },
            { name: "Anjali Bora",   year: 2023, percentage: 93.2, rank: "Best in Assamese",                 photo: "https://randomuser.me/api/portraits/women/68.jpg", successLine: "Best in Assamese Literature" },
            { name: "Meera Das",     year: 2023, percentage: 91.5, rank: "State Rank 5 – History",           photo: "https://randomuser.me/api/portraits/women/33.jpg", successLine: "Excellence in History" },
            { name: "Arjun Bora",    year: 2022, percentage: 94.2, rank: "State Rank 2 – Economics",         photo: "https://randomuser.me/api/portraits/men/62.jpg",   successLine: "Now at Delhi University" },
        ],
        science: [
            { name: "Arun Kalita",   year: 2024, percentage: 96.2, rank: "1st Rank – Mathematics",          photo: "https://randomuser.me/api/portraits/men/52.jpg",   successLine: "Perfect Score in Mathematics" },
            { name: "Maya Devi",     year: 2024, percentage: 95.4, rank: "State Topper – Biology",           photo: "https://randomuser.me/api/portraits/women/22.jpg", successLine: "Selected for NEET" },
            { name: "Rohan Sharma",  year: 2023, percentage: 94.8, rank: "JEE Advanced Qualified",           photo: "https://randomuser.me/api/portraits/men/75.jpg",   successLine: "Selected for IIT" },
            { name: "Priyanka Bora", year: 2023, percentage: 95.2, rank: "NEET Qualified",                   photo: "https://randomuser.me/api/portraits/women/45.jpg", successLine: "MBBS at GMCH" },
            { name: "Bikash Das",    year: 2022, percentage: 96.8, rank: "State Rank 1",                     photo: "https://randomuser.me/api/portraits/men/22.jpg",   successLine: "Now at IIT Bombay" },
        ],
        commerce: [
            { name: "Kavita Agarwal", year: 2024, percentage: 95.8, rank: "1st Rank – Accountancy",         photo: "https://randomuser.me/api/portraits/women/33.jpg", successLine: "Best in Accountancy" },
            { name: "Vikash Jalan",   year: 2024, percentage: 94.2, rank: "State Rank 2 – Business Studies", photo: "https://randomuser.me/api/portraits/men/62.jpg",   successLine: "Excellence in Commerce" },
            { name: "Priyanka Das",   year: 2023, percentage: 93.6, rank: "Gold Medalist – Economics",       photo: "https://randomuser.me/api/portraits/women/55.jpg", successLine: "Now at SRCC" },
            { name: "Rahul Kedia",    year: 2023, percentage: 94.5, rank: "CA Foundation",                   photo: "https://randomuser.me/api/portraits/men/42.jpg",   successLine: "Cleared CA Foundation" },
            { name: "Sneha Agarwal",  year: 2022, percentage: 96.2, rank: "State Rank 1",                    photo: "https://randomuser.me/api/portraits/women/28.jpg", successLine: "Now at LSR Delhi" },
        ],
    },


    // ============================================================
    // 6. TESTIMONIALS
    // ============================================================
    testimonials: [
        {
            name:   "Mrs. Bora",
            role:   "Parent of Priyanka Bora",
            stream: "Arts 2024",
            photo:  "https://randomuser.me/api/portraits/women/44.jpg",
            rating: 5,
            text:   "My daughter secured 94% in Arts stream. The teachers here genuinely care about each student's progress and provide individual attention. The mentoring program made all the difference.",
        },
        {
            name:   "Arun Kalita",
            role:   "Student",
            stream: "Science 2024",
            photo:  "https://randomuser.me/api/portraits/men/52.jpg",
            rating: 5,
            text:   "The mentoring program helped me crack NEET. The teachers went above and beyond to ensure we understood every concept. The regular tests and doubt-clearing sessions were extremely helpful.",
        },
        {
            name:   "Mr. Agarwal",
            role:   "Parent of Kavita Agarwal",
            stream: "Commerce 2024",
            photo:  "https://randomuser.me/api/portraits/men/62.jpg",
            rating: 5,
            text:   "Best decision we made for our son's commerce education. Excellent faculty and infrastructure. The CA foundation coaching integrated with the curriculum saved us time and money.",
        },
        {
            name:   "Rahul Das",
            role:   "Student",
            stream: "Arts 2023",
            photo:  "https://randomuser.me/api/portraits/men/22.jpg",
            rating: 5,
            text:   "The teachers at Pragya Valley don't just teach, they mentor. My confidence grew tremendously. The career guidance cell helped me choose the right path for civil services.",
        },
    ],


    // ============================================================
    // 7. NOTICES & ANNOUNCEMENTS
    //    pdfUrl: Paste your Google Drive /view link here.
    //            e.g. "https://drive.google.com/file/d/FILE_ID/view"
    //            The system auto-converts it to an embeddable preview.
    //            Set pdfUrl: "#" if no PDF is available.
    //    date:   Format YYYY-MM-DD. Notices within 30 days get a NEW badge.
    //    isImportant: true → shown with highlighted border.
    //    showOnHome: true → shown in the homepage notice board widget.
    //    showOnNoticePage: true → shown on notices.html full page.
    // ============================================================
    notices: [
        {
            id:              1,
            title:           "Admission Open 2025-26",
            date:            "2025-02-15",
            category:        "Admission",
            description:     "Applications now open for Arts, Science & Commerce. Limited seats available. Apply before March 31, 2025.",
            pdfUrl:          "#",            // ← Replace with Drive link: "https://drive.google.com/file/d/YOUR_ID/view"
            isImportant:     true,
            showOnHome:      true,
            showOnNoticePage: true,
        },
        {
            id:              2,
            title:           "AHSEC Exam Schedule 2025",
            date:            "2025-02-01",
            category:        "Examination",
            description:     "AHSEC practical exam schedule for Class 12 has been released. Download and check your dates.",
            pdfUrl:          "#",            // ← Replace with Drive link
            isImportant:     true,
            showOnHome:      true,
            showOnNoticePage: true,
        },
        {
            id:              3,
            title:           "Parent-Teacher Meeting",
            date:            "2025-02-15",
            category:        "Event",
            description:     "PTM for Class 11 students on February 15, 2025. All parents are requested to attend.",
            pdfUrl:          "#",
            isImportant:     false,
            showOnHome:      false,
            showOnNoticePage: true,
        },
        {
            id:              4,
            title:           "Scholarship Test",
            date:            "2025-03-01",
            category:        "Scholarship",
            description:     "Scholarship test for meritorious students on March 1, 2025. Up to 100% fee waiver available.",
            pdfUrl:          "#",
            isImportant:     true,
            showOnHome:      true,
            showOnNoticePage: true,
        },
        {
            id:              5,
            title:           "Result 2024 – 97% Pass Rate",
            date:            "2024-07-10",
            category:        "Achievement",
            description:     "We are proud to announce 97% pass percentage in AHSEC 2024. Congratulations to all students and faculty!",
            pdfUrl:          "#",
            isImportant:     false,
            showOnHome:      false,
            showOnNoticePage: true,
        },
    ],


    // ============================================================
    // 8. PROGRAMS (Arts / Science / Commerce)
    // ============================================================
    programs: {
        arts: {
            name:        "Arts Stream",
            icon:        "fas fa-palette",
            description: "Political Science, Education, Economics, History, Assamese, English",
            features:    ["Expert faculty from Gauhati University", "94% AHSEC results", "Civil services foundation"],
            successRate: 94,
            link:        "arts.html",
        },
        science: {
            name:        "Science Stream",
            icon:        "fas fa-flask",
            description: "Physics, Chemistry, Mathematics, Biology, Computer Science",
            features:    ["Fully equipped labs", "96% AHSEC results", "JEE/NEET coaching integrated"],
            successRate: 96,
            link:        "science.html",
            featured:    true,
        },
        commerce: {
            name:        "Commerce Stream",
            icon:        "fas fa-chart-bar",
            description: "Accountancy, Business Studies, Economics, Mathematics, IT",
            features:    ["CA foundation preparation", "95% AHSEC results", "Financial literacy programs"],
            successRate: 95,
            link:        "commerce.html",
        },
    },


    // ============================================================
    // 9. ADMISSION
    // ============================================================
    admission: {
        currentSession:  "2025-26",
        applicationFee:  "500",
        lastDate:        "March 31, 2025",
        earlyBirdDate:   "March 31, 2025",
        seats: { arts: 40, science: 45, commerce: 30 },
        enquiryFormEmbed: "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true",
        contactFormEmbed: "https://docs.google.com/forms/d/e/YOUR_CONTACT_FORM_ID/viewform?embedded=true",
    },


    // ============================================================
    // 10. LEADERSHIP (About page)
    //     All three leaders are fully controlled from here.
    //     Set enabled: false to hide any leader card completely.
    // ============================================================
    leadership: {
        director: {
            enabled:       true,
            name:          "Dr. Ranjan Bora",
            designation:   "Founder & Director",
            qualification: "Ph.D. in Education",
            experience:    "30+ years",
            photo:         "https://randomuser.me/api/portraits/men/42.jpg",
            message:       "Education is not just about passing exams; it's about building character and creating responsible citizens.",
        },
        md: {
            enabled:       true,              // ← set false to hide MD card
            name:          "Mr. Anil Sharma",
            designation:   "Managing Director",
            qualification: "MBA – IIM Ahmedabad",
            experience:    "25+ years",
            photo:         "https://randomuser.me/api/portraits/men/60.jpg",
            message:       "We are building an institution that combines academic excellence with modern infrastructure for tomorrow's leaders.",
        },
        principal: {
            enabled:       true,
            name:          "Prof. Minakshi Devi",
            designation:   "Principal",
            qualification: "M.A., M.Phil in Economics",
            experience:    "22+ years",
            photo:         "https://randomuser.me/api/portraits/women/68.jpg",
            message:       "We focus on holistic development of every student, preparing them for life beyond textbooks.",
        },
    },


    // ============================================================
    // 11. DOCUMENTS
    // ============================================================
    documents: {
        prospectus:      "https://drive.google.com/uc?export=download&id=YOUR_PROSPECTUS_ID",
        applicationForm: "https://drive.google.com/uc?export=download&id=YOUR_APP_FORM_ID",
        brochure:        "https://drive.google.com/uc?export=download&id=YOUR_BROCHURE_ID",
    },


    // ============================================================
    // 12. THEME COLORS  ← change here, whole site updates
    // ============================================================
    theme: {
        bgMain:    "#151c2c",
        bgLight:   "#1c2438",
        bgCard:    "#1e2a3e",
        bgAlt:     "#19243a",

        textDark:  "#eaf0f8",
        textLight: "#a8bdd1",
        textMuted: "#637f9a",

        primary:      "#3d8ef0",
        primaryDark:  "#1e5cbe",
        primaryLight: "#1a3460",

        secondary:      "#ff7825",
        secondaryDark:  "#d45f10",
        secondaryLight: "#3d1f0a",

        accent:      "#2ecc8a",
        accentLight: "#0d3326",

        navbarBg:         "rgba(15, 20, 35, 0.96)",
        navbarScrolledBg: "rgba(15, 20, 35, 0.99)",
        footerBg:         "#0b1120",

        btnPrimaryStart: "#ff7825",
        btnPrimaryEnd:   "#d45f10",

        heroGradientStart: "#0e1524",
        heroGradientEnd:   "#1a2640",

        starColor:     "#fbbf24",
        whatsappColor: "#25D366",
        shadowColor:   "rgba(0,0,0,0.4)",
    },


    // ============================================================
    // 13. DEVELOPER CREDIT
    // ============================================================
    developer: {
        name:       "JTR Technology",
        email:      "jayantakumarkakati1999@gmail.com",
        subject:    "Website Development Inquiry",
        message:    "Hello Sir, I want to build my website",
        buttonText: "Developed by JTR Technology",
        buttonIcon: "fas fa-code",
        enabled:    true,
    },


    // ============================================================
    // 14. VISITOR COUNTER
    // ============================================================
    visitorCounter: {
        enabled:           true,
        initialCount:      12457,
        label:             "Total Visitors:",
        icon:              "fas fa-eye",
        animationDuration: 2000,
    },


    // ============================================================
    // 15. ACHIEVEMENT BANNER SLIDER
    //     Shown between the Toppers section and Programs section.
    //     Each slide = one big achievement / milestone image.
    //     Replace image URLs with your actual hosted photos.
    // ============================================================
    achievementSlider: [
        {
            image:    "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=90",
            badge:    "🏆 AHSEC Board 2024",
            stat:     "96.2%",
            statLabel:"Mathematics Score",
            name:     "Arun Kalita",
            detail:   "State Rank 1 in Mathematics — Now at IIT Guwahati",
            accent:   "#3d8ef0",
        },
        {
            image:    "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=90",
            badge:    "🎓 NEET Qualified 2024",
            stat:     "95.4%",
            statLabel:"Biology Score",
            name:     "Maya Devi",
            detail:   "State Topper in Biology — MBBS at GMCH Guwahati",
            accent:   "#2ecc8a",
        },
        {
            image:    "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=90",
            badge:    "🥇 Commerce Topper 2024",
            stat:     "95.8%",
            statLabel:"Accountancy Score",
            name:     "Kavita Agarwal",
            detail:   "1st Rank in Accountancy — Now at SRCC New Delhi",
            accent:   "#ff7825",
        },
        {
            image:    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=90",
            badge:    "✨ Arts Excellence 2024",
            stat:     "94.5%",
            statLabel:"Political Science",
            name:     "Priya Sharma",
            detail:   "Topped AHSEC in Political Science — Delhi University",
            accent:   "#a78bfa",
        },
        {
            image:    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=90",
            badge:    "🚀 JEE Advanced 2023",
            stat:     "96.8%",
            statLabel:"Overall Score",
            name:     "Bikash Das",
            detail:   "State Rank 1 — Now at IIT Bombay",
            accent:   "#f472b6",
        },
        {
            image:    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=90",
            badge:    "🎯 25 Years of Excellence",
            stat:     "5000+",
            statLabel:"Alumni Worldwide",
            name:     "Pragya Valley Academy",
            detail:   "Assam's most trusted name in Higher Secondary Education since 1998",
            accent:   "#fbbf24",
        },
    ],


    // ============================================================
    // 16. FOOTER SETTINGS
    // ============================================================
    footer: {
        showDeveloper:      true,
        showVisitorCounter: true,
        showSocialLinks:    true,
        showQuickLinks:     true,
        showPrograms:       true,
        showContactInfo:    true,
        socialLinks: [
            { platform: "facebook",  icon: "fab fa-facebook-f",  url: "https://facebook.com/pragyavalley",         enabled: true },
            { platform: "instagram", icon: "fab fa-instagram",   url: "https://instagram.com/pragyavalley",        enabled: true },
            { platform: "youtube",   icon: "fab fa-youtube",     url: "https://youtube.com/pragyavalley",          enabled: true },
            { platform: "linkedin",  icon: "fab fa-linkedin-in", url: "https://linkedin.com/school/pragyavalley",  enabled: true },
        ],
        copyright: {
            showYear:          true,
            showPrivacyPolicy: true,
            showTermsOfUse:    true,
        },
    },

};   // ← END OF CONFIG OBJECT


// ================================================================
//  THEME ENGINE
//  Applies CONFIG.theme → CSS variables & style overrides.
//  Runs automatically on every page load.
// ================================================================
function applyTheme() {
    const t = CONFIG.theme;
    const r = document.documentElement;

    const vars = {
        "--bg-main":        t.bgMain,
        "--bg-light":       t.bgLight,
        "--bg-card":        t.bgCard,
        "--bg-alt":         t.bgAlt,
        "--text-dark":      t.textDark,
        "--text-light":     t.textLight,
        "--text-muted":     t.textMuted,
        "--primary":        t.primary,
        "--primary-dark":   t.primaryDark,
        "--primary-light":  t.primaryLight,
        "--secondary":      t.secondary,
        "--secondary-dark": t.secondaryDark,
        "--secondary-light":t.secondaryLight,
        "--accent":         t.accent,
        "--accent-light":   t.accentLight,
        "--gradient-1":     "linear-gradient(135deg," + t.primary + " 0%," + t.primaryDark + " 100%)",
        "--gradient-2":     "linear-gradient(135deg," + t.btnPrimaryStart + " 0%," + t.btnPrimaryEnd + " 100%)",
        "--gradient-3":     "linear-gradient(135deg," + t.primaryDark + " 0%," + t.primary + " 100%)",
        "--gradient-4":     "linear-gradient(135deg," + t.accent + " 0%,#1fa870 100%)",
        "--shadow-sm":      "0 4px 6px -1px " + t.shadowColor,
        "--shadow-md":      "0 10px 20px -4px " + t.shadowColor,
        "--shadow-lg":      "0 20px 30px -8px " + t.shadowColor,
        "--shadow-xl":      "0 28px 50px -10px " + t.shadowColor,
        "--shadow-glass":   "0 8px 32px 0 rgba(0,0,0,0.35)",
        "--shadow-colored": "0 10px 30px -5px rgba(255,120,37,0.28)",
    };

    for (const [p, v] of Object.entries(vars)) r.style.setProperty(p, v);

    const css = [
        ".navbar{background:" + t.navbarBg + "!important;border-bottom:1px solid rgba(61,142,240,.12)}",
        ".navbar.scrolled{background:" + t.navbarScrolledBg + "!important}",
        ".nav-menu a{color:#c8d8ea!important}",
        ".nav-menu a:hover,.nav-menu a.active{color:" + t.primary + "!important}",
        ".logo{color:" + t.textDark + "!important}",
        ".nav-menu{background:" + t.footerBg + "!important}",
        ".hero{background:linear-gradient(135deg," + t.heroGradientStart + " 0%," + t.heroGradientEnd + " 100%)!important}",
        ".footer{background:" + t.footerBg + "!important}",
        ".footer-col p,.footer-col ul li a,.contact-info li{color:rgba(180,200,225,.82)!important}",
        ".footer-col h3,.footer-logo{color:" + t.textDark + "!important}",
        ".testimonial-rating{color:" + t.starColor + "!important}",
        ".floating-whatsapp{background:" + t.whatsappColor + "!important}",
        ".section-subtitle{color:" + t.secondary + "!important}",
        ".section-subtitle::before,.section-subtitle::after{background:" + t.secondary + "!important}",
        ".page-header{background:linear-gradient(135deg," + t.primaryDark + " 0%," + t.footerBg + " 100%)!important}",
        ".achievement-card,.program-card,.faculty-card,.testimonial-card{border:1px solid rgba(61,142,240,.12)}",
        ".achievement-card:hover,.program-card:hover,.faculty-card:hover,.testimonial-card:hover{border-color:rgba(61,142,240,.30)}",
        ".stream-tab{background:" + t.bgCard + ";border:1px solid rgba(61,142,240,.15);color:" + t.textLight + "}",
        ".stream-tab.active{background:" + t.primary + ";color:#fff;border-color:" + t.primary + "}",
        ".about-feature{background:" + t.bgCard + ";border:1px solid rgba(61,142,240,.10)}",
        ".trust-item{background:" + t.bgCard + ";border:1px solid rgba(61,142,240,.12)}",
        ".stat-item h3{color:" + t.primary + "}",
        ".percentage{color:" + t.secondary + "}",
        "img{background:linear-gradient(135deg,#1a2640 0%,#1e3460 100%)}",
        ".visitor-counter{background:rgba(61,142,240,.10)!important;border-color:rgba(61,142,240,.25)!important}",
        "#visitor-count{color:" + t.secondary + "!important}",
    ].join("\n");

    let tag = document.getElementById("__theme__");
    if (!tag) {
        tag = document.createElement("style");
        tag.id = "__theme__";
        document.head.appendChild(tag);
    }
    tag.textContent = css;
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyTheme);
} else {
    applyTheme();
}

if (typeof module !== "undefined" && module.exports) module.exports = CONFIG;
