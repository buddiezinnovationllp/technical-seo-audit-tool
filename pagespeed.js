const { google } = require('googleapis');

const pagespeed = google.pagespeedonline('v5');

const apikey = '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';

const runPagespeed = async (url) => {
  try {
    const response = await pagespeed.pagespeedonline.runpagespeed({
      url,
      key: apikey,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = runPagespeed;