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
    var userRef = database.ref("/users");
    var player1Ref = database.ref("/users/player1");
    var player2Ref = database.ref("/users/player2");

    userRef.on('value', function (snapshot) {
        if (snapshot.child("player1").exists()) {
            var player1 = snapshot.child("player1");
            $("#player-1-name").html('<h2>' + player1.child("name").val() + '</h2>');
            //$("#player-1-choice").show();
        };
        if (snapshot.child("player2").exists()) {
            var player2 = snapshot.child("player2");
            $("#player-2-name").html('<h2>' + player2.child("name").val() + '</h2>');
            //$("#player-2-choice").show();
        };

    });
    
    $("#submit").on('click', function () {
        signIn();
    });


    function signIn() {
        userRef.once('value')
            .then(function (snapshot) {
                if (snapshot.child("player1").exists()) {                                           
                    var userName = $("#name").val().trim();
                    database.ref("users").child("player2").child("name").set(userName);
                    database.ref("users/player2/wins").set(0);
                } else {
                    var userName = $("#name").val().trim();
                    database.ref("users").child("player1").child("name").set(userName);
                    database.ref("users/player1/wins").set(0);
                }
            });
            
    };

    $(".p1-choice").on("click", function () {
        var choice = $(this).attr("data-choice");
        database.ref("users").child("player1").child("choice").set(choice);
        //$("#player-1-choice").hide();
    });

    $(".p2-choice").on("click", function () {
        var choice = $(this).attr("data-choice");
        database.ref("users").child("player2").child("choice").set(choice);
        //$("#player-2-choice").hide();
    });

    userRef.on("value", function(snapshot) {
        var player_one = snapshot.child("player1");
        var player_two = snapshot.child("player2");

        if (player_one.child("choice").exists() && player_two.child("choice").exists()) {
            checkWin(player_one, player_two)
            $("#player-2-choice").show();
            $("#player-1-choice").show();
             database.ref("/users/").child("player1").child("choice").remove();
             database.ref("/users/").child("player2").child("choice").remove();
        }
    })



    function checkWin(player1, player2) {
        var choice1 = player1.child("choice").val();
        var choice2 = player2.child("choice").val();
        var name1 = player1.child("name").val();
        var name2 = player2.child("name").val();
        var wins1 = player1.child("wins").val();
        var wins2 = player2.child("wins").val();

        if (choice1 === choice2) {
            // tie
            return $("#results").html("<h1>TIE!</h1>");
        }
        if (choice1 === "rock") {
            if (choice2 === "scissors") {
                // rock wins
                console.log("wins", wins1++);
                console.log("wins1111", wins1)
                //wins1++;
                //database.ref("users/player1/wins").set(wins1);
                return $("#results").html("<h1>" + name1.toUpperCase() +  " WINS!</h1>");
            } else {
                // paper wins
                //console.log(wins2, wins2++)
                //database.ref("users/player2/wins").set(wins2);
                return $("#results").html("<h1>" + name2.toUpperCase() + " WINS!</h1>");
            }
        }
        if (choice1 === "paper") {
            if (choice2 === "rock") {
                // paper wins
                return $("#results").html("<h1>" + name1.toUpperCase() +  " WINS!</h1>");
            } else {
                // scissors wins
                return $("#results").html("<h1>" + name2.toUpperCase() + " WINS!</h1>");
            }
        }
        if (choice1 === "scissors") {
            if (choice2 === "rock") {
                // rock wins
                return $("#results").html("<h1>" + name2.toUpperCase() + " WINS!</h1>");
            } else {
                // scissors wins
                return $("#results").html("<h1>" + name1.toUpperCase() + " wins!</h1>");
            }
        };
    }; 

    player2Ref.on("child_added", function (snapshot) {
        if (snapshot.key === "choice") {
            $("#player-2-choice").hide();
        }
    });

    player1Ref.on("child_added", function (snapshot) {
        if (snapshot.key === "choice") {
            console.log("sup")
            $("#player-1-choice").hide();
        }
    });
})

