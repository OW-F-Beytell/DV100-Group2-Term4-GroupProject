// index.js

function loadScript(src, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
  }
  
  // List of scripts to load dynamically
  var scriptsToLoad = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
    'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js',
    'https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js'
  ];
  
  // Load the scripts one by one
  function loadScriptsSequentially(scripts, index) {
    if (index < scripts.length) {
      loadScript(scripts[index], function() {
        // Callback function for the loaded script
        loadScriptsSequentially(scripts, index + 1);
      });
    } else {
      // All scripts are loaded
      // You can add your code here to execute after all scripts are loaded
    }
  }
  
  // Start loading scripts sequentially
  loadScriptsSequentially(scriptsToLoad, 0);
  