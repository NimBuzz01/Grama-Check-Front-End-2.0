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
    })


}

