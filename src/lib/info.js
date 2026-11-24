// Core information-theory and signal math. Pure functions, no DOM.
export const toBin = (n, w = 8) => (n >>> 0).toString(2).padStart(w, "0");
export const toHex = (n, w = 2) => n.toString(16).toUpperCase().padStart(w, "0");
export function asciiTable(text) {
  return [...text].map((ch) => {
    const c = ch.charCodeAt(0);
    return { ch, dec: c, hex: toHex(c), bin: toBin(c & 0xff), extended: c > 255 };
  });
}
export function frequencies(text) {
  const map = new Map();
  for (const ch of text) map.set(ch, (map.get(ch) || 0) + 1);
  const n = [...map.values()].reduce((a, b) => a + b, 0);
  return [...map].map(([ch, count]) => ({ ch, count, p: count / n })).sort((a, b) => b.count - a.count);
}
// H = -sum p_i log2 p_i  (bits/symbol)
export const entropy = (freqs) => freqs.reduce((h, { p }) => (p > 0 ? h - p * Math.log2(p) : h), 0);
export const sizes = (bits) => ({ bits, bytes: bits / 8, kib: bits / 8 / 1024 });
export const nyquist = (fs) => fs / 2;
export const quantStep = (bits, vpp = 2) => vpp / (2 ** bits - 1);
export const bitrate = (fs, bits, ch = 1) => fs * bits * ch;
export function quantize(x, bits) { // x in [-1,1] -> code 0..2^bits-1
  const L = 2 ** bits - 1, c = Math.round(((Math.max(-1, Math.min(1, x)) + 1) / 2) * L);
  return { code: c, value: (c / L) * 2 - 1 };
}
export function wave(type, f, t) {
  const ph = (f * t) % 1;
  switch (type) {
    case "square": return ph < 0.5 ? 1 : -1;
    case "triangle": return 4 * Math.abs(ph - 0.5) - 1;
    case "sawtooth": return 2 * ph - 1;
    default: return Math.sin(2 * Math.PI * f * t);
  }
}
// Single-pole IIR low-pass: y[n] = y[n-1] + a (x[n] - y[n-1])
export function lowpass(xs, fc, fs) {
  if (!fc) return xs.slice();
  const rc = 1 / (2 * Math.PI * fc), a = 1 / fs / (rc + 1 / fs);
  let y = xs[0] || 0;
  return xs.map((x) => (y += a * (x - y)));
}
// ESP32 chain: physical value -> volts (0-3.3) -> 12-bit ADC code
export const adc12 = (v) => Math.round((Math.max(0, Math.min(3.3, v)) / 3.3) * 4095);
export const adcToVolts = (c) => (c / 4095) * 3.3;
// Schmitt-style hysteresis: trips at/above hi, releases at/below lo
export const hysteresis = (state, x, lo, hi) => (state ? x > lo : x >= hi);
