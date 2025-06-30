// Settings management without localStorage
let gameSettings = {
    difficulty: 'normal',
    hints: true,
    sound: true,
    codeHighlight: true,
    theme: 'dark',
    fontSize: 'medium'
};

// Navigation function
function goBack() {
    window.location.href = "../menu.html";
}

// Settings functions
function changeDifficulty() {
    const difficulty = document.getElementById('difficulty').value;
    gameSettings.difficulty = difficulty;
    updateSettingsDisplay();
    
    // Visual feedback
    showSettingChanged('Difficulty changed to ' + difficulty);
}

function toggleHints() {
    const hints = document.getElementById('hints').checked;
    gameSettings.hints = hints;
    updateSettingsDisplay();
    
    showSettingChanged('Hints ' + (hints ? 'enabled' : 'disabled'));
}

function toggleSound() {
    const sound = document.getElementById('sound').checked;
    gameSettings.sound = sound;
    updateSettingsDisplay();
    
    showSettingChanged('Sound effects ' + (sound ? 'enabled' : 'disabled'));
}

function toggleCodeHighlight() {
    const codeHighlight = document.getElementById('codeHighlight').checked;
    gameSettings.codeHighlight = codeHighlight;
    updateSettingsDisplay();
    
    showSettingChanged('Code highlighting ' + (codeHighlight ? 'enabled' : 'disabled'));
}

function changeTheme() {
    const theme = document.getElementById('theme').value;
    gameSettings.theme = theme;
    updateSettingsDisplay();
    applyTheme(theme);
    
    showSettingChanged('Theme changed to ' + theme);
}

function changeFontSize() {
    const fontSize = document.getElementById('fontSize').value;
    gameSettings.fontSize = fontSize;
    updateSettingsDisplay();
    applyFontSize(fontSize);
    
    showSettingChanged('Font size changed to ' + fontSize);
}

// Data management functions
function resetHighScores() {
    if (confirm('Are you sure you want to reset all high scores? This cannot be undone.')) {
        // Reset high scores in memory
        if (window.gameHighScores) {
            window.gameHighScores = [];
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

// Update settings display (stub for UI sync)
function updateSettingsDisplay() {
    // If you have UI elements reflecting settings, update them here.
    // For now, this is a placeholder.
}

// Initialize theme and font size on load
document.addEventListener('DOMContentLoaded', function() {
    const savedSettings = JSON.parse(localStorage.getItem('gameSettings'));
    if (savedSettings) {
        gameSettings = savedSettings;
        document.getElementById('difficulty').value = gameSettings.difficulty;
        document.getElementById('hints').checked = gameSettings.hints;
        document.getElementById('sound').checked = gameSettings.sound;
        document.getElementById('codeHighlight').checked = gameSettings.codeHighlight;
        document.getElementById('theme').value = gameSettings.theme;
        document.getElementById('fontSize').value = gameSettings.fontSize;
    }
    updateSettingsDisplay();
    applyTheme(gameSettings.theme);
    applyFontSize(gameSettings.fontSize);
});