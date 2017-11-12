
	function loadChart() {
		d3.selectAll("svg > *").remove();

		var isObesityCB = document.getElementById("obesityCB").checked;
		var isOverweightCB = document.getElementById("overweightCB").checked;

		if(!isObesityCB && !isOverweightCB){
			document.getElementById("obesityCB").checked = true;
			document.getElementById("overweightCB").checked = true;
			isOverweightCB = true;
			isObesityCB = true;
		}

		// Get the data
		d3.csv("Data.CSV", function(error, data) {
		  if (error) throw error;
		  var obeseData = [];
		  var overweightData = [];

		  data.forEach(function(row) {
		  	if(row.location_id == countryId && row.age_group_id == ageId && row.sex_id == sexId && row.metric == obeseMetric){
		  		obeseData.push({year : parseTime(row.year), mean : +row.mean});
		  	}
		  	else if(row.location_id == countryId && row.age_group_id == ageId && row.sex_id == sexId && row.metric == overweightMetric){
		  		overweightData.push({year : parseTime(row.year), mean : +row.mean});
		  	}
		  });

		  var obeseAndOverweightData = [];

		  if(isObesityCB && isOverweightCB){
			  obeseAndOverweightData = obeseData.concat(overweightData);
			}
			else if(isObesityCB) {
				obeseAndOverweightData = obeseData;
			}
			else {
				obeseAndOverweightData = overweightData;
			}
		  // Scale the range of the data
		  x.domain(d3.extent(obeseAndOverweightData, function(d) { return d.year; }));
		  y.domain([d3.min(obeseAndOverweightData, function(d) { return d.mean; }) - 0.0005, d3.max(obeseAndOverweightData, function(d) { return d.mean; })]);
		// moves the 'group' element to the top left margin  
		var svg = svgParent.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		  // Add the valueline path.
		  if(isObesityCB){
		  svg.append("path")
		      .data([obeseData])
		      .attr("class", "obese")
		      .attr("d", valueline);
		  }
		  if(isOverweightCB){ 
		  svg.append("path")
		      .data([overweightData])
		      .attr("class", "overweight")
		      .attr("d", valueline);
		  }

		  // Add the X Axis
		  svg.append("g")
		      .attr("transform", "translate(0," + height + ")")
		      .call(d3.axisBottom(x));

		  // Add the Y Axis
		  svg.append("g")
		      .call(d3.axisLeft(y));

		});
	};