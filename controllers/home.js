
var userDatabase = firebase.database().ref('/User/student');
const socket = io.connect('http://localhost:4000/home');
// to display on the home page only

firebase.auth().onAuthStateChanged(function(user) {
userDatabase.on('value',function(snapshot){
      snapshot.forEach(function(childsnapShot){
        const availableTutors = document.querySelector('.tutor-brief')
        const tutorFrame = document.createElement('div');
        const tutorBriefInfo = document.createElement('div');
        const tutorOnline = document.createElement('div');
        const photo = document.createElement('IMG');
        const name = document.createElement('p');
        const sub = document.createElement('p');
        const tutorImg = document.createElement('div');
        var displayName = childsnapShot.child("displayName").val();
        var photoURL = childsnapShot.child("photoURL").val();
        var subject = childsnapShot.child("subject").val();
        if(childsnapShot.val().available == true && childsnapShot.val().uid != user.uid ){
          availableTutors.appendChild(tutorFrame);
          tutorFrame.appendChild(tutorImg);
          tutorFrame.appendChild(tutorBriefInfo);
          tutorBriefInfo.appendChild(name);
          tutorBriefInfo.appendChild(sub);
          tutorBriefInfo.appendChild(tutorOnline);
          tutorOnline.classList.add('tutor-online');
          tutorImg.classList.add('tutor-img');
          tutorFrame.classList.add('topic-frame');
          tutorBriefInfo.classList.add('tutor-brief-info');
          photo.setAttribute('src',photoURL);
          tutorImg.appendChild(photo);
          sub.textContent = "Subject: "+subject;
          name.textContent = displayName;
          tutorFrame.addEventListener('click',function(){
            id = childsnapShot.val().uid;
            window.location = '/tutor/'+id;
          })
        }

      })
  })
  })
