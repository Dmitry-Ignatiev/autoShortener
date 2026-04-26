from flask import Flask, request, redirect, jsonify
import hashlib
import os
from flask_cors import CORS
from storage import url_map, save_urls

app = Flask(__name__)
CORS(app)

url_db = {}
BASE_URL = os.getenv("BASE_URL", "http://localhost:5000")
def generate_key(url):
    return hashlib.md5(url.encode()).hexdigest()[:6]


@app.route("/autoShortener", methods=["POST"])
def shorten():
    long_url = request.json.get("url")
    if not long_url:                                          # ← guard added
        return jsonify({"error": "url required"}), 400
    key = generate_key(long_url)
    url_map[key] = long_url
    save_urls()
    return jsonify({"short": key})

@app.route("/")
def home():
    return """
    <!DOCTYPE html>
    <html>
      <body>
        <script>
          const url = prompt("Enter URL to shorten:");
          if (url) {
            fetch("/autoShortener", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ url })
            })
            .then(res => res.json())
            .then(data => alert(data.short))
            .catch(err => alert("Error: " + err));
          }
        </script>
      </body>
    </html>
    """

@app.route("/<key>")
def redirect_short(key):
    long_url = url_map.get(key)
    return redirect(long_url) if long_url else ("Not Found", 404)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)