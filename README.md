<div align="center">
  <img src="/image.png">
  <h2>DropIt</h2>
</div>

<p>Runs on Vanilla JS/HTML/CSS</p>
<p>A ready to use version can be accessed at https://dropit.ibfactor.com</p>

### Features
- URL processing
  - URL Shortening (http://zip1.io/)
  - URL Cleaning (removes non essential parameters)
  - Sharing via QR Code & WebTorrent
- JSON processing
  - JSON Minification & Prettification
  - JSON Visualisation (https://jsoncrack.com/)
  - JSON Conversion (to YAML & to XML)
  - Sharing via QR Code & WebTorrent
- Image processing (png, jpeg, webp)
  - Viewing EXIF Metadata
  - Cropping
  - Resizing
  - Compression (lossless for PNG and lossy for WebP and JPEG)
  - Image Conversion (PNG, JPEG, WebP)
  - Sharing via WebTorrent
### Planned Features
  - Videos
  - CSV, SQLite
  - Programming Language Files
### Self-Hosting:
This is a completely static website.\
You can clone this repository into your website folder and access the index.html file.\
Alternatively, you can fork this repo and connect it to Cloudflare Pages or Netlify.\
All dependencies are automatically fetched from CDNs.\
### External Dependencies
  - @eemeli/yaml (JSON -> YAML Conversion)
  - @nashwaan/xml-js (JSON -> XML Conversion)
  - @mattiasw/ExifReader (Reading EXIF Data)
  - @niklasvh/html2canvas (Image Processing)
  - @webLiang/UPNG.js (Image Processing)
  - @soldair/qrcode (QR Code Generation)
  - @webtorrent/webtorrent (File Sharing)
