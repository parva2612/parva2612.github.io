function login() {
  const id = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  const correctId = "chokopie";
  const correctPass = "betu";

  if (id === correctId && pass === correctPass) {
    sessionStorage.setItem("verified", "true");
    window.location.href = "2fa.html";
  } else {
    document.getElementById("error").innerText = "Access denied.";
  }
}

