// TinyLMChat.js — Componente de chat con TinyLM
// Servidor: 20.80.43.199:8000 | Endpoint: POST /api/chat
// Modelo: qwen2.5-1.5b-instruct-q4_k_m (llama.cpp)

const TINYLM_SERVER = 'http://20.80.43.199:8000';
const TINYLM_ENDPOINT = `${TINYLM_SERVER}/api/chat`;
const HEALTH_ENDPOINT = `${TINYLM_SERVER}/health`;
const MODEL_ID = 'qwen2.5-1.5b-instruct-q4_k_m';

// ─── HTML del Componente ─────────────────────────────────────────────────────

export function renderTinyLMChat(uiData) {
  const t = uiData.tinylm;
  return `
    <section id="tinylm" class="relative w-full bg-surface-container-lowest py-16 md:py-24 overflow-hidden">

      <!-- Ambient Glows -->
      <div class="absolute top-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div class="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div class="relative max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop flex flex-col gap-8 z-10">

        <!-- Section Header -->
        <div class="flex flex-col gap-3">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-primary text-[22px]">smart_toy</span>
            <h2 class="font-headline-lg text-headline-lg text-on-surface">${t.title}</h2>
          </div>
          <p class="font-code-sm text-code-sm text-text-muted">${t.subtitle}</p>
        </div>

        <!-- Chat Terminal Window -->
        <div id="tinylm-window" class="relative bg-surface-card border border-white/8 rounded-xl shadow-2xl overflow-hidden" style="border-color: rgba(255,255,255,0.08);">

          <!-- Terminal Title Bar -->
          <div class="flex items-center justify-between px-4 py-3 bg-surface-container border-b border-white/5" style="border-color: rgba(255,255,255,0.05);">
            <div class="flex items-center gap-2">
              <!-- Traffic lights -->
              <span class="w-3 h-3 rounded-full bg-[#ff5f57] opacity-80"></span>
              <span class="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-80"></span>
              <span class="w-3 h-3 rounded-full bg-[#28c840] opacity-80"></span>
            </div>
            <span class="font-code-sm text-[11px] text-text-muted tracking-widest">TinyLM // ${MODEL_ID}</span>
            <!-- Status Indicator -->
            <div id="tinylm-status-badge" class="flex items-center gap-2">
              <span id="tinylm-status-dot" class="w-2 h-2 rounded-full bg-text-muted"></span>
              <span id="tinylm-status-text" class="font-code-sm text-[10px] text-text-muted tracking-widest uppercase">${t.statusChecking}</span>
            </div>
          </div>

          <!-- Main Content Area: Loading / Offline / Chat -->
          <div id="tinylm-content" class="min-h-[420px] flex flex-col">

            <!-- ── LOADING STATE ── -->
            <div id="tinylm-loading" class="flex-1 flex flex-col items-center justify-center gap-6 p-8">
              <div class="font-code-sm text-sm text-primary tracking-widest animate-pulse">${t.loading.connecting}</div>
              <div class="w-full max-w-xs flex flex-col gap-3">
                <!-- Progress bar -->
                <div class="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                  <div id="tinylm-progress-bar" class="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-700" style="width:0%"></div>
                </div>
                <div id="tinylm-progress-label" class="font-code-sm text-[11px] text-text-muted text-center tracking-wider">${t.loading.step0}</div>
              </div>
              <!-- Animated dots -->
              <div class="flex gap-2 mt-2">
                <span class="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style="animation-delay:0ms"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style="animation-delay:150ms"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style="animation-delay:300ms"></span>
              </div>
            </div>

            <!-- ── OFFLINE STATE ── -->
            <div id="tinylm-offline" class="flex-1 flex flex-col items-center justify-center gap-6 p-8 hidden">
              <div class="flex flex-col items-center gap-4 text-center">
                <!-- Retro "no signal" icon -->
                <div class="w-16 h-16 rounded-xl bg-surface-container-highest flex items-center justify-center border border-outline-variant/30">
                  <span class="material-symbols-outlined text-[32px] text-text-muted">cloud_off</span>
                </div>
                <div class="flex flex-col gap-2">
                  <span class="font-code-sm text-sm text-on-surface tracking-wider">${t.offline.title}</span>
                  <span class="font-code-sm text-[11px] text-text-muted">${t.offline.serverAddr}: <span class="text-primary">${TINYLM_SERVER}</span></span>
                  <span class="font-code-sm text-[11px] text-text-muted/70 mt-1">${t.offline.hint}</span>
                </div>
              </div>
              <!-- Retro terminal-style error block -->
              <div class="w-full max-w-sm bg-surface-main rounded-lg p-4 border-l-2 border-[#ff5f57]/60 font-code-sm text-[11px] text-text-muted">
                <div><span class="text-[#ff5f57]">ERR</span> Connection refused — <span class="text-primary">${TINYLM_ENDPOINT}</span></div>
                <div class="mt-1"><span class="text-text-muted/50">→</span> ${t.offline.errorDetail}</div>
              </div>
              <button id="tinylm-retry-btn"
                class="flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/20 text-primary font-label-caps text-label-caps rounded-lg hover:bg-primary/20 hover:border-primary/40 transition-all shadow-[0_0_15px_rgba(78,222,163,0.1)] hover:shadow-[0_0_25px_rgba(78,222,163,0.2)]">
                <span class="material-symbols-outlined text-[18px]">refresh</span>
                ${t.offline.retry}
              </button>
            </div>

            <!-- ── CHAT STATE ── -->
            <div id="tinylm-chat" class="flex-1 flex flex-col hidden">
              <!-- Messages Area -->
              <div id="tinylm-messages" class="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4 font-code-sm text-sm" style="max-height: 320px; scrollbar-width: none;">
                <!-- Welcome message injected by JS -->
              </div>

              <!-- Input Area -->
              <div class="border-t border-white/5 p-3 md:p-4 bg-surface-container/50" style="border-color: rgba(255,255,255,0.05);">
                <div class="flex items-center gap-3 bg-surface-main rounded-lg px-3 py-2 border border-outline-variant/30 focus-within:border-primary/40 transition-colors">
                  <span class="font-code-sm text-primary text-sm select-none">›</span>
                  <input
                    id="tinylm-input"
                    type="text"
                    placeholder="${t.chat.placeholder}"
                    maxlength="500"
                    class="flex-1 bg-transparent font-code-sm text-sm text-on-surface placeholder:text-text-muted/50 outline-none"
                    disabled
                  />
                  <button id="tinylm-send-btn"
                    class="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    disabled>
                    <span class="material-symbols-outlined text-[18px]">send</span>
                  </button>
                </div>
                <div class="flex items-center justify-between mt-2 px-1">
                  <span class="font-code-sm text-[10px] text-text-muted/50">${t.chat.model}: <span class="text-primary/70">${MODEL_ID}</span></span>
                  <span id="tinylm-char-count" class="font-code-sm text-[10px] text-text-muted/40">0/500</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Info footnote -->
        <p class="font-code-sm text-[11px] text-text-muted/50 text-center tracking-wide">${t.footnote}</p>
      </div>
    </section>
  `;
}

// ─── Setup y Lógica del Chat ─────────────────────────────────────────────────

export function setupTinyLMListeners(uiData) {
  const t = uiData.tinylm;
  let isConnected = false;
  let isStreaming = false;
  const messageHistory = []; // Historial para contexto multi-turno

  // Elementos del DOM
  const loadingEl     = document.getElementById('tinylm-loading');
  const offlineEl     = document.getElementById('tinylm-offline');
  const chatEl        = document.getElementById('tinylm-chat');
  const messagesEl    = document.getElementById('tinylm-messages');
  const inputEl       = document.getElementById('tinylm-input');
  const sendBtn       = document.getElementById('tinylm-send-btn');
  const retryBtn      = document.getElementById('tinylm-retry-btn');
  const progressBar   = document.getElementById('tinylm-progress-bar');
  const progressLabel = document.getElementById('tinylm-progress-label');
  const statusDot     = document.getElementById('tinylm-status-dot');
  const statusText    = document.getElementById('tinylm-status-text');

  if (!loadingEl) return; // Componente no montado

  // ── 1. Iniciar conexión al montar ──
  tryConnect();

  // ── 2. Botón de reintento ──
  retryBtn?.addEventListener('click', () => {
    showLoading();
    setTimeout(tryConnect, 300);
  });

  // ── 3. Enviar mensaje ──
  sendBtn?.addEventListener('click', sendMessage);
  inputEl?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // ── 4. Contador de caracteres ──
  inputEl?.addEventListener('input', () => {
    const count = inputEl.value.length;
    const counterEl = document.getElementById('tinylm-char-count');
    if (counterEl) counterEl.textContent = `${count}/500`;
  });

  // ─── Funciones Internas ───────────────────────────────────────────────────

  async function tryConnect() {
    setStatus('checking', t.statusChecking);
    await animateProgress([
      { pct: 15, label: t.loading.step0, delay: 200 },
      { pct: 40, label: t.loading.step1, delay: 700 },
      { pct: 70, label: t.loading.step2, delay: 1200 },
    ]);

    const alive = await checkHealth();

    if (alive) {
      await animateProgress([
        { pct: 90, label: t.loading.step3, delay: 0 },
        { pct: 100, label: t.loading.step4, delay: 500 },
      ]);
      setTimeout(() => showChat(), 400);
    } else {
      showOffline();
    }
  }

  async function checkHealth() {
    try {
      const ctrl = new AbortController();
      const timeout = setTimeout(() => ctrl.abort(), 6000);
      const res = await fetch(HEALTH_ENDPOINT, {
        method: 'GET',
        signal: ctrl.signal,
      });
      clearTimeout(timeout);
      return res.ok;
    } catch {
      // Fallback: try hitting the base URL
      try {
        const ctrl2 = new AbortController();
        const timeout2 = setTimeout(() => ctrl2.abort(), 5000);
        const res2 = await fetch(`${TINYLM_SERVER}/`, {
          method: 'GET',
          signal: ctrl2.signal,
        });
        clearTimeout(timeout2);
        return res2.status < 500;
      } catch {
        return false;
      }
    }
  }

  async function animateProgress(steps) {
    for (const step of steps) {
      await new Promise(r => setTimeout(r, step.delay));
      if (progressBar) progressBar.style.width = `${step.pct}%`;
      if (progressLabel) progressLabel.textContent = step.label;
    }
  }

  function showLoading() {
    loadingEl?.classList.remove('hidden');
    offlineEl?.classList.add('hidden');
    chatEl?.classList.add('hidden');
    if (progressBar) progressBar.style.width = '0%';
    if (progressLabel) progressLabel.textContent = t.loading.step0;
    setStatus('checking', t.statusChecking);
  }

  function showOffline() {
    isConnected = false;
    loadingEl?.classList.add('hidden');
    offlineEl?.classList.remove('hidden');
    chatEl?.classList.add('hidden');
    setStatus('offline', t.statusOffline);
  }

  function showChat() {
    isConnected = true;
    loadingEl?.classList.add('hidden');
    offlineEl?.classList.add('hidden');
    chatEl?.classList.remove('hidden');
    setStatus('online', t.statusOnline);
    enableInput();
    addWelcomeMessage();
  }

  function setStatus(state, label) {
    if (!statusDot || !statusText) return;
    statusText.textContent = label;
    statusDot.className = 'w-2 h-2 rounded-full ';
    if (state === 'online') {
      statusDot.className += 'bg-primary shadow-[0_0_6px_rgba(78,222,163,0.8)] animate-pulse';
    } else if (state === 'offline') {
      statusDot.className += 'bg-[#ff5f57]';
    } else {
      statusDot.className += 'bg-text-muted animate-pulse';
    }
  }

  function enableInput() {
    if (inputEl) { inputEl.disabled = false; inputEl.focus(); }
    if (sendBtn) sendBtn.disabled = false;
  }

  function disableInput() {
    if (inputEl) inputEl.disabled = true;
    if (sendBtn) sendBtn.disabled = true;
  }

  function addWelcomeMessage() {
    if (!messagesEl || messagesEl.querySelector('.tinylm-msg')) return;
    const ts = getTimestamp();
    const welcomeHtml = `
      <div class="tinylm-msg flex flex-col gap-1">
        <div class="flex items-center gap-2">
          <span class="text-primary font-bold text-[11px]">TinyLM</span>
          <span class="text-text-muted/50 text-[10px]">${ts}</span>
        </div>
        <div class="text-on-surface-variant leading-relaxed pl-1">${t.chat.welcome}</div>
      </div>
    `;
    messagesEl.insertAdjacentHTML('beforeend', welcomeHtml);
  }

  async function sendMessage() {
    if (!inputEl || isStreaming || !isConnected) return;
    const text = inputEl.value.trim();
    if (!text) return;

    inputEl.value = '';
    const counterEl = document.getElementById('tinylm-char-count');
    if (counterEl) counterEl.textContent = '0/500';

    // Agregar mensaje del usuario
    appendUserMessage(text);
    messageHistory.push({ role: 'user', content: text });

    // Iniciar respuesta del asistente
    const assistantMsgId = `tinylm-resp-${Date.now()}`;
    appendAssistantMessage('', assistantMsgId);

    isStreaming = true;
    disableInput();
    setStatus('online', t.statusStreaming);

    try {
      await streamResponse(text, assistantMsgId);
    } catch (err) {
      const msgEl = document.getElementById(assistantMsgId);
      if (msgEl) msgEl.textContent = t.chat.errorResponse;
      console.error('[TinyLM] Stream error:', err);
    } finally {
      isStreaming = false;
      enableInput();
      setStatus('online', t.statusOnline);
      // Guardar respuesta completa en historial
      const msgEl = document.getElementById(assistantMsgId);
      if (msgEl) {
        messageHistory.push({ role: 'assistant', content: msgEl.textContent });
      }
    }
  }

  async function streamResponse(userText, msgId) {
    const msgEl = document.getElementById(msgId);
    if (!msgEl) return;

    // Mostrar cursor parpadeante
    let cursorInterval = setInterval(() => {
      const cursor = msgEl.querySelector('.tinylm-cursor');
      if (cursor) cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }, 530);
    msgEl.innerHTML = '<span class="tinylm-cursor text-primary" style="opacity:1">▋</span>';

    const body = JSON.stringify({
      model: MODEL_ID,
      messages: messageHistory,
      stream: true,
    });

    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 60000);

    let fullText = '';

    try {
      const res = await fetch(TINYLM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        signal: ctrl.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error('No readable stream');

      clearInterval(cursorInterval);
      msgEl.innerHTML = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(l => l.startsWith('data:'));

        for (const line of lines) {
          const jsonStr = line.replace(/^data:\s*/, '').trim();
          if (!jsonStr || jsonStr === '[DONE]') continue;

          try {
            const parsed = JSON.parse(jsonStr);
            // Formato llama.cpp /api/chat streaming
            const delta = parsed?.choices?.[0]?.delta?.content
              ?? parsed?.message?.content
              ?? '';
            if (delta) {
              fullText += delta;
              msgEl.textContent = fullText;
              scrollToBottom();
            }
          } catch { /* ignorar líneas mal formadas */ }
        }
      }

    } catch (err) {
      clearTimeout(timeout);
      clearInterval(cursorInterval);
      throw err;
    }

    clearInterval(cursorInterval);
    if (!fullText) {
      msgEl.textContent = t.chat.emptyResponse;
    }
    scrollToBottom();
  }

  function appendUserMessage(text) {
    if (!messagesEl) return;
    const ts = getTimestamp();
    const html = `
      <div class="tinylm-msg flex flex-col gap-1 items-end">
        <div class="flex items-center gap-2">
          <span class="text-text-muted/50 text-[10px]">${ts}</span>
          <span class="text-secondary font-bold text-[11px]">${uiData.tinylm.chat.you}</span>
        </div>
        <div class="bg-secondary/10 border border-secondary/20 text-on-surface rounded-lg px-4 py-2 max-w-[85%] leading-relaxed text-right">${escapeHtml(text)}</div>
      </div>
    `;
    messagesEl.insertAdjacentHTML('beforeend', html);
    scrollToBottom();
  }

  function appendAssistantMessage(text, id) {
    if (!messagesEl) return;
    const ts = getTimestamp();
    const html = `
      <div class="tinylm-msg flex flex-col gap-1">
        <div class="flex items-center gap-2">
          <span class="text-primary font-bold text-[11px]">TinyLM</span>
          <span class="text-text-muted/50 text-[10px]">${ts}</span>
        </div>
        <div id="${id}" class="text-on-surface-variant leading-relaxed pl-1 whitespace-pre-wrap"></div>
      </div>
    `;
    messagesEl.insertAdjacentHTML('beforeend', html);
    scrollToBottom();
  }

  function scrollToBottom() {
    if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function getTimestamp() {
    return new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
  }

  function escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}
