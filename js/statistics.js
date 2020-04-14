var data;
var url = document.title.includes("SENATE")?"https://api.propublica.org/congress/v1/113/senate/members.json":"https://api.propublica.org/congress/v1/113/house/members.json";

var key = {
	headers: {
		"X-API-Key":"b2qK45MpdBJr0Q6D3H9bYSNgIgyEVAXZSADe8uOd"
	}
};

var app = new Vue({  
    el: '#app',  
        data: {  
            names: [],
            tenPercent: 0,    
            statistics: { 
                "democrats": [],
                "republicans": [],
                "independents": [],
                "democratsVotingWithTheirParty": 0,
                "republicansVotingWithTheirParty": 0,
                "topMembersVotingWithTheirParty" : [],
                "topMembersNotVotingWithTheirParty": [],
                "membersMissedMostVotes": [],
                "membersMissedLeastVotes": [],
                
                    },
              
            },
        methods:{
            

            numberOfReps: function(){
                app.statistics.democrats = app.names.filter(demo => demo.party == "D");
                app.statistics.republicans = app.names.filter(rep => rep.party == "R");
                app.statistics.independents = app.names.filter( ind => ind.party == "I");
                app.tenPercent = ((app.names.length*10)/100).toFixed(0);
                },
            
            promedios: function() {
                           
   
                app.statistics.democratsVotingWithTheirParty = app.statistics.democrats.reduce ((a, b) => 
                ( { votes_with_party_pct : (a.votes_with_party_pct || 0 ) + ( b.votes_with_party_pct || 0) } )).votes_with_party_pct / app.statistics.democrats.length.toFixed(2)
                   
                app.statistics.republicansVotingWithTheirParty = app.statistics.republicans.reduce ((a, b) => 
                ( { votes_with_party_pct : (a.votes_with_party_pct || 0 ) + ( b.votes_with_party_pct || 0) } )).votes_with_party_pct / app.statistics.republicans.length.toFixed(2)
                },
           
            loyalty: function() { 
                

                const sortInfidelity = app.names.sort((a,b) => b.votes_against_party_pct - a.votes_against_party_pct);
                app.statistics.topMembersNotVotingWithTheirParty  = app.names.filter(bottom10 => bottom10.votes_against_party_pct >= app.names[app.tenPercent].votes_against_party_pct)
                
                const sortFidelity = app.names.sort((a,b) => b.votes_with_party_pct - a.votes_with_party_pct);
                app.statistics.topMembersVotingWithTheirParty= app.names.filter(top10 => top10.votes_with_party_pct >= app.names[app.tenPercent].votes_with_party_pct)
                
                    },
            
            attendance: function (){ 
                

                app.statistics.membersMissedLeastVotes = app.names.sort((a,b) => a.missed_votes_pct - b.missed_votes_pct).
                filter(top10 => top10.missed_votes_pct <= app.names[app.tenPercent].missed_votes_pct);
                    
                app.statistics.membersMissedMostVotes = app.names.sort((a,b) => b.missed_votes_pct - a.missed_votes_pct).
                filter(bottom10 => bottom10.missed_votes_pct >= app.names[app.tenPercent].missed_votes_pct);
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
    data = json;
    app.names = data.results[0].members;
    

    app.numberOfReps();
    app.promedios();
    app.loyalty();
    app.attendance();
    // app.htmlGoodAttendance(statistics.membersMissedLeastVotes)
    // app.htmlBadAttendance(statistics.membersMissedMostVotes)
    // app.htmlLeastLoyal(statistics.topMembersNotVotingWithTheirParty)
    // app.htmlMostLoyal(statistics.topMembersVotingWithTheirParty)
})
 	







//Numbers of Representants + HTML

// function nReps(){ 
//     statistics.democrats = names.filter(demo => demo.party == "D");
//     statistics.republicans = names.filter(rep => rep.party == "R");
//     statistics.independents = names.filter( ind => ind.party == "I");
//     document.getElementById("rNumber").innerHTML = statistics.republicans.length;
//     document.getElementById("dNumber").innerHTML = statistics.democrats.length;
//     document.getElementById("iNumber").innerHTML = statistics.independents.length;
//     };
    
    

//Average votes + HTML

// function promedios() {
   
//     statistics.democratsVotingWithTheirParty = statistics.democrats.reduce ((a, b) => ( { votes_with_party_pct : (a.votes_with_party_pct || 0 ) + ( b.votes_with_party_pct || 0) } )).votes_with_party_pct / statistics.democrats.length;
//     document.getElementById("dLoyalty").innerHTML = ((statistics.democratsVotingWithTheirParty).toFixed(2));
   
//     statistics.republicansVotingWithTheirParty = statistics.republicans.reduce ((a, b) => ( { votes_with_party_pct : (a.votes_with_party_pct || 0 ) + ( b.votes_with_party_pct || 0) } )).votes_with_party_pct / statistics.republicans.length;
//     document.getElementById("rLoyalty").innerHTML = ((statistics.republicansVotingWithTheirParty).toFixed(2));
// }


// //Least and Most Loyal 


// function loyalty(){ 
//     const sortInfidelity = names.sort((a,b) => b.votes_against_party_pct - a.votes_against_party_pct);
//     statistics.topMembersNotVotingWithTheirParty  = names.filter(bottom10 => bottom10.votes_against_party_pct >= names[tenPercent].votes_against_party_pct);

//     const sortFidelity = names.sort((a,b) => b.votes_with_party_pct - a.votes_with_party_pct);
//     statistics.topMembersVotingWithTheirParty= names.filter(top10 => top10.votes_with_party_pct >= names[tenPercent].votes_with_party_pct);
// };

// //Attendance 

// function attendance(){ 
// statistics.membersMissedLeastVotes = names.sort((a,b) => a.missed_votes_pct - b.missed_votes_pct).
// filter(top10 => top10.missed_votes_pct <= names[tenPercent].missed_votes_pct);

// statistics.membersMissedMostVotes = names.sort((a,b) => b.missed_votes_pct - a.missed_votes_pct).
// filter(bottom10 => bottom10.missed_votes_pct >= names[tenPercent].missed_votes_pct);
// };


// //HTML Functions


// //Loyalty

// function htmlMostLoyal(array) {
//     var htmlString = "";
//     var i = 0;
//     for (i=0 ; i < array.length; i++) {
//     htmlString += '<tr><td>'+ array[i].last_name + ', ' + array[i].first_name + '</td><td>' + array[i].total_votes + '</td><td>'+ array[i].votes_with_party_pct + '</td></tr>';  

// }
// if (document.getElementById("loyalty-table") != null){
// document.getElementById("loyalty-table").innerHTML = htmlString;
// }
// };


// function htmlLeastLoyal(array) {
//     var htmlString = "";
//     var i = 0;
//     for (i=0 ; i < array.length; i++) {
//     htmlString += '<tr><td>'+ array[i].last_name + ', ' + array[i].first_name + '</td><td>' + array[i].total_votes + '</td><td>'+ array[i].votes_with_party_pct + '</td></tr>';  

// }
// if ((document.getElementById("unloyalty-table") != null))
// document.getElementById("unloyalty-table").innerHTML = htmlString;
// };




// //Attendance  

// function htmlBadAttendance(array) {
//     var htmlString = "";
//     var i = 0;
//     for (i=0 ; i < array.length; i++) {
//     htmlString += '<tr><td>'+ array[i].last_name + ', ' + array[i].first_name + '</td><td>' + array[i].missed_votes + '</td><td>'+ array[i].missed_votes_pct + '</td></tr>';  

// }
// if((document.getElementById("least-engaged") != null)){
// document.getElementById("least-engaged").innerHTML = htmlString;
// }
// };




// function htmlGoodAttendance(array) {
//     var htmlString = "";
//     var i = 0;
//     for (i=0 ; i < array.length; i++) {
//     htmlString += '<tr><td>'+ array[i].last_name + ', ' + array[i].first_name + '</td><td>' + array[i].missed_votes + '</td><td>'+ array[i].missed_votes_pct + '</td></tr>';  

// }
// if((document.getElementById("most-engaged") != null))
// {
// document.getElementById("most-engaged").innerHTML = htmlString;
// }
// };






