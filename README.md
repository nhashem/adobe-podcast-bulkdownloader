# Adobe Podcast Bulk Downloader (v0.1)

A Chrome extension that adds a **"Download All"** button to [Adobe Podcast Enhance](https://podcast.adobe.com/en/enhance), allowing you to batch download all your processed clips with **uniform Speech and Background slider settings**.

Adobe supports bulk upload — but not bulk download. This extension fixes that.

---

## ✨ Features

- 🗂️ **Batch process all uploaded clips** in Enhance
- 🎚️ **Set global enhancement levels** (Speech & Background)
- ⬇️ **Auto-download** each file with those slider values
- ⚠️ Warns user if Chrome’s “Save As” prompt is enabled
- 🔧 Works entirely via DOM scripting (no API needed)

---

## 🖥️ Installation

1. Clone this repo or [download as ZIP](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/archive/refs/heads/main.zip)
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer Mode** (top right)
4. Click **Load Unpacked**
5. Select the folder containing this extension
6. You’ll now see the extension icon in your toolbar 🎉

---

## 🧪 Usage

1. Go to: [https://podcast.adobe.com/en/enhance](https://podcast.adobe.com/en/enhance)
2. Make sure you're logged in and have uploaded files
3. Wait for files to finish processing
4. Click the extension icon
5. Set global **Speech** and **Background** values (e.g. Speech = 60%, Background = 20%)
6. Click **“Download All”**
7. Sit back and enjoy — each file will:
   - Be selected
   - Have sliders adjusted
   - Be downloaded automatically

---

## ⚠️ Important

To enable one-click downloading, you **must disable Chrome's "Ask where to save each file before downloading" setting**:

- Go to `chrome://settings/downloads`
- Uncheck:
  > ✅ "Ask where to save each file before downloading"

Otherwise, you’ll get a “Save As” prompt for every file.

The extension will detect and warn you if this setting is still on.

---

## 🚧 TODO

- [ ] Add warning message that this extension works best when "Ask where to save each file before downloading" is disabled
- [ ] Allow for user to configure defaults, instead of just Speech = 60 and Background = 20

---

## 💡 How it Works

The extension interacts with Adobe Podcast’s DOM to:

- Loop through each track in the uploaded list
- Simulate a click to select the file
- Simulate slider dragging from default values (Speech = 90, Background = 10)
- Trigger the download button

Adobe doesn’t offer a public API — this extension reverse-engineers and automates their web UI using JavaScript only.

---

## 🙏 Credits

Crafted with ✨ and caffeine by [Nate Hashem](https://github.com/YOUR_GITHUB), powered by good vibes and LEGO minifigs.

---

## 📝 License

MIT
