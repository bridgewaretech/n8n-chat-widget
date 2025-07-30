# n8n-chat-widget

This GitHub script provides a customizable, embeddable chat widget designed to integrate seamlessly with websites, allowing users to interact with an n8n workflow as a backend.

N8n Chat Widget Script Summary:
This JavaScript script creates a self-contained, customizable chat widget that can be embedded into any website. It provides a user interface for chat interactions and facilitates communication with a backend N8N workflow via webhooks.

Key Features:
Embeddable Widget: The entire chat interface is generated dynamically and injected into the host webpage, making it easy to add interactive chat functionality.

Customizable Styling:

Theming: Utilizes CSS variables for primary, secondary, background, and font colors, allowing for easy branding adjustments.

Positioning: Supports placing the chat widget on either the left or right side of the screen.

Font Loading: Automatically loads the "Geist Sans" font for a modern and consistent look.

Dynamic UI Elements:

Chat Toggle Button: A floating button (typically at the bottom right/left) to open and close the chat interface.

Chat Container: The main chat window, styled with shadows and rounded borders.

Brand Header: Displays a customizable logo and name for the chat service.

New Conversation Prompt: An initial screen with a welcome message and a "New Conversation" button.

Chat Interface: The main chat area displaying messages, an input text area, and a send button.

"Powered By" Footer: Includes a customizable "Powered by n8n" link.

Session Management:

Generates a unique sessionId for each new conversation using a UUID-like format. This session ID is sent with each message to the n8n webhook, enabling stateful conversations in the backend workflow.

N8N Integration:

Communicates with an n8n workflow using fetch API requests.

Sends user messages to a specified n8n webhook URL. The message payload includes the sessionId and the chatInput (the user's message).

Receives replies from the n8n webhook and displays them in the chat interface.

Includes basic error handling for network issues or non-OK responses from the webhook.

User Interaction Handling:

Handles opening and closing the chat widget.

Manages starting new conversations, clearing previous messages, and generating a new session ID.

Processes user input from the text area, sending messages on button click or pressing Enter.

Automatically scrolls to the bottom of the chat as new messages are added.

Configuration:

Allows for external configuration via a global window.ChatWidgetConfig object. This enables developers to easily set webhook URLs, branding details (logo, name, welcome text), and styling preferences without modifying the core script.

Provides sensible default values if window.ChatWidgetConfig is not provided.

Initialization Guard: Ensures the script only runs and initializes the widget once, even if included multiple times on a page.

How it Works:
Initialization: When the script loads, it first injects the necessary CSS styles and loads the "Geist Sans" font into the document's head.

Configuration Merging: It checks for a global window.ChatWidgetConfig object. If found, it merges this user-provided configuration with default settings; otherwise, it uses only the defaults.

DOM Creation: It dynamically creates all the HTML elements for the chat widget (toggle button, chat container, header, message area, input, etc.) and appends them to the <body> of the webpage.

Event Listeners: Attaches event listeners to the chat toggle button, close buttons, new conversation button, send button, and the text input area to manage user interactions.

sendMessage Function: This asynchronous function is central to the communication.

It takes the user's message as an argument.

Appends the user's message to the chat display.

Constructs a JSON payload containing the sessionId and the chatInput.

Sends this payload as a POST request to the configured n8n webhook URL.

Awaits the response from the n8n webhook.

If the response is successful and contains a reply field, it appends the bot's reply to the chat display.

Handles potential errors during the fetch operation.

Session Management: A generateSessionId utility function creates unique identifiers for each conversation, crucial for maintaining context in the n8n workflow.

This script essentially acts as the front-end interface for an n8n-powered chatbot, handling all the visual presentation and user input, while offloading the conversational logic and backend processing to an n8n workflow.
