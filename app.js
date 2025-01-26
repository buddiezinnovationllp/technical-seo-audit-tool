const express = require('express');
const app = express();
const port = 3000;
const auditUrl = require('./audit');

app.use(express.static('public'));
app.use(express.json());

app.post('/audit', async (req, res) => {
  const url = req.body.url;
  const auditResults = await auditUrl(url);
  res.json(auditResults);
});

app.post('/save-audit-results', async (req, res) => {
  const auditResults = req.body;
  const { saveAuditResults } = require('./audit');
  await saveAuditResults(auditResults);
  res.send('Audit results saved successfully');
});

app.get('/', (req, res) => {
  res.send('Technical SEO Audit Tool');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});