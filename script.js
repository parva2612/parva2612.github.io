function login() {
  const id = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  const correctId = "chokopie";
  const correctPass = "betu";

  const idLower = id.toLowerCase();
  const passLower = pass.toLowerCase();

  // console.log(idLower, passLower);
  // console.log();

  if (idLower.startsWith("chokopie") && passLower.startsWith("betu")) {
    sessionStorage.setItem("verified", "true");
    window.location.href = "2fa.html";
  } else {
    document.getElementById("error").innerText = "Access denied.";
  }


  // if (id === correctId && pass === correctPass) {
  //   sessionStorage.setItem("verified", "true");
  //   window.location.href = "2fa.html";
  // } else {
  //   document.getElementById("error").innerText = "Access denied.";
  // }
}

