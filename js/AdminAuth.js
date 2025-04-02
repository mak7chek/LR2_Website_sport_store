document.getElementById("admin-login-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Зупиняємо стандартне надсилання форми

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "1111";

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    document.cookie = "admin=true; path=/; max-age=" + 60 * 60;
    window.location.href = "admin.html";
  } else {
    document.getElementById("error-message").innerText = "Невірний логін або пароль!";
  }
});
