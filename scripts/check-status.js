// const userURL = 'https://grama-app-backend-dot-choreo-asgardeo-project-prod.el.r.appspot.com/'
userURL = 'https://production-50qdi0pj.wl.gateway.dev/';
const token = sessionStorage.getItem("token");
function submit(){
    nic = document.getElementById("nicField").value;
    
    axios.post(userURL+"Status-Check",{
        user_nic:nic
},{
    headers:{
        'auth': `Bearer ${token}`
    }
}
    
    ).then(response=>{
        
        changeStatus(response.data.status);
    }).catch(error=>{
        Swal.fire("Invalid NIC!");
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

