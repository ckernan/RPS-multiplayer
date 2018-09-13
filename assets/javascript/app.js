 $(document).on('ready', function() {
// var config = {
//     apiKey: "AIzaSyD57mpiCb94D-OoURYsN90FDCIw4wIrSQQ",
//     authDomain: "rps-multiplayer-5001d.firebaseapp.com",
//     databaseURL: "https://rps-multiplayer-5001d.firebaseio.com",
//     projectId: "rps-multiplayer-5001d",
//     storageBucket: "",
//     messagingSenderId: "1011081787788"
//   };
//   firebase.initializeApp(config);
    console.log('text')
  // Signs-in Friendly Chat.
    $("#button").on('click', function() {
        signIn()
    });

    
    function signIn() {
        console.log("test")
        var userName = $("#name").val();
        console.log(userName);
        firebase.database().ref("/users/").child("/name/").set(userName)
        // Sign in Firebase using popup auth and Google as the identity provider.
    // var provider = new firebase.auth.GoogleAuthProvider();
        // firebase.auth().signInWithPopup(provider);
    };
})