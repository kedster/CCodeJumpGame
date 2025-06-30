// Create floating code elements
function createFloatingCode() {
    const codeSnippets = [
        'public class Player { }',
        'if(obstacle) Jump();',
        'for(int i=0; i<10; i++)',
        'void Jump() => Move();',
        'try { Jump(); } catch { }',
        'using System;',
        'namespace Game { }',
        'bool canJump = true;',
        'Console.WriteLine("Jump!");',
        'public void Move() { }'
    ];

    const colors = ['#4CAF50', '#00ff88', '#66bb6a', '#81c784'];
    
    setInterval(() => {
        if (Math.random() < 0.7) {
            const code = document.createElement('div');
            code.className = 'bg-code';
            code.style.top = Math.random() * 100 + 'vh';
            code.style.color = colors[Math.floor(Math.random() * colors.length)];
            code.style.fontSize = (10 + Math.random() * 8) + 'px';
            code.style.animationDuration = (15 + Math.random() * 10) + 's';
            code.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            document.body.appendChild(code);
            
            setTimeout(() => {
                if (code.parentNode) {
                    code.remove();
                }
            }, 25000);
        }
    }, 2000);
}

// Create particle effects
function createParticles() {
    setInterval(() => {
        if (Math.random() < 0.3) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particle.style.animationDuration = (8 + Math.random() * 4) + 's';
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 12000);
        }
    }, 1000);
}

// Navigation functions
function startGame() {
    showLoading();
    setTimeout(() => {
        window.location.href = 'pages/game.html';
    }, 1500);
}

function showLevels() {
    showLoading();
    setTimeout(() => {
        window.location.href = 'pages/levels.html';
    }, 1000);
}

function showHighScores() {
    // For now, redirect to game to see high scores
    showLoading();
    setTimeout(() => {
        window.location.href = 'pages/game.html';
    }, 1000);
}

function showSettings() {
    showLoading();
    setTimeout(() => {
        window.location.href = 'pages/settings.html';
    }, 1000);
}

function showAbout() {
    alert(`C# Code Jump v1.0.0

A fun educational game that teaches C# programming concepts through gameplay!

🎮 How to Play:
- Obstacles approach your character
- Type valid C# code commands to make your character jump
- Each level introduces new C# concepts
- Survive as long as possible and achieve high scores!

📚 Educational Features:
- 10 progressive levels covering C# fundamentals
- Real C# syntax validation
- From basic method calls to advanced OOP concepts

Created with ❤️ for aspiring C# developers!`);
}

function showLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'flex';
    }
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case '1':
            startGame();
            break;
        case '2':
            showLevels();
            break;
        case '3':
            showHighScores();
            break;
        case '4':
            showSettings();
            break;
        case '5':
            showAbout();
            break;
        case 'Enter':
            startGame();
            break;
    }
});

// Initialize effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createFloatingCode();
    createParticles();
    
    // Add some interactive sound effects (visual feedback)
    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});