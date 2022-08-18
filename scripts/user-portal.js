const preLoadAlert = () => {
    Swal.fire({
      title: "Submitting...",
      text: "Please wait",
      imageUrl: "https://www.epgdlaw.com/wp-content/uploads/2017/09/ajax-loader.gif",
      showConfirmButton: true,
      allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
          reqTest();
        }
      })

   
const reqTest = () => {
    Swal.close();
    Swal.fire(
        'Request Submitted!'
      )}
}