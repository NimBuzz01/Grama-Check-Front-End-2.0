gramaURL = "https://production-grama-app-88dwvjly.wl.gateway.dev/";
// gramaURL = "https://grama-app-backend-dot-choreo-asgardeo-intern-project.de.r.appspot.com/";

// Sweet Alerts
const preLoadAlert = () => {
  Swal.fire({
    title: "Submitting...",
    text: "Please wait",
    imageUrl:
      "https://www.epgdlaw.com/wp-content/uploads/2017/09/ajax-loader.gif",
    showConfirmButton: false,
    allowOutsideClick: false,
  });
};
const reqTest = () => {
  Swal.close();
  Swal.fire({
    title: "Request Submitted!",
    icon: "success",
    confirmButtonColor: "#ff7300",
    confirmButtonText: "OK",
  });
};

// captcha code

var code;
function createCaptcha() {
  //clear the contents of captcha div first
  document.getElementById("captcha").innerHTML = "";
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
function getBasicUserInfo() {
  userAuth
    .getBasicUserInfo()
    .then((userinfoResponse) => {
      // check userinfo response
      // check email
    })
    .catch((error) => {
      console.error(error);
    });
}

var userAuth = AsgardeoAuth.AsgardeoSPAClient.getInstance();

userAuth.initialize({
  signInRedirectURL:
    "https://nimbuzz01.github.io/Grama-Check-Front-End-2.0/user-portal.html",
  signOutRedirectURL:
    "https://nimbuzz01.github.io/Grama-Check-Front-End-2.0/index.html",
  clientID: "5ynhFBWAfqYznFHVf0J5mYAxexAa",
  baseUrl: "https://api.asgardeo.io/t/sample404",
  scope: ["openid", "profile"],
});

userAuth
  .signIn({ callOnlyOnRedirect: true })
  .then((Response) => {
    userAuth.getAccessToken().then((response) => {
      getBasicUserInfo();
      userAuth.getAccessToken().then((token) => {
        sessionStorage.setItem("token", token);
      });
    });
  })
  .catch((error) => {
    userAuth.trySignInSilently();
  });

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function validation(nic) {
  var result = false;
  if (
    nic.length === 10 &&
    !isNaN(nic.substr(0, 9)) &&
    isNaN(nic.substr(9, 1).toLowerCase()) &&
    ["x", "v"].includes(nic.substr(9, 1).toLowerCase())
  ) {
    result = true;
  } else if (nic.length === 12 && !isNaN(nic)) {
    result = true;
  } else {
    result = false;
  }
  return result;
}
function validate() {
  if (document.getElementById("captcha-form").value == code) {
    preLoadAlert();
    const idNumber = document.getElementById("idNumber").value;
    const address = document.getElementById("address").value;
    const token = sessionStorage.getItem("token");
    if (!validation(idNumber)) {
      Swal.close();
      Swal.fire({
        title: "Invalid NIC!",
        icon: "error",
        confirmButtonColor: "#ff7300",
        confirmButtonText: "OK",
      });
      return;
    }

    let postid1 = uuidv4();
    let postid2 = uuidv4();
    let postid3 = uuidv4();

    let inputElem1 = document.getElementById("imagefile1");
    let file1 = inputElem1.files[0];

    let inputElem2 = document.getElementById("imagefile2");
    let file2 = inputElem2.files[0];

    let inputElem3 = document.getElementById("imagefile3");
    let file3 = inputElem3.files[0];

    if(file1===undefined||file2===undefined||file3===undefined||idNumber==""||address==""){
      Swal.close();
      Swal.fire({
        title: "Please fill relevant fields!",
        icon: "error",
        confirmButtonColor: "#ff7300",
        confirmButtonText: "OK",
      });
      return;
    }


    let blob1 = file1.slice(0, file1.size, "image/jpeg");
    newFile1 = new File([blob1], `${postid1}.jpeg`, { type: "image/jpeg" });

    let blob2 = file2.slice(0, file2.size, "image/jpeg");
    newFile2 = new File([blob2], `${postid2}.jpeg`, { type: "image/jpeg" });

    let blob3 = file3.slice(0, file3.size, "image/jpeg");
    newFile3 = new File([blob3], `${postid3}.jpeg`, { type: "image/jpeg" });

    let formData1 = new FormData();
    formData1.append("imgfile", newFile1);
    formData1.append("imgfile", newFile2);
    formData1.append("imgfile", newFile3);

    event.preventDefault();
    if (document.getElementById("captcha-form").value == code) {
      axios
        .post(
          gramaURL + "Identity-Check",
          {
            user_nic: idNumber,
          },
          {
            headers: {
              auth: `Bearer ${token}`,
            },
          }
        )
        .then((idResponse) => {
          axios
            .post(
              gramaURL + "Image-Upload",
              formData1,
              // user_nic:idNumber
              {
                headers: {
                  auth: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              axios
                .post(
                  gramaURL + "Address-Check",
                  {
                    user_provided_address: address,
                    user_nic: idNumber,
                    user_nic_front_image: postid1,
                    user_nic_back_image: postid2,
                    user_address_proof_image: postid3,
                  },
                  {
                    headers: {
                      auth: `Bearer ${token}`,
                    },
                  }
                )
                .then((response) => {
                  axios
                    .post(
                      gramaURL + "Police-Check",
                      {
                        user_nic: idNumber,
                      },
                      {
                        headers: {
                          auth: `Bearer ${token}`,
                        },
                      }
                    )
                    .then((finalResponse) => {
                      
                      Swal.close();
                      Swal.fire({
                        title: "Request Submitted!",
                        icon: "success",
                        confirmButtonColor: "#ff7300",
                        confirmButtonText: "OK",
                      });
                    });
                })
                .catch((error) => {
                  console.log(error);
                  Swal.close;
                  Swal.fire({
                    title: "Image-upload Failed!",
                    icon: "error",
                    confirmButtonColor: "#ff7300",
                    confirmButtonText: "OK",
                  });
                });
            })
            .catch((error) => {
              console.log(error);
              Swal.close;
              Swal.fire({
                title: "Address Check Failed!",
                icon: "error",
                confirmButtonColor: "#ff7300",
                confirmButtonText: "OK",
              });
            });
        })
        .catch((error) => {
          console.log(error);
          Swal.close;
          Swal.fire({
            title: "Invalid NIC!",
            icon: "error",
            confirmButtonColor: "#ff7300",
            confirmButtonText: "OK",
          });
        });
    } else {
      Swal.fire({
        title: "Invalid Captcha!",
        icon: "error",
        confirmButtonColor: "#ff7300",
        confirmButtonText: "OK",
      });
      createCaptcha();
    }
  }
}
