"use strict";

var userId, firstName, lastName, userPhoto, friends;
let cookieName = "vk_app_7096654";

let userCookie = checkCookie(cookieName);

function checkCookie(name) {
  let result = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  if (result)
    return true;
  else
    return false;
}

if (userCookie === false) {
  $('.btn-container').html('<a class="button">Авторизироваться через VK<a>');
  $('.button')[0].addEventListener('click', authorizeUser);
} else {
  authorizeUser();
}

function authorizeUser() {

  VK.init({
    apiId: 7096654
  });

  VK.Auth.login(response => {

    if (response.session) {
      firstName = response.session.user.first_name;
      lastName = response.session.user.last_name;
      userId = response.session.user.id;
    } else {
      $('.app-container').html('<p> Authorization failed... </p>');
    };


     VK.Api.call('users.get', {
      user_id: userId,
      fields: 'photo_100',
      v: '5.89'
    }, function(data){
        userPhoto = data.response[0].photo_100;
         $('.greeting').html('<div class="avatar"><img src="' + userPhoto + '"/></div><div class="greeting-text">Привет ' + firstName + ' ' + lastName + ' !</div>');
    });

    VK.Api.call('friends.get', {
      fields: 'photo_50',
      order: 'random',
      count: 5,
      v: '5.8'
    }, function(data) {

      friends = data.response.items.map(function(a) {
        return '<div class="friend">' + a.first_name + ' ' + a.last_name + '</div><div class="photo"><img src="' + a.photo_50 + '"></div>';
      });

      $('.friendlist-container').html(friends);
    });
  });
}