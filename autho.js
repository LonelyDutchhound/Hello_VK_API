$('a.button')[0].addEventListener('click',  authorizeUser);
let firstName, lastName, userId, friends;

function authorizeUser() {
VK.init({
    apiId: *******
});
VK.Auth.login(response => {

    if (response.session) {
        firstName = response.session.user.first_name;
        lastName = response.session.user.last_name;
        userId = response.session.user.id;
           $('.container').html('<h1>Привет '+ firstName +' ' + lastName + ' !<h1>');

        VK.Api.call('friends.get', { fields: 'photo_rec', order: 'random', count:5 , v:'5.8'}, function(data){
            $('.friendlist').html('<p>Твои друзья:</p><ul></ul>')

              friends = data.response.items.map(function (a){
                return '<li>' + a.first_name+' '+a.last_name + '</li>';
              });

              $('ul').html(friends);
        });

    } else {
      $('#container').html('<p> Authorization failed... </p>');
    }
  });
}
