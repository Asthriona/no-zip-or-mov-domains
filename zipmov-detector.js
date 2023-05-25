// Define the regular expression for detecting .zip domain names
const regex = /\.(zip|mov)$/i;
// Set the highlight color to red and tooltip text
const highlightColor = "red";
const tooltipText = "⚠️ THIS IS A DOMAIN NAME AND NOT A FILE EXTENSION ⚠️";

// Function to check for links and highlight the domain names
function checkLinks() {
  console.log('Checking links...');
  // Get all links on the page
  const links = document.getElementsByTagName("a");
  
  // Loop through the links and check if they match the regex
  for (const link of links) {
    if (regex.test(link.hostname)) {
      // Highlight the domain name and add the tooltip
      const elements = link.hostname.split('.');
      const updatedElements = elements.map((el, index) => {
        if (index === elements.length - 2) {
          const span = document.createElement('mark');
          span.style.backgroundColor = highlightColor;
          span.title = tooltipText;
          span.textContent = el;
          return span.outerHTML;
        } else {
          return el;
        }
      });
      link.innerHTML = updatedElements.join('.');
      console.log('Highlighted link:', link.href);
    }
  }
}

// Run the checkLinks function once at the start
checkLinks();

// Create a MutationObserver to detect changes to the page
const observer = new MutationObserver(function(mutations) {
  console.log('Page modified, rechecking links...');
  // When a mutation is detected, re-run checkLinks after a delay
  setTimeout(function() {
    checkLinks();
  }, 1000);
});

// Configure the MutationObserver to watch for changes to the page's body
observer.observe(document.body, { childList: true, subtree: true });