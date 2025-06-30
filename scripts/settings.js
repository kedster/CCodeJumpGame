// Settings management without localStorage (consistent with game.js)
let gameSettings = {
    difficulty: 'normal',
    hints: true,
    sound: true,
    codeHighlight: true,
    theme: 'dark',
    fontSize: 'medium'
};

// Make settings globally accessible
window.gameSettings = gameSettings;

// Navigation function - fixed path
function goBack() {
    // Navigate to menu.html in the same directory or adjust path as needed
    window.location.href = "menu.html"; // Changed from "../menu.html"
}

// Settings functions
function changeDifficulty() {
    const difficulty = document.getElementById('difficulty').value;
    gameSettings.difficulty = difficulty;
    window.gameSettings = gameSettings; // Update global reference
    updateSettingsDisplay();
    
    // Visual feedback
    showSettingChanged('Difficulty changed to ' + difficulty);
}

function toggleHints() {
    const hints = document.getElementById('hints').checked;
    gameSettings.hints = hints;
    window.gameSettings = gameSettings;
    updateSettingsDisplay();
    
    showSettingChanged('Hints ' + (hints ? 'enabled' : 'disabled'));
}

function toggleSound() {
    const sound = document.getElementById('sound').checked;
    gameSettings.sound = sound;
    window.gameSettings = gameSettings;
    updateSettingsDisplay();
    
    showSettingChanged('Sound effects ' + (sound ? 'enabled' : 'disabled'));
}

function toggleCodeHighlight() {
    const codeHighlight = document.getElementById('codeHighlight').checked;
    gameSettings.codeHighlight = codeHighlight;
    window.gameSettings = gameSettings;
    updateSettingsDisplay();
    
    showSettingChanged('Code highlighting ' + (codeHighlight ? 'enabled' : 'disabled'));
}

function changeTheme() {
    const theme = document.getElementById('theme').value;
    gameSettings.theme = theme;
    window.gameSettings = gameSettings;
    updateSettingsDisplay();
    applyTheme(theme);
    
    showSettingChanged('Theme changed to ' + theme);
}

function changeFontSize() {
    const fontSize = document.getElementById('fontSize').value;
    gameSettings.fontSize = fontSize;
    window.gameSettings = gameSettings;
    updateSettingsDisplay();
    applyFontSize(fontSize);
    
    showSettingChanged('Font size changed to ' + fontSize);
}

// Data management functions
function resetHighScores() {
    if (confirm('Are you sure you want to reset all high scores? This cannot be undone.')) {
        // Reset high scores in memory - use the same variable name as game.js
        if (window.highScores) {
            window.highScores.length = 0; // Clear the array
        }
        showSettingChanged('High scores reset successfully');
    }
}

function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This will reset all unlocked levels.')) {
        // Reset progress in memory
        if (window.gameProgress) {
            window.gameProgress = { completedLevels: 0, maxLevel: 1 };
        }
        showSettingChanged('Progress reset successfully');
    }
}

function exportSettings() {
    const settingsData = JSON.stringify(gameSettings, null, 2);
    const blob = new Blob([settingsData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'csharp-code-jump-settings.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showSettingChanged('Settings exported successfully');
}

// Apply theme changes
function applyTheme(theme) {
    document.body.className = theme + '-theme';
    
    const root = document.documentElement;
    switch(theme) {
        case 'light':
            root.style.setProperty('--bg-color', '#ffffff');
            root.style.setProperty('--text-color', '#333333');
            root.style.setProperty('--accent-color', '#2196F3');
            break;
        case 'matrix':
            root.style.setProperty('--bg-color', '#000000');
            root.style.setProperty('--text-color', '#00ff00');
            root.style.setProperty('--accent-color', '#00ff88');
            break;
        default: // dark
            root.style.setProperty('--bg-color', '#1a1a1a');
            root.style.setProperty('--text-color', '#ffffff');
            root.style.setProperty('--accent-color', '#4CAF50');
    }
}

// Apply font size changes
function applyFontSize(fontSize) {
    const root = document.documentElement;
    switch(fontSize) {
        case 'small':
            root.style.setProperty('--font-size', '14px');
            break;
        case 'large':
            root.style.setProperty('--font-size', '20px');
            break;
        default: // medium
            root.style.setProperty('--font-size', '16px');
    }
}

// Utility: Show setting changed feedback
function showSettingChanged(message) {
    let feedback = document.getElementById('settingChangedFeedback');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.id = 'settingChangedFeedback';
        feedback.style.position = 'fixed';
        feedback.style.bottom = '24px';
        feedback.style.left = '50%';
        feedback.style.transform = 'translateX(-50%)';
        feedback.style.background = 'var(--accent-color, #4CAF50)';
        feedback.style.color = 'var(--text-color, #fff)';
        feedback.style.padding = '12px 24px';
        feedback.style.borderRadius = '8px';
        feedback.style.fontSize = '1rem';
        feedback.style.zIndex = '9999';
        feedback.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
        document.body.appendChild(feedback);
    }
    feedback.textContent = message;
    feedback.style.opacity = '1';
    setTimeout(() => {
        feedback.style.opacity = '0';
    }, 1800);
}

// Update settings display
function updateSettingsDisplay() {
    // Update UI elements to reflect current settings
    if (document.getElementById('difficulty')) {
        document.getElementById('difficulty').value = gameSettings.difficulty;
    }
    if (document.getElementById('hints')) {
        document.getElementById('hints').checked = gameSettings.hints;
    }
    if (document.getElementById('sound')) {
        document.getElementById('sound').checked = gameSettings.sound;
    }
    if (document.getElementById('codeHighlight')) {
        document.getElementById('codeHighlight').checked = gameSettings.codeHighlight;
    }
    if (document.getElementById('theme')) {
        document.getElementById('theme').value = gameSettings.theme;
    }
    if (document.getElementById('fontSize')) {
        document.getElementById('fontSize').value = gameSettings.fontSize;
    }
}

// Initialize settings on load (removed localStorage dependency)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize settings display
    updateSettingsDisplay();
    applyTheme(gameSettings.theme);
    applyFontSize(gameSettings.fontSize);
    
    // Make settings globally available
    window.gameSettings = gameSettings;
});