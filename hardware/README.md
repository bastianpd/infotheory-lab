# Hardware design notes

| Part | Role and rationale |
|---|---|
| ESP32 DevKit (3.3 V logic) | GPIOs are **not 5 V tolerant**; absolute maximum is about 3.6 V. |
| ADC1 pins (GPIO 32-39) | ADC2 shares hardware with Wi-Fi and fails while Wi-Fi runs, so analog inputs use ADC1 (34, 35). |
| TMP36-style sensor | 10 mV/°C + 500 mV: 0-80 °C gives 0.5-1.3 V, inside range. |
| LDR + 10 kΩ divider | Vout = 3.3 · R / (R + R_LDR) converts resistance to voltage. Any source above 3.3 V must be divided down first (10 kΩ / 6.8 kΩ takes 5 V to about 2.0 V). |
| RC low-pass (1 kΩ + 100 nF, fc ≈ 1.6 kHz) on each analog pin | Anti-aliasing and noise suppression ahead of the ADC sampler. |
| 100 nF + 10 µF across 3V3/GND | Decoupling for Wi-Fi current bursts. |
| 10 kΩ pull-up (or internal) on the switch | Defines the idle logic level; the switch closes to GND. |
| N-MOSFET (2N7000 or IRLZ44N), 100 Ω gate resistor, 10 kΩ gate pull-down | Drives a relay coil the GPIO cannot power directly. |
| 1N4148/1N4007 flyback diode across the coil | Absorbs the inductive spike at turn-off that would destroy the MOSFET. |
| LED + 330 Ω | (3.3 − ~2 V) / 330 Ω ≈ 4 mA, safe for a GPIO. |
