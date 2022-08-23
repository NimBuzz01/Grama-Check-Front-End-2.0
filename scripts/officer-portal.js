/* Downloading Images Script */
gramaURL = "https://grama-app-backend-dot-choreo-asgardeo-project-dev.el.r.appspot.com/";
document.querySelectorAll(".proof-image img").forEach((image) => {
  image.onclick = () => {
    document.querySelector(".popup-img").style.display = "block";
    document.querySelector(".popup-img img").src = image.getAttribute("src");
  };
});

document.querySelector(".popup-img span").onclick = () => {
  document.querySelector(".popup-img").style.display = "none";
};

function saveImage() {
  let imagePath = document.querySelector(".popup-img img").src;
  /*let fileName = getFileName(imagePath);*/
  saveAs(imagePath, "image.jpg");
}

/*function getFileName(str) {
        return str.substring(str.lastIndexOf('/') + 1)
    }*/



var adminAuth = AsgardeoAuth.AsgardeoSPAClient.getInstance();
    adminAuth.initialize({
        signInRedirectURL: "https://nimbuzz01.github.io/Grama-Check-Front-End-2.0/officer-portal.html",
        signOutRedirectURL: "https://nimbuzz01.github.io/Grama-Check-Front-End-2.0/index.html",
        clientID: "RMhFnIyA4u21SQrYA1mGaGNUAo8a",
        baseUrl: "https://api.asgardeo.io/t/sample404",
        scope: ["openid", "profile"]
    });





    adminAuth.signIn({ callOnlyOnRedirect: true }).then(Response => {
        adminAuth.getAccessToken().then(response => {
            console.log(response);
            
        }).catch(error=>{
            adminAuth.trySignInSilently();
        })

    });


 function logOut() {
      adminAuth.signOut().then(response => {
            if (response.message = "The user must be authenticated first.") {
                alert("Session expired, Sign in again");
                window.location.href = "index.html";


            }
        })

    }
function createRecords(){
  adminAuth.getBasicUserInfo().then((userinfoResponse) => {
    console.log(userinfoResponse); // check userinfo response
    var gramaId= userinfoResponse.gramaIdentification;
    axios.post(gramaURL+"Fetch-Pending-Requests",{
      officer_id:gramaId
    }).then(response=>{
      console.log(response);
    })




}).catch((error) => {
    console.error(error);
});


}
createRecords();

   

