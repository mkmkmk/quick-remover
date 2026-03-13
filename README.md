# Quick Element Remover

Firefox extension for quickly removing unwanted elements from web pages.

## Features

- 🎯 One-click element removal
- ⌨️ Keyboard shortcut: `Alt+Shift+X`
- 🎨 Visual hover highlights
- 🔄 Easy toggle on/off

## Installation

### Manual Installation
Drag the `.xpi` file into Firefox

### Development/Temporary
1. Clone this repository
2. Go to [about:debugging](about:debugging) in Firefox
3. Click ["This Firefox" → "Load Temporary Add-on](about:debugging#/runtime/this-firefox)
4. Select `manifest.json`

## Usage

1. Press `Alt+Shift+X` to activate
2. Hover over elements (red highlight)
3. Click to remove
4. Press `Alt+Shift+X` to deactivate

## Privacy

✅ No data collection  
✅ No tracking  
✅ Works entirely locally

## Requirements

Firefox 109.0+

### Publishing to AMO (for author)
1. Create account on [addons.mozilla.org](https://addons.mozilla.org)
2. Manage your add-ons at
   [Developer Addons](https://addons.mozilla.org/pl/developers/addons)
3. Go to "Submit a New Add-on"
4. Choose "On your own" (unlisted - for self-distribution)
5. Create ZIP file:
   ```bash
   zip quick-element-remover.zip manifest.json background.js
   ```
6. Upload the ZIP file

## License

MIT
