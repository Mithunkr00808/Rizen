#!/bin/bash
urls=(
  "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1262560/library_600x900.jpg"
  "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/library_600x900.jpg"
  "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/242050/library_600x900.jpg"
  "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/321040/library_600x900.jpg"
  "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220240/library_600x900.jpg"
  "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/17410/library_600x900.jpg"
  "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1262540/library_600x900.jpg"
  "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/12220/library_600x900.jpg"
  "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/12210/library_600x900.jpg"
  "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/742110/library_600x900.jpg"
)

for url in "${urls[@]}"; do
  status=$(curl -s -I -o /dev/null -w "%{http_code}" "$url")
  echo "$status $url"
done
