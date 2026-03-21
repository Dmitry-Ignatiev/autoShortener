const btn = document.getElementById("shorten");
const inUrl = document.getElementById("url");
const responseBox = document.getElementById("responseBox"); // <-- dialog box

btn.addEventListener("click", async () => {
  const url = inUrl.value.trim();
  if (!url) {
    responseBox.innerText = "Enter URL";  // <-- show in dialog
    return;
  }

  try {
    const res = await fetch("https://autoshortener-production.up.railway.app/autoShortener", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    const data = await res.json();
    const shortUrl = `https://autoshortener-production.up.railway.app/${data.short}`;

    responseBox.innerText = shortUrl;              // <-- show in dialog
    await navigator.clipboard.writeText(shortUrl); // copy automatically
         
  } catch (err) {
    responseBox.innerText = "Error: " + err;       // <-- show in dialog
  }
});