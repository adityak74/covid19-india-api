const cheerio = require('cheerio');
const request = require('request');

const strToInt = str => parseInt(str, 10);

module.exports.covidscraper = function covidscraper() { 
  return new Promise((resolve, reject) => request({
    method: 'GET',
    url: 'https://www.mohfw.gov.in/'
}, (err, res, body) => {
    if (err) return reject(err);
    let $ = cheerio.load(body);
    let table = $('#state-data > div > div > div > div > table > tbody > tr');
    const data = [];
    let totalCases = 0;
    let totalActiveCases = 0;
    let totalDeaths = 0;
    let totalRecovered = 0;
    const tableRows = table.length;
    table.each((index, element) => {
      const td = $(element).find('td');
      const stateName = $(td[1]).text();
      const confirmedCases = strToInt($(td[2]).text());
      const recovered = strToInt($(td[3]).text());
      const deaths = strToInt($(td[4]).text());
      if (index < tableRows - 2) {
        data.push({
          confirmedCases,
          deaths,
          recovered,
          stateName,
        });
        // compute and update stats
        totalActiveCases += confirmedCases;
        totalDeaths += deaths;
        totalRecovered += recovered;
      }
    });
    totalCases = totalActiveCases + totalDeaths + totalRecovered;
    return resolve({
      totalCases,
      totalActiveCases,
      totalDeaths,
      totalRecovered,
      data,
    });
  }));
};
