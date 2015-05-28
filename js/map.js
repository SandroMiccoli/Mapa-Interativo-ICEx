var data;

d3.json("../data/all.json", function(error, json) {
  data = json;

  $(function() {

      // Generates unique array with all classroom numbers (salas)
      var salas = [];
      $.each(data,
        function(index,item){
                            salas.push(item.SALA);
                            }
            );
      salas = salas.filter(function(itm,i,a){
          //console.log(itm);
          if (!itm.includes("CAD") && !itm.includes("QUI") && !itm.includes("ENG") )
            return i==salas.indexOf(itm);
      });
      salas.sort();

      $( "#search" ).autocomplete(
      {
        source: salas
      });
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