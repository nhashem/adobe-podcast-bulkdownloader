function simulateSliderDrag(sliderHandle, targetValue, defaultValue) {
  const rect = sliderHandle.getBoundingClientRect();
  const sliderTrack = sliderHandle.closest('.rc-slider');

  if (!sliderTrack) return;

  const trackRect = sliderTrack.getBoundingClientRect();
  const totalPixels = trackRect.width;
  const deltaUnits = targetValue - defaultValue;
  const deltaPixels = (deltaUnits / 100) * totalPixels;

  const startX = rect.left + rect.width / 2;
  const endX = startX + deltaPixels;

  // Dispatch drag sequence
  sliderHandle.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: startX }));
  sliderHandle.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: endX }));
  sliderHandle.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX: endX }));

  console.log(`🎛️ Dragged slider from ${defaultValue} to ${targetValue} (Δ${deltaUnits})`);
}


chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.action === 'bulkDownload') {
    const speechValue = msg.speech;
    const backgroundValue = msg.background;
    console.log(`🔊 Starting bulk download: Speech=${speechValue}%, Background=${backgroundValue}%`);

    const trackContainer = document.querySelector('[data-testid="track-list-container"]');
    if (!trackContainer) {
      alert("🎧 Track list container not found.");
      return;
    }

    const trackItems = Array.from(trackContainer.querySelectorAll('.track-item'));
    if (trackItems.length === 0) {
      alert("😕 No uploaded tracks found.");
      return;
    }

    for (let i = 0; i < trackItems.length; i++) {
      const item = trackItems[i];
      const titleEl = item.querySelector('span[title]');
      const filename = titleEl ? titleEl.getAttribute('title') : `track-${i+1}`;
      console.log(`▶️ Selecting file ${i+1}: ${filename}`);
      item.scrollIntoView({ behavior: 'smooth' });
      item.click();

      // Wait for panel to update
      await new Promise(res => setTimeout(res, 1000));

      // Set the sliders using their data-testid wrappers
      const speechContainer = document.querySelector('[data-testid="speech-strength-container"]');
      const backgroundContainer = document.querySelector('[data-testid="background-strength-container"]');

      const speechSlider = speechContainer?.querySelector('.rc-slider-handle');
      const backgroundSlider = backgroundContainer?.querySelector('.rc-slider-handle');

      if (speechSlider && backgroundSlider) {
        simulateSliderDrag(speechSlider, speechValue, 90);     // speech defaults to 90
        simulateSliderDrag(backgroundSlider, backgroundValue, 10); // background defaults to 10

        console.log(`🎚️ Sliders set: Speech=${speechValue}%, Background=${backgroundValue}%`);
      } else {
        console.warn("⚠️ Could not find both custom sliders.");
        continue;
      }

      // Wait for slider updates to propagate
      await new Promise(res => setTimeout(res, 1000));

      // Find and click the Download button
      const downloadBtn = Array.from(document.querySelectorAll('sp-button'))
        .find(btn => btn.textContent.trim().toLowerCase().includes('download'));

      if (downloadBtn) {
        console.log(`📥 Clicking download for: ${filename}`);
        downloadBtn.click();
      } else {
        console.warn("⚠️ Download button not found.");
      }

      // Wait for download to start
      await new Promise(res => setTimeout(res, 1500));
    }

    console.log("✅ Bulk download complete.");
  }
});
