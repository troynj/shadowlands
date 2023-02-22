const router = require('express').Router();

router.get('/SignIn', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signIn');
});

router.get('/SignUp', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signUp');
});

router.get('/SignOut', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.render('signIn')
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;