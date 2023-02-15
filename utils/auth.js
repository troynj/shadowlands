const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/auth');
  } else {
    // If the user is logged in, execute the next route function
    // We call next() if the user is authenticated
    next();
  }
};


// const areAuth = (req, res, next) => {
//   // If the user is not logged in, redirect the user to the login page
//   // This is directly from the `/gallery/:id` and `/painting/:id` routes
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   } else {
//     // If the user is logged in, execute the next route function
//     // We call next() if the user is authenticated
//     next();
//   }
// };


module.exports = withAuth;
