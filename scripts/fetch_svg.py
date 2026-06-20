import urllib.request
import re
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request('https://commons.wikimedia.org/wiki/File:N%C3%BCrburgring_-_Nordschleife.svg', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
match = re.search(r'"(https://upload\.wikimedia\.org/wikipedia/commons/[^"]+\.svg)"', html)
if match:
    svg_url = match.group(1)
    print("Found URL:", svg_url)
    svg_data = urllib.request.urlopen(urllib.request.Request(svg_url, headers={'User-Agent': 'Mozilla/5.0'}), context=ctx).read().decode('utf-8')
    with open('public/nurburgring.svg', 'w', encoding='utf-8') as f:
        f.write(svg_data)
    print("Saved to public/nurburgring.svg")
else:
    print("No URL found")
