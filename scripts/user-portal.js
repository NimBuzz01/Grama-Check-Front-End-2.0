// Sweet Alerts
const preLoadAlert = () => {
  Swal.fire({
    title: "Submitting...",
    text: "Please wait",
    imageUrl:
      "https://www.epgdlaw.com/wp-content/uploads/2017/09/ajax-loader.gif",
    showConfirmButton: false,
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      reqTest();
    }
  });

  const reqTest = () => {
    Swal.close();
    Swal.fire("Request Submitted!");
  };
};

// captcha functions
// (function(){
//   const fonts = ["cursive", "sans-serif","serif","monospace"];
//   let captchaValue = "";
//   function generateCaptcha(){
//     let value = btoa(Math.random()*1000000000);
//     value = value.substr(0, 5+Math.random()*5);
//     captchaValue = value;
//   }

//   function setCaptcha() {
//     let html = captchaValue.split("").map((char)=> {
//       const rotate = -20 + Math.trunc(Math.random()*30);
//       const font = Math.trunc(Math.random()*fonts.length);
//       return `<span style="transform:rotate(${rotate}deg); font-family:${fonts[font]}; ">${char}</span>`;
//     }).join("");
//     document.querySelector(".captcha-preview").innerHTML = html;
//   }
//   function initCaptcha() {
//     document.querySelector(".captcha-refresh").addEventListener("click", function(){
//       generateCaptcha();
//       setCaptcha();
//     });
//     generateCaptcha();
//     setCaptcha();
//   }
//   initCaptcha();

//   document.querySelector("#submit-btn-f").addEventListener("click",function(){
//     let inputCaptchaValue = document.querySelector("#captcha-form").value;
//     if(inputCaptchaValue === captchaValue) {
//       Swal.fire("", "Logging In!!", "success");
//     } else {
//       Swal.fire("Invalid Captcha");
//     }
//   })
// })();
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
