// popup.js
document.getElementById('speechRange').addEventListener('input', function() {
  document.getElementById('speechValDisplay').textContent = this.value;
});
document.getElementById('bgRange').addEventListener('input', function() {
  document.getElementById('bgValDisplay').textContent = this.value;
});

document.getElementById('downloadAll').addEventListener('click', function() {
  // Get user-selected slider values
  const speechVal = parseInt(document.getElementById('speechRange').value, 10);
  const bgVal = parseInt(document.getElementById('bgRange').value, 10);
  // Send message to content script in active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'bulkDownload',
        speech: speechVal,
        background: bgVal
      });
    }
  });
  window.close();  // (Optional) close the popup after starting the process
});
