var data;

var salas = ["1036","1035","1034","1033","1032","1031","1030","1029","1028","1027","1001","1002","1003","1004","1005","1006","1007","1008","1009","1010","1011","1012","1013","1014","1015","1016","1017","1018","1019","1020","1021","1022","1023","1024","1025","1026","1047","1048","1049","2039","2038","2037","2036","2035","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2017","2018","2013","2014","2015","2016","2019","2020","2021","2022","2023","2024","2025","2026","2027","2030","2029","2028","2031","2032","2033","2034","2076","2077","3056","3055","3054","3053","3052e3051","3050","3001","3002","3004","3003","3005","3007","3006","3012","3011","3010","3008","3007","3013","3016","3015","3014","3017","3018","3019","3020","3028","3022","3023","3024","3025","3026","3027","3045","3029","3030","3031","3032","3033","3034","3035","3036","3037","3038","3044","3043","3042","3041","3040","3039","3046","3047","3048","3049","3118","3117","3009A","3009Be3009C","3124","3123","3122","3121","3120","3119","4112","4110","4108","4106","4104","4111","4109","4107","4105","4103","4100","4098","4096","4194","4102","4101","4099","4097","4095","4092","4091","4089","4087","4085","4083","4082","4014","4016","4012","4013","4018","4020","4022","4024","4025","4015","4017","4019","4021","4023","4033","4035","4037","4039","4043","4041","4045","4047","4093","4001","4003","4005","4004","4006","4007","4221","4008","4009","4011","4026","4028","4030","4027","4029","4031","4051","4052","4054","4056","4058","4060","4062","4057","4059","4061","4064","4066","4068","4069","4070","4063","4065","4067","4081","4080","4079","4078","4050","4076","4074","4072","4077","4040","4042","4044","4046","4048","4075","4073","4071","4222","dm01","dm02","dm03","dm04","dcc01","dcc03", "de01", "de02", "de03", "de04", "de05"];
salas.sort();

d3.json("../data/all.json", function(error, json) {
  data = json;
  


  $(function() {
      var cod = _.groupBy(data, function(d){return d.CODIGO + " - " + d.DISCIPLINA});
      console.log(cod);
      // Generates unique array with all courses
      var courses = [];
      $.each(cod,
        function(index,item){
                            courses.push(index);
                            }
            );
      courses = courses.filter(function(itm,i,a){
          //console.log(itm);
          return i==courses.indexOf(itm);
      });
      courses.sort();

      // Checks if input is integer or string.
      // If integer, searches for classroom numbers
      // If string, searches for courses
      $('#search').bind('input', function() { 
          if (isInteger($(this).val())){
            console.log("INTEGER!");
            $( "#search" ).autocomplete(
            {
              source: salas,
              response: function( event, ui ) {
                showRooms(ui.content);
              },
              select: function( event, ui ) {

                showRoom(ui);
                var f = ui.item.value.substring(0,1);
                if (f>=1 && f <=4){
                  showFloor(f);
                }
              },
              focus: function( event, ui ) {
                showRoom(ui);
                var f = ui.item.value.substring(0,1);

                if (f>=1 && f <=4){
                  showFloor(f);
                }
              }
            });
            var floor = $(this).val().substring(0,1);
            
            if (floor>=1 && floor <=4){
              showFloor(floor);
            }
          }
          else {
               $( "#search" ).autocomplete(
                {
                  source: courses,
                  response: function( event, ui ) {
                  },
                  select: function( event, ui ) {
                    var result = cod[$(this).val()];
                    //console.log(cod.get($(this).val()));
                    //console.log(result);
                    createCourseTable(result);
                    var codeName = $(this).val().split(" - ");
                    $("#courseCode").html(codeName[0]);
                    $("#courseName").html(codeName[1]);
                  },
                  focus: function( event, ui ) {
                    
                  }
            }); 
          }

      });

    });

});

function createCourseTable(classes){
  $('#courses').empty();
  console.log(classes);
  for (var i = 0; i < classes.length; i++){
    var newCells = '<tr><td colspan="5" id="courseClass">Turma '+classes[i]["TURMA"]+'</td></tr>';
    newCells += '<tr><td colspan="5" id="courseRoom">Sala '+classes[i]["SALA"]+'</td></tr>';
    // Case for two different class time
    if (classes[i]["HORARIO2"]==null){
      newCells += '<tr>';
      
      if (classes[i]["DIA1"]=='2a')
        newCells += '<td class="c1">S</td>';
      else
        newCells += '<td>S</td>';
      
      if (classes[i]["DIA1"]=='3a')
        newCells += '<td class="c1">T</td>';
      else
        newCells += '<td>T</td>';
      
      if (classes[i]["DIA1"]=='4a')
        newCells += '<td class="c1">Q</td>';   
      else
        newCells += '<td>Q</td>';
      
      if (classes[i]["DIA1"]=='5a')
        newCells += '<td class="c1">Q</td>';
      else
        newCells += '<td>Q</td>';
      
      if (classes[i]["DIA1"]=='6a')
        newCells += '<td class="c1">S</td>';
      else
        newCells += '<td>S</td>';


      newCells += '</tr>';

      newCells += '<td colspan="5" id="courseTime" class="c1">'+classes[i]["HORARIO1"]+'</td></tr>';
    }
    else if (classes[i]["HORARIO1"]!=classes[i]["HORARIO2"]){
      newCells += '<tr>';
      
      if (classes[i]["DIA1"]=='2a')
        newCells += '<td class="c1">S</td>';
      else if (classes[i]["DIA2"]=='2a')
        newCells += '<td class="c2">S</td>';
      else
        newCells += '<td>S</td>';
      
      if (classes[i]["DIA1"]=='3a')
        newCells += '<td class="c1">T</td>';
      else if (classes[i]["DIA2"]=='3a')
        newCells += '<td class="c2">T</td>';
      else
        newCells += '<td>T</td>';
      
      if (classes[i]["DIA1"]=='4a')
        newCells += '<td class="c1">Q</td>';
      else if (classes[i]["DIA2"]=='4a')
        newCells += '<td class="c2">Q</td>';        
      else
        newCells += '<td>Q</td>';
      
      if (classes[i]["DIA1"]=='5a')
        newCells += '<td class="c1">Q</td>';
      else if (classes[i]["DIA2"]=='5a')
        newCells += '<td class="c2">Q</td>';
      else
        newCells += '<td>Q</td>';
      
      if (classes[i]["DIA1"]=='6a')
        newCells += '<td class="c1">S</td>';
      else if (classes[i]["DIA2"]=='6a')
        newCells += '<td class="c2">S</td>';
      else
        newCells += '<td>S</td>';


      newCells += '</tr>';

      newCells += '<td colspan="5" id="courseTime" class="c1">'+classes[i]["HORARIO1"]+'</td></tr>';
      newCells += '<td colspan="5" id="courseTime" class="c2">'+classes[i]["HORARIO2"]+'</td></tr>';
    }
    else if (classes[i]["HORARIO1"]==classes[i]["HORARIO2"]){
      newCells += '<tr>';
      
      if (classes[i]["DIA1"]=='2a' || classes[i]["DIA2"]=='2a')
        newCells += '<td class="c1">S</td>';
      else
        newCells += '<td>S</td>';
      
      if (classes[i]["DIA1"]=='3a' || classes[i]["DIA2"]=='3a')
        newCells += '<td class="c1">T</td>';
      else
        newCells += '<td>T</td>';
      
      if (classes[i]["DIA1"]=='4a' || classes[i]["DIA2"]=='4a')
        newCells += '<td class="c1">Q</td>';
      else
        newCells += '<td>Q</td>';
      
      if (classes[i]["DIA1"]=='5a' || classes[i]["DIA2"]=='5a')
        newCells += '<td class="c1">Q</td>';
      else
        newCells += '<td>Q</td>';
      
      if (classes[i]["DIA1"]=='6a' || classes[i]["DIA2"]=='6a')
        newCells += '<td class="c1">S</td>';
      else
        newCells += '<td>S</td>';


      newCells += '</tr>';
      newCells += '<td colspan="5" id="courseTime" class="c1">'+classes[i]["HORARIO1"]+'</td></tr>';
    }
    
    
    $('#courses').append(newCells);
  }

}

function showRooms(rooms){
  var svg = d3.select("object#mapaIcex").node().getSVGDocument()

  for (var j = 0; j < salas.length; j++){  
    //console.log("SALAS: "+ salas[j]);
    d3.select(svg).select("rect#s"+salas[j]).style("opacity","0.1")
  }
  for (var i = 0; i < rooms.length; i++) {
    //console.log(rooms[i].value);
    d3.select(svg).select("rect#s"+rooms[i].value).style("opacity","1");
  }
 
}


function showRoom(room){
  var svg = d3.select("object#mapaIcex").node().getSVGDocument()

  for (var j = 0; j < salas.length; j++){  
    //console.log("SALAS: "+ salas[j]);
    d3.select(svg).select("rect#s"+salas[j]).style("opacity","0.1")
  }
  
  d3.select(svg).select("rect#s"+room.item.value).style("opacity","1");
  
 
}


function showFloor(floor){
	var svg = d3.select("object#mapaIcex").node().getSVGDocument()
	$("#andar"+floor)[0].checked=true;
	for (var i = 1; i <= 4; i++) {
		if (i==floor)
			d3.select(svg).select("g#Pav"+i).style("display","inline")
		else
			d3.select(svg).select("g#Pav"+i).style("display","none")
	}
}

function isInteger(str){
    return /^\+?(0|[1-9]\d*)$/.test(str);
}