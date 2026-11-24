import React, { useState } from "react";
import TextModule from "./modules/TextModule.jsx";
import SoundModule from "./modules/SoundModule.jsx";
import ImageModule from "./modules/ImageModule.jsx";
import Esp32Module from "./modules/Esp32Module.jsx";
const TABS = [["Text & numbers", TextModule], ["Sound", SoundModule], ["Image", ImageModule], ["ESP32 & email", Esp32Module]];
export default function App() {
  const [i, setI] = useState(0);
  const Mod = TABS[i][1];
  return (<>
    <header><h1>InfoTheory-to-Machine Lab</h1>
      <div className="pipe">Phenomenon → transduction → sampling &amp; quantization → bits / ASCII → logic &amp; automation</div></header>
    <nav role="tablist">{TABS.map(([n], k) => <button key={n} role="tab" aria-selected={k === i} onClick={() => setI(k)}>{n}</button>)}</nav>
    <main><Mod /></main></>);
}
