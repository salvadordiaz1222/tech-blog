document.querySelector(".signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = {
    name: document.getElementById("nameId").value,
    email: document.getElementById("emailId").value,
    password: document.getElementById("passwordId").value,
  };
  const response = await fetch("/api/signup", {
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
