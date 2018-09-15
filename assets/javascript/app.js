$(function () {
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
    var ref = database.ref("/users");
    ref.once('value')
        .then(function (snapshot) {
            if (snapshot.child("player1").exists()) {
                var player1 = snapshot.child("player1");
                $("#player-1-name").html('<h2>' + player1.child("name").val() + '</h2>');
            };
            if (snapshot.child("player2").exists()) {
                var player2 = snapshot.child("player2");
                $("#player-2-name").html('<h2>' + player2.child("name").val() + '</h2>');
            };
            

            // $("#player-1-choice").append('<h5>Wins: ' + user.wins + ' Losses: ' + user.losses + ' Ties: ' + user.ties + '</h5>');
        })


    console.log("yo", ref);

    /*var user = {
        name: "",
        choice: "",
        wins: 0,
        losses: 0,
        ties: 0
    };*/

    console.log('text')
    // Signs-in Friendly Chat.
    $("#submit").on('click', function () {
        signIn();

    });


    function signIn() {
        var ref = database.ref("/users");
        ref.once('value')
            .then(function (snapshot) {
                if (snapshot.child("player1").exists()) {
                    var userName = $("#name").val().trim();
                    $("#player-2-name").html('<h2>' + userName + '</h2>');
                    // $("#player-2-choice").append('<h5>Wins: ' + user.wins + ' Losses: ' + user.losses + ' Ties: ' + user.ties + '</h5>');
                    database.ref("/users/").child("/player2/").child("/name/").set(userName);
                } else {
                    var userName = $("#name").val().trim();
                    $("#player-1-name").html('<h2>' + userName + '</h2>');
                    // $("#player-2-choice").append('<h5>Wins: ' + user.wins + ' Losses: ' + user.losses + ' Ties: ' + user.ties + '</h5>');
                    database.ref("/users/").child("/player1/").child("/name/").set(userName);
                }
            });

        // $("#name").val("");


        // Sign in Firebase using popup auth and Google as the identity provider.
        // var provider = new firebase.auth.GoogleAuthProvider();
        // firebase.auth().signInWithPopup(provider);
    };

    function userChoice() {
        $("button").on("click", function () {
            // In this case, the "this" keyword refers to the button that was clicked
            var choice = $(this).attr("data-choice");
        });
    };
})

// database.ref('/users').on('value', function (snapshot) {

