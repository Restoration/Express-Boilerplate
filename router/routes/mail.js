const express = require('express');
const router = express.Router();
const { send } = require("../utils/mail");
const { checkName, checkEmail, checkMessage } = require('../utils/validation');
const { isEmpty } = require('../utils/utility');

/* GET home page. */
router.post('/send', async (req, res) => {
  /*
  let isName = checkName(req.body.name);
  let isEmail = checkEmail(req.body.email);
  let isMessage = checkMessage(req.body.message);
  */
  let isName = checkName('hogehoge');
  let isEmail = checkEmail('example@aaa.aaa');
  let isMessage = checkMessage('foo');

  if(!isEmpty(isName)){
    return res.json(isName);
  }
  if(!isEmpty(isEmail)){
    return res.json(isEmail);
  }
  if(!isEmpty(isMessage)){
    return res.json(isMessage);
  }

  send(req.body).catch(console.error);
  return res.json({
    'message': 'Sucess to send a message',
  });
});

module.exports = router;
