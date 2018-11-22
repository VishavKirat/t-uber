
var continue1 = document.querySelector('button[name="continue1"]')
var continue2 = document.querySelector('button[name="continue2"]')
var previous1 = document.querySelector('button[name="previous-1"]')
var previous2 = document.querySelector('button[name="previous-2"]')
var required1 = document.querySelector('input[name="phoneNumber"]')
var required2 = document.querySelector('textarea[name="bio"]')
var sex = document.querySelector('select[name="sex"]')
var subject = document.querySelector('input[name="subject"]')
var rate = document.querySelector('input[name="rate"]')
var submit = document.querySelector('.submit')
continue1.addEventListener('click',function(e){
  this.parentNode.setAttribute('style',"display:none;overflow:hidden");
  document.querySelector('label[for="two"]').setAttribute('style',"display:block;overflow:hidden");
});
continue2.addEventListener('click',function(e){
  this.parentNode.setAttribute('style',"display:none;overflow:hidden");
  document.querySelector('label[for="three"]').setAttribute('style',"display:block;overflow:hidden");
});
previous1.addEventListener('click',function(e){
  this.parentNode.setAttribute('style',"display:none;overflow:hidden");
  document.querySelector('label[for="one"]').setAttribute('style',"display:block;overflow:hidden");
});
previous2.addEventListener('click',function(e){
  this.parentNode.setAttribute('style',"display:none;overflow:hidden");
  document.querySelector('label[for="two"]').setAttribute('style',"display:block;overflow:hidden");
});


// to add new tutor
function addTutor(){
  var tutorRef = firebase.database().ref('/User/student');
  var user = firebase.auth().currentUser
tutorRef.once('value',function(snapshot){
  snapshot.forEach(function(childsnapShot){
         var key = childsnapShot.key;
         var childData = childsnapShot.val();
         if(childData.uid == user.uid)
         {
           tutorRef.child(key).update({
                     // 'email' : user.email,
                     // 'uid' : user.uid,
                     'sex': sex.options[sex.selectedIndex].value,
                     'phoneNumber' : required1.value,
                     'bio' : required2.value,
                     'subject' : subject.value,
                     'rate' : rate.value,
                     'isTutor': "true"
                   })
                 }
               })
             })
             window.location = '/tutor'
       }
