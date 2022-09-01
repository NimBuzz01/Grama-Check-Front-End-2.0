userURL = "https://production-grama-app-88dwvjly.wl.gateway.dev/";
// userURL = "https://grama-app-backend-dot-choreo-asgardeo-intern-project.de.r.appspot.com/";
const token = sessionStorage.getItem("token");
function submit() {
  nic = document.getElementById("nicField").value;

  axios
    .post(
      userURL + "Status-Check",
      {
        user_nic: nic,
      },
      {
        headers: {
          auth: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      changeStatus(response.data.status);
    })
    .catch((error) => {
      Swal.fire({
        title: "Invalid NIC!",
        icon: "error",
        confirmButtonColor: "#ff7300",
        confirmButtonText: "OK",
      });
    });
}
function changeStatus(Status) {
  var list = document.getElementById("status-bar");
  var listItems = list.getElementsByTagName("li");
  for (var i = 0; i < listItems.length; i++) {
    if (listItems[i].className == "step-wizard-item current-item") {
      listItems[i].className = "step-wizard-item";
    }
  }
  id = "status-" + Status;
  if(Status!=="4"){
    document.getElementById(id).className = "step-wizard-item current-item";

  }

  
}
