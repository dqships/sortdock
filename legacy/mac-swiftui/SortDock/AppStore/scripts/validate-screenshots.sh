#!/bin/zsh
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)/screenshots/final/2880x1800"
found=0
for image in "$root"/*.{png,jpg,jpeg}(N); do
  found=1
  width=$(sips -g pixelWidth "$image" | awk '/pixelWidth/ {print $2}')
  height=$(sips -g pixelHeight "$image" | awk '/pixelHeight/ {print $2}')
  alpha=$(sips -g hasAlpha "$image" | awk '/hasAlpha/ {print $2}')
  [[ "$width" == 2880 && "$height" == 1800 && "$alpha" == no ]] || { echo "Invalid screenshot: $image"; exit 1; }
done
[[ "$found" == 1 ]] || { echo "No screenshots found in $root"; exit 1; }
echo "Screenshot validation passed."
