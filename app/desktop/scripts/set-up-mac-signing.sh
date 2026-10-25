#!/bin/zsh
# Run this on your Mac to give GitHub what it needs to sign and notarize
# SortDock for Mac. Nothing secret is printed or saved to disk.
#
#   app/desktop/scripts/set-up-mac-signing.sh                 # step 1: find your certificate
#   app/desktop/scripts/set-up-mac-signing.sh ~/DeveloperID.p12   # step 2: upload the secrets

set -euo pipefail

repository="dqships/sortdock"
p12_path="${1:-}"

identities="$(security find-identity -v -p codesigning | grep "Developer ID Application" || true)"

if [[ -z "$identities" ]]; then
  cat <<'MESSAGE'
No "Developer ID Application" certificate was found in your Keychain.

Create one (only the Apple Developer account holder can):
  1. Open Xcode > Settings > Accounts and select your team.
  2. Click Manage Certificates, then + > Developer ID Application.
Then run this script again.
MESSAGE
  exit 1
fi

echo "Found:"
echo "$identities"
team_id="$(echo "$identities" | head -n 1 | sed -E 's/.*\(([A-Z0-9]{10})\)"$/\1/')"
echo
echo "Team ID: $team_id"

if [[ -z "$p12_path" ]]; then
  cat <<'MESSAGE'

Next, export the certificate:
  1. Open Keychain Access > login > My Certificates.
  2. Right-click "Developer ID Application: ..." > Export.
  3. Save as a .p12 file and choose a password.
Then run this script again with the file path, for example:
  app/desktop/scripts/set-up-mac-signing.sh ~/Desktop/DeveloperID.p12
MESSAGE
  exit 0
fi

if [[ ! -f "$p12_path" ]]; then
  echo "Cannot find $p12_path"
  exit 1
fi

if ! command -v gh > /dev/null; then
  echo "Install the GitHub CLI first: brew install gh && gh auth login"
  exit 1
fi

gh auth status > /dev/null

read -rs "p12_password?Password you chose when exporting the .p12: "
echo
read -r "apple_id?Apple ID email for your developer account: "
echo "Create an app-specific password at account.apple.com > Sign-In and Security > App-Specific Passwords."
read -rs "app_password?App-specific password: "
echo

base64 -i "$p12_path" | gh secret set MAC_CERTIFICATE_P12_BASE64 --repo "$repository"
printf '%s' "$p12_password" | gh secret set MAC_CERTIFICATE_PASSWORD --repo "$repository"
printf '%s' "$apple_id" | gh secret set APPLE_ID --repo "$repository"
printf '%s' "$app_password" | gh secret set APPLE_APP_SPECIFIC_PASSWORD --repo "$repository"
printf '%s' "$team_id" | gh secret set APPLE_TEAM_ID --repo "$repository"

echo
echo "Done. The next v* tag will build a signed and notarized Mac app."
echo "You can now delete $p12_path."
