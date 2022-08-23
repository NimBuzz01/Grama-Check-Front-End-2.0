const userURL = 'https://grama-app-backend-dot-choreo-asgardeo-project-dev.el.r.appspot.com/'
const token = sessionStorage.getItem("token");
function submit(){
    nic = document.getElementById("nicField").value;
    console.log(nic);
    axios.post(userURL+"Status-Check",{
        user_nic:nic
}
    
    ).then(response=>{
        console.log(response);
        changeStatus(response.data.status);
    })


}
function changeStatus(Status){
    var list = document.getElementById("status-bar");
    var listItems = list.getElementsByTagName("li");
    for( var i=0;i<listItems.length;i++){
        if(listItems[i].className=="step-wizard-item current-item"){
            listItems[i].className="step-wizard-item";
        }

    }
    id="status-"+Status;
    document.getElementById(id).className="step-wizard-item current-item";

}

