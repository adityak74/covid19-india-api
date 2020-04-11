'use strict';
const service = require('./scraper-service');

module.exports.covidindiascraper = async () => {
  return service.covidscraper()
    .then((response) => ({
      statusCode: 200,
        body: JSON.stringify(
          response,
          null,
          2
        ),
    }))
    .catch((err) => ({
      statusCode: 200,
      body: err.message
    }));
};
