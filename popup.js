document.getElementById('save').addEventListener('click', function() {
    const note = document.getElementById('note').value;
  
    // Get the current tab URL
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs.length > 0) {
        const url = tabs[0].url;
        const key = `note-${url}`;
  
        // Save the note to chrome.storage.sync
        chrome.storage.sync.set({ [key]: note }, function() {
          alert('Note saved!');
        });
      } else {
        alert('No active tab found.');
      }
    });
  });
  
  window.addEventListener('load', function() {
    // Get the current tab URL
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs.length > 0) {
        const url = tabs[0].url;
        const key = `note-${url}`;
  
        // Retrieve the note from chrome.storage.sync
        chrome.storage.sync.get([key], function(result) {
          if (result[key]) {
            document.getElementById('note').value = result[key];
          }
        });
      } else {
        alert('No active tab found.');
      }
    });
  });
  