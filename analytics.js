const { google } = require('googleapis');

const analytics = google.analytics('v3');

const apikey = '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';
const viewId = '361847910';

const getAnalyticsData = async () => {
  try {
    const response = await analytics.data.realtime.get({
      'ids': `ga:${viewId}`,
      'metrics': 'rt:activeUsers',
      'dimensions': 'rt:medium,rt:source',
      'key': apikey,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = getAnalyticsData;