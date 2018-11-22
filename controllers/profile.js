

var profilePic = document.querySelector('.profilePic img');
var disName = document.querySelector('.disName');
var Email = document.querySelector('.e-mail');
// var userId = document.querySelector('.userId');
var tutorPortal = document.querySelector('a[href="/tutor-create"]')
initApp = function() {
  tutorExist();
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var photoURL = user.photoURL;

      user.getIdToken().then(function(accessToken) {
        profilePic.setAttribute('src',photoURL);
          disName.textContent = `${displayName.toUpperCase()}`;
          Email.textContent = ` ${email}`;
      });
    } else {
      // User is signed out.
      window.location = "/signin"
    }
  }, function(error) {
    console.log(error);
  });

};

//signout function
var signOut= document.querySelector('button');
signOut.addEventListener('click',function(e){
  var tutorRef = firebase.database().ref('/User/student');
  firebase.auth().onAuthStateChanged(function(user) {
  tutorRef.once('value',function(snapshot){
    snapshot.forEach(function(childsnapShot){
      var key = childsnapShot.key;
    var childData = childsnapShot.val();
    if(user.uid == childData.uid){
      tutorRef.child(key).update({
        'available': false
      })
    }
  })
  })
  })
   firebase.auth().signOut()
    window.location = '/signin'
});

// to check whether the tutor exists or not
function tutorExist(){
  var tutorRef = firebase.database().ref('/User/student');
  firebase.auth().onAuthStateChanged(function(user) {
  tutorRef.once('value',function(snapshot){
    snapshot.forEach(function(childsnapShot){
      var key = childsnapShot.key;
    var childData = childsnapShot.val();
     if(childData.uid == user.uid && childData.isTutor == 'true' ){
       tutorRef.child(key).update({
         'available': true
       })
       const url = '/tutor/id';
       var tempArray = url.split("/");
       var baseURL = tempArray[1];
       var additionalURL = tempArray[2];
       additionalURL = user.uid;
       const finalURL = '/'+baseURL+'/'+additionalURL
      tutorPortal.setAttribute('href',finalURL);
      if(window.location.pathname == finalURL){
      tutorPortal.parentNode.classList.add('active');
      }
     }
    });
  });
})
}

window.addEventListener('load', function() {
  initApp()
});
