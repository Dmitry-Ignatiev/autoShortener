
const btn = document.getElementById("shorten");
const inUrl = document.getElementById("url");
const responseBox = document.getElementById("responseBox"); // <-- dialog box

const BASE_URL = "https://autoshortener.onrender.com";

btn.addEventListener("click", async () => {
  const url = inUrl.value.trim();
  if (!url) {
    responseBox.innerText = "Enter URL";  // <-- show in dialog
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/autoShortener`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    const data = await res.json();
    const shortUrl = `${BASE_URL}/${data.short}`;

    responseBox.innerText = shortUrl;              // <-- show in dialog
    await navigator.clipboard.writeText(shortUrl); // copy automatically
         
  } catch (err) {
    responseBox.innerText = "Error: " + err;       // <-- show in dialog
  }
});