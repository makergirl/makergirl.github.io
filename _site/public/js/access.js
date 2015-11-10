function accessCodePermission() {
  var testV = 1;
  var pass1 = prompt('Please Enter Your Password', ' ');
  while (testV < 3) {
    if (!pass1)
      history.go(-1);
    if (pass1.toLowerCase() == "3dprinting") {
      document.getElementById("survey").style.display = 'inline-block';
      break;
    }
    testV += 1;
    var pass1 =
      prompt('Access Denied - Password Incorrect, Please Try Again.', 'Please Enter Your Password');
  }
  if (pass1.toLowerCase() != "password" & testV == 3)
    history.go(-1);
  return " ";
}

accessCodePermission();
