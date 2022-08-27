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
            Swal.fire({
              text: "Please wait",
              imageUrl:
                "https://www.epgdlaw.com/wp-content/uploads/2017/09/ajax-loader.gif",
              showConfirmButton: false,
              allowOutsideClick: false,
            })
            createRecords(response);
            
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
function createRecords(token){

  adminAuth.getBasicUserInfo().then((userinfoResponse) => {
    console.log(userinfoResponse); // check userinfo response
    var gramaId= userinfoResponse.gramaIdentification;
    axios.post(gramaURL+"Fetch-Pending-Requests",{
      officer_id:gramaId
    },{
      headers:{
        'auth': `Bearer ${token}`
      }
    }).then(response=>{
      console.log(response);
      var userData = response.data.filterd_certificate_data;
      createRequests(userData,token,gramaId);




    })




}).catch((error) => {
    console.error(error);
});


}
function createRequests(arr,token,gramaId){
  
  body = document.getElementById("requestTable");
  for(var i=0;i<arr.length;i++){
    var content =  document.createElement("tr");

    var name = document.createElement("th");
    name.appendChild(document.createTextNode(arr[i].user_full_name));
    var nic = document.createElement("th");
    nic.appendChild(document.createTextNode(arr[i].user_nic));
    var address = document.createElement("th");
    address.appendChild(document.createTextNode(arr[i].user_provided_address));
    var mobile = document.createElement("th");
    mobile.appendChild(document.createTextNode(arr[i].user_phone_number));
    content.appendChild(name);
    content.appendChild(nic);
    content.appendChild(address);
    content.appendChild(mobile);
    content.id=arr[i].user_nic;
    content.onclick= function(){
      
      idNumber=this.id;
      axios.post(gramaURL+"Fetch-Certificate-Details",{
        user_nic:idNumber,
        officer_id:gramaId
      },{
        headers:{
          'auth': `Bearer ${token}`
        }
        
      }).then(response=>{
        userData = response.data.certificate_data;
        //User Data
        document.getElementById("name").innerHTML=userData.user_full_name;
        document.getElementById("nic").innerHTML = userData.user_nic;
        document.getElementById("date").innerHTML = userData.application_date;
        document.getElementById("phone").innerHTML = userData.user_phone_number;
        document.getElementById("gramaId").innerHTML = userData.officer_id;
        document.getElementById("status").innerHTML = response.data.status;
        document.getElementById("division").innerHTML = userData.user_district;
        document.getElementById("secDivision").innerHTML = userData.user_sec_division;
        document.getElementById("user_nic_front").src=userData.user_nic_front_image;
        document.getElementById("user_nic_back").src=userData.user_nic_back_image;
        document.getElementById("user_address").src=userData.user_address_proof_image;
        
        //Police data
        var policeData = response.data.certificate_data.police_data;


        document.getElementById("caseNumber").innerHTML = policeData.report_number;
        document.getElementById("severity").innerHTML = policeData.suspect_severity;
       
        document.getElementById("officer").innerHTML = policeData.police_officer_id;
        document.getElementById("summary").innerHTML = policeData.criminal_history;
        $('#info-modal').modal('toggle');
        document.getElementById("markAsDone").onclick=function(){
          sendRequest(idNumber,gramaId,token);
        }
      })


    }
    body.appendChild(content);
    Swal.close();

  }

}

function sendRequest(idNumber,gramaId,token){

  axios.put(gramaURL+"Update-Certificate-Status",{
    user_nic:idNumber,
    officer_id:gramaId
  },{
    headers:{
      'auth': `Bearer ${token}`
    }

  }).then(response=>{
    var id = document.getElementById(idNumber);
    document.getElementById("requestTable").removeChild(id);
    $('#info-modal').modal('toggle');
    
  })

}


   

