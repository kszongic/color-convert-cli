#!/usr/bin/env node
'use strict';

// ── Parsing ──────────────────────────────────────────────────────────────────

function parseHex(s) {
  const m = s.match(/^#?([0-9a-f]{3,8})$/i);
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
  if (h.length === 4) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2]+h[3]+h[3];
  if (h.length !== 6 && h.length !== 8) return null;
  return { r: parseInt(h.slice(0,2),16), g: parseInt(h.slice(2,4),16), b: parseInt(h.slice(4,6),16) };
}

function parseRgb(s) {
  const m = s.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i);
  if (!m) return null;
  return { r: +m[1], g: +m[2], b: +m[3] };
}

function parseHsl(s) {
  const m = s.match(/^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?/i);
  if (!m) return null;
  return { type: 'hsl', h: +m[1], s: +m[2], l: +m[3] };
}

function parseColor(s) {
  s = s.trim();
  const hsl = parseHsl(s);
  if (hsl) return hsl;
  const rgb = parseRgb(s);
  if (rgb) return { type: 'rgb', ...rgb };
  const hex = parseHex(s);
  if (hex) return { type: 'hex', ...hex };
  return null;
}

// ── Conversions ──────────────────────────────────────────────────────────────

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h, s, l = (max+min)/2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d/(2-max-min) : d/(max+min);
    switch (max) {
      case r: h = ((g-b)/d + (g<b?6:0))/6; break;
      case g: h = ((b-r)/d + 2)/6; break;
      case b: h = ((r-g)/d + 4)/6; break;
    }
  }
  return { h: Math.round(h*360), s: Math.round(s*100), l: Math.round(l*100) };
}

function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  if (s === 0) { const v = Math.round(l*255); return { r:v, g:v, b:v }; }
  const hue2rgb = (p,q,t) => { if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return p+(q-p)*6*t;if(t<1/2)return q;if(t<2/3)return p+(q-p)*(2/3-t)*6;return p; };
  const q = l<0.5 ? l*(1+s) : l+s-l*s, p = 2*l-q;
  return { r: Math.round(hue2rgb(p,q,h+1/3)*255), g: Math.round(hue2rgb(p,q,h)*255), b: Math.round(hue2rgb(p,q,h-1/3)*255) };
}

function toHex(r,g,b) { return '#'+[r,g,b].map(v=>v.toString(16).padStart(2,'0')).join(''); }

// ── Output ───────────────────────────────────────────────────────────────────

function convertAndPrint(color, targetFormat) {
  let r, g, b, h, s, l;

  if (color.type === 'hsl') {
    ({h, s, l} = color);
    ({r, g, b} = hslToRgb(h, s, l));
  } else {
    ({r, g, b} = color);
    ({h, s, l} = rgbToHsl(r, g, b));
  }

  const results = {
    hex: toHex(r,g,b),
    rgb: `rgb(${r}, ${g}, ${b})`,
    hsl: `hsl(${h}, ${s}%, ${l}%)`
  };

  if (targetFormat && results[targetFormat]) {
    console.log(results[targetFormat]);
  } else {
    console.log(`HEX: ${results.hex}`);
    console.log(`RGB: ${results.rgb}`);
    console.log(`HSL: ${results.hsl}`);
  }
}

// ── CLI ──────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h') || args.length === 0) {
  console.log(`color-convert-cli — Convert colors between hex, rgb, hsl

Usage:
  color-convert-cli "#ff5733"
  color-convert-cli "rgb(255,87,51)" --to hsl
  color-convert-cli "hsl(11,100%,60%)" --to hex
  color-convert-cli --random

Options:
  --to <format>   Output format: hex, rgb, hsl
  --random        Generate a random color
  --help, -h      Show this help`);
  process.exit(0);
}

if (args.includes('--random')) {
  const r = Math.floor(Math.random()*256);
  const g = Math.floor(Math.random()*256);
  const b = Math.floor(Math.random()*256);
  const toIdx = args.indexOf('--to');
  const target = toIdx !== -1 ? args[toIdx+1] : null;
  convertAndPrint({ type:'rgb', r, g, b }, target);
  process.exit(0);
}

const toIdx = args.indexOf('--to');
const targetFormat = toIdx !== -1 ? args[toIdx+1] : null;
const colorArg = args.find((a,i) => a !== '--to' && (toIdx === -1 || i !== toIdx+1));

if (!colorArg) { console.error('Error: No color provided.'); process.exit(1); }

const color = parseColor(colorArg);
if (!color) { console.error(`Error: Could not parse color "${colorArg}"`); process.exit(1); }

convertAndPrint(color, targetFormat);
