# InfoTheory-to-Machine Lab

Interactive React lab tracing information from phenomenon to machine action:
**source → transduction → sampling & quantization → binary/ASCII → logic, transmission & automation.**

## Run
```bash
npm install
npm run dev
```

## Modules
- **Text & numbers**: ASCII dec/hex/8-bit binary, symbol frequencies, Shannon entropy H = −Σ pᵢ log₂ pᵢ, bits/bytes/KiB.
- **Sound**: sine/square/triangle/sawtooth or microphone (Web Audio), sample rate, 4/8/12/16-bit quantization, low-pass, Nyquist and aliasing warnings, binary sample words, bitrate.
- **Image**: upload or draw, per-pixel R/G/B with 8-bit binary, histograms, raw size.
- **ESP32 & email**: physical value → 0-3.3 V → 12-bit ADC → binary → hysteresis → JSON POST with cooldown.

## Layout
`src/lib/info.js` (all math) · `src/modules/*` · `hardware/firmware/sensor_to_bits.ino` · `hardware/README.md` (circuit parts) · `apps-script/Code.gs`

## Google Apps Script setup
1. Create a project at script.google.com and paste `apps-script/Code.gs`.
2. Project Settings → Script properties: add `SHARED_SECRET` and `ALERT_EMAIL`.
3. Deploy → New deployment → Web app; execute as **Me**, access **Anyone**. Authorize the mail scope.
4. Put the `/exec` URL into the simulator or `WEBAPP_URL` in the firmware, and use the same secret as `TOKEN`.
5. Deploy a new version after every script edit.

## Notes
The firmware uses `setInsecure()` for brevity; pin the root CA for production. Requests use `text/plain` to avoid a CORS preflight.
