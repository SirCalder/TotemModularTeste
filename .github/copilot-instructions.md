# Totem de Bem-Estar "Amanhecer" - AI Coding Instructions

## Project O### Style Conventions

### CSS Architecture (`style.css`)
- **CSS Variables** define entire design system (line 1-24):
  - `--text-main: #5C5B7C` - primary text
  - `--highlight-success: #80BBA2` - success states (prices, confirmation)
  - Responsive vars adjust at 1024px/768px/480px/320px breakpoints
- **UPPERCASE EVERYWHERE**: `text-transform: uppercase` on h1, h2, p, buttons, inputs
- **Animations naming**: `gentle-*` prefix for subtle effects (float, breathe, pulse)
- **Button classes**: `.primary-button`, `.secondary-button`, `.action-button`, `.back-button`
  - Primary: white bg, border shadow on hover
  - Secondary: transparent with border, fills on hover
  - ALL buttons have uppercase + letter-spacing: 0.05em
- **Accessibility first**: All animations respect `prefers-reduced-motion` (line 1002)
- **New classes**: 
  - `.specialist-card`, `.calendar-day`, `.time-slot` - interactive booking elements
  - `.specialist-detail-card`, `.specialists-grid` - detailed professional info
  - `.price-highlight` - emphasized pricing displayinteractive kiosk system for wellness clinics with "Organic Calm" design philosophy. Zero build tools, zero npm dependencies - pure HTML/CSS/JS for instant deployment on any kiosk device.

**Accessibility First**: ALL text in UPPERCASE for better literacy accessibility. Warm, welcoming flow starting with name/birthdate before CPF.

## Architecture Pattern: State-Driven Screen Machine

### Core State Management
- **Single global state object** (`state` in `script.js` line 17-24) tracks:
  - `currentScreen` / `previousScreen` for navigation history
  - `userData` for patient info (mock API simulation)
  - `newAppointment` for booking flow state
  - `isLoading` / `error` for UI feedback
- **Screen enum** (`Screen` object) defines all possible screens - always use these constants
- Navigation: `changeScreen(Screen.X)` handles transitions + fade effects (400ms timing)

### Screen Rendering Pattern
Each screen follows this pattern:
```javascript
function renderXScreen() {
  return `<div class="screen" role="main">...</div>`;
}
```
- Renders are **pure string templates** (no JSX, no virtual DOM)
- Each render includes **full semantic HTML** with ARIA attributes
- All event listeners attached AFTER render in `addEventListeners()`
- Never modify DOM directly during render - regenerate full screen HTML

## Critical Workflows

### Adding New Screens
1. Add constant to `Screen` enum (line 4)
2. Create `renderXScreen()` function returning HTML string
3. Add case to `render()` switch statement (line 58)
4. Add event listeners in `addEventListeners()` (line 596+)
5. Use GSAP animations via `applyAdvancedAnimations()` for entrance effects
6. **Remember**: All text must be UPPERCASE (use `.toUpperCase()` or CSS `text-transform`)

### Calendar Booking System
- **Visual calendar**: Shows next 14 days with availability
- `generateCalendar(specialistId)` creates day grid based on specialist's `availableDays`
- `generateTimeSlots(specialistId, date)` shows available hours
- Interactive selection: specialist → day → time → confirmation
- State stored in `state.newAppointment` (specialistId, date, time)
- Helper functions: `addCalendarListeners()`, `addTimeSlotListeners()`

### Identification Flow (Accessibility Focused)
- **Name First**: Starts with full name (uppercase auto-applied)
- **Birth Date**: DD/MM/YYYY format with auto-masking
- **CPF Last**: Only for validation, explained to user
- Demo values: Name "João Silva", Date "01/01/1990", CPF "123.456.789-01"
- `isValidBirthDate()` validates dates, `isValidCPF()` for CPF
- `simulateApiCall()` mocks 1.5s delay + 90% success rate

### Specialists Data Structure
Each specialist in `specialists` array (line 38-79) has:
- `id`, `name`, `gender`, `specialty`, `description`
- `photo` (emoji icon), `price` (float)
- `availableDays` (array of weekday numbers 0-6)
- `availableHours` (array of time strings like "08:00")

### Animation System (Lines 852-1042)
- **Optional dependency**: GSAP + Splitting.js loaded via CDN in `index.html`
- `OrganicAnimations` class provides graceful fallbacks if libraries unavailable
- Key methods:
  - `screenTransition()`: 0.3s fade-out, 0.4s fade-in overlap
  - `interactiveFeedback()`: 2px lift on hover, 0.98 scale on click
  - `cascadeIn()`: Staggered entrance for cards (0.1s delay each)
  - `organicBreathe()`: 3s scale pulse for hero illustrations
- Check `organicAnimations.isGSAPLoaded` before using advanced animations

## Style Conventions

### CSS Architecture (`style.css`)
- **CSS Variables** define entire design system (line 1-24):
  - `--text-main: #5C5B7C` - primary text
  - `--highlight-success: #80BBA2` - success states
  - Responsive vars adjust at 1024px/768px/480px/320px breakpoints
- **Animations naming**: `gentle-*` prefix for subtle effects (float, breathe, pulse)
- **Button classes**: `.primary-button`, `.secondary-button`, `.action-button`, `.back-button`
  - Primary: white bg, border shadow on hover
  - Secondary: transparent with border, fills on hover
- **Accessibility first**: All animations respect `prefers-reduced-motion` (line 1002)

### Responsive Strategy
- Mobile-first breakpoints: 320px → 480px → 768px → 1024px → 1200px
- Font sizes scale with viewport: `--font-size-base` adjusts per breakpoint
- Touch targets minimum 44px height on mobile (line 257-262)
- Landscape mode on mobile triggers special compact layout (line 1015-1043)

## Design Philosophy Rules

### "Organic Calm" Principles
1. **Breathing animations** (3-5s cycles) > abrupt transitions
2. **Stagger delays** (0.1-0.2s) create natural flow, never instant appearance
3. **Subtle elevation** (2-4px) on hover, never dramatic shadows
4. **Soft color gradients** over solid fills (`linearGradient` in SVGs)
5. **Rounded geometries** everywhere - border-radius 12-16px default
6. **UPPERCASE TEXT**: All content in caps for accessibility (literacy support)
7. **Welcoming flow**: Name/birthdate before CPF reduces anxiety
8. **Visual selection**: Calendar/time slots show availability before asking user to type
9. **Price transparency**: Always show costs upfront (specialist cards, confirmation)

### Micro-interactions Expected
- Input fields: breathing border glow via `.input-aura` (line 373)
- Cards: 4px lift + subtle shadow on hover (line 567)
- Success states: SVG path drawing animations (line 419-428)
- Icons: 1.1x scale on parent hover (line 783)

## External Dependencies
- **GSAP 3.12.2**: CDN-loaded, check `organicAnimations.isGSAPLoaded`
- **Splitting.js**: Text animation library, optional enhancement
- **Poppins font**: Google Fonts preconnect for performance
- **No build tools**: Serve directly with any HTTP server or double-click `index.html`

## Testing Patterns
- **Mock data**: `mockUserData` (line 27) simulates API responses
- **Fake delays**: All "API calls" use `simulateApiCall()` with 1.5s timeout
- **Random names**: `getRandomPatientName()` personalizes demo experience
- **CPF examples**: Demo hint shows `123.456.789-01` in UI for users

## Common Gotchas
- ⚠️ Event listeners must be re-attached after EVERY screen render
- ⚠️ GSAP callbacks fire async - use `eventCallback("onComplete")` for sequencing
- ⚠️ CSS animations conflict with GSAP - prefer one system per element
- ⚠️ `changeScreen()` has 400ms fade timing - don't chain calls rapidly
- ⚠️ Keyboard navigation (ESC, Enter) handled globally - test all flows

## File Structure
```
index.html      → Entry point, CDN links, #app container
script.js       → All logic (screens, state, validation, animations)
style.css       → Complete styling with responsive breakpoints
metadata.json   → Project metadata for deployment
README.md       → User documentation and color palette
```

---
**Key principle**: This is a kiosk app, not a web app. Prioritize instant load, zero dependencies, and accessibility for all users including elderly patients.
