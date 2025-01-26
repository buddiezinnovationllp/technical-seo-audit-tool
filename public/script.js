const auditForm = document.getElementById('audit-form');
const auditButton = document.getElementById('audit-button');
const auditResultsDiv = document.getElementById('audit-results');

auditButton.addEventListener('click', async (event) => {
  event.preventDefault();
  const url = document.getElementById('url').value;
  console.log(url);
  const response = await fetch('audit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: url }) // Ensure the property name is correct
  });
  console.log(response);
  const auditResults = await response.json();
  const resultsHtml = `
    <h2>Audit Results</h2>
    <p><strong>Title:</strong> ${auditResults.title}</p>
    <p><strong>Meta Description:</strong> ${auditResults.metaDescription}</p>
    <p><strong>Header Tags:</strong> ${auditResults.headerTags}</p>
    <p><strong>Image Tags:</strong> ${auditResults.imageTags}</p>
    <p><strong>Internal Links:</strong> ${auditResults.internalLinks}</p>
    <p><strong>External Links:</strong> ${auditResults.externalLinks}</p>
    <p><strong>Canonical Link:</strong> ${auditResults.canonicalLink}</p>
  `;
  auditResultsDiv.innerHTML = resultsHtml;
});