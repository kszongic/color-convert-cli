# color-convert-cli

[![npm version](https://img.shields.io/npm/v/color-convert-cli.svg)](https://www.npmjs.com/package/color-convert-cli)
[![license](https://img.shields.io/npm/l/color-convert-cli.svg)](./LICENSE)

Convert colors between **hex**, **rgb**, and **hsl** from the command line. Zero dependencies.

## Install

```bash
npm i -g color-convert-cli
```

Or use directly with npx:

```bash
npx color-convert-cli "#ff5733"
```

## Usage

```bash
# Show all formats
color-convert-cli "#ff5733"
# HEX: #ff5733
# RGB: rgb(255, 87, 51)
# HSL: hsl(11, 100%, 60%)

# Convert to a specific format
color-convert-cli "rgb(255,87,51)" --to hsl
# hsl(11, 100%, 60%)

# Generate a random color
color-convert-cli --random
color-convert-cli --random --to hex
```

## Supported Formats

| Input | Example |
|-------|---------|
| Hex | `#ff5733`, `ff5733`, `#f53` |
| RGB | `rgb(255, 87, 51)` |
| HSL | `hsl(11, 100%, 60%)` |

## License

MIT © [kszongic](https://github.com/kszongic)
