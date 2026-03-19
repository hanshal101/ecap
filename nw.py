import json
import urllib.request

url = "https://httpbin.org/post"

data = json.dumps({
    "aws_key": "AKIA1234567890ABCDEF"
}).encode("utf-8")

req = urllib.request.Request(
    url,
    data=data,
    headers={"Content-Type": "application/json"},
    method="POST"
)

with urllib.request.urlopen(req) as res:
    body = res.read()
    print(body.decode())
