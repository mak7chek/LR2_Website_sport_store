function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function checkAdminAuth() {
  if (!getCookie("admin")) {
    window.location.href = "adminInput.html";
  }
}

document.addEventListener("DOMContentLoaded", checkAdminAuth);
