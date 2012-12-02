/**
 * A little method for Arrays to see if Array have an element or not
 * @param element
 *      the element to test
 * @return Boolean
 *      true if the element is present
 *      false if not. 
 */
Array.prototype.includes = function(element){
  var result = false;
  if(this.indexOf(element) !== -1){
    result = true;
  }
  return result;
};

/** 
 * Constructor of my map
 * @param vote_result 
 *      {
 *        yes: [],
 *        no: [],
 *        absents: [],
 *        abstainers: []
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
    var color = MyMap.instance.getColor(data.iso);
    return color;
  };
  
  /**
   * Returns the color depending on the vote result associated to the iso_code
   * @param iso_code, ISO code of the country
   * @return color, hexadecimal color
   */
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
  MyMap.instance = this;
}

/** 
 * Callback for map loading
 * It will draw the "crountries" layer and style the different countries with colorizeCountries methods
 */
MyMap.prototype.drawMap = function(map){
  MyMap.instance.map.addLayer("countries");
  MyMap.instance.map.getLayer("countries").style('fill', MyMap.instance.colorizeCountries);
 
}

/**
 * Initialize Kartograph.js 
 * @param id
 *      the id of the HTML element for map loading
 * @param map_name
 *      the path of SVG file
 */
MyMap.prototype.initMap = function(id, svg_filename, options){
    MyMap.prototype.map = Kartograph.map(id,options.width, options.height);
    MyMap.prototype.map.loadMap(svg_filename, this.drawMap, options.map_options);
};



