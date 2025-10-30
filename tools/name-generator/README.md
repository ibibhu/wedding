# 💍 Wedding Name Generator

A beautiful, production-ready tool for creating stunning wedding name displays that convert SVG designs to clean HTML/CSS code.

## ✨ Features

- **🎨 Live Preview**: Real-time preview of both SVG and HTML versions
- **📝 Dynamic Names**: Input any couple names with live updates
- **🎭 Multiple Fonts**: Choose from beautiful script fonts (Great Vibes, Dancing Script, Pacifico, Sacramento)
- **🌈 Color Schemes**: Pre-defined color schemes plus custom color picker
- **🎛️ Precise Controls**: Fine-tune position, rotation, and size with intuitive sliders
- **📋 Multi-Format Export**: Generate HTML, CSS, Vue, and React code
- **💾 Download Ready**: One-click download of complete HTML files
- **⌨️ Keyboard Shortcuts**: Power-user friendly shortcuts
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **🎲 Smart Presets**: Built-in and randomization options

## 🚀 Quick Start

1. Open `index.html` in your browser
2. Enter the couple's names in the input fields
3. Adjust font, colors, and positions using the controls
4. Copy the generated code or download the HTML file
5. Use in your wedding website or invitation!

## 🎛️ Controls

### Name Configuration
- **First Name & Second Name**: Dynamic text inputs
- **Font Family**: Choose from premium script fonts
- **Color Scheme**: Pre-defined themes or custom colors

### Position Controls
- **Left/Top**: Precise pixel positioning
- **Rotation**: Rotate text from -40° to +40°
- **Size**: Font size from 80px to 200px

### Actions
- **Copy HTML/CSS**: Copy formatted code to clipboard
- **Download**: Get complete HTML file
- **Reset**: Restore default positions
- **Presets**: Apply artistic arrangements
- **Randomize**: Generate random layouts

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + Shift + H`: Copy HTML code
- `Ctrl/Cmd + Shift + C`: Copy CSS code
- `Ctrl/Cmd + Shift + D`: Download HTML file
- `Ctrl/Cmd + Shift + R`: Reset positions

## 🎨 Color Schemes

### Classic
- Names: Black (#000000)
- Ampersand: Red (#c1272d)

### Elegant  
- Names: Navy Blue (#1e3a8a)
- Ampersand: Gold (#f59e0b)

### Romantic
- Names: Rose (#be185d) 
- Ampersand: Pink (#f472b6)

### Modern
- Names: Gray (#374151)
- Ampersand: Blue (#3b82f6)

### Custom
- Choose any colors with color pickers

## 📁 Project Structure

```
name-generator/
├── index.html          # Main application
├── styles.css          # Complete styling
├── app.js             # Core functionality
└── README.md          # Documentation
```

## 💻 Generated Code Examples

### HTML Output
```html
<div style="position: relative; width: 430px; height: 350px; font-family: 'Great Vibes', cursive;">
  <div style="position: absolute; left: 40px; top: 20px; font-size: 150px; color: #000; transform: rotate(-9deg); transform-origin: left bottom;">John</div>
  <div style="position: absolute; left: 290px; top: 120px; font-size: 90px; color: #c1272d; transform: rotate(-9deg); transform-origin: center;">&amp;</div>
  <div style="position: absolute; left: 170px; top: 170px; font-size: 150px; color: #000; transform: rotate(-9deg); transform-origin: left top;">Jane</div>
</div>
```

### CSS Output
```css
.wedding-names {
  position: relative;
  width: 430px;
  height: 350px;
  font-family: 'Great Vibes', cursive;
}

.wedding-names .first-name {
  position: absolute;
  left: 40px;
  top: 20px;
  font-size: 150px;
  color: #000;
  transform: rotate(-9deg);
  transform-origin: left bottom;
}
/* ... additional styles */
```

## 🔧 Customization

### Adding New Fonts
Add new fonts to the font dropdown in `index.html`:
```html
<option value="Your Font Name">Your Font Name</option>
```

Add the font import to the CSS:
```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font+Name&display=swap');
```

### Adding Color Schemes
Add new color schemes in `app.js`:
```javascript
this.colorSchemes = {
  // existing schemes...
  mytheme: { name: '#your-color', ampersand: '#your-accent-color' }
};
```

### Custom Presets
Add new position presets:
```javascript
this.presets = {
  // existing presets...
  mypreset: { 
    firstLeft: 50, firstTop: 30, firstRot: -10,
    ampLeft: 280, ampTop: 120, ampRot: -5,
    secondLeft: 160, secondTop: 180, secondRot: -8
  }
};
```

## 🌐 Browser Support

- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+

## 🤝 Contributing

This is a standalone utility tool. Feel free to:
1. Fork the project
2. Add new features
3. Submit pull requests
4. Report issues

## 📄 License

MIT License - Feel free to use in your projects!

## 🎯 Use Cases

- Wedding invitations
- Save-the-date cards  
- Wedding websites
- Engagement announcements
- Anniversary celebrations
- Event signage
- Social media graphics

## 🔮 Future Features

- [ ] SVG export functionality
- [ ] More font options
- [ ] Animation presets
- [ ] Batch processing
- [ ] Template gallery
- [ ] Social sharing
- [ ] Print-ready formats

---

**Made with ❤️ for beautiful wedding celebrations**