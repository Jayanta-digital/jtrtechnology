# 🎯 Dynamic Demo System — Complete Instructions
### Academy Demo Website · v2.0

---

## 📁 Folder Structure

```
academy.demo-main/
│
├── index.html                  ← Modified (dynamic-demo.js injected)
├── about.html                  ← Modified
├── admission.html              ← Modified
├── faculty.html                ← Modified
├── contact.html                ← Modified
├── gallery.html                ← Modified
├── results.html                ← Modified
├── programs.html               ← Modified
├── arts.html                   ← Modified
├── science.html                ← Modified
├── commerce.html               ← Modified
│
├── css/
│   └── style.css               ← Untouched
│
├── js/
│   ├── config.js               ← Untouched  (default school data)
│   ├── config-loader.js        ← Untouched
│   ├── footer-generator.js     ← Untouched
│   ├── main.js                 ← Untouched
│   └── dynamic-demo.js         ← ✅ NEW — The Brain of the system
│
└── demo/
    ├── sample-school/
    │   └── config.json         ← ✅ NEW — Sample demo profile
    └── sunrise-academy/
        └── config.json         ← ✅ NEW — Science-only school demo
```

---

## 🚀 How to Use — Two Modes

---

### MODE 1 — Demo Profile (Recommended for sales visits)

Create a profile once per school in `/demo/{school-slug}/config.json`,
then share a single link:

```
https://yourdomain.com/index.html?demo=sample-school
https://yourdomain.com/index.html?demo=sunrise-academy
```

The system auto-loads `/demo/{slug}/config.json` and personalizes everything.

**Step-by-step:**
1. Copy `/demo/sample-school/` and rename it to your school's slug, e.g., `valley-school`
2. Edit `config.json` with that school's data
3. Upload the whole project to your hosting
4. Visit: `https://yourdomain.com/index.html?demo=valley-school`

---

### MODE 2 — Direct URL Parameters (Quick on-the-spot demo)

No config file needed. Pass values directly in the URL:

```
https://yourdomain.com/index.html
  ?school=Valley+Public+School
  &phone=%2B91+98765+00000
  &email=info@valleyschool.edu
  &logo=https://drive.google.com/uc?export=view%26id=YOUR_LOGO_ID
  &hero=https://drive.google.com/uc?export=view%26id=YOUR_HERO_ID
  &principal_name=Dr.+Ravi+Kumar
  &established=2001
  &session_year=2025-26
```

#### All accepted URL parameters:

| Parameter        | What it controls                       |
|------------------|----------------------------------------|
| `school`         | School full name                       |
| `short_name`     | Short name / acronym                   |
| `tagline`        | School tagline                         |
| `description`    | Meta description                       |
| `established`    | Year of establishment                  |
| `affiliation`    | Board (AHSEC, CBSE, etc.)              |
| `board_code`     | Board code number                      |
| `session_year`   | Academic session text (e.g. 2025-26)   |
| `phone`          | Primary phone number                   |
| `phone2`         | Secondary phone number                 |
| `email`          | Primary email                          |
| `email2`         | Secondary email                        |
| `whatsapp`       | WhatsApp number (no + or spaces)       |
| `address`        | Full address                           |
| `city`           | City                                   |
| `state`          | State                                  |
| `pincode`        | PIN code                               |
| `landmark`       | Nearby landmark                        |
| `map_embed`      | Google Maps iframe src URL             |
| `logo`           | Logo image URL                         |
| `logo_white`     | White logo image URL                   |
| `favicon`        | Favicon URL                            |
| `hero`           | Hero/banner image URL                  |
| `about_img`      | About section image URL                |
| `hero_badge`     | Hero top badge text                    |
| `hero_heading`   | Hero main heading text                 |
| `hero_highlight` | Highlighted word in heading            |
| `principal_name` | Principal's name                       |
| `principal_photo`| Principal's photo URL                  |
| `principal_msg`  | Principal's message text               |
| `director_name`  | Director's name                        |
| `director_photo` | Director's photo URL                   |
| `director_msg`   | Director's message text                |
| `prospectus`     | Prospectus PDF download URL            |
| `enquiry_form`   | Google Form embed URL for admissions   |
| `contact_form`   | Google Form embed URL for contact      |
| `years_excellence`| Years of excellence (stat)            |
| `alumni_count`   | Alumni count (stat)                    |
| `pass_percentage`| Pass percentage (stat)                 |
| `teachers`       | JSON array of teacher objects (URL-encoded) |
| `notices`        | JSON array of notice objects (URL-encoded)  |
| `streams`        | JSON object to hide/show streams       |

---

## 📄 config.json Structure Reference

All keys are optional. Missing keys fall back to the default `config.js` values.

```jsonc
{
  "_demoId": "your-school-slug",   // optional, used in form injection

  "school": {
    "name":        "School Full Name",
    "shortName":   "SFN",
    "tagline":     "Your tagline here",
    "description": "SEO description",
    "established": "2001",
    "affiliation": "AHSEC",
    "boardCode":   "18001",

    "hero": {
      "badge":     "Badge text above heading",
      "heading":   "Main heading text",
      "highlight": "Highlighted word",
      "subtext":   "Subheading paragraph",
      "btn1Text":  "Apply Now",
      "btn1Link":  "admission.html",
      "btn2Text":  "Download Brochure",
      "btn2Link":  "https://drive.google.com/uc?export=download&id=FILEID",
      "infoBadge": "AHSEC Affiliated"
    },

    "contact": {
      "phone":    "+91 XXXXX XXXXX",
      "phone2":   "+91 XXXXX XXXXX",
      "email":    "info@school.edu.in",
      "email2":   "admissions@school.edu.in",
      "whatsapp": "91XXXXXXXXXX",    // digits only, no + sign
      "hours":    "Mon–Sat: 8 AM – 5 PM"
    },

    "location": {
      "address":     "Street, Area",
      "city":        "City Name",
      "state":       "Assam",
      "pincode":     "781001",
      "landmark":    "Near XYZ",
      "fullAddress": "Full address for display",
      "mapEmbed":    "https://www.google.com/maps/embed?pb=...",
      "googleMapsUrl": "https://maps.google.com/?q=..."
    },

    "social": {
      "facebook":  "https://facebook.com/schoolpage",
      "instagram": "https://instagram.com/schoolpage",
      "youtube":   "https://youtube.com/schoolpage",
      "linkedin":  "#",
      "twitter":   "#"
    }
  },

  "branding": {
    "logo":      "https://...",    // Logo image URL
    "logoWhite": "https://...",    // White version
    "favicon":   "https://...",    // Favicon
    "hero":      "https://...",    // Hero banner image
    "about":     "https://...",    // About section image
    "infrastructure": [
      {
        "url":   "https://...",
        "title": "Section name",
        "desc":  "Description",
        "large": true              // true = spans 2 columns
      }
    ]
  },

  "people": {
    "principal": {
      "name":          "Dr. Name",
      "designation":   "Principal",
      "qualification": "Ph.D.",
      "experience":    "20+ years",
      "photo":         "https://...",
      "message":       "Principal's message"
    },
    "director": {
      "name":          "Mr. Name",
      "designation":   "Founder & Director",
      "qualification": "M.Sc, B.Ed",
      "experience":    "25+ years",
      "photo":         "https://...",
      "message":       "Director's message"
    }
  },

  "teachers": [
    {
      "name":          "Prof. Name",
      "subject":       "Subject Name",
      "designation":   "HOD",             // optional
      "qualification": "M.Sc., NET",
      "experience":    "12+ years",
      "photo":         "https://...",      // or leave blank for auto-avatar
      "stream":        "science",         // "arts" | "science" | "commerce"
      "email":         "teacher@school.edu.in",
      "showOnHome":    true               // show on homepage faculty section
    }
  ],

  "streams": {
    "arts":     true,    // set false to hide arts everywhere
    "science":  true,
    "commerce": false    // this hides commerce tabs, links, sections
  },

  "notices": [
    {
      "id":          1,
      "title":       "Notice Title",
      "date":        "2025-02-15",    // YYYY-MM-DD format
      "category":    "Admission",
      "description": "Short description of notice",
      "pdfUrl":      "https://drive.google.com/file/d/FILE_ID/view",
      "isImportant": true
    }
  ],

  "academic": {
    "session":  "2025-26",
    "lastDate": "March 31, 2025",
    "seats": {
      "arts":     40,
      "science":  45,
      "commerce": 30
    }
  },

  "documents": {
    "prospectus":      "https://drive.google.com/uc?export=download&id=FILE_ID",
    "applicationForm": "https://drive.google.com/uc?export=download&id=FILE_ID",
    "brochure":        "https://drive.google.com/uc?export=download&id=FILE_ID"
  },

  "forms": {
    "enquiry": "https://docs.google.com/forms/d/e/FORM_ID/viewform?embedded=true",
    "contact": "https://docs.google.com/forms/d/e/FORM_ID/viewform?embedded=true"
  },

  "stats": {
    "yearsOfExcellence": 25,
    "alumniCount":       5000,
    "facultyCount":      50,
    "passPercentage":    95,
    "studentsCount":     1500,
    "classrooms":        30,
    "labs":              5,
    "libraryBooks":      10000
  },

  "gallery": {
    "campus": [
      { "url": "https://...", "title": "Title", "desc": "Description" }
    ],
    "events": [
      { "url": "https://...", "title": "Event",  "desc": "Description" }
    ],
    "achievements": [
      { "url": "https://...", "title": "Award",  "desc": "Description" }
    ]
  }
}
```

---

## 🌐 Google Drive Image Links

### For images (logo, hero, photos):
```
Original share link:
https://drive.google.com/file/d/FILE_ID/view

Convert to:
https://drive.google.com/uc?export=view&id=FILE_ID
```

### For PDFs (prospectus, notices):
```
Original share link:
https://drive.google.com/file/d/FILE_ID/view

The system auto-converts this to a preview link — no login needed.
Download link is auto-generated too.

Just paste the /view link — the system handles the rest.
```

> ⚠️ **Important:** Make sure your Google Drive file sharing is set to  
> **"Anyone with the link → Viewer"**

---

## 🔔 Notice Board

The notice board appears **automatically just above the "Our Legacy" section**  
on the homepage whenever `notices` array is present in config.

### Features:
- Auto-scrolling list (pauses on hover/touch)
- **NEW badge** for notices published within 30 days
- Click any notice → popup modal with embedded PDF preview
- Download button in modal
- Works with Google Drive links (no login required)

### Notice date format: `"YYYY-MM-DD"` e.g. `"2025-02-15"`

---

## 🔒 Security Model

| Threat | Protection |
|--------|-----------|
| XSS via URL params | All values sanitized via `textContent`, never `innerHTML` |
| Open redirect via URL params | All URLs validated — must start with `https://`, `http://`, or relative path |
| JSON injection | Only whitelisted keys are read from URL |
| Script injection in teachers/notices | Deep sanitization on all string fields |
| Invalid demo slug | Slug validated — only `[a-zA-Z0-9_-]` allowed |
| Config fetch errors | Graceful fallback to default config.js |

---

## 📋 File Change Summary

### Modified files:
| File | Change |
|------|--------|
| `index.html` | Added `<script src="js/dynamic-demo.js">`, added `data-stream` attributes to sliders, added `id="dd-about-legacy"` to about section |
| `about.html` | Added `dynamic-demo.js` script tag |
| `admission.html` | Added `dynamic-demo.js` script tag |
| `faculty.html` | Added `dynamic-demo.js` script tag |
| `contact.html` | Added `dynamic-demo.js` script tag |
| `gallery.html` | Added `dynamic-demo.js` script tag |
| `results.html` | Added `dynamic-demo.js` script tag |
| `programs.html` | Added `dynamic-demo.js` script tag |
| `arts.html` | Added `dynamic-demo.js` script tag |
| `science.html` | Added `dynamic-demo.js` script tag |
| `commerce.html` | Added `dynamic-demo.js` script tag |

### New files added:
| File | Purpose |
|------|---------|
| `js/dynamic-demo.js` | 🧠 Main controller — entire personalization engine |
| `demo/sample-school/config.json` | Sample demo profile (full school, all streams) |
| `demo/sunrise-academy/config.json` | Sample demo profile (science-only school) |
| `INSTRUCTIONS.md` | This file |

---

## 🧪 Ready-to-Use Demo URLs

### Profile mode:
```
index.html?demo=sample-school
index.html?demo=sunrise-academy
```

### Direct param mode:
```
index.html?school=Green+Valley+Academy&phone=%2B91+98765+00000&email=info%40gva.edu.in&established=2003&session_year=2025-26&principal_name=Dr.+Ravi+Sharma&logo=https%3A%2F%2Fui-avatars.com%2Fapi%2F%3Fname%3DGVA%26background%3D0d3b66%26color%3Dffd700%26size%3D200
```

---

## 🛠️ Setting Up a New School Demo (Step by Step)

1. **Duplicate** the folder `demo/sample-school/` and rename it:
   ```
   demo/your-school-name/
   ```

2. **Edit** `config.json` — replace all values with the real school's details.

3. **Host images** on Google Drive (share as "Anyone with link → Viewer"),  
   convert image URLs to `https://drive.google.com/uc?export=view&id=FILE_ID`.

4. **Embed Google Maps**:
   - Go to Google Maps → Find the school → Share → Embed a map
   - Copy the `src="..."` value from the `<iframe>` tag
   - Paste into `mapEmbed` in config.json

5. **Upload** the whole project to your static hosting  
   (Netlify, GitHub Pages, any cPanel hosting — no server-side needed).

6. **Share the link**:
   ```
   https://yourdomain.com/index.html?demo=your-school-name
   ```

---

## ⚡ Performance Notes

- All images use `loading="lazy"`
- Notice scroll uses `requestAnimationFrame` (60fps, zero CPU waste)
- No external libraries added
- No jQuery, no framework, pure Vanilla JS
- Zero impact on existing CSS animations

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Config not loading | Ensure file is at `/demo/{slug}/config.json` and hosting serves JSON with correct MIME type |
| Images not showing | Verify Google Drive sharing is "Anyone with link" |
| PDF not previewing | Use `/view` link from Google Drive, not the download link — system auto-converts |
| Logo not appearing | Make sure `branding.logo` URL starts with `https://` |
| Streams not hiding | Check `streams` key in config — set value to `false` (not `"false"`) |
| Works on localhost but not on hosting | Some hosts block CORS on JSON fetch — use same-domain hosting or Netlify |
