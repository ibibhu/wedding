class WeddingNameGenerator {
  constructor() {
    this.initializeVariables();
    this.bindEvents();
    this.loadPresets();
    this.updatePreview();
    this.generateCode();
  }

  initializeVariables() {
    // CSS Custom Properties Map
    this.cssVars = {
      firstName: '--first-name',
      secondName: '--second-name', 
      currentFont: '--current-font',
      nameColor: '--name-color',
      ampersandColor: '--ampersand-color',
      firstLeft: '--first-left',
      firstTop: '--first-top', 
      firstRot: '--first-rot',
      firstSize: '--first-size',
      ampLeft: '--amp-left',
      ampTop: '--amp-top',
      ampRot: '--amp-rot', 
      ampSize: '--amp-size',
      secondLeft: '--second-left',
      secondTop: '--second-top',
      secondRot: '--second-rot',
      secondSize: '--second-size'
    };

    // Control Elements Map
    this.controls = [
      ['firstLeft', '--first-left', 'firstLeftVal', 'px'],
      ['firstTop', '--first-top', 'firstTopVal', 'px'],
      ['firstRot', '--first-rot', 'firstRotVal', 'deg'],
      ['firstSize', '--first-size', 'firstSizeVal', 'px'],
      ['ampLeft', '--amp-left', 'ampLeftVal', 'px'],
      ['ampTop', '--amp-top', 'ampTopVal', 'px'],
      ['ampRot', '--amp-rot', 'ampRotVal', 'deg'],
      ['ampSize', '--amp-size', 'ampSizeVal', 'px'],
      ['secondLeft', '--second-left', 'secondLeftVal', 'px'],
      ['secondTop', '--second-top', 'secondTopVal', 'px'],
      ['secondRot', '--second-rot', 'secondRotVal', 'deg'],
      ['secondSize', '--second-size', 'secondSizeVal', 'px']
    ];

    // Color Schemes
    this.colorSchemes = {
      classic: { name: '#000000', ampersand: '#c1272d' },
      elegant: { name: '#1e3a8a', ampersand: '#f59e0b' },
      romantic: { name: '#be185d', ampersand: '#f472b6' },
      modern: { name: '#374151', ampersand: '#3b82f6' }
    };

    // Presets
    this.presets = {
      default: { firstLeft: 40, firstTop: 20, firstRot: -9, ampLeft: 290, ampTop: 120, ampRot: -9, secondLeft: 170, secondTop: 170, secondRot: -9 },
      centered: { firstLeft: 50, firstTop: 50, firstRot: 0, ampLeft: 200, ampTop: 140, ampRot: 0, secondLeft: 80, secondTop: 220, secondRot: 0 },
      artistic: { firstLeft: 20, firstTop: 30, firstRot: -15, ampLeft: 320, ampTop: 100, ampRot: 15, secondLeft: 150, secondTop: 180, secondRot: -12 },
      elegant: { firstLeft: 60, firstTop: 40, firstRot: -5, ampLeft: 280, ampTop: 130, ampRot: -3, secondLeft: 180, secondTop: 200, secondRot: -7 }
    };

    // Current active tab
    this.activeTab = 'html';
  }

  bindEvents() {
    // Name inputs
    this.bindElement('firstName', 'input', () => this.updateNames());
    this.bindElement('secondName', 'input', () => this.updateNames());
    
    // Font and color controls
    this.bindElement('fontFamily', 'change', () => this.updateFont());
    this.bindElement('colorScheme', 'change', () => this.updateColorScheme());
    this.bindElement('nameColor', 'input', () => this.updateCustomColors());
    this.bindElement('ampersandColor', 'input', () => this.updateCustomColors());

    // Position controls
    this.controls.forEach(([controlId, cssVar, labelId, unit]) => {
      this.bindRangeControl(controlId, cssVar, labelId, unit);
    });

    // Action buttons
    this.bindElement('copyHtmlBtn', 'click', () => this.copyToClipboard('html'));
    this.bindElement('copyCssBtn', 'click', () => this.copyToClipboard('css'));
    this.bindElement('downloadBtn', 'click', () => this.downloadHtml());
    this.bindElement('resetBtn', 'click', () => this.resetPositions());
    this.bindElement('presetBtn', 'click', () => this.applyRandomPreset());
    this.bindElement('randomBtn', 'click', () => this.randomizePositions());

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.switchTab(e.target.dataset.tab);
      });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
  }

  bindElement(id, event, handler) {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener(event, handler);
    }
  }

  bindRangeControl(controlId, cssVar, labelId, unit) {
    const control = document.getElementById(controlId);
    const label = document.getElementById(labelId);
    
    if (control && label) {
      // Set initial values
      const initialValue = control.value;
      this.setCSSVariable(cssVar, initialValue + (unit === 'deg' ? 'deg' : 'px'));
      label.textContent = initialValue + (unit === 'deg' ? '°' : 'px');

      // Bind input event
      control.addEventListener('input', () => {
        const value = control.value;
        const cssValue = value + (unit === 'deg' ? 'deg' : 'px');
        const displayValue = value + (unit === 'deg' ? '°' : 'px');
        
        this.setCSSVariable(cssVar, cssValue);
        label.textContent = displayValue;
        
        // Debounced code generation
        clearTimeout(this.codeTimeout);
        this.codeTimeout = setTimeout(() => this.generateCode(), 100);
      });
    }
  }

  updateNames() {
    const firstName = document.getElementById('firstName').value || 'First';
    const secondName = document.getElementById('secondName').value || 'Second';
    
    // Update both SVG and HTML versions
    document.querySelectorAll('.first-name').forEach(el => {
      el.textContent = firstName;
    });
    
    document.querySelectorAll('.second-name').forEach(el => {
      el.textContent = secondName;
    });

    this.generateCode();
  }

  updateFont() {
    const fontFamily = document.getElementById('fontFamily').value;
    this.setCSSVariable('--current-font', `'${fontFamily}'`);
    this.generateCode();
  }

  updateColorScheme() {
    const scheme = document.getElementById('colorScheme').value;
    const customColors = document.querySelectorAll('.custom-colors');
    
    if (scheme === 'custom') {
      customColors.forEach(el => el.style.display = 'block');
      this.updateCustomColors();
    } else {
      customColors.forEach(el => el.style.display = 'none');
      const colors = this.colorSchemes[scheme];
      if (colors) {
        this.setCSSVariable('--name-color', colors.name);
        this.setCSSVariable('--ampersand-color', colors.ampersand);
      }
    }
    this.generateCode();
  }

  updateCustomColors() {
    const nameColor = document.getElementById('nameColor').value;
    const ampersandColor = document.getElementById('ampersandColor').value;
    
    this.setCSSVariable('--name-color', nameColor);
    this.setCSSVariable('--ampersand-color', ampersandColor);
    this.generateCode();
  }

  setCSSVariable(property, value) {
    document.documentElement.style.setProperty(property, value);
  }

  getCSSVariable(property) {
    return getComputedStyle(document.documentElement).getPropertyValue(property).trim();
  }

  resetPositions() {
    const defaults = this.presets.default;
    Object.keys(defaults).forEach(key => {
      const control = document.getElementById(key);
      if (control) {
        control.value = defaults[key];
        control.dispatchEvent(new Event('input'));
      }
    });
    
    this.showSuccessMessage('Positions reset to default!');
  }

  applyRandomPreset() {
    const presetNames = Object.keys(this.presets);
    const randomPreset = presetNames[Math.floor(Math.random() * presetNames.length)];
    const preset = this.presets[randomPreset];
    
    Object.keys(preset).forEach(key => {
      const control = document.getElementById(key);
      if (control) {
        control.value = preset[key];
        control.dispatchEvent(new Event('input'));
      }
    });
    
    this.showSuccessMessage(`Applied "${randomPreset}" preset!`);
  }

  randomizePositions() {
    const ranges = {
      firstLeft: [-50, 200],
      firstTop: [0, 100], 
      firstRot: [-30, 30],
      ampLeft: [200, 350],
      ampTop: [80, 200],
      ampRot: [-30, 30],
      secondLeft: [50, 300],
      secondTop: [150, 280],
      secondRot: [-30, 30]
    };

    Object.keys(ranges).forEach(key => {
      const [min, max] = ranges[key];
      const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
      const control = document.getElementById(key);
      if (control) {
        control.value = randomValue;
        control.dispatchEvent(new Event('input'));
      }
    });
    
    this.showSuccessMessage('Positions randomized!');
  }

  generateCode() {
    const firstName = document.getElementById('firstName').value || 'First';
    const secondName = document.getElementById('secondName').value || 'Second';
    const fontFamily = document.getElementById('fontFamily').value;
    
    const values = {};
    this.controls.forEach(([controlId]) => {
      const control = document.getElementById(controlId);
      if (control) {
        values[controlId] = control.value;
      }
    });

    const nameColor = this.getCSSVariable('--name-color') || '#000000';
    const ampersandColor = this.getCSSVariable('--ampersand-color') || '#c1272d';

    const codes = {
      html: this.generateHtmlCode(firstName, secondName, fontFamily, values, nameColor, ampersandColor),
      css: this.generateCssCode(values, nameColor, ampersandColor, fontFamily),
      vue: this.generateVueCode(firstName, secondName, fontFamily, values, nameColor, ampersandColor),
      react: this.generateReactCode(firstName, secondName, fontFamily, values, nameColor, ampersandColor)
    };

    this.updateCodeOutput(codes[this.activeTab]);
  }

  generateHtmlCode(firstName, secondName, fontFamily, values, nameColor, ampersandColor) {
    return `<!-- Wedding Names HTML -->
<div style="position: relative; width: 430px; height: 350px; font-family: '${fontFamily}', cursive;">
  <div style="position: absolute; left: ${values.firstLeft}px; top: ${values.firstTop}px; font-size: ${values.firstSize}px; color: ${nameColor}; transform: rotate(${values.firstRot}deg); transform-origin: left bottom; pointer-events: none; user-select: none; white-space: nowrap;">${firstName}</div>
  <div style="position: absolute; left: ${values.ampLeft}px; top: ${values.ampTop}px; font-size: ${values.ampSize}px; color: ${ampersandColor}; transform: rotate(${values.ampRot}deg); transform-origin: center; pointer-events: none; user-select: none; white-space: nowrap; z-index: 2;">&amp;</div>
  <div style="position: absolute; left: ${values.secondLeft}px; top: ${values.secondTop}px; font-size: ${values.secondSize}px; color: ${nameColor}; transform: rotate(${values.secondRot}deg); transform-origin: left top; pointer-events: none; user-select: none; white-space: nowrap;">${secondName}</div>
</div>

<!-- Don't forget to include the font -->
<link href="https://fonts.googleapis.com/css2?family=${fontFamily.replace(' ', '+')}&display=swap" rel="stylesheet">`;
  }

  generateCssCode(values, nameColor, ampersandColor, fontFamily) {
    return `/* Wedding Names CSS */
.wedding-names {
  position: relative;
  width: 430px;
  height: 350px;
  font-family: '${fontFamily}', cursive;
}

.wedding-names .first-name {
  position: absolute;
  left: ${values.firstLeft}px;
  top: ${values.firstTop}px;
  font-size: ${values.firstSize}px;
  color: ${nameColor};
  transform: rotate(${values.firstRot}deg);
  transform-origin: left bottom;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
}

.wedding-names .ampersand {
  position: absolute;
  left: ${values.ampLeft}px;
  top: ${values.ampTop}px;
  font-size: ${values.ampSize}px;
  color: ${ampersandColor};
  transform: rotate(${values.ampRot}deg);
  transform-origin: center;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
  z-index: 2;
}

.wedding-names .second-name {
  position: absolute;
  left: ${values.secondLeft}px;
  top: ${values.secondTop}px;
  font-size: ${values.secondSize}px;
  color: ${nameColor};
  transform: rotate(${values.secondRot}deg);
  transform-origin: left top;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
}

/* Don't forget to import the font */
@import url('https://fonts.googleapis.com/css2?family=${fontFamily.replace(' ', '+')}&display=swap');`;
  }

  generateVueCode(firstName, secondName, fontFamily, values, nameColor, ampersandColor) {
    return `<template>
  <div class="wedding-names">
    <div class="first-name">{{ firstName }}</div>
    <div class="ampersand">&amp;</div>
    <div class="second-name">{{ secondName }}</div>
  </div>
</template>

<script setup>
const firstName = '${firstName}'
const secondName = '${secondName}'
</script>

<style scoped>
.wedding-names {
  position: relative;
  width: 430px;
  height: 350px;
  font-family: '${fontFamily}', cursive;
}

.first-name {
  position: absolute;
  left: ${values.firstLeft}px;
  top: ${values.firstTop}px;
  font-size: ${values.firstSize}px;
  color: ${nameColor};
  transform: rotate(${values.firstRot}deg);
  transform-origin: left bottom;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
}

.ampersand {
  position: absolute;
  left: ${values.ampLeft}px;
  top: ${values.ampTop}px;
  font-size: ${values.ampSize}px;
  color: ${ampersandColor};
  transform: rotate(${values.ampRot}deg);
  transform-origin: center;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
  z-index: 2;
}

.second-name {
  position: absolute;
  left: ${values.secondLeft}px;
  top: ${values.secondTop}px;
  font-size: ${values.secondSize}px;
  color: ${nameColor};
  transform: rotate(${values.secondRot}deg);
  transform-origin: left top;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
}
</style>`;
  }

  generateReactCode(firstName, secondName, fontFamily, values, nameColor, ampersandColor) {
    return `import React from 'react';

const WeddingNames = ({ firstName = '${firstName}', secondName = '${secondName}' }) => {
  const containerStyle = {
    position: 'relative',
    width: '430px',
    height: '350px',
    fontFamily: "'${fontFamily}', cursive"
  };

  const firstNameStyle = {
    position: 'absolute',
    left: '${values.firstLeft}px',
    top: '${values.firstTop}px',
    fontSize: '${values.firstSize}px',
    color: '${nameColor}',
    transform: 'rotate(${values.firstRot}deg)',
    transformOrigin: 'left bottom',
    pointerEvents: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap'
  };

  const ampersandStyle = {
    position: 'absolute',
    left: '${values.ampLeft}px',
    top: '${values.ampTop}px',
    fontSize: '${values.ampSize}px',
    color: '${ampersandColor}',
    transform: 'rotate(${values.ampRot}deg)',
    transformOrigin: 'center',
    pointerEvents: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    zIndex: 2
  };

  const secondNameStyle = {
    position: 'absolute',
    left: '${values.secondLeft}px',
    top: '${values.secondTop}px',
    fontSize: '${values.secondSize}px',
    color: '${nameColor}',
    transform: 'rotate(${values.secondRot}deg)',
    transformOrigin: 'left top',
    pointerEvents: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap'
  };

  return (
    <div style={containerStyle}>
      <div style={firstNameStyle}>{firstName}</div>
      <div style={ampersandStyle}>&amp;</div>
      <div style={secondNameStyle}>{secondName}</div>
    </div>
  );
};

export default WeddingNames;`;
  }

  switchTab(tabName) {
    this.activeTab = tabName;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update code output
    this.generateCode();
  }

  updateCodeOutput(code) {
    const output = document.getElementById('codeOutput');
    if (output) {
      output.textContent = code;
      output.className = `language-${this.activeTab === 'vue' ? 'vue' : this.activeTab === 'react' ? 'javascript' : this.activeTab}`;
    }
  }

  async copyToClipboard(type) {
    let text = '';
    const firstName = document.getElementById('firstName').value || 'First';
    const secondName = document.getElementById('secondName').value || 'Second';
    const fontFamily = document.getElementById('fontFamily').value;
    
    const values = {};
    this.controls.forEach(([controlId]) => {
      const control = document.getElementById(controlId);
      if (control) {
        values[controlId] = control.value;
      }
    });

    const nameColor = this.getCSSVariable('--name-color') || '#000000';
    const ampersandColor = this.getCSSVariable('--ampersand-color') || '#c1272d';

    if (type === 'html') {
      text = this.generateHtmlCode(firstName, secondName, fontFamily, values, nameColor, ampersandColor);
    } else if (type === 'css') {
      text = this.generateCssCode(values, nameColor, ampersandColor, fontFamily);
    }

    try {
      await navigator.clipboard.writeText(text);
      this.showSuccessMessage(`${type.toUpperCase()} code copied to clipboard!`);
    } catch (err) {
      console.error('Failed to copy:', err);
      this.showErrorMessage('Failed to copy to clipboard');
    }
  }

  downloadHtml() {
    const firstName = document.getElementById('firstName').value || 'First';
    const secondName = document.getElementById('secondName').value || 'Second';
    const fontFamily = document.getElementById('fontFamily').value;
    
    const values = {};
    this.controls.forEach(([controlId]) => {
      const control = document.getElementById(controlId);
      if (control) {
        values[controlId] = control.value;
      }
    });

    const nameColor = this.getCSSVariable('--name-color') || '#000000';
    const ampersandColor = this.getCSSVariable('--ampersand-color') || '#c1272d';

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${firstName} & ${secondName} - Wedding Names</title>
    <link href="https://fonts.googleapis.com/css2?family=${fontFamily.replace(' ', '+')}&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: #f8fafc;
            font-family: system-ui, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        ${this.generateHtmlCode(firstName, secondName, fontFamily, values, nameColor, ampersandColor).split('\n').slice(1, -2).join('\n')}
    </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${firstName}-${secondName}-wedding-names.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    this.showSuccessMessage('HTML file downloaded!');
  }

  showSuccessMessage(message) {
    this.showMessage(message, 'success');
  }

  showErrorMessage(message) {
    this.showMessage(message, 'error');
  }

  showMessage(message, type = 'success') {
    // Create toast notification
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#16a34a' : '#dc2626'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      z-index: 9999;
      animation: slideIn 0.3s ease-out;
    `;

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideIn 0.3s ease-out reverse';
      setTimeout(() => {
        document.body.removeChild(toast);
        document.head.removeChild(style);
      }, 300);
    }, 3000);
  }

  handleKeyboardShortcuts(e) {
    if (e.ctrlKey || e.metaKey) {
      switch(e.key) {
        case 'c':
          if (e.shiftKey) {
            e.preventDefault();
            this.copyToClipboard('css');
          }
          break;
        case 'h':
          if (e.shiftKey) {
            e.preventDefault();
            this.copyToClipboard('html');
          }
          break;
        case 'd':
          if (e.shiftKey) {
            e.preventDefault();
            this.downloadHtml();
          }
          break;
        case 'r':
          if (e.shiftKey) {
            e.preventDefault();
            this.resetPositions();
          }
          break;
      }
    }
  }

  updatePreview() {
    // This method can be used for any additional preview updates
    this.generateCode();
  }

  loadPresets() {
    // Load any saved user presets from localStorage
    const savedPresets = localStorage.getItem('wedding-name-presets');
    if (savedPresets) {
      try {
        const presets = JSON.parse(savedPresets);
        this.presets = { ...this.presets, ...presets };
      } catch (e) {
        console.warn('Failed to load saved presets:', e);
      }
    }
  }

  savePreset(name, values) {
    this.presets[name] = values;
    const userPresets = Object.keys(this.presets)
      .filter(key => !['default', 'centered', 'artistic', 'elegant'].includes(key))
      .reduce((obj, key) => {
        obj[key] = this.presets[key];
        return obj;
      }, {});
    
    localStorage.setItem('wedding-name-presets', JSON.stringify(userPresets));
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.weddingGenerator = new WeddingNameGenerator();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WeddingNameGenerator;
}