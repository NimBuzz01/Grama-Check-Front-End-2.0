function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

document.getElementById("submitBtn").addEventListener("click", () => {
  let postid1 = uuidv4();
  let postid2 = uuidv4();
  let postid3 = uuidv4();

  let inputElem1 = document.getElementById("imgfile1");
  let file1 = inputElem1.files[0];

  let inputElem2 = document.getElementById("imgfile2");
  let file2 = inputElem2.files[0];

  let inputElem3 = document.getElementById("imgfile3");
  let file3 = inputElem3.files[0];

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

  axios
    .post(
      "https://grama-app-gateway-28whvhuc.wl.gateway.dev/Image-Upload",
      formData1
    )
    .then((response) => {
      console.log("done");
    })
    .catch((error) => console.error(error));
});
