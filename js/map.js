var data;

d3.json("../data/all.json", function(error, json) {
  data = json;
});

$(function() {
    var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
    $( "#tags" ).autocomplete(
    {
      source: data,
      select: function( event, ui ) {
			$( "#tags" ).val( ui.item.DISCIPLINA );
			return false;
    	}
    });
  });

function showFloor(floor){
	var svg = d3.select("object#mapaIcex").node().getSVGDocument()
	
	for (var i = 1; i <= 4; i++) {
		if (i==floor)
			d3.select(svg).select("g#Pav"+i).style("display","inline")
		else
			d3.select(svg).select("g#Pav"+i).style("display","none")
	}
}