(function() {
    // Create and inject styles
    // Added @media queries and using relative units for mobile responsive layout styles.
    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #854fff);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #6b3fd4);
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #333333);
            font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            
           @media (max-width: 600px) {
                .n8n-chat-widget .chat-container {
                    width: 95vw;
                    height: 85vh;
                    bottom: 10px;
                    right: 10px;
                    left: 10px;
                    border-radius: 8px;
                }
            
                .n8n-chat-widget .chat-toggle {
                    width: 50px;
                    height: 50px;
                    bottom: 15px;
                    right: 15px;
                }
            
                .n8n-chat-widget .chat-toggle.position-left {
                    left: 15px;
                    right: auto;
                }
            
                .n8n-chat-widget .brand-header span {
                    font-size: 16px;
                }
            
                .n8n-chat-widget .welcome-text {
                    font-size: 18px;
                }
            
                .n8n-chat-widget .new-chat-btn {
                    font-size: 14px;
                    padding: 12px 16px;
                }
            
                .n8n-chat-widget .chat-input textarea {
                    font-size: 13px;
                }
            
                .n8n-chat-widget .chat-footer a {
                    font-size: 11px;
                }
            
                .n8n-chat-widget .chat-message {
                    font-size: 13px;
                }
            }      
        }

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
            transition: color 0.2s;
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

        .n8n-chat-widget .new-conversation {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            text-align: center;
            width: 100%;
            max-width: 300px;
        }

        .n8n-chat-widget .welcome-text {
            font-size: 24px;
            font-weight: 600;
            color: var(--chat--color-font);
            margin-bottom: 24px;
            line-height: 1.3;
        }

        .n8n-chat-widget .new-chat-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            padding: 16px 24px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: transform 0.3s;
            font-weight: 500;
            font-family: inherit;
            margin-bottom: 12px;
        }

        .n8n-chat-widget .new-chat-btn:hover {
            transform: scale(1.02);
        }

        .n8n-chat-widget .message-icon {
            width: 20px;
            height: 20px;
        }

        .n8n-chat-widget .response-text {
            font-size: 14px;
            color: var(--chat--color-font);
            opacity: 0.7;
            margin: 0;
        }

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
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.5;
        }

        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            align-self: flex-end;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.2);
            border: none;
        }

        .n8n-chat-widget .chat-message.bot {
            background: var(--chat--color-background);
            border: 1px solid rgba(133, 79, 255, 0.2);
            color: var(--chat--color-font);
            align-self: flex-start;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .n8n-chat-widget .chat-input {
            padding: 16px;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
            display: flex;
            gap: 8px;
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 12px;
            border: 1px solid rgba(133, 79, 255, 0.2);
            border-radius: 8px;
            background: var(--chat--color-background);
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 14px;
        }

        .n8n-chat-widget .chat-input textarea::placeholder {
            color: var(--chat--color-font);
            opacity: 0.6;
        }

        .n8n-chat-widget .chat-input button {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 0 20px;
            cursor: pointer;
            transition: transform 0.2s;
            font-family: inherit;
            font-weight: 500;
        }

        .n8n-chat-widget .chat-input button:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 30px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
            z-index: 999;
            transition: transform 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }

        .n8n-chat-widget .chat-footer {
            padding: 8px;
            text-align: center;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
        }

        .n8n-chat-widget .chat-footer a {
            color: var(--chat--color-primary);
            text-decoration: none;
            font-size: 12px;
            opacity: 0.8;
            transition: opacity 0.2s;
            font-family: inherit;
        }

        .n8n-chat-widget .chat-footer a:hover {
            opacity: 1;
        }
    `;

    // Load Geist font
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css';
    document.head.appendChild(fontLink);

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
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
                text: 'Powered by Bridgeware Technologies',
                link: 'https://bridgewaretech.com/'
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

    // Prevent multiple initializations
    if (window.N8NChatWidgetInitialized) return;
    window.N8NChatWidgetInitialized = true;

    let currentSessionId = '';

    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';
    
    // Set CSS variables for colors
    widgetContainer.style.setProperty('--chat--color-primary', config.style.primaryColor);
    widgetContainer.style.setProperty('--chat--color-secondary', config.style.secondaryColor);
    widgetContainer.style.setProperty('--chat--color-background', config.style.backgroundColor);
    widgetContainer.style.setProperty('--chat--color-font', config.style.fontColor);

    // Fix className quotes here
    const chatContainer = document.createElement('div');
    chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;
    
    // Use template literals correctly here (wrapped in backticks)
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

    // Chat interface HTML
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

    // Create chat toggle button
    const chatToggle = document.createElement('button');
    chatToggle.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
    chatToggle.title = 'Chat with us';
    chatToggle.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
    `;
    widgetContainer.appendChild(chatToggle);

    // Append widget to body
    document.body.appendChild(widgetContainer);

    // Elements references
    const openBtn = chatToggle;
    const closeBtns = widgetContainer.querySelectorAll('.close-button');
    const newChatBtn = widgetContainer.querySelector('.new-chat-btn');
    const newConversationDiv = widgetContainer.querySelector('.new-conversation');
    const chatInterfaceDiv = chatInterface;
    const messagesContainer = chatInterfaceDiv.querySelector('.chat-messages');
    const inputTextarea = chatInterfaceDiv.querySelector('textarea');
    const sendBtn = chatInterfaceDiv.querySelector('button[type="button"]');

    // Utility: generate session ID
    function generateSessionId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Show/hide handlers
    function openChat() {
        chatContainer.classList.add('open');
        chatInterfaceDiv.classList.remove('active');
        newConversationDiv.style.display = 'block';
        openBtn.style.display = 'none';
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
        openBtn.style.display = 'flex';
    }

    // Append a message to chat
    function appendMessage(text, sender = 'bot') {
        const messageEl = document.createElement('div');
        messageEl.className = `chat-message ${sender}`;
        messageEl.textContent = text;
        messagesContainer.appendChild(messageEl);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Send message to webhook
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

    // Event listeners
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

    // Start with chat closed
    openBtn.style.display = 'flex';
    chatContainer.classList.remove('open');
})();


