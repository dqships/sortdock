#!/usr/bin/env python3
"""Validate the App Store text package without sending anything to Apple."""
from pathlib import Path
from urllib.parse import urlparse
import sys

root = Path(__file__).resolve().parents[1] / "metadata"
errors: list[str] = []

def read(name: str) -> str:
    return (root / name).read_text(encoding="utf-8").strip()

def limited(name: str, maximum: int, byte_count: bool = False) -> None:
    value = read(name)
    size = len(value.encode("utf-8")) if byte_count else len(value)
    if not value or size > maximum:
        errors.append(f"{name}: expected 1-{maximum}{' bytes' if byte_count else ' characters'}, got {size}")

limited("app-name.txt", 30)
if len(read("app-name.txt")) < 2: errors.append("app-name.txt: minimum is 2 characters")
limited("subtitle.txt", 30)
limited("promotional-text.txt", 170)
limited("app-description.md", 4000)
limited("keywords.txt", 100, True)

keywords = read("keywords.txt").split(",")
if any(not token for token in keywords): errors.append("keywords.txt: empty keyword token")
if any(len(token.strip()) <= 2 for token in keywords): errors.append("keywords.txt: every token must be longer than two characters")
if len({token.strip().casefold() for token in keywords}) != len(keywords): errors.append("keywords.txt: duplicate tokens")

for filename in ("support-url.txt", "marketing-url.txt", "privacy-policy-url.txt"):
    value = read(filename)
    parsed = urlparse(value)
    if parsed.scheme != "https" or not parsed.netloc:
        errors.append(f"{filename}: requires a public HTTPS URL")

for path in root.iterdir():
    if path.is_file() and path.suffix in {".txt", ".md"}:
        text = path.read_text(encoding="utf-8").casefold()
        for marker in ("todo", "example.com", "localhost", "tbd"):
            if marker in text: errors.append(f"{path.name}: contains placeholder {marker}")

for banned in ("best", "#1", "free", "price", "pricing"):
    if banned in read("app-description.md").casefold(): errors.append(f"app-description.md: unsupported pricing or ranking claim {banned}")

if errors:
    print("Metadata validation failed:")
    print("\n".join(f"- {error}" for error in errors))
    sys.exit(1)
print("Metadata validation passed.")
