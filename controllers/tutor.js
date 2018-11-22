function checkIfTutor(){
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
                  'provider': user.providerData[0].providerId
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
