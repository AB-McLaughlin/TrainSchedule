$(document).ready(function(){



    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDRwNPM42G9fHAGYNdlxMxWgn6iF4S_Rjo",
      authDomain: "trainschedule-8a99c.firebaseapp.com",
      databaseURL: "https://trainschedule-8a99c.firebaseio.com",
      projectId: "trainschedule-8a99c",
      storageBucket: "trainschedule-8a99c.appspot.com",
      messagingSenderId: "866381105671"
    };
    firebase.initializeApp(config);
 
    var dataBase = firebase.database();
        var trainName = "";
        var destination = "";
        var firstTrain = "";
        var freqMin = "";

      database.ref().put("value", function(snapshot) {
                trainName = snapshot.val().trainName;
                destination = snapshot.val().destination;
                firstTrain = snapshot.val().firstTrain;
                freqMin = snapshot.val().freqMin;
                var now = moment().format(LT);
                var nextArr =  moment().startOf('minute').fromNow();
                var minAway= moment(nextArr - now);
                console.log(snapshot.val());
          console.log(snapshot.val().trainName);
          console.log(snapshot.val().destination);
          console.log(snapshot.val().firstTrain);
          console.log(snapshot.val().freqMin);


              $("#display").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + freqMin + "</td><td>" +  nextArr + "</td><td>" + minAway + "</td>");

  },
    function(errorObject) {
        console.log("The read failed: " + errorObject.code);
  });
//Submit information
    $("#submit").on("click", function(event) {
            console.log("clicked");
//No page refresh            
            event.preventDefault();
//Put submit information in variables
            var trainName = $("#trainName").val().trim();
            var destination = $("#destinantion").val().trim();
            var firstTrain = $("#firstTrainTime").val().trim();
            var freqMin = $("#frequency").val().trim();
//Move input data to the table
            dataBase.ref().push({
                trainName: trainName,
                destination: destination,
                firstTrain: firstTrain,
                freqMin: freqMin,
                
            });
    });
})