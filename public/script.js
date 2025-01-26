const auditForm = document.getElementById('audit-form');
const auditButton = document.getElementById('auditbutton');
const auditResultsDiv = document.getElementById('audit-results');
console.log("Hello World");
// Update this line to use the correct id

// Get the audit results elements
const titleElement = document.getElementById('title');
const metaDescriptionElement = document.getElementById('meta-description');
const headerTagsElement = document.getElementById('header-tags');
const imageTagsElement = document.getElementById('image-tags');
const internalLinksElement = document.getElementById('internal-links');
const externalLinksElement = document.getElementById('external-links');
const canonicalLinkElement = document.getElementById('canonical-link');

// Example audit data
const auditData = {
  title: 'Example Title',
  metaDescription: 'Example meta description',
  headerTags: ['H1', 'H2', 'H3'],
  imageTags: ['Image 1', 'Image 2', 'Image 3'],
  internalLinks: ['Internal Link 1', 'Internal Link 2', 'Internal Link 3'],
  externalLinks: ['External Link 1', 'External Link 2', 'External Link 3'],
  canonicalLink: 'https://example.com'
};

// Function to update the audit results elements
function updateAuditResults(data) {
  titleElement.textContent = data.title;
  metaDescriptionElement.textContent = data.metaDescription;
  
  // Clear existing header tags
  headerTagsElement.innerHTML = '';
  data.headerTags.forEach((tag) => {
    const listItem = document.createElement('li');
    listItem.textContent = tag;
    headerTagsElement.appendChild(listItem);
  });
  
  // Clear existing image tags
  imageTagsElement.innerHTML = '';
  data.imageTags.forEach((tag) => {
    const listItem = document.createElement('li');
    listItem.textContent = tag;
    imageTagsElement.appendChild(listItem);
  });
  
  // Clear existing internal links
  internalLinksElement.innerHTML = '';
  data.internalLinks.forEach((link) => {
    const listItem = document.createElement('li');
    listItem.textContent = link;
    internalLinksElement.appendChild(listItem);
  });
  
  // Clear existing external links
  externalLinksElement.innerHTML = '';
  data.externalLinks.forEach((link) => {
    const listItem = document.createElement('li');
    listItem.textContent = link;
    externalLinksElement.appendChild(listItem);
  });
  
  canonicalLinkElement.textContent = data.canonicalLink;
}

auditForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const url = document.getElementById('url').value;
  console.log(url);
  const response = await fetch('/audit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: url })
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const auditResults = await response.json();
  // Update the audit results elements with the example audit data
  updateAuditResults(auditResults);
});