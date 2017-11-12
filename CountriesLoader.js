	var sexId = 3;
	var maleSexId = 1;
	var femaleSexId = 2;
	var obeseMetric = "obese";
	var overweightMetric = "overweight"
	var countryId = 160;
	var ageId = 34;
	var countries = [];
	var ageGroups = [];

	d3.csv("countiresAndAges.CSV", function(data){
		data.forEach(function(row) {
			countries.push({location_id : row.location_id, location : row.location, location_name : row.location_name});
			if(row.age_group_id) {
				ageGroups.push({age_group_id : row.age_group_id, age_group : row.age_group, age_start : row.age_start, age_end : row.age_end});
			}

		});
	var countriesList = document.getElementById('CountriesList');
	for(var i = 0; i < countries.length; i++) {
	    var opt = document.createElement('option');
	    opt.innerHTML = countries[i].location_name;
	    opt.value = countries[i].location_id;
	    countriesList.appendChild(opt);
	}

	var ageList = document.getElementById('AgeList');
	for(var i = 0; i < ageGroups.length; i++) {
	    var opt = document.createElement('option');
	    opt.innerHTML = ageGroups[i].age_group;
	    opt.value = ageGroups[i].age_group_id;
	    ageList.appendChild(opt);
	}
	});

	function updateIds(){
		countryId = document.getElementById("CountriesList").value;
		ageId = document.getElementById("AgeList").value;
		loadChart();
	}

