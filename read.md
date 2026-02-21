
## Image Specifications
- **Logos**: SVG or PNG with transparent background
- **Faculty/Student Photos**: 500x500px, JPG/PNG
- **Hero Images**: 1200x800px, JPG
- **Gallery Images**: 800x600px, JPG
- **Favicon**: 32x32px, ICO/PNG
- **App Icons**: 192x192px and 512x512px, PNG

## Google Drive Integration
Instead of storing images locally, you can use Google Drive links in config.js:

```javascript
// In config.js
logos: {
    main: "https://drive.google.com/uc?export=view&id=YOUR_IMAGE_ID",
    favicon: "https://drive.google.com/uc?export=view&id=YOUR_FAVICON_ID",
}
