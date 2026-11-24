/**
 * ESP32 alert receiver. Deploy: Deploy > New deployment > Web app;
 * Execute as: Me; Who has access: Anyone. Set script properties
 * SHARED_SECRET and ALERT_EMAIL under Project Settings.
 */
function doPost(e) {
  try {
    const props = PropertiesService.getScriptProperties();
    const secret = props.getProperty("SHARED_SECRET"), to = props.getProperty("ALERT_EMAIL");
    if (!secret || !to) return json_({ ok: false, error: "Server not configured" });
    if (!e || !e.postData || !e.postData.contents) return json_({ ok: false, error: "Empty body" });
    const d = JSON.parse(e.postData.contents);
    if (d.token !== secret) return json_({ ok: false, error: "Unauthorized" });
    for (const k of ["device", "temp_c", "temp_adc", "temp_bin"]) if (d[k] === undefined) return json_({ ok: false, error: "Missing field: " + k });
    const body = [
      "Device: " + String(d.device).slice(0, 40), "Time: " + (d.ts || new Date().toISOString()),
      "Temperature: " + d.temp_c + " °C", "Temperature ADC: " + d.temp_adc + " (" + d.temp_bin + ")",
      "Light ADC: " + d.light_adc + " (" + d.light_bin + ")", "Switch: " + d.switch, "Alarm: " + d.alarm
    ].join("\n");
    MailApp.sendEmail(to, "[ESP32 ALERT] " + d.device + ": " + d.temp_c + " °C", body);
    return json_({ ok: true, sent: true });
  } catch (err) { return json_({ ok: false, error: String(err) }); }
}
function doGet() { return json_({ ok: true, service: "esp32-alerts" }); }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
