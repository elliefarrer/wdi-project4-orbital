const rp = require('request-promise');
const { giphyApiKey } = require('../config/env');

function search(req, res, next) {
  const reqQuery = req.query;
  console.log('req query is', reqQuery);
  rp({
    method: 'GET',
    url: `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${reqQuery.searchTerm}`,
    // req.query.newGifSearch may not be right
    json: true
  })
    .then(response => res.json(response))
    .catch(next);
}

module.exports = {
  search: search
};
