# Secretaria Digital "Amanhecer" - AI Coding Instructions

## Project Overview

**Conversational AI Agent** for wellness clinics with "Organic Calm" personality. This is an MVP of a modular AI assistant that combines natural language processing with organic visual design. Zero build tools, zero npm dependencies - pure HTML/CSS/JS + Google Gemini API for instant deployment.

**Core Philosophy**: Organic calm personality reflected in both AI responses (warm, professional, contextual) and visual design (breathing animations, soft colors, gentle interactions).

## Architecture Pattern: Conversational AI Agent

### Core Conversational State
- **conversationHistory** array tracks full dialogue context
- **SYSTEM_PROMPT** defines AI personality and capabilities 
- **API integration** with Google Gemini for natural language processing
- **Chat UI state** manages message display, typing indicators, loading states

### Conversation Flow Pattern
```javascript
async function sendMessage(userMessage) {
  // 1. Add user message to history
  conversationHistory.push({role: 'user', content: userMessage});
  
  // 2. Build full context (SYSTEM_PROMPT + history)
  const fullContext = [SYSTEM_PROMPT, ...conversationHistory];
  
  // 3. Call Gemini API
  const response = await callGeminiAPI(fullContext);
  
  // 4. Add AI response to history and display
  conversationHistory.push({role: 'assistant', content: response});
  displayMessage(response, 'ai');
}
```

### Message Rendering Pattern
- **displayMessage(content, sender)** handles both user and AI messages
- **Organic animations** for message appearance (fade-in, breathing effects)
- **Contextual styling** based on message type (user vs AI)
- **ARIA attributes** for accessibility in chat interface

## Critical Workflows

### Expanding AI Capabilities
1. **Update SYSTEM_PROMPT** with new capability descriptions
2. **Add capability keywords** to AI's understanding scope
3. **Test conversation flows** to ensure proper context handling
4. **Update conversationHistory management** if needed for complex workflows
5. **Remember**: AI personality must remain "Organic Calm" - warm but professional

### Handling API Communication
- **callGeminiAPI(messages)** manages all Google Gemini interactions
- **Error handling** with graceful fallbacks for API failures
- **Rate limiting** awareness for production deployments
- **Context management** ensures conversation history stays relevant
- **Response parsing** extracts clean text from Gemini API responses

### Conversation History Management
- **conversationHistory** array maintains dialogue context
- **Context pruning** prevents token limit exceeded errors
- **Personality consistency** through SYSTEM_PROMPT reinforcement
- **Session persistence** during user interactions
- **Memory optimization** for long conversations

### Organic AI Personality Design
The AI must embody "Organic Calm" principles:
- **Warm but professional** tone in all responses
- **Concise but complete** answers (avoid verbosity)
- **Contextually aware** of previous conversation
- **Helpful and solution-oriented** approach
- **Graceful handling** of out-of-scope requests

### Chat UI Animation System
- **Message animations** with organic fade-in effects for natural conversation flow
- **Typing indicators** with breathing animations while AI processes
- **Organic transitions** between conversation states (thinking, responding, idle)
- **Subtle micro-interactions** on chat bubbles and input elements
- **Accessibility-first**: All animations respect `prefers-reduced-motion`
- **Performance optimized**: CSS transforms over JavaScript animations where possible

## Style Conventions

### CSS Architecture (`style.css`)
- **CSS Variables** define entire design system (line 1-24):
  - `--text-main: #5C5B7C` - primary text
  - `--highlight-success: #80BBA2` - success states
  - Responsive vars adjust at 1024px/768px/480px/320px breakpoints
- **Animations naming**: `gentle-*` prefix for subtle effects (float, breathe, pulse)
- **Chat-specific classes**: `.chat-container`, `.message-bubble`, `.user-message`, `.ai-message`
- **Organic design elements**: Breathing borders, subtle shadows, rounded corners (12-16px radius)
- **Accessibility first**: All animations respect `prefers-reduced-motion`

### Chat Interface Design
- **Message bubbles** with organic shapes and gentle elevation
- **Typing indicators** with animated dots and breathing effects
- **Input field** with focus states and organic border transitions
- **Scroll behavior** smooth and natural for conversation flow
- **Theme integration** - chat colors adapt to selected theme system

## Design Philosophy Rules

### "Organic Calm" AI Personality
1. **Warm but professional** tone in all AI responses
2. **Conversational flow** that feels natural, not robotic
3. **Contextual awareness** - remembers previous parts of conversation
4. **Helpful guidance** without being pushy or overwhelming
5. **Graceful error handling** - admits limitations honestly
6. **Concise communication** - avoids unnecessary verbosity
7. **Empathetic responses** - acknowledges user emotions and concerns
8. **Solution-oriented** - always tries to help or provide alternatives

### Visual "Organic Calm" Principles
1. **Breathing animations** (3-5s cycles) > abrupt transitions
2. **Stagger delays** (0.1-0.2s) create natural flow, never instant appearance
3. **Subtle elevation** (2-4px) on hover, never dramatic shadows
4. **Soft color gradients** over solid fills (`linearGradient` in SVGs)
5. **Rounded geometries** everywhere - border-radius 12-16px default
6. **Message flow** - smooth transitions between user and AI messages

### Chat Micro-interactions Expected
- Message bubbles: gentle fade-in with slight scale animation
- Typing indicator: breathing dots with organic timing
- Input field: soft glow on focus, breathing border
- Send button: subtle scale feedback on click
- Scroll behavior: smooth, natural momentum

## External Dependencies
- **Google Gemini API**: Core AI functionality - requires API_KEY configuration
- **Poppins font**: Google Fonts preconnect for performance
- **No build tools**: Serve directly with any HTTP server or double-click `index.html`
- **CORS considerations**: May need server setup for API calls in production

## Testing Patterns
- **API Key validation**: Check for valid Gemini API key before making calls
- **Fallback responses**: Graceful handling when API is unavailable
- **Conversation flow testing**: Ensure context is maintained across messages
- **Error boundary testing**: How AI handles unexpected or out-of-scope queries

## Common Gotchas
- ⚠️ API rate limiting - implement proper throttling for Gemini API calls
- ⚠️ Context window limits - manage conversationHistory size to avoid token limits
- ⚠️ CORS issues - API calls may fail in local development without proper setup
- ⚠️ Network failures - always provide fallback responses for connectivity issues
- ⚠️ Conversation state - ensure messages are properly added to history array

## File Structure
```
index.html      → Entry point, CDN links, #app container
script.js       → All logic (screens, state, validation, animations)
style.css       → Complete styling with responsive breakpoints
metadata.json   → Project metadata for deployment
README.md       → User documentation and color palette
```

---
**Key principle**: This is a conversational AI agent, not a traditional web app. Prioritize natural dialogue flow, consistent AI personality, and seamless integration between UI and AI responses.
