document.getElementById("shorten").addEventListener("click", async () => {
  const url = document.getElementById("url").value;
  if (!url) return;

  try {
    const res = await fetch("https://autoshortener-production.up.railway.app/autoShortener", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });
    const data = await res.json();
    alert("Short URL: " + data.short);

    // Optional: copy to clipboard
    navigator.clipboard.writeText(data.short);
  } catch (err) {
    alert("Error: " + err);
  }
});