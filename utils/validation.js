function checkName(val){
  let res = {};
  if(val == ''){
    res = {'message': 'Please enter your name'};
  }
  return res;
}

function checkEmail(val){
  let res = {};
  if(val == ''){
    res = {'message': 'Please enter your name'};
  }
  if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)){
    res = {'message': 'Email address format is invalid'};
  }
  return res;
}
function checkMessage(val){
  let res = {};
  if(val == ''){
    res = {'message': 'Please enter message'};
  }
  return res;
}
module.exports = {checkName, checkEmail, checkMessage}
