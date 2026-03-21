const api="https://autoShortener.herokuapp.com/autoShortener";
const inUrl=document.getElementById("url");
const btn=document.getElementById("shorten");
const result=document.getElementById("result");

btn.addEventListener("click", async () => {
  const url = inUrl.value.trim();
  if (!url) return result.textContent = "Enter URL";
  try {
    const r = await fetch(api, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({url})
    });
    if(!r.ok) throw new Error(`${r.status} ${r.statusText}`);
    const data = await r.json();
    inUrl.value = data.short;
    inUrl.select();
    result.textContent = "✅ Copied to clipboard!";
    await navigator.clipboard.writeText(data.short);
    setTimeout(() => { result.textContent = ""; }, 2000);
  } catch(e) {
    result.textContent = "Error: " + e.message;
  }
});

