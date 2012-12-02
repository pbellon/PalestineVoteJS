Array.prototype.includes = function(element){
  var result = false;
  if(this.indexOf(element) !== -1){
    result = true;
  }
  return result;
};

/** 
 * Constructor of my map with the vote results
 * @param vote_result 
 *      {
 *        yes_votes_iso_codes: [],
 *        no_votes_iso_codes: [],
 *        absents_iso_codes: [],
 *        abstainers_iso_codes: []
 *      }
 */
function MyMap(vote_results){
  
  MyMap.Constants = {
    green:"#29ff45",
    red:"#ff2929",
    grey:"#b3b3b3",
    dark_grey:"#737373"
  }
  
  this.yes_votes = vote_results.yes;
  this.no_votes = vote_results.no;
  this.absents = vote_results.absents;
  this.abstainers = vote_results.abstainers;
  
  
  this.isInYesVotes = function(iso_code){
    return this.yes_votes.includes(iso_code);
  };
  
  this.isInNoVotes = function(iso_code){
    return this.no_votes.includes(iso_code);
  };
  
  this.isInAbsents= function(iso_code){
    return this.absents.includes(iso_code);
  };
  
  this.isInAbstainers = function(iso_code){
    return this.abstainers.includes(iso_code);
  };
  
 
  
  this.colorizeCountries = function(data){
    var ref = MyMap.ref;
    var color = ref.getColor(data.iso);
    return color;
  };
  
  this.getColor = function(iso_code){
    var color = "";
    if(this.isInYesVotes(iso_code)){
      color = MyMap.Constants.green;
    } else if (this.isInNoVotes(iso_code)){
      color = MyMap.Constants.red; 
    } else if (this.isInAbstainers(iso_code)){
      color = MyMap.Constants.grey;
    } else if (this.isInAbsents(iso_code)){
      color = MyMap.Constants.dark_grey;
    }
    return color;
  };
  
  // weird hack :/
  MyMap.ref = this;
}

MyMap.prototype.drawMap = function(map){
  var ref = MyMap.ref;
  ref.map.addLayer("countries");
  ref.map.getLayer("countries").style('fill', ref.colorizeCountries);
 
}

MyMap.prototype.initMap = function(id, map_name){
    MyMap.prototype.map = Kartograph.map(id,600,310);
    MyMap.prototype.map.loadMap(map_name, this.drawMap, {zoom:1.0});
};



