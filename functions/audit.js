const axios = require('axios');
const { JSDOM } = require('jsdom');

exports.handler = async (event) => {
  if (event.httpMethod === 'POST') {
    const { url } = JSON.parse(event.body);
    const response = await axios.get(url);
    const dom = new JSDOM(response.data);
    const document = dom.window.document;
    const auditResults = await audit(url);
    return {
      statusCode: 200,
      body: JSON.stringify(auditResults)
    }
  } else {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    }
  }
};

const audit = async (url) => {
  console.log(url);
  try {
    const response = await axios.get(url);
    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    const title = document.title;
    const metaDescription = document.querySelector('meta[name="description"]').getAttribute('content');
    const headerTags = Array.from(document.querySelectorAll('h1, h2, h3')).map((header) => header.textContent);
    const imageTags = Array.from(document.querySelectorAll('img')).map((image) => image.src);
    const internalLinks = Array.from(document.querySelectorAll('a[href^="/"]')).map((link) => link.href);
    const externalLinks = Array.from(document.querySelectorAll('a[href^="http"]')).map((link) => link.href);
    const canonicalLink = document.querySelector('link[rel="canonical"]').getAttribute('href');

    return {
      title,
      metaDescription,
      headerTags,
      imageTags,
      internalLinks,
      externalLinks,
      canonicalLink
    }
  } catch (error) {
    console.error(error);
    return {
      error: 'Failed to audit URL'
    }
  }
};