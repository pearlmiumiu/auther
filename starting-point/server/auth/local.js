const router = require('express').Router();
const { Story, User } = require('../db/models');
router.put('/login', function (req, res, next) {
  const { email, password } = req.body
  console.log('BODY ', req.body)
  User.findOne({
    where: { email, password }
  })
  .then(function (user) {
    if (!user) throw HttpError(404);
    else {
      // req.session.userId = user.id; // old code
      req.login(user, function(err) {
        if (err) { return next(err); }
        res.end(); // 200 is the default status!
      });
    }
  })
  .catch(next);
});
router.post('/signup', function(req, res, next) {
  const { email, password } = req.body

    User.create({
      email,
      password
    })
    .then(function (user) {
      req.login(user, function(err) {
        if (err) { return next(err); }
        res.status(201).send(user); // 201 created makes a lot of sense as a status here!
      })
    })
    .catch(next);
})
router.delete('/logout', function (req, res, next) {
  // req.session.destroy(); // destroys entire session
  // /* Below are alternatives to the above
  // delete req.session.userId; // deletes one item on session
  // req.session.userId = null;
  // */
  // console.log('sesss', req.session )
  req.logout();
  console.log("get the fuck out!")
  res.sendStatus(204);
});
module.exports = router;
