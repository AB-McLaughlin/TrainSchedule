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
//Prepare the DOM for jquery
    $(document).ready(function(){  
//Submit information
    $("button").on("click", function(event) {
//Put submit information in variables
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#firstTrainTime").val().trim();
        var freqMin = $("#frequency").val().trim();
//Move input data to the table
            dataBase.ref().push({
                trainName: trainName,
                destination: destination,
                firstTrain: firstTrain,
                freqMin: freqMin,
            });
                $("form").trigger("reset");
                $("#header").append( + moment())
    });
    });
//Add data to the database and display it on the page    
    dataBase.ref().on("child_added", function(snapshot) {
            trainName = snapshot.val().trainName;
            destination = snapshot.val().destination;
            firstTrain = snapshot.val().firstTrain;
            freqMin = snapshot.val().freqMin;
            var trainFreq = freqMin;
        // First Time (pushed back 1 year to make sure it comes before current time)
            var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
            var now = moment();
        // Difference between now and the first train time    
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        // Time apart (remainder)
            var tRemainder = diffTime % trainFreq;
        // Minutes Until Train
            var tMinutesTillTrain = trainFreq - tRemainder;
         // Next Train
            var nextTrain = moment().add(tMinutesTillTrain, "minutes");
            var catchTrain = moment(nextTrain).format("h:mm a");
            
               $("#display").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + trainFreq + "</td><td>" +  catchTrain + "</td><td>" + tMinutesTillTrain + "</td>");
    },          
                    function(errorObject) {
                        console.log("The read failed: " + errorObject.code);
  });
 



    
