(function() {
    // ... [Your existing CSS styles remain unchanged] ...

    // Load Geist font
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css';
    document.head.appendChild(fontLink);

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        /* Your existing styles here... */
        /* Add this to the existing styles */

        .n8n-chat-widget .chat-toggle.open {
            bottom: 640px !important; /* moves toggle up when chat is open */
        }

        .n8n-chat-widget .chat-toggle.position-left.open {
            bottom: 640px !important;
        }
    `;
    document.head.appendChild(styleSheet);

    // Default configuration
    const defaultConfig = {
        webhook: {
            url: '',
            route: ''
        },
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
    const config = window.ChatWidgetConfig ? 
        {
            webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
            branding: { ...defaultConfig.branding, ...window.ChatWidgetConfig.branding },
            style: { ...defaultConfig.style, ...window.ChatWidgetConfig.style }
        } : defaultConfig;

    if (window.N8NChatWidgetInitialized) return;
    window.N8NChatWidgetInitialized = true;

    let currentSessionId = '';

    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';

    widgetContainer.style.setProperty('--chat--color-primary', config.style.primaryColor);
    widgetContainer.style.setProperty('--chat--color-secondary', config.style.secondaryColor);
    widgetContainer.style.setProperty('--chat--color-background', config.style.backgroundColor);
    widgetContainer.style.setProperty('--chat--color-font', config.style.fontColor);

    const chatContainer = document.createElement('div');
    chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;

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

    const openBtn = chatToggle;
    const closeBtns = widgetContainer.querySelectorAll('.close-button');
    const newChatBtn = widgetContainer.querySelector('.new-chat-btn');
    const newConversationDiv = widgetContainer.querySelector('.new-conversation');
    const chatInterfaceDiv = chatInterface;
    const messagesContainer = chatInterfaceDiv.querySelector('.chat-messages');
    const inputTextarea = chatInterfaceDiv.querySelector('textarea');
    const sendBtn = chatInterfaceDiv.querySelector('button[type="button"]');

    function generateSessionId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function openChat() {
        chatContainer.classList.add('open');
        chatInterfaceDiv.classList.remove('active');
        newConversationDiv.style.display = 'block';
        // Instead of hiding the toggle button, move it up:
        openBtn.classList.add('open');
        inputTextarea.value = '';
        messagesContainer.innerHTML = '';
    }

    function startNewConversation() {
        currentSessionId = generateSessionId();
        newConversationDiv.style.display = 'none';
        chatInterfaceDiv.classList.add('active');
        inputTextarea.focus();
    }

    function closeChat() {
        chatContainer.classList.remove('open');
        openBtn.classList.remove('open');
    }

    function appendMessage(text, sender = 'bot') {
        const messageEl = document.createElement('div');
        messageEl.className = `chat-message ${sender}`;
        messageEl.textContent = text;
        messagesContainer.appendChild(messageEl);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async function sendMessage(message) {
        if (!config.webhook.url) {
            appendMessage("Error: Webhook URL is not configured.", 'bot');
            return;
        }

        appendMessage(message, 'user');

        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
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

            if (data.reply) {
                appendMessage(data.reply, 'bot');
            } else {
                appendMessage("No reply from server.", 'bot');
            }
        } catch (error) {
            appendMessage("Network error: Could not send message.", 'bot');
        }
    }

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

    inputTextarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendBtn.click();
        }
    });

    openBtn.style.display = 'flex';
    chatContainer.classList.remove('open');
})();
