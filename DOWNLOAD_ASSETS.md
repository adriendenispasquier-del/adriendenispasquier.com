# Download All Portfolio Assets

A dedicated utility page has been created to help you download all assets from your portfolio.

## Access the Download Page

Visit: **`/download-assets`** in your portfolio

Or click the **"Assets"** link in the footer of any page.

## Features

### 📦 Asset Organization
- **Grouped by category**: Photography, Illustration, Brand Identity, About
- **Total count**: See how many assets you have
- **Preview images**: Visual preview of each asset
- **Asset details**: Title, category, and full URL for each image

### 💾 Export Options

#### 1. Export as JSON
- Downloads a structured JSON file with all asset information
- Perfect for programmatic access or database import
- Includes: category, title, source URL, and timestamp

#### 2. Export as CSV
- Downloads a spreadsheet-compatible CSV file
- Easy to open in Excel, Google Sheets, or Numbers
- Contains: Category, Title, URL columns

### 📥 Individual Downloads

For each asset, you can:
- **View preview**: See the image directly on the page
- **Copy URL**: One-click copy to clipboard
- **Open in new tab**: View full-size image
- **Download**: Direct download button (right-click "Save As" for better control)

## How to Download All Assets

### Method 1: Batch Download with Browser Extension (Recommended)

1. Visit `/download-assets`
2. Export as **CSV** or **JSON**
3. Use a download manager extension like:
   - [DownThemAll](https://www.downthemall.org/) (Firefox/Chrome)
   - [Turbo Download Manager](https://chrome.google.com/webstore/detail/turbo-download-manager/) (Chrome)
4. Import the exported URLs and batch download

### Method 2: Individual Downloads

1. Visit `/download-assets`
2. Right-click on any asset preview
3. Select "Save image as..."
4. Repeat for each asset you need

### Method 3: Programmatic Download

1. Export as JSON
2. Use a script to download all URLs:

```bash
# Example using wget (requires jq for JSON parsing)
cat portfolio-assets-*.json | jq -r '.assets[].src' | wget -i -

# Or using curl
cat portfolio-assets-*.json | jq -r '.assets[].src' | xargs -n 1 curl -O
```

## Understanding Asset Types

### `figma:asset` URLs
- These are **virtual module paths** used by Figma
- They work perfectly in the app
- To download:
  - Right-click on the preview → "Save image as..."
  - Or open in new tab → Download
  - The browser resolves these automatically when viewing

### External URLs (http/https)
- Direct image URLs from CDN or hosting
- Can be downloaded directly
- Work with batch download tools

## Tips

✅ **Export the list first** - Create a backup of all URLs before downloading

✅ **Check totals** - Verify you've downloaded everything by comparing counts

✅ **Organize by category** - The export includes category information to help you organize downloads

✅ **Use batch tools** - For 100+ assets, use a download manager to save time

## Troubleshooting

**Q: Some images won't download when I click "Download"**  
A: Use right-click → "Save image as..." instead. Some browsers block programmatic downloads.

**Q: `figma:asset` URLs show as errors in download managers**  
A: These need to be downloaded through the browser where Figma resolves them. Use the web UI for these.

**Q: Can I download all assets in one click?**  
A: The browser doesn't allow bulk downloads for security. Use the export + download manager method above.

**Q: Images are lower quality than expected**  
A: Make sure to download the original images. If using the CDN, the originals are stored in Figma. Right-click on previews for full quality.

## CDN Integration

If you've set up CDN optimization (see `/CDN_SETUP.md`), the assets may be served through Cloudinary or another CDN. The download page shows the **original URLs**, not CDN URLs, so you get the highest quality versions.

To download CDN-optimized versions instead:
- Open the live site in DevTools
- Go to Network tab → Filter "Img"
- Right-click on any image request → "Copy image URL"
- These will be the CDN URLs with transformations
