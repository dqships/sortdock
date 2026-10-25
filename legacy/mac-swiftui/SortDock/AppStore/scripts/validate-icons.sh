#!/bin/zsh

set -euo pipefail

repo_root="$(cd "$(dirname "$0")/../../../../.." && pwd)"
web_icons="$repo_root/web/public/icons"
brand_icons="$repo_root/legacy/mac-swiftui/SortDock/AppStore/brand/icons"
app_icons="$repo_root/legacy/mac-swiftui/SortDock/SortDock/Assets.xcassets/AppIcon.appiconset"
composer_icon="$repo_root/legacy/mac-swiftui/SortDock/SortDock/AppIcon.icon/icon.json"

sizes=(16 32 48 180 192 256 512 1024)
variants=(default dark glass)

validate_png() {
  local file_path="$1"
  local expected="$2"
  local width height format alpha

  width="$(sips -g pixelWidth "$file_path" 2>/dev/null | awk '/pixelWidth/ {print $2}')"
  height="$(sips -g pixelHeight "$file_path" 2>/dev/null | awk '/pixelHeight/ {print $2}')"
  format="$(sips -g format "$file_path" 2>/dev/null | awk '/format:/ {print $2}')"
  alpha="$(sips -g hasAlpha "$file_path" 2>/dev/null | awk '/hasAlpha/ {print $2}')"

  [[ "$width" == "$expected" && "$height" == "$expected" ]] || {
    print -u2 "Invalid dimensions: $file_path ($width x $height, expected $expected x $expected)"
    return 1
  }
  [[ "$format" == "png" ]] || {
    print -u2 "Invalid format: $file_path ($format)"
    return 1
  }
  [[ "$alpha" == "no" ]] || {
    print -u2 "Unexpected alpha channel: $file_path"
    return 1
  }
}

for variant in $variants; do
  for size in $sizes; do
    web_name="sortdock-${size}.png"
    [[ "$variant" == "default" ]] || web_name="sortdock-${variant}-${size}.png"
    validate_png "$web_icons/$web_name" "$size"
    validate_png "$brand_icons/$variant/$size.png" "$size"
  done
done

legacy_files=(
  "icon_16x16.png:16"
  "icon_16x16@2x.png:32"
  "icon_32x32.png:32"
  "icon_32x32@2x.png:64"
  "icon_128x128.png:128"
  "icon_128x128@2x.png:256"
  "icon_256x256.png:256"
  "icon_256x256@2x.png:512"
  "icon_512x512.png:512"
  "icon_512x512@2x.png:1024"
)

for entry in $legacy_files; do
  validate_png "$app_icons/${entry%%:*}" "${entry##*:}"
done

[[ -f "$composer_icon" ]] || {
  print -u2 "Missing Icon Composer source: $composer_icon"
  exit 1
}

print "Validated default, dark, and glass icons for web and macOS."
