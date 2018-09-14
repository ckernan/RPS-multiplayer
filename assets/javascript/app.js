 //$(document).on('ready', function() {
// var config = {
//     apiKey: "AIzaSyD57mpiCb94D-OoURYsN90FDCIw4wIrSQQ",
//     authDomain: "rps-multiplayer-5001d.firebaseapp.com",
//     databaseURL: "https://rps-multiplayer-5001d.firebaseio.com",
//     projectId: "rps-multiplayer-5001d",
//     storageBucket: "",
//     messagingSenderId: "1011081787788"
//   };
//   firebase.initializeApp(config);
var database = firebase.database();

var user = {
    name: "",
    choice: "",
    wins: 0,
    losses: 0,
    ties: 0
};

    console.log('text')
  // Signs-in Friendly Chat.
    $("#button").on('click', function() {
        signIn();
        $("#name").val("");
    });

    
    function signIn() {
        console.log("test")
        var userName = $("#name").val().trim();
        console.log(userName);
        $("#player-1-name").html('<h2>' + userName + '</h2>');
        $("#player-1-choice").append('<h5>Wins: ' + user.wins + ' Losses: ' + user.losses +   ' Ties: ' + user.ties + '</h5>');
        database.ref("/users/").child("/name/").set(userName);
        
        // Sign in Firebase using popup auth and Google as the identity provider.
    // var provider = new firebase.auth.GoogleAuthProvider();
        // firebase.auth().signInWithPopup(provider);
    };

    function userChoice() {
        $("button").on("click", function() {
            // In this case, the "this" keyword refers to the button that was clicked
            var choice = $(this).attr("data-choice");
    });
};
//})