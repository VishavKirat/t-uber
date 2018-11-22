
var uiConfig = {
        // signInSuccessUrl:"shome",
        'signInFlow': 'popup',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        tosUrl: 'hhtps://google.com',
      };
      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('#firebaseui-auth-container', uiConfig);



      function checkifloggedin(){
        firebase.auth().onAuthStateChanged(function(user){
          var studentRef = firebase.database().ref('/User/student');
          function checkIfDataExist(){
          studentRef.once('value',function(snapshot){
            var data = snapshot.val()
            console.log(snapshot);
            snapshot.forEach(function(childsnapShot){
              var key = childsnapShot.key;
              var childData = childsnapShot.val();
              console.log(childData);
                if(childData.uid == user.uid){
                  console.log('data alreday exist');
                  return childData;
                }else{
                  return studentRef.push({
                        'displayName': user.displayName,
                        'email' : user.email,
                        'emailVerified' : user.emailVerified,
                        'photoURL' : user.photoURL,
                        'uid' : user.uid,
                        'phoneNumber' : user.phoneNumber,
                        'provider': user.providerData[0].providerId,
                        'available': false
                      });
                }
              })
            })
          }


          if(user){
            console.log("user signed in");
            checkIfDataExist();
            window.location = "/home"


            document.querySelector("#firebaseui-auth-container").setAttribute('style',"display:none;visibility:hidden")
          }
          else{
            console.log('Please sign-in');
          }
      })
    }







window.addEventListener('load',function(){checkifloggedin()});
