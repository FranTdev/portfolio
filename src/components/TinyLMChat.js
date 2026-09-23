// TinyLMChat.js — Componente de chat con TinyLM (Francisco Tabares AI Agent)
// Endpoint: POST /api/chat  |  Formato: { message, stream }  |  SSE: data: {"text": "..."}

// URL directa del servidor TinyLM (Azure VM)
const TINYLM_BASE = 'http://20.80.43.199:8000';
const CHAT_ENDPOINT = `${TINYLM_BASE}/api/chat`;
const HEALTH_ENDPOINT = `${TINYLM_BASE}/health`;

// Prompt de calentamiento — primera petición al cargar la página
const WARMUP_PROMPT = '¿Quién eres?';

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
              <span class="w-3 h-3 rounded-full bg-[#ff5f57] opacity-80"></span>
              <span class="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-80"></span>
              <span class="w-3 h-3 rounded-full bg-[#28c840] opacity-80"></span>
            </div>
            <span class="font-code-sm text-[11px] text-text-muted tracking-widest">Francisco Tabares — AI Agent</span>
            <!-- Status Indicator -->
            <div id="tinylm-status-badge" class="flex items-center gap-2">
              <span id="tinylm-status-dot" class="w-2 h-2 rounded-full bg-text-muted animate-pulse"></span>
              <span id="tinylm-status-text" class="font-code-sm text-[10px] text-text-muted tracking-widest uppercase">${t.statusChecking}</span>
            </div>
          </div>

          <!-- Main Content Area: Loading / Offline / Chat -->
          <div id="tinylm-content" class="min-h-[420px] flex flex-col">

            <!-- ── LOADING STATE ── -->
            <div id="tinylm-loading" class="flex-1 flex flex-col items-center justify-center gap-6 p-8">
              <div class="font-code-sm text-sm text-primary tracking-widest animate-pulse">${t.loading.connecting}</div>
              <div class="w-full max-w-xs flex flex-col gap-3">
                <div class="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                  <div id="tinylm-progress-bar" class="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-700" style="width:0%"></div>
                </div>
                <div id="tinylm-progress-label" class="font-code-sm text-[11px] text-text-muted text-center tracking-wider">${t.loading.step0}</div>
              </div>
              <div class="flex gap-2 mt-2">
                <span class="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style="animation-delay:0ms"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style="animation-delay:150ms"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style="animation-delay:300ms"></span>
              </div>
            </div>

            <!-- ── OFFLINE STATE ── -->
            <div id="tinylm-offline" class="flex-1 flex flex-col items-center justify-center gap-6 p-8 hidden">
              <div class="flex flex-col items-center gap-4 text-center">
                <div class="w-16 h-16 rounded-xl bg-surface-container-highest flex items-center justify-center border border-outline-variant/30">
                  <span class="material-symbols-outlined text-[32px] text-text-muted">cloud_off</span>
                </div>
                <div class="flex flex-col gap-2">
                  <span class="font-code-sm text-sm text-on-surface tracking-wider">${t.offline.title}</span>
                  <span class="font-code-sm text-[11px] text-text-muted/70 mt-1">${t.offline.hint}</span>
                </div>
              </div>
              <!-- Terminal error block — sin exponer URL -->
              <div class="w-full max-w-sm bg-surface-main rounded-lg p-4 border-l-2 border-[#ff5f57]/60 font-code-sm text-[11px] text-text-muted">
                <div><span class="text-[#ff5f57]">ERR</span> &nbsp;connection_refused — inference_server</div>
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
              <div id="tinylm-messages" class="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4 font-code-sm text-sm" style="max-height: 340px; scrollbar-width: none;"></div>

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
                  <span class="font-code-sm text-[10px] text-text-muted/50">${t.chat.poweredBy}</span>
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

// ─── Setup y Lógica ──────────────────────────────────────────────────────────

export function setupTinyLMListeners(uiData) {
  const t = uiData.tinylm;
  let isConnected = false;
  let isStreaming = false;

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

  if (!loadingEl) return;

  // ── 1. Iniciar al montar ──
  tryConnect();

  // ── 2. Botón de reintento ──
  retryBtn?.addEventListener('click', () => {
    showLoading();
    setTimeout(tryConnect, 300);
  });

  // ── 3. Enviar mensaje ──
  sendBtn?.addEventListener('click', sendMessage);
  inputEl?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });
  inputEl?.addEventListener('input', () => {
    const counterEl = document.getElementById('tinylm-char-count');
    if (counterEl) counterEl.textContent = `${inputEl.value.length}/500`;
  });

  // ─── Conexión ────────────────────────────────────────────────────────────

  async function tryConnect() {
    setStatus('checking', t.statusChecking);

    // Animación de progreso visual (pasos de carga)
    await animateProgress([
      { pct: 10, label: t.loading.step0, delay: 0 },
      { pct: 35, label: t.loading.step1, delay: 600 },
    ]);

    const alive = await checkHealth();

    if (!alive) {
      showOffline();
      return;
    }

    await animateProgress([
      { pct: 60, label: t.loading.step2, delay: 0 },
      { pct: 80, label: t.loading.step3, delay: 400 },
    ]);

    // Pasar al estado de chat inmediatamente (con input deshabilitado)
    showChat();

    // Warm-up: enviar primer prompt automático, mostrar respuesta como bienvenida
    await runWarmup();
  }

  async function checkHealth() {
    const isHttpsPage = window.location.protocol === 'https:';
    const isHttpApi = TINYLM_BASE.startsWith('http:');

    if (isHttpsPage && isHttpApi) {
      console.warn('[TinyLM] Bloqueo de Contenido Mixto (Mixed Content): La página corre en HTTPS pero la API usa HTTP. El navegador bloqueará las peticiones.');
      const errBox = document.querySelector('#tinylm-offline .bg-surface-main');
      if (errBox) {
        errBox.innerHTML = `
          <div><span class="text-[#ff5f57]">ERR_MIXED_CONTENT</span> &nbsp;https_to_http_blocked</div>
          <div class="mt-1 text-text-muted/70">GitHub Pages (HTTPS) no permite llamar APIs en HTTP sin SSL. Se requiere proxy HTTPS o tunnel SSL en la VM.</div>
        `;
      }
      return false;
    }

    // Reintento de salud (hasta 2 intentos)
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const ctrl = new AbortController();
        const id = setTimeout(() => ctrl.abort(), 8000);
        const res = await fetch(HEALTH_ENDPOINT, { signal: ctrl.signal });
        clearTimeout(id);
        if (res.ok) return true;
      } catch (err) {
        console.error(`[TinyLM] Intento ${attempt} de conexión a ${HEALTH_ENDPOINT} falló:`, err);
        if (attempt < 2) await new Promise(r => setTimeout(r, 1000));
      }
    }

    return false;
  }

  async function runWarmup() {
    // Colocar mensaje de "pensando..." mientras llega la respuesta
    const warmupId = `tinylm-warmup-${Date.now()}`;
    appendAssistantMessage('', warmupId, true);

    await animateProgress([{ pct: 95, label: t.loading.step4, delay: 0 }]);

    try {
      await streamResponse(WARMUP_PROMPT, warmupId);
    } catch {
      const el = document.getElementById(warmupId);
      if (el) el.textContent = t.chat.welcome;
    }

    // Completar barra y habilitar input
    await animateProgress([{ pct: 100, label: '', delay: 200 }]);
    enableInput();
    setStatus('online', t.statusOnline);
  }

  // ─── Estados visuales ────────────────────────────────────────────────────

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
    // Input queda deshabilitado hasta que termina el warm-up
    setStatus('checking', t.statusChecking);
  }

  function setStatus(state, label) {
    const dot  = document.getElementById('tinylm-status-dot');
    const text = document.getElementById('tinylm-status-text');
    if (!dot || !text) return;
    text.textContent = label;
    dot.className = 'w-2 h-2 rounded-full ';
    if (state === 'online')    dot.className += 'bg-primary shadow-[0_0_6px_rgba(78,222,163,0.8)] animate-pulse';
    else if (state === 'offline') dot.className += 'bg-[#ff5f57]';
    else                       dot.className += 'bg-text-muted animate-pulse';
  }

  function enableInput() {
    if (inputEl)  { inputEl.disabled = false; inputEl.focus(); }
    if (sendBtn)  sendBtn.disabled = false;
  }

  function disableInput() {
    if (inputEl) inputEl.disabled = true;
    if (sendBtn) sendBtn.disabled = true;
  }

  async function animateProgress(steps) {
    for (const step of steps) {
      await new Promise(r => setTimeout(r, step.delay));
      if (progressBar) progressBar.style.width = `${step.pct}%`;
      if (progressLabel && step.label) progressLabel.textContent = step.label;
    }
  }

  // ─── Chat ─────────────────────────────────────────────────────────────────

  async function sendMessage() {
    if (!inputEl || isStreaming || !isConnected) return;
    const text = inputEl.value.trim();
    if (!text) return;

    inputEl.value = '';
    const counterEl = document.getElementById('tinylm-char-count');
    if (counterEl) counterEl.textContent = '0/500';

    appendUserMessage(text);

    const replyId = `tinylm-resp-${Date.now()}`;
    appendAssistantMessage('', replyId, false);

    isStreaming = true;
    disableInput();
    setStatus('online', t.statusStreaming);

    try {
      await streamResponse(text, replyId);
    } catch {
      const el = document.getElementById(replyId);
      if (el) el.textContent = t.chat.errorResponse;
    } finally {
      isStreaming = false;
      enableInput();
      setStatus('online', t.statusOnline);
    }
  }

  // Streaming SSE: backend envía `data: {"text": "..."}\n\n`
  async function streamResponse(message, msgId) {
    const msgEl = document.getElementById(msgId);
    if (!msgEl) return;

    // Cursor parpadeante mientras espera
    let cursorOn = true;
    const cursorTimer = setInterval(() => {
      const c = msgEl.querySelector('.tlm-cursor');
      if (c) c.style.opacity = (cursorOn = !cursorOn) ? '1' : '0';
    }, 530);
    msgEl.innerHTML = '<span class="tlm-cursor text-primary font-bold" style="opacity:1">▋</span>';

    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 90000);
    let fullText = '';

    try {
      const res = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, stream: true }),
        signal: ctrl.signal,
      });

      clearTimeout(timeout);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error('No stream');

      clearInterval(cursorTimer);
      msgEl.innerHTML = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const raw = decoder.decode(value, { stream: true });
        const lines = raw.split('\n').filter(l => l.startsWith('data:'));

        for (const line of lines) {
          const json = line.replace(/^data:\s*/, '').trim();
          if (!json || json === '[DONE]') continue;
          try {
            const parsed = JSON.parse(json);
            // El backend envía: { "text": "..." }
            const token = parsed?.text ?? '';
            if (token) {
              fullText += token;
              msgEl.textContent = fullText;
              scrollToBottom();
            }
          } catch { /* ignorar líneas malformadas */ }
        }
      }

    } catch (err) {
      clearTimeout(timeout);
      clearInterval(cursorTimer);
      throw err;
    }

    clearInterval(cursorTimer);
    if (!fullText) msgEl.textContent = t.chat.emptyResponse;
    scrollToBottom();
  }

  // ─── DOM Helpers ──────────────────────────────────────────────────────────

  function appendUserMessage(text) {
    if (!messagesEl) return;
    const ts = getTimestamp();
    messagesEl.insertAdjacentHTML('beforeend', `
      <div class="tinylm-msg flex flex-col gap-1 items-end">
        <div class="flex items-center gap-2">
          <span class="text-text-muted/50 text-[10px]">${ts}</span>
          <span class="text-secondary font-bold text-[11px]">${t.chat.you}</span>
        </div>
        <div class="bg-secondary/10 border border-secondary/20 text-on-surface rounded-lg px-4 py-2 max-w-[85%] leading-relaxed text-right break-words">${escapeHtml(text)}</div>
      </div>
    `);
    scrollToBottom();
  }

  function appendAssistantMessage(text, id, isWarmup) {
    if (!messagesEl) return;
    const ts = getTimestamp();
    const label = isWarmup ? `<span class="text-text-muted/50 text-[10px]">${ts}</span>` : `<span class="text-text-muted/50 text-[10px]">${ts}</span>`;
    messagesEl.insertAdjacentHTML('beforeend', `
      <div class="tinylm-msg flex flex-col gap-1">
        <div class="flex items-center gap-2">
          <span class="text-primary font-bold text-[11px]">Francisco AI</span>
          ${label}
        </div>
        <div id="${id}" class="text-on-surface-variant leading-relaxed pl-1 whitespace-pre-wrap break-words"></div>
      </div>
    `);
    scrollToBottom();
  }

  function scrollToBottom() {
    if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function getTimestamp() {
    return new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
  }

  function escapeHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
}
