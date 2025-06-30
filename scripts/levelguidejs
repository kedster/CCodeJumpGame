// Navigates back to the main menu
function goBack() {
    window.location.href = "../menu.html";
}

// Updates the progress bar and text
function updateProgress() {
    const totalLevels = document.querySelectorAll('.level-card').length;
    // Get completed levels from memory storage (since localStorage isn't available)
    let completed = window.gameProgress?.completedLevels || 0;
    if (completed > totalLevels) completed = totalLevels;

    const percent = Math.round((completed / totalLevels) * 100);
    document.getElementById('progressFill').style.width = percent + '%';

    let text = '';
    if (completed === 0) {
        text = 'Complete levels to unlock advanced C# concepts!';
    } else if (completed < totalLevels) {
        text = `You have completed ${completed} of ${totalLevels} levels. Keep going!`;
    } else {
        text = 'Congratulations! You have mastered all C# concepts!';
    }
    document.getElementById('progressText').textContent = text;
}

// Initialize progress tracking
if (!window.gameProgress) {
    window.gameProgress = {
        completedLevels: 0,
        maxLevel: 1
    };
}

// Add click handlers to level cards for interaction
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    
    // Add hover effects and click handlers to level cards
    const levelCards = document.querySelectorAll('.level-card');
    levelCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const levelNumber = index + 1;
            const isUnlocked = levelNumber <= (window.gameProgress.maxLevel || 1);
            
            if (isUnlocked) {
                // Could redirect to game with specific level
                alert(`Level ${levelNumber} selected! This would start the game at level ${levelNumber}.`);
            } else {
                alert(`Level ${levelNumber} is locked! Complete previous levels to unlock.`);
            }
        });
        
        // Add visual indication of locked/unlocked levels
        const levelNumber = index + 1;
        const isUnlocked = levelNumber <= (window.gameProgress.maxLevel || 1);
        
        if (!isUnlocked) {
            card.classList.add('locked');
            card.style.opacity = '0.5';
        }
    });
});

// Function to simulate level completion (for testing)
function completeLevel(levelNumber) {
    if (!window.gameProgress) {
        window.gameProgress = { completedLevels: 0, maxLevel: 1 };
    }
    
    if (levelNumber > window.gameProgress.completedLevels) {
        window.gameProgress.completedLevels = levelNumber;
        window.gameProgress.maxLevel = Math.max(window.gameProgress.maxLevel, levelNumber + 1);
        updateProgress();
    }
}