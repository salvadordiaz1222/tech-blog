document.querySelector(".login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = {
    email: document.getElementById("emailIdInput").value,
    password: document.getElementById("passwordIdInput").value,
  };
  console.log("THIS IS THE SUER", user);
  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "Application/json" },
  });
  if (response.ok) {
    document.location.replace("/articles");
  } else {
    alert("Wrong credentials");
  }
});
