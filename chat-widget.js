(function() {
    // Load Geist font from CDN
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css';
    document.head.appendChild(fontLink);

    // Inject styles (including the "toggle-up-on-open" fix)
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        /* Move toggle button up when chat is open */
        .n8n-chat-widget .chat-toggle.open {
            bottom: 640px !important;
        }
        .n8n-chat-widget .chat-toggle.position-left.open {
            bottom: 640px !important;
        }
    `;
    document.head.appendChild(styleSheet);

    // Define default config in case none is passed via window.ChatWidgetConfig
    const defaultConfig = {
        webhook: { url: '', route: '' },
        branding: {
            logo: '',
            name: '',
            welcomeText: '',
            responseTimeText: '',
            poweredBy: {
                text: 'Powered by Bridgeware Technologies using n8n',
                link: 'https://n8n.io'
            }
        },
        style: {
            primaryColor: '#854fff',
            secondaryColor: '#6b3fd4',
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#333333'
        }
    };

    // Merge user config with defaults
    const config = window.ChatWidgetConfig ? {
        webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
        branding: { ...defaultConfig.branding, ...window.ChatWidgetConfig.branding },
        style: { ...defaultConfig.style, ...window.ChatWidgetConfig.style }
    } : defaultConfig;

    // Prevent double initialization
    if (window.N8NChatWidgetInitialized) return;
    window.N8NChatWidgetInitialized = true;

    let currentSessionId = '';

    // Create main container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';

    // Apply custom CSS variables
    widgetContainer.style.setProperty('--chat--color-primary', config.style.primaryColor);
    widgetContainer.style.setProperty('--chat--color-secondary', config.style.secondaryColor);
    widgetContainer.style.setProperty('--chat--color-background', config.style.backgroundColor);
    widgetContainer.style.setProperty('--chat--color-font', config.style.fontColor);

    // Build chat container with branding and welcome
    const chatContainer = document.createElement('div');
    chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;

    // Welcome screen HTML
    const newConversationHTML = `
        <div class="brand-header">
            <img src="${config.branding.logo}" alt="Brand Logo" />
            <span>${config.branding.name}</span>
            <button class="close-button" title="Close">×</button>
        </div>
        <div class="new-conversation">
            <h3 class="welcome-text">${config.branding.welcomeText}</h3>
            <button class="new-chat-btn" type="button">
                <svg class="message-icon" viewBox="0 0 24 24">
                    <path d="M21 6.5a2.5 2.5 0 0 0-2.5-2.5h-11a2.5 2.5 0 0 0-2.5 2.5v11a2.5 2.5 0 0 0 2.5 2.5h11a2.5 2.5 0 0 0 2.5-2.5v-11Z" fill="none" stroke="white" stroke-width="2"/>
                    <path d="M8 9h8M8 13h8M8 17h5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                New Conversation
            </button>
            <p class="response-text">${config.branding.responseTimeText}</p>
        </div>
    `;
    chatContainer.innerHTML = newConversationHTML;

    // Build chat interface (input + messages)
    const chatInterface = document.createElement('div');
    chatInterface.className = 'chat-interface';
    chatInterface.innerHTML = `
        <div class="chat-messages"></div>
        <div class="chat-input">
            <textarea placeholder="Type your message..."></textarea>
            <button type="button">Send</button>
        </div>
        <div class="chat-footer">
            <a href="${config.branding.poweredBy.link}" target="_blank" rel="noopener noreferrer">${config.branding.poweredBy.text}</a>
        </div>
    `;
    chatContainer.appendChild(chatInterface);
    widgetContainer.appendChild(chatContainer);

    // Add chat toggle button (floating icon)
    const chatToggle = document.createElement('button');
    chatToggle.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
    chatToggle.title = 'Chat with us';
    chatToggle.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
    `;
    widgetContainer.appendChild(chatToggle);
    document.body.appendChild(widgetContainer);

    // DOM references
    const openBtn = chatToggle;
    const closeBtns = widgetContainer.querySelectorAll('.close-button');
    const newChatBtn = widgetContainer.querySelector('.new-chat-btn');
    const newConversationDiv = widgetContainer.querySelector('.new-conversation');
    const chatInterfaceDiv = chatInterface;
    const messagesContainer = chatInterfaceDiv.querySelector('.chat-messages');
    const inputTextarea = chatInterfaceDiv.querySelector('textarea');
    const sendBtn = chatInterfaceDiv.querySelector('button[type="button"]');

    // Helper: Generate UUID session ID
    function generateSessionId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0,
                  v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Open chat: show welcome screen + move toggle
    function openChat() {
        chatContainer.classList.add('open');
        chatInterfaceDiv.classList.remove('active');
        newConversationDiv.style.display = 'block';
        openBtn.classList.add('open'); // Move toggle up
        inputTextarea.value = '';
        messagesContainer.innerHTML = '';
    }

    // Start a new session
    function startNewConversation() {
        currentSessionId = generateSessionId();
        newConversationDiv.style.display = 'none';
        chatInterfaceDiv.classList.add('active');
        inputTextarea.focus();
    }

    // Close the chat window
    function closeChat() {
        chatContainer.classList.remove('open');
        openBtn.classList.remove('open'); // Return toggle to normal position
    }

    // Append new message to chat
    function appendMessage(text, sender = 'bot') {
        const messageEl = document.createElement('div');
        messageEl.className = `chat-message ${sender}`;
        messageEl.textContent = text;
        messagesContainer.appendChild(messageEl);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Send a message to n8n webhook and handle reply
    async function sendMessage(message) {
        if (!config.webhook.url) {
            appendMessage("Error: Webhook URL is not configured.", 'bot');
            return;
        }

        appendMessage(message, 'user');

        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: currentSessionId,
                    chatInput: message
                })
            });

            if (!response.ok) {
                appendMessage("Error: Failed to get response from server.", 'bot');
                return;
            }

            const data = await response.json();
            appendMessage(data.reply || "No reply from server.", 'bot');

        } catch (error) {
            appendMessage("Network error: Could not send message.", 'bot');
        }
    }

    // --- Event listeners ---
    openBtn.addEventListener('click', openChat);
    closeBtns.forEach(btn => btn.addEventListener('click', closeChat));
    newChatBtn.addEventListener('click', startNewConversation);
    sendBtn.addEventListener('click', () => {
        const text = inputTextarea.value.trim();
        if (text) {
            sendMessage(text);
            inputTextarea.value = '';
        }
    });
    inputTextarea.addEventListener('keydown
