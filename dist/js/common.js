var localUserStatus = "изменить статус";
var inputStatus = userstatusform.querySelector('[name="status"]');
var elemInfoStatus = document.querySelector(".info-status");

// Show/Hide User Menu ----------------------------------------------------
showmenu.addEventListener( "click" , function() {
  document.querySelector(".user").classList.toggle("open-menu");
});

// Set User Status---------------------------------------------------------
if(localStorage.userstatus) {
  localUserStatus = localStorage.userstatus;
}
userstatus.innerText = inputStatus.value = localUserStatus;

// Change User Status-------------------------------------------------------
userstatus.addEventListener( "click" , function() {
  elemInfoStatus.classList.toggle("open-form");
});
userstatusform.addEventListener( "submit" , function(e) {
  e.preventDefault();
  localStorage.userstatus = userstatus.innerText = inputStatus.value;
  elemInfoStatus.classList.remove("open-form");
});

// Load Comments------------------------------------------------------------
axios.get('php/ajax.php')
  .then(function (response) {
    document.querySelector(".comments-list").innerHTML = response.data;
  })
  .catch(function (error) {
    console.log(error);
  })

// Add Comment-------------------------------------------------------------
commentform.addEventListener( "submit" , function(e) {
  e.preventDefault();
  var params = new URLSearchParams();
  var inputName = commentform.querySelector("[name='name']");
  var inputMsg = commentform.querySelector("[name='message']");
  params.append('name', inputName.value);
  params.append('message', inputMsg.value);
  params.append('avatar', 'img/logan.png');
  params.append('action', 'addComment');
  axios.post('php/ajax.php', params).then(function(response) {
      document.querySelector(".comments-list").innerHTML = response.data;
      commentform.reset();
  });
});

// Delete Comment------------------------------------------------------------
function deleteComment(id) {
  var params = new URLSearchParams();
  params.append('comment', id);
  params.append('action', 'deleteComment');
  axios.post('php/ajax.php', params).then(function(response) {
      document.querySelector(".comments-list").innerHTML = response.data;
  });
}
