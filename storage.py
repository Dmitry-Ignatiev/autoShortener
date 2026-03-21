import json
import os

URL_FILE = "urls.json"

# Load existing URLs from file
if os.path.exists(URL_FILE):
    with open(URL_FILE, "r") as f:
        try:
            url_map = json.load(f)
        except json.JSONDecodeError:
            url_map = {}
else:
    url_map = {}

def save_urls():
    with open(URL_FILE, "w") as f:
        json.dump(url_map, f)