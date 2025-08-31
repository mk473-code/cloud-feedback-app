document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const feedback = document.getElementById("feedback").value;

  const res = await fetch("/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, feedback })
  });

  const data = await res.json();
  document.getElementById("response").innerText = data.message;

  // Reset form
  document.getElementById("feedbackForm").reset();
});
