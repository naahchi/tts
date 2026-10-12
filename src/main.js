import { TTS } from "@supertone/supertonic-web";
import "./style.css";
const root = document.querySelector("#app");
root.innerHTML = `
<main class="shell">
<header class="top"><div class="logo">T</div><div><p class="eyebrow">LOCAL BROWSER TTS</p><h1>TTS Studio</h1><p class="sub">अपनी स्क्रिप्ट को ऑडियो में बदलें</p></div><span class="pill">Beta</span></header>
<section class="panel"><div class="heading"><div><h2>स्क्रिप्ट</h2><p>हिंदी या अंग्रेज़ी टेक्स्ट पेस्ट करें।</p></div><span id="count">0 characters</span></div>
<textarea id="script" placeholder="नमस्कार दोस्तों! आज हम एक नई तकनीक के बारे में जानेंगे..."></textarea>
<div class="controls">
<label>मॉडल<select id="model"><option value="supertonic">Supertonic 3 (Browser)</option><option disabled>Kokoro-82M (बाद में जोड़ेंगे)</option><option disabled>Pocket TTS (बाद में जोड़ेंगे)</option></select></label>
<label>भाषा<select id="language"><option value="hi">हिंदी</option><option value="en">English</option><option value="na">Auto / Mixed (na)</option></select></label>
<label>आवाज़<select id="voice"><option>F1</option><option>F2</option><option>F3</option><option>F4</option><option>F5</option><option>M1</option><option>M2</option><option>M3</option><option>M4</option><option>M5</option></select></label>
<label>स्पीड <output id="speed-value">1.0×</output><input id="speed" type="range" min="0.7" max="2" step="0.1" value="1"></label></div>
<div class="actions"><button id="generate" class="primary">▶ Generate Audio</button><button id="clear" class="secondary">Clear</button></div>
<div id="status" class="status" role="status">तैयार। पहली बार मॉडल लोड होने में समय लग सकता है।</div></section>
<section class="panel"><h2>ऑडियो आउटपुट</h2><p class="sub">जनरेट होने के बाद यहाँ सुनें और WAV सेव करें।</p><audio id="player" controls></audio><a id="download" class="download disabled" href="#" download="tts-studio.wav">↓ WAV डाउनलोड करें</a><p class="note">पहली बार मॉडल फाइलें इंटरनेट से डाउनलोड होंगी। ऑडियो ब्राउज़र में जनरेट होगा; GitHub Pages पर Python सर्वर नहीं चलता।</p></section>
<footer>GitHub Pages starter · Model weights hosted separately</footer></main>`;
const $ = id => document.getElementById(id);
let tts = null, audioUrl = null;
function status(msg, kind="") { $("status").textContent = msg; $("status").className = "status " + kind; }
$("script").addEventListener("input", () => $("count").textContent = `${$("script").value.length.toLocaleString()} characters`);
$("speed").addEventListener("input", () => $("speed-value").textContent = `${Number($("speed").value).toFixed(1)}×`);
$("clear").addEventListener("click", () => { $("script").value=""; $("count").textContent="0 characters"; status("स्क्रिप्ट साफ कर दी गई।"); });
$("generate").addEventListener("click", async () => {
 const text = $("script").value.trim();
 if (!text) return status("पहले स्क्रिप्ट लिखें या पेस्ट करें।","error");
 $("generate").disabled = true; $("download").classList.add("disabled");
 try {
  status("मॉडल लोड हो रहा है। पहली बार कई सौ MB डाउनलोड हो सकते हैं…");
  if (!tts) tts = await TTS.load({autoDownload:true});
  status("ऑडियो बनाया जा रहा है…");
  const style = await tts.getVoiceStyle($("voice").value);
  const result = await tts.synthesize(text,{style,lang:$("language").value,speed:Number($("speed").value)});
  const wav = result?.wav ?? result;
  let blob;
  if (wav instanceof Blob) blob=wav;
  else if (wav instanceof ArrayBuffer) blob=new Blob([wav],{type:"audio/wav"});
  else if (ArrayBuffer.isView(wav)) blob=new Blob([wav.buffer.slice(wav.byteOffset,wav.byteOffset+wav.byteLength)],{type:"audio/wav"});
  else throw new Error("ऑडियो आउटपुट फ़ॉर्मेट पहचाना नहीं गया।");
  if(audioUrl) URL.revokeObjectURL(audioUrl);
  audioUrl=URL.createObjectURL(blob); $("player").src=audioUrl; $("download").href=audioUrl; $("download").classList.remove("disabled");
  status("ऑडियो तैयार है। नीचे Play करें या WAV डाउनलोड करें।","success");
 } catch(e) { console.error(e); status(`ऑडियो नहीं बन पाया: ${e?.message || e}. इंटरनेट और ब्राउज़र compatibility जाँचें।`,"error"); }
 finally { $("generate").disabled=false; }
});
