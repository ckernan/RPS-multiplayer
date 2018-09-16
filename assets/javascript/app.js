//$(function () {
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
    var userRef = database.ref("/users");
    var player1Ref = database.ref("/users/player1");
    var player2Ref = database.ref("/users/player2");


    userRef.once('value')
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
        var userRef = database.ref("/users");
        userRef.once('value')
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

    $(".p1-choice").on("click", function () {

        var choice = $(this).attr("data-choice");
        database.ref("/users").child("/player1/").child("/choice").set(choice);
        //var userRef = database.ref("/users/");
        // userRef.once("value")
        //     .then(function (snapshot) {

        //         // $("#player-1-choice").hide();

        //         if (snapshot.child("player2").child("choice").exists()) {
        //             checkWin(choice, snapshot.child("player2").child("choice").val());
        //             database.ref("/users/").child("player1").child("choice").remove();
        //             database.ref("/users/").child("player2").child("choice").remove();
        //             $("#player-1-choice").show();
        //             $("#player-2-choice").show();
        //         }
        //     })

    });

    $(".p2-choice").on("click", function () {
        $("#player-2-choice").hide();
        var choice = $(this).attr("data-choice");
        database.ref("/users").child("/player2/").child("/choice").set(choice);
        var userRef = database.ref("/users/");
        userRef.once("value")
            .then(function (snapshot) {
                if (snapshot.child("choice").exists()) {
                    checkWin(snapshot.child("choice").val(), choice);
                    database.ref("/users/").child("player1").child("choice").remove();
                    database.ref("/users/").child("player2").child("choice").remove();
                    $("#player-2-choice").show();
                    $("#player-1-choice").show();

                }
            })
    });



    function checkWin(choice1, choice2) {
        console.log(choice1);
        console.log(choice2);
        var users = database.ref("/users");

        if (choice1 === choice2) {
            $("#results").html("<h1></h1>");

        }
        if (choice1 === "rock") {
            if (choice2 === "scissors") {
                // rock wins
                $("#results").html("<h1>Player win!</h1>");
            } else {
                // paper wins
                $("#results").html("<h1>You lose! Try again.</h1>");
            }
        }
        if (choice1 === "paper") {
            if (choice2 === "rock") {
                // paper wins
                $("#results").html("<h1>You win!</h1>");
            } else {
                // scissors wins
                $("#results").html("<h1>You lose! Try again.</h1>");
            }
        }
        if (choice1 === "scissors") {
            if (choice2 === "rock") {
                // rock wins
                $("#results").html("<h1>You lose! Try again.</h1>");
            } else {
                // scissors wins
                $("#results").html("<h1>You win!</h1>");
            }
        }

    };

    userRef.on("child_added", function (child) {

    });

    player1Ref.on("child_added", function (child) {
        var player2;
        player2Ref.once("value")
            .then(function (snapshot) {
                player2 = snapshot.child("choice").val();
                console.log(player2);
                console.log(player2 !== null)
            })
        if (player2 !== null) {
            console.log("r")
            checkWin(child.val(), database.ref("users/player2/choice"))
        }
        if (child.key === "choice") {
            $("#player-1-choice").hide();

        }
    });

    player2Ref.on("child_added", function (child) {
        if (child.key === "choice") {
            $("#player-2-choice").hide();
        }
    });

//})

// database.ref('/users').on('value', function (snapshot) {

