var data;
var url = "https://api.propublica.org/congress/v1/113/house/members.json";
var key = {
	headers: {
		"X-API-Key":"b2qK45MpdBJr0Q6D3H9bYSNgIgyEVAXZSADe8uOd"
	}
};


var app = new Vue({  
	el: '#app',  
	data: {    
    senators: [],
    filteredNames:[],
    filteredStates:[],
    checkedParty:["R", "D", "I"],
    pickedState: ["---"]
	  },
	methods: {
    dropdownState: function () {
      var i = 0;
      app.filteredStates = [];
      var estados = ["---"];
      for (i = 0; i < app.senators.length; i++) {
        estados.push(app.senators[i].state)
      }
      var estadosUnicos = [...new Set(estados)].sort();
      app.filteredStates = estadosUnicos
    },
    
	  filterParty: function () {
      var i = 0;
      app.filteredNames = [];  
      var selection = app.checkedParty;
      var selectedState =  app.pickedState;
      //var selection = Array.from(document.querySelectorAll('input[name=party]:checked')).map(elt => elt.value);
      //var selectedState = document.getElementById('states-dropdown').value;
    
      for (i = 0; i < app.senators.length; i++) {
    
        if (selection.includes(app.senators[i].party) && selectedState == "---") {
          app.filteredNames.push(app.senators[i])
        }  
        
        else if (selection.includes(app.senators[i].party) && selectedState == app.senators[i].state || selectedState == "") {
          app.filteredNames.push(app.senators[i])
        }
      }

      }
    }

	});

function fetchJson(url, init) {
	return fetch(url, init).then(function(response) {
	  if (response.ok) {
		return response.json();
	  }
	  throw new Error(response.statusText)
	});
}


fetchJson(url, key)
.then(function(json){
	data=json;
  app.senators = data.results[0].members;
  app.dropdownState() 
  app.filterParty()
  
  
 	})

// function filterParty() {
// 	var i = 0;
// 	var names = data.results[0].members;
// 	var houseNames = "";
// 	var selection = Array.from(document.querySelectorAll('input[name=party-house]:checked')).map(elt => elt.value);
// 	var selectedState = document.getElementById('states-dropdown-house').value;



// 	for (i = 0; i < names.length; i++) {

// 		if (selection.includes(names[i].party) && selectedState == "---") {
// 			houseNames += '<tr><td><a href="' + names[i].url + '" target="blank">' + names[i].last_name + ", " + names[i].first_name + " " + (names[i].middle_name || "") + "</a></td><td>" + names[i].party + "</td><td>" + names[i].state + "</td><td>" + names[i].seniority + "</td><td>" + names[i].votes_with_party_pct + "</td></tr>";
// 		} 
		
// 		else if (selection.includes(names[i].party) && selectedState == names[i].state || selectedState == "") {
// 			houseNames += '<tr><td><a href="' + names[i].url + '" target="blank">' + names[i].last_name + ", " + names[i].first_name + " " + (names[i].middle_name || "") + "</a></td><td>" + names[i].party + "</td><td>" + names[i].state + "</td><td>" + names[i].seniority + "</td><td>" + names[i].votes_with_party_pct + "</td></tr>";
// 		}

// 	}
// 	document.getElementById("house-members").innerHTML = houseNames;
// }

// filterParty();

// document.getElementById("democrat").onchange = filterParty;


// document.getElementById("republican").onchange = filterParty;


// document.getElementById("independent").onchange = filterParty;


// document.getElementById("states-dropdown-house").onchange = filterParty;


// //State


// function dropdownState() {
// 	var i = 0;
// 	var names = data.results[0].members;
// 	var senateStates = "";

// 	var estados = ["---"];
// 	for (i = 0; i < names.length; i++) {
// 		estados.push(names[i].state)
// 	}

// 	var estadosUnicos = [...new Set(estados)].sort();
// 	var estadosOptions = "";

// 	for (i = 0; i < estadosUnicos.length; i++) {
// 		estadosOptions += '<option value="' + estadosUnicos[i] + '">' + estadosUnicos[i] + '</option> ';

// 	}


// 	document.getElementById("states-dropdown-house").innerHTML = estadosOptions;

// }

// dropdownState();
