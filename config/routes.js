'use strict';
module.exports = (app, passport) => {
  //User Routes
  const users = require('../app/controllers/users');
  const jwtAuth = require('../app/controllers/auth');
  const game = require('../app/controllers/games');

  app.get('/signin', users.signin);
  app.get('/signup', users.signup);
  app.get('/chooseavatars', users.checkAvatar);
  app.get('/signout', users.signout);

  //Setting up the users api
  app.post('/users', users.create);
  app.post('/users/avatars', users.avatars);

  // Donation Routes
  app.post('/donations', users.addDonation);

  app.post('/users/session', passport.authenticate('local', {
    failureRedirect: '/signin',
    failureFlash: 'Invalid email or password.'
  }), users.session);

  app.get('/users/me', users.me);
  app.get('/users/:userId', users.show);

  //Setting the facebook oauth routes
  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email'],
    failureRedirect: '/signin'
  }), users.signin);

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/signin'
  }), users.authCallback);

  //Setting the github oauth routes
  app.get('/auth/github', passport.authenticate('github', {
    failureRedirect: '/signin'
  }), users.signin);

  app.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/signin'
  }), users.authCallback);

  //Setting the twitter oauth routes
  app.get('/auth/twitter', passport.authenticate('twitter', {
    failureRedirect: '/signin'
  }), users.signin);

  app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: '/signin'
  }), users.authCallback);

  //Setting the google oauth routes
  app.get('/auth/google', passport.authenticate('google', {
    failureRedirect: '/signin',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  }), users.signin);

  app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/signin'
  }), users.authCallback);

  //Finish with setting up the userId param
  app.param('userId', users.user);

  // Answer Routes: Needs JWT Tokens
  const answers = require('../app/controllers/answers');
  app.get('/answers', answers.all);
  app.get('/answers/:answerId', answers.show);

  // Finish with setting up the answerId param
  app.param('answerId', answers.answer);

  // Question Routes
  const questions = require('../app/controllers/questions');
  app.get('/questions', questions.all);
  app.get('/questions/:questionId', questions.show);

  // Finish with setting up the questionId param
  app.param('questionId', questions.question);

  // Avatar Routes
  const index = require('../app/controllers/index');
  const avatars = require('../app/controllers/avatars');
  app.get('/avatars', avatars.allJSON);

  //Home route
  app.get('/play', index.play);
  app.get('/', index.render);

  //JWT Token (Signup and Login)
  app.post('/api/auth/signup', jwtAuth.signUp);
  app.post('/api/auth/login', jwtAuth.login);

  // Search route
  const search = require('../app/controllers/searchUser');
  app.get('/api/search/users/:email', search);

  // Send invite route
  const sendInvite = require('../app/controllers/send-invite');
  app.post('/api/send/user-invite', sendInvite);

  //Game Routes
  app.get('/api/games/:id', game.getGameRecords);
  app.post('/api/games/:id/start', game.saveRecords);
  app.post('/api/games/:id/end', game.updateRecords);
};
