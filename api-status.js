// API Status Checker for Postreach AI Documentation
(function() {
  const API_ENDPOINT = 'https://postreachai-ekc4e7fke7bacehe.southeastasia-01.azurewebsites.net/api/v1/ping';
  
  function checkApiStatus() {
    // Find the API Status link in the navbar
    const statusLinks = document.querySelectorAll('a[href*="ping"]');
    
    statusLinks.forEach(link => {
      // Set loading state
      link.textContent = '🟡 API Status (Checking...)';
      
      fetch(API_ENDPOINT, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        timeout: 5000
      })
      .then(response => {
        if (response.ok) {
          link.textContent = '🟢 API Status (Online)';
          link.style.color = '#16A34A'; // Green color
          link.title = 'API is online and responding';
        } else {
          throw new Error(`HTTP ${response.status}`);
        }
      })
      .catch(error => {
        link.textContent = '🔴 API Status (Offline)';
        link.style.color = '#DC2626'; // Red color
        link.title = `API is offline: ${error.message}`;
      });
    });
  }
  
  // Check status when page loads
  document.addEventListener('DOMContentLoaded', checkApiStatus);
  
  // Check status every 30 seconds
  setInterval(checkApiStatus, 30000);
  
  // Check status when page becomes visible (user switches back to tab)
  document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
      checkApiStatus();
    }
  });
})();