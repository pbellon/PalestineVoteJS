
/*
 * GET home page.
 */

  
exports.index = function(req, res){
  var iso_codes = getIsoCodesFromResults('../vote_results.json');
  
  res.render('index', {iso_codes: iso_codes});
};

function getIsoCodesFromResults(json_filename){
  var vote_results = require(json_filename).vote_results;
  return {
    yes: getIsoArray(vote_results.voted_yes),
    no: getIsoArray(vote_results.voted_no),
    absents: getIsoArray(vote_results.absents),
    abstainers: getIsoArray(vote_results.abstainers)
  };
}
            
function getIsoArray(countries){
  var iso_code_array = [];
  for(var i = 0; i < countries.length; i++){
    iso_code_array.push(countries[i].iso3);
  }
  return iso_code_array;
  
}
