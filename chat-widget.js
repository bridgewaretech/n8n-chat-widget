(function () {
  // 🔧 Inject custom styles into the page
  const styles = `
    .n8n-chat-widget {
      --chat--color-primary: var(--n8n-chat-primary-color, #854fff);
      --chat--color-secondary: var(--n8n-chat-secondary-color, #6b3fd4);
      --chat--color-background: var(--n8n-chat-background-color, #ffffff);
      --chat--color-font: var(--n8n-chat-font-color, #333333);
      font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    /* 🪟 Chat Container */
    .n8n-chat-widget .chat-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      display: none;
      width: 380px;
      height: 600px;
      background: var(--chat--color-background);
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(133, 79, 255, 0.15);
      border: 1px solid rgba(133, 79, 255, 0.2);
      overflow: hidden;
      font-family: inherit;
    }

    .n8n-chat-widget .chat-container.position-left {
      right: auto;
      left: 20px;
    }

    .n8n-chat-widget .chat-container.open {
      display: flex;
      flex-direction: column;
    }

    /* 🎨 Header, Footer, Branding */
    .n8n-chat-widget .brand-header {
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid rgba(133, 79, 255, 0.1);
      position: relative;
    }

    .n8n-chat-widget .close-button {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--chat--color-font);
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      opacity: 0.6;
    }

    .n8n-chat-widget .close-button:hover {
      opacity: 1;
    }

    .n8n-chat-widget .brand-header img {
      width: 32px;
      height: 32px;
    }

    .n8n-chat-widget .brand-header span {
      font-size: 18px;
      font-weight: 500;
      color: var(--chat--color-font);
    }

    /* 💬 Chat UI Elements */
    .n8n-chat-widget .chat-interface {
      display: none;
      flex-direction: column;
      height: 100%;
    }

    .n8n-chat-widget .chat-interface.active {
      display: flex;
    }

    .n8n-chat-widget .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
      background: var(--chat--color-background);
      display: flex;
      flex-direction: column;
    }

    .n8n-chat-widget .chat-message {
      padding: 12px 16px;
      margin: 8px 0;
      border-radius: 12px;
      max-width: 80%;
      font-size: 14px;
    }

    .n8n-chat-widget .chat-message.user {
      background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary));
      color: white;
      align-self: flex-end;
      box-shadow: 0 4px 12px rgba(133, 79, 255, 0.2);
    }

    .n8n-chat-widget .chat-message.bot {
      background: var(--chat--color-background);
      border: 1px solid rgba(133, 79, 255, 0.2);
      color: var(--chat--color-font);
      align-self: flex-start;
    }

    /* ✏️ Input Area */
    .n8n-chat-widget .chat-input {
      padding: 16px;
      display: flex;
      gap: 8px;
      border-top: 1px solid rgba(133, 79, 255, 0.1);
    }

    .n8n-chat-widget .chat-input textarea {
      flex: 1;
      padding: 12px;
      border: 1px solid rgba(133, 79, 255, 0.2);
      border-radius: 8px;
      resize: none;
      font-size: 14px;
    }

    .n8n-chat-widget .chat-input button {
      padding: 0 20px;
      background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary));
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }

    /* 🟣 Chat Bubble Toggle */
    .n8n-chat-widget .chat-toggle {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary));
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
      cursor: pointer;
      z-index: 999;
    }

    .n8n-chat-widget .chat-toggle svg {
      width: 24px;
      height: 24px;
      fill: white;
    }

    /* 📱 Responsive Mobile Styles – July 2025 */
    @media (max-width: 768px) {
      .n8n-chat-widget .chat-container {
        width: 100vw !important;
        height: 100vh !important;
        bottom: 0 !important;
        right: 0 !important;
        border-radius: 0 !important;
      }

      .n8n-chat-widget .chat-toggle {
        width: 50px !important;
        height: 50px !important;
        bottom: 15px !important;
        right: 15px !important;
      }

      .n8n-chat-widget .welcome-text {
        font-size: 18px !important;
      }

      .n8n-chat-widget .chat-input textarea {
        font-size: 13px !important;
      }
    }
  `;

  // 🧠 Inject external Geist font
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css';
  document.head.appendChild(fontLink);

  // 🧵 Inject styles into document
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // 🧩 The rest of the JavaScript logic (widget injection, toggle behavior, message handling, etc.) goes here
})();
