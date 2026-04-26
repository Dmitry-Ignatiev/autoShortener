from flask import Flask, request, redirect, jsonify
import hashlib
import os
from flask_cors import CORS
from storage import url_map, save_urls

app = Flask(__name__)
CORS(app)

def generate_key(url):
    return hashlib.md5(url.encode()).hexdigest()[:6]

@app.route("/autoShortener", methods=["POST"])
def shorten():
    data = request.get_json(silent=True) or {}
    long_url = data.get("url")

    if not long_url:
        return jsonify({"error": "url required"}), 400

    key = generate_key(long_url)
    url_map[key] = long_url
    save_urls()

    short_url = f"{request.host_url}{key}"

    return jsonify({
        "short": key,
        "short_url": short_url
    })

@app.route("/<key>")
def redirect_short(key):
    long_url = url_map.get(key)

    if not long_url:
        return jsonify({"error": "Not found"}), 404

    return redirect(long_url)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)