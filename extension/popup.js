const btn = document.getElementById("shorten");
const inUrl = document.getElementById("url");
const result = document.getElementById("result");

btn.addEventListener("click", async () => {
const url = inUrl.value.trim();
if (!url) {
  result.textContent = "Enter URL";
  return;
}

  try {
    const res = await fetch("https://autoshortener-production.up.railway.app/autoShortener", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    const data = await res.json();
    const shortUrl = `autoshortener-production.up.railway.app/${data.short}`;

    result.textContent = shortUrl;                // show in popup
    await navigator.clipboard.writeText(shortUrl); // automatically copy
         
  } catch (err) {
    result.textContent = "Error: " + err;
  }
});