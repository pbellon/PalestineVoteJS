
/*
 * GET home page.
 */

  
exports.index = function(req, res){
  var iso_codes = getIsoCodesFromResults('../vote_results.json');
  var results = {};
  results.iso_codes = iso_codes;
  res.render('index', results);
};

function getIsoCodesFromResults(json_filename){
  var vote_results = require(json_filename).vote_results;
  var results = {};
  results.yes = getIsoArray(vote_results.voted_yes);
  results.no =  getIsoArray(vote_results.voted_no);
  results.absents = getIsoArray(vote_results.absents);
  results.abstainers = getIsoArray(vote_results.abstainers);
  return results;
}
            
function getIsoArray(countries){
  var iso_code_array = [];
  for(var i = 0; i < countries.length; i++){
    iso_code_array.push(countries[i].iso3);
  }
  return iso_code_array;
  
}
