const tutorIMG = document.querySelector('.tutor-imgage img')
const tutorName = document.querySelector('.name')
const tutorAge = document.querySelector('.age')
const tutorBio = document.querySelector('.bio')
const tutorSex = document.querySelector('.sex')
const tutorRate = document.querySelector('.rate')
const tutorExpertise = document.querySelector('.expertise')
const tutorEmail = document.querySelector('.Email')
const tutorPhoneNumber = document.querySelector('.tutorphoneNumber')

var url = window.location.href;
console.log(url);
var tempArray = url.split("/");
var id = tempArray[4];
console.log(id)


var findUserById = function(id){
  const database = firebase.database().ref('/User/student');
  database.once('value',function(snapshot){
    snapshot.forEach(function(childsnapShot){
    var childData = childsnapShot.val();
    if(id == childData.uid){
    tutorIMG.setAttribute('src',childData.photoURL);
    tutorName.textContent = `Name: ${childData.displayName}`;
    tutorRate.textContent = `Rate: ${childData.rate}`;
    tutorEmail.textContent = `E-mail: ${childData.email}`;
    tutorAge.textContent = `Age: ${(childData.age).toString()}`;
    tutorExpertise.textContent = `Expertise: ${childData.subject}`;
    tutorPhoneNumber.textContent = `Phone: ${childData.phoneNumber}`;
    tutorSex.textContent = `Phone: ${childData.sex}`;
    tutorBio.textContent = `Bio: ${childData.bio}`;

    }
  })
  })
}
findUserById(id);
