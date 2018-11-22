

// get current user data
const photo = document.querySelector('.userProfileIMG img')
const name = document.querySelector('.userProfileName')
const uid = document.querySelector('.userid')
const nameValue = document.querySelector('input[name="userProfileName"]');
const phoneValue = document.querySelector('input[name="phoneNumber"]');
const ageValue = document.querySelector('input[name="age"]');
const eduValue = document.querySelector('input[name="education"]');
var studentRef = firebase.database().ref('/User/student');
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var phoneNumber = user.phoneNumber;
    photo.setAttribute('src',photoURL);
    name.textContent = user.displayName.toUpperCase();
    uid.textContent = `uid : ${user.uid}`;
    nameValue.value = user.displayName.toUpperCase();
    phoneValue.value = user.phoneNumber;

    }});

var saveButton = document.querySelector('.save');
saveButton.addEventListener("click",function(e){
  e.preventDefault();
  studentRef.once('value',function(snapshot){
    snapshot.forEach(function(childsnapShot){
      var key = childsnapShot.key;
      var childData = childsnapShot.val();
      var user = firebase.auth().currentUser;
      console.log(user);
      if(childData.uid == user.uid)
      {
        studentRef.child(key).update({
          "displayName" : nameValue.value,
          // 'age' : ageValue.value,
          'phoneNumber' : phoneValue.value,
          'education' : eduValue.value
        });
        window.alert('Successfully Updated');
      }

    })
  })
});

const deleteButton = document.querySelector('.delete');
deleteButton.addEventListener('click',(e)=>{

});

const tabs = document.querySelector('#tabbed-content ul');
tabs.addEventListener('click', e =>{
  const pannel = document.querySelectorAll('.pannel');
  if(e.target.tagName == 'LI'){
    const clicked = document.querySelector(e.target.dataset.target);
    console.log(e.target.dataset);
    pannel.forEach(function(pannel){
      if(pannel == clicked){
        pannel.classList.add('active');
      }
      else{
        pannel.classList.remove('active');
      }
    });
  }
});
