const audit = async (url) => {
  try {
    const response = await axios.get(url);
    const dom = await JSDOM.fromURL(url);
    const document = dom.window.document;

    const title = document.querySelector('title')?.textContent;
    const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const headerTags = Array.from(document.querySelectorAll('h1, h2, h3')).map((header) => header.textContent);
    const imageTags = Array.from(document.querySelectorAll('img')).map((image) => image.src);
    const internalLinks = Array.from(document.querySelectorAll('a[href^="/"]')).map((link) => link.href);
    const externalLinks = Array.from(document.querySelectorAll('a[href^="http"]')).map((link) => link.href);
    const canonicalLink = document.querySelector('link[rel="canonical"]')?.getAttribute('href');

    return {
      title,
      metaDescription,
      headerTags,
      imageTags,
      internalLinks,
      externalLinks,
      canonicalLink
    };
  } catch (error) {
    return {
      error: 'Failed to audit URL'
    };
  }
};