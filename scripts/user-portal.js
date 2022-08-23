// Sweet Alerts
// const preLoadAlert = () => {
//   Swal.fire({
//     title: "Submitting...",
//     text: "Please wait",
//     imageUrl:
//       "https://www.epgdlaw.com/wp-content/uploads/2017/09/ajax-loader.gif",
//     showConfirmButton: false,
//     allowOutsideClick: false,
//   }).then((result) => {
//     if (result.isConfirmed) {
//       reqTest();
//     }
//   });

//   const reqTest = () => {
//     Swal.close();
//     Swal.fire("Request Submitted!");
//   };
// };

// captcha code
var code;
function createCaptcha() {
  //clear the contents of captcha div first 
  document.getElementById('captcha').innerHTML = "";
  var charsArray =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
  var lengthOtp = 6;
  var captcha = [];
  for (var i = 0; i < lengthOtp; i++) {
    //below code will not allow Repetition of Characters
    var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
    if (captcha.indexOf(charsArray[index]) == -1)
      captcha.push(charsArray[index]);
    else i--;
  }
  var canv = document.createElement("canvas");
  canv.id = "captcha";
  canv.width = 100;
  canv.height = 50;
  var ctx = canv.getContext("2d");
  ctx.font = "25px Georgia";
  ctx.strokeText(captcha.join(""), 0, 30);
  //storing captcha so that can validate you can save it somewhere else according to your specific requirements
  code = captcha.join("");
  document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
}
function validateCaptcha() {
  event.preventDefault();
  debugger
  if (document.getElementById("captcha-form").value == code) {
    Swal.fire("", "Valid Captcha!!", "success");
    } else {
      Swal.fire("Invalid Captcha");
      createCaptcha();
    }
}

function getBasicUserInfo() {
  userAuth.getBasicUserInfo().then((userinfoResponse) => {
      console.log(userinfoResponse); // check userinfo response
      // check email

  }).catch((error) => {
      console.error(error);
  });
}


var userAuth = AsgardeoAuth.AsgardeoSPAClient.getInstance();

userAuth.initialize({
    signInRedirectURL: "https://nimbuzz01.github.io/Grama-Check-Front-End-2.0/user-portal.html",
    signOutRedirectURL: "https://nimbuzz01.github.io/Grama-Check-Front-End-2.0/index.html",
    clientID: "5ynhFBWAfqYznFHVf0J5mYAxexAa",
    baseUrl: "https://api.asgardeo.io/t/sample404",
    scope: [ "openid","profile" ]
});

userAuth.signIn({ callOnlyOnRedirect: true }).then(Response => {
  userAuth.getAccessToken().then(response => {
      console.log(response);
      getBasicUserInfo();
      userAuth.getAccessToken().then(token=>{
        sessionStorage.setItem("token",token);
      })
  })
}).catch(error=>{
  userAuth.trySignInSilently();
})
