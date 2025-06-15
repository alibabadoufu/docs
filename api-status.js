// API Status Checker for Postreach AI Documentation
(function() {
  const API_ENDPOINT = 'https://postreachai-ekc4e7fke7bacehe.southeastasia-01.azurewebsites.net/api/v1/ping';
  
  function setDefaultStatus() {
    // Find the API Status link in the navbar
    const statusLinks = document.querySelectorAll('a[href*="ping"]');
    
    statusLinks.forEach(link => {
      // Set default online status (since we know the API is working)
      link.textContent = '🟢 API Online';
      link.style.color = '#16A34A'; // Green color
      link.title = 'API is operational. Click to test the ping endpoint.';
      
      // Add click handler to open in new tab for manual testing
      link.addEventListener('click', function(e) {
        e.preventDefault();
        window.open(API_ENDPOINT, '_blank');
      });
    });
  }
  
  function checkApiStatus() {
    // Find the API Status link in the navbar
    const statusLinks = document.querySelectorAll('a[href*="ping"]');
    
    statusLinks.forEach(link => {
      // Set checking state
      link.textContent = '🟡 Checking...';
      link.style.color = '#F59E0B'; // Yellow color
      link.title = 'Checking API status...';
      
      // Use a timeout-based approach to test connectivity
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      fetch(API_ENDPOINT, {
        method: 'GET',
        mode: 'no-cors',
        signal: controller.signal
      })
      .then(() => {
        clearTimeout(timeoutId);
        link.textContent = '🟢 API Online';
        link.style.color = '#16A34A'; // Green color
        link.title = 'API is responding. Click to test the ping endpoint.';
      })
      .catch(error => {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
          // Timeout - assume offline
          link.textContent = '🔴 API Timeout';
          link.style.color = '#DC2626'; // Red color
          link.title = 'API request timed out. Click to test manually.';
        } else {
          // Network error - could be CORS or actual offline
          link.textContent = '🟡 API Status Unknown';
          link.style.color = '#F59E0B'; // Yellow color
          link.title = 'Cannot determine API status due to browser restrictions. Click to test manually.';
        }
      });
    });
  }

  
  // Set default status when page loads
  document.addEventListener('DOMContentLoaded', () => {
    // Set default online status immediately
    setDefaultStatus();
    
    // Then try to verify with actual check after a short delay
    setTimeout(checkApiStatus, 2000);
  });
  
  // Check status every 2 minutes (less frequent to avoid spam)
  setInterval(checkApiStatus, 120000);
  
  // Check status when page becomes visible (user switches back to tab)
  document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
      setTimeout(checkApiStatus, 1000);
    }
  });
})();