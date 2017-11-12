	function loadChart() {
		d3.selectAll("svg > *").remove();

		var metric = document.getElementById("graphMetric").value;
		
		// Get the data
		d3.csv("Data.csv", function(error, data) {
		  if (error) throw error;

		  var maleData = [];
		  var femaleData = [];

		  data.forEach(function(row) {
		  	if(row.location_id == countryId && row.age_group_id == ageId && row.sex_id == maleSexId && row.metric == metric){
		  		maleData.push({year : row.year, mean : +row.mean});
		  	}
		  	else if(row.location_id == countryId && row.age_group_id == ageId && row.sex_id == femaleSexId && row.metric == metric){
		  		femaleData.push({year : row.year, mean : +row.mean});
		  	}
		  });

		  var maleAndfemaleData = maleData.concat(femaleData);

		  // Scale the range of the data
		  x.domain(maleAndfemaleData.map(function(d) { return d.year;}));
		  y.domain([d3.min(maleAndfemaleData, function(d) { return d.mean; }) - 0.0005, d3.max(maleAndfemaleData, function(d) { return d.mean; })]);
		// moves the 'group' element to the top left margin  
		var svg = svgParent.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	        svg.selectAll(".bar")
	         .data(maleData)
	         .enter().append("rect")
	         .attr("class", "male")
	         .attr("x", function(d) { return x(d.year); })
	         .attr("y", function(d) { return y(d.mean); })
	         .attr("width", x.bandwidth()-30)
	         .attr("height", function(d) { return height - y(d.mean); });

	         svg.selectAll(".bar")
	         .data(femaleData)
	         .enter().append("rect")
	         .attr("class", "female")
	         .attr("x", function(d) { return x(d.year) + x.bandwidth()-30; })
	         .attr("y", function(d) { return y(d.mean); })
	         .attr("width", x.bandwidth()-30)
	         .attr("height", function(d) { return height - y(d.mean); });

		  // Add the X Axis
		  svg.append("g") 
		      .attr("transform", "translate(0," + height + ")")
		      .call(d3.axisBottom(x));

		  // Add the Y Axis
		  svg.append("g")
		      .call(d3.axisLeft(y));
		});
	}
