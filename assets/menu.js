
window.addEventListener('load',function(){
        profilePicButton();
        let path = window.location.pathname;
         path = decodeURIComponent(path);
         var target = document.querySelector('.menu a[href = "'+path+'"]');
         console.log(target);
         if(target.parentNode){
         target.parentNode.classList.add('active');
       }
  });


var profilePicButton = function(){
  var profilePhotoButton = document.querySelector('.profilePic');
  profilePhotoButton.addEventListener('click',function(){
    console.log('clicked');
    document.querySelector('.menu li.profile-details').classList.toggle('show');
  });
}
