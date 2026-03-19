# color-convert-cli

[![npm version](https://img.shields.io/npm/v/color-convert-cli.svg)](https://www.npmjs.com/package/color-convert-cli)
[![npm downloads](https://img.shields.io/npm/dm/color-convert-cli)](https://www.npmjs.com/package/color-convert-cli)
[![license](https://img.shields.io/npm/l/color-convert-cli.svg)](./LICENSE)
[![node](https://img.shields.io/node/v/color-convert-cli)](https://nodejs.org)
![zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)
![cross-platform](https://img.shields.io/badge/platform-win%20%7C%20mac%20%7C%20linux-informational)

> Convert colors between **hex**, **rgb**, and **hsl** from the command line. Zero dependencies.

```
$ color-convert-cli "#ff5733"
HEX: #ff5733
RGB: rgb(255, 87, 51)
HSL: hsl(11, 100%, 60%)
```

## Why?

- :art: **Instant conversion** - no browser tab, no Python script, just a terminal command
- :feather: **Zero dependencies** - installs in under a second, tiny footprint
- :twisted_rightwards_arrows: **Any direction** - hex to rgb, rgb to hsl, hsl to hex, or show all at once
- :game_die: **Random colors** - generate random colors for prototyping and testing
- :computer: **Cross-platform** - Windows, macOS, Linux

## Install

```bash
npm install -g color-convert-cli
```

Or run instantly with `npx`:

```bash
npx color-convert-cli "#ff5733"
```

## Usage

```bash
# Show all formats for a color
color-convert-cli "#ff5733"

# Convert to a specific format
color-convert-cli "rgb(255,87,51)" --to hsl
# hsl(11, 100%, 60%)

color-convert-cli "hsl(11, 100%, 60%)" --to hex
# #ff5733

# Short hex notation
color-convert-cli "#f53"

# Generate a random color
color-convert-cli --random
color-convert-cli --random --to hex
```

## Supported Formats

| Input | Example |
| --- | --- |
| Hex | `#ff5733`, `ff5733`, `#f53` |
| RGB | `rgb(255, 87, 51)` |
| HSL | `hsl(11, 100%, 60%)` |

## Recipes

### CSS variable quick-reference

```bash
for color in "#1a73e8" "#34a853" "#ea4335" "#fbbc04"; do
  echo "---"
  color-convert-cli "$color"
done
```

### Pick a random accent color

```bash
color-convert-cli --random --to hex
```

### Shell alias for fast lookups

```bash
# Add to .bashrc / .zshrc
alias cc='npx color-convert-cli'
cc "#ff5733" --to rgb
```

### Pipe into clipboard (macOS)

```bash
color-convert-cli "#ff5733" --to rgb | pbcopy
```

### Pair with design tokens

```bash
cat tokens.json | jq -r '.colors[]' | while read hex; do
  echo "$hex -> $(color-convert-cli "$hex" --to hsl)"
done
```

### Generate a palette for testing

```bash
for i in $(seq 1 5); do
  color-convert-cli --random --to hex
done
```

## How It Works

1. Parses the input string to detect hex, RGB, or HSL format
2. Converts to an intermediate RGB representation
3. Applies standard color math (RGB / HSL conversion formulas)
4. Outputs the requested format, or all three if `--to` is omitted

No external libraries - all conversion math is built-in.

## Use Cases

- **Frontend development** - quickly grab the HSL equivalent of a hex color from a design spec
- **Design systems** - batch-convert brand colors for documentation
- **Terminal workflows** - stay in the terminal instead of opening a color picker website
- **Prototyping** - generate random colors without leaving your editor
- **CI/CD** - validate color values in automated pipelines

## Comparison

| Feature | `color-convert-cli` | Online tools | `pastel` (Rust) | Python one-liner |
| --- | --- | --- | --- | --- |
| Zero dependencies | Yes | N/A | No (binary) | No (Python) |
| Works offline | Yes | No | Yes | Yes |
| Cross-platform | Yes | Yes | Yes | Yes |
| Random color gen | Yes | Varies | Yes | Manual |
| npx (no install) | Yes | N/A | No | No |
| Scriptable | Yes | No | Yes | Yes |
| Install time | <1s | N/A | Varies | N/A |

## Related Tools

- [`@kszongic/rgb2hsl-cli`](https://github.com/kszongic/rgb2hsl-cli) - Focused RGB-to-HSL converter
- [`@kszongic/hex-add-cli`](https://github.com/kszongic/hex-add-cli) - Hex arithmetic
- [`@kszongic/string-hash-cli`](https://github.com/kszongic/string-hash-cli) - Hash strings from the terminal
- [`@kszongic/bar-chart-cli`](https://github.com/kszongic/bar-chart-cli) - Terminal bar charts
- [`@kszongic/whitespace-cli`](https://github.com/kszongic/whitespace-cli) - Visualize invisible characters

## License

MIT (c) [kszongic](https://github.com/kszongic)
