let gameState = {
            score: 0,
            level: 1,
            isGameOver: false,
            isJumping: false,
            obstacleSpeed: 8,
            spawnRate: 0.003,
            canSpawn: true
        };

        // High scores management - make globally accessible
        let highScores = [];
        window.highScores = highScores;
        
        // Get settings from global variable or use defaults
        function getSettings() {
            return window.gameSettings || {
                difficulty: 'normal',
                hints: true,
                sound: true,
                codeHighlight: true,
                theme: 'dark',
                fontSize: 'medium'
            };
        }
        
        function loadHighScores() {
            // Since we can't use localStorage, we'll keep scores in memory for the session
            if (highScores.length === 0) {
                // Initialize with some sample scores
                highScores = [
                    { initials: 'DEV', score: 150, level: 4 },
                    { initials: 'C#K', score: 120, level: 3 },
                    { initials: 'PRO', score: 100, level: 3 },
                    { initials: 'NEW', score: 80, level: 2 },
                    { initials: 'BIE', score: 50, level: 1 }
                ];
                window.highScores = highScores; // Keep global reference
            }
            updateHighScoresDisplay();
        }

        function saveHighScore() {
            const initials = initialsInput.value.toUpperCase().trim() || 'AAA';
            highScores.push({
                initials: initials,
                score: gameState.score,
                level: gameState.level
            });
            
            // Sort by score descending
            highScores.sort((a, b) => b.score - a.score);
            
            // Keep only top 10
            highScores = highScores.slice(0, 10);
            window.highScores = highScores; // Update global reference
            
            updateHighScoresDisplay();
            restartGame();
        }

        function updateHighScoresDisplay() {
            const currentHigh = highScores.length > 0 ? highScores[0].score : 0;
            currentHighElement.textContent = currentHigh;
            
            scoresListElement.innerHTML = '';
            highScores.forEach((entry, index) => {
                const div = document.createElement('div');
                div.className = 'score-entry';
                if (entry.score === gameState.score && !gameState.isGameOver) {
                    div.className += ' new-score';
                }
                div.innerHTML = `
                    <span>${index + 1}. ${entry.initials}</span>
                    <span>L${entry.level} - ${entry.score}</span>
                `;
                scoresListElement.appendChild(div);
            });
        }

        function isNewHighScore() {
            return highScores.length < 10 || gameState.score > highScores[highScores.length - 1].score;
        }

        const player = document.getElementById('player');
        const commandInput = document.getElementById('commandInput');
        const scoreElement = document.getElementById('score');
        const levelElement = document.getElementById('level');
        const gameOverScreen = document.getElementById('gameOver');
        const finalScoreElement = document.getElementById('finalScore');
        const hintElement = document.getElementById('hint');
        const correctFeedback = document.getElementById('correctFeedback');
        const wrongFeedback = document.getElementById('wrongFeedback');
        const levelUpElement = document.getElementById('levelUp');
        const currentHighElement = document.getElementById('currentHigh');
        const highScoresElement = document.getElementById('highScores');
        const scoresListElement = document.getElementById('scoresList');
        const newHighScoreElement = document.getElementById('newHighScore');
        const regularRestartElement = document.getElementById('regularRestart');
        const initialsInput = document.getElementById('initialsInput');
        const finalLevelElement = document.getElementById('finalLevel');

        // Valid C# jump commands for different levels
        const validCommands = {
            1: ['Jump()', 'jump()', 'player.Jump()', 'character.Jump()'],
            2: ['Jump();', 'player.Jump();', 'character.Jump();'],
            3: ['if(true) Jump();', 'if(obstacle) Jump();', 'if(canJump) Jump();'],
            4: ['int x = 5; Jump();', 'bool canJump = true; Jump();', 'string name = "hero"; Jump();'],
            5: ['for(int i=0; i<1; i++) Jump();', 'while(canJump) { Jump(); break; }'],
            6: ['public void Jump() { }', 'private void Move() { Jump(); }', 'void Jump() => Move();'],
            7: ['try { Jump(); } catch { }', 'if(health > 0) Jump(); else Die();'],
            8: ['class Player { public void Jump() { } }', 'Player p = new Player(); p.Jump();'],
            9: ['using System; Console.WriteLine("Jump!"); Jump();', 'namespace Game { public void Jump() { } }'],
            10: ['public class Hero { public void Jump() => transform.Translate(Vector3.up); }', 'Hero hero = new Hero(); hero.Jump();']
        };

        const hints = {
            1: 'Method calls: Jump() or player.Jump()',
            2: 'Add semicolons: Jump(); or player.Jump();',
            3: 'Use conditionals: if(true) Jump();',
            4: 'Declare variables: int x = 5; Jump();',
            5: 'Use loops: for(int i=0; i<1; i++) Jump();',
            6: 'Define methods: public void Jump() { }',
            7: 'Exception handling: try { Jump(); } catch { }',
            8: 'Create classes: class Player { public void Jump() { } }',
            9: 'Namespaces: using System; Console.WriteLine("Jump!");',
            10: 'Full OOP: public class Hero { public void Jump() => Move(); }'
        };

        let obstacles = [];
        let gameLoop;

        function initGame() {
            const settings = getSettings();
            
            // Apply difficulty settings
            let baseSpeed = 8;
            let baseSpawnRate = 0.003;
            
            switch(settings.difficulty) {
                case 'easy':
                    baseSpeed = 10; // Slower obstacles
                    baseSpawnRate = 0.002; // Less frequent spawning
                    break;
                case 'hard':
                    baseSpeed = 6; // Faster obstacles
                    baseSpawnRate = 0.004; // More frequent spawning
                    break;
                default: // normal
                    baseSpeed = 8;
                    baseSpawnRate = 0.003;
            }
            
            gameState = {
                score: 0,
                level: 1,
                isGameOver: false,
                isJumping: false,
                obstacleSpeed: baseSpeed,
                spawnRate: baseSpawnRate,
                canSpawn: true
            };
            
            obstacles = [];
            updateUI();
            updateHint();
            loadHighScores();
            
            // Clear existing obstacles
            document.querySelectorAll('.obstacle').forEach(obs => obs.remove());
            
            gameLoop = setInterval(updateGame, 50);
            commandInput.focus();
        }

        function updateUI() {
            scoreElement.textContent = gameState.score;
            levelElement.textContent = gameState.level;
        }

        function updateHint() {
            const settings = getSettings();
            if (settings.hints) {
                hintElement.textContent = hints[gameState.level] || hints[10];
                hintElement.style.display = 'block';
            } else {
                hintElement.style.display = 'none';
            }
        }

        function showLevelUp() {
            levelUpElement.style.opacity = '1';
            setTimeout(() => {
                levelUpElement.style.opacity = '0';
            }, 2000);
        }

        function showFeedback(isCorrect) {
            const feedback = isCorrect ? correctFeedback : wrongFeedback;
            feedback.style.opacity = '1';
            setTimeout(() => {
                feedback.style.opacity = '0';
            }, 1000);
        }

        function jump() {
            if (gameState.isJumping || gameState.isGameOver) return;
            
            gameState.isJumping = true;
            player.classList.add('jumping');
            
            // Play sound effect if enabled
            const settings = getSettings();
            if (settings.sound) {
                playJumpSound();
            }
            
            setTimeout(() => {
                player.classList.remove('jumping');
                setTimeout(() => {
                    gameState.isJumping = false;
                }, 100); // Small delay to prevent double jumps
            }, 800); // Increased jump duration for better obstacle clearance
        }

        function playJumpSound() {
            // Simple sound effect using Web Audio API
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.1);
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.2);
            } catch (e) {
                // Fallback if Web Audio API isn't supported
                console.log('Jump sound effect would play here');
            }
        }

        function isValidCommand(command) {
            const currentLevelCommands = validCommands[gameState.level] || validCommands[10];
            return currentLevelCommands.some(valid => 
                command.trim() === valid ||
                command.trim().toLowerCase() === valid.toLowerCase()
            );
        }

        function spawnObstacle() {
            // Only spawn if no obstacles exist and spawning is allowed
            if (obstacles.length === 0 && gameState.canSpawn && Math.random() < gameState.spawnRate) {
                const obstacle = document.createElement('div');
                obstacle.className = 'obstacle';
                obstacle.style.animationDuration = `${gameState.obstacleSpeed}s`;
                document.querySelector('.game-container').appendChild(obstacle);
                obstacles.push({
                    element: obstacle,
                    startTime: Date.now(),
                    duration: gameState.obstacleSpeed * 1000
                });
                gameState.canSpawn = false;
                
                const settings = getSettings();
                
                // Show hint immediately when obstacle spawns (if hints are enabled)
                if (settings.hints) {
                    hintElement.classList.remove('hidden', 'danger');
                    hintElement.style.opacity = '1';
                    
                    // Hide hint when obstacle gets close (70% of the way)
                    setTimeout(() => {
                        hintElement.classList.add('danger');
                    }, gameState.obstacleSpeed * 700); // 70% of duration
                    
                    // Completely hide hint when very close (85% of the way)
                    setTimeout(() => {
                        hintElement.classList.add('hidden');
                    }, gameState.obstacleSpeed * 850); // 85% of duration
                }
                
                // Remove obstacle after animation and allow next spawn
                setTimeout(() => {
                    if (obstacle.parentNode) {
                        obstacle.remove();
                        obstacles = obstacles.filter(obs => obs.element !== obstacle);
                        gameState.score += 10;
                        updateUI();
                        
                        // Reset hint visibility (if hints are enabled)
                        if (settings.hints) {
                            hintElement.classList.remove('hidden', 'danger');
                            hintElement.style.opacity = '1';
                        }
                        
                        // Wait a bit before allowing next obstacle
                        setTimeout(() => {
                            gameState.canSpawn = true;
                        }, 2000); // 2 second gap between obstacles
                        
                        // Level up every 50 points
                        if (gameState.score % 50 === 0 && gameState.level < 10) {
                            gameState.level++;
                            gameState.obstacleSpeed = Math.max(4, gameState.obstacleSpeed - 0.4);
                            updateHint();
                            showLevelUp();
                        }
                    }
                }, gameState.obstacleSpeed * 1000);
            }
        }

        function checkCollisions() {
            const playerRect = player.getBoundingClientRect();
            
            obstacles.forEach(obstacleData => {
                const obstacle = obstacleData.element;
                const obstacleRect = obstacle.getBoundingClientRect();
                
                if (playerRect.left < obstacleRect.right &&
                    playerRect.right > obstacleRect.left &&
                    playerRect.bottom > obstacleRect.top &&
                    playerRect.top < obstacleRect.bottom &&
                    !gameState.isJumping) {
                    gameOver();
                }
            });
        }

        function updateGame() {
            if (gameState.isGameOver) return;
            
            spawnObstacle();
            checkCollisions();
        }

        function gameOver() {
            gameState.isGameOver = true;
            clearInterval(gameLoop);
            finalScoreElement.textContent = gameState.score;
            finalLevelElement.textContent = gameState.level;
            
            if (isNewHighScore()) {
                newHighScoreElement.style.display = 'block';
                regularRestartElement.style.display = 'none';
                initialsInput.focus();
            } else {
                newHighScoreElement.style.display = 'none';
                regularRestartElement.style.display = 'block';
            }
            
            gameOverScreen.style.display = 'block';
        }

        function restartGame() {
            gameOverScreen.style.display = 'none';
            clearInterval(gameLoop);
            document.querySelectorAll('.obstacle').forEach(obs => obs.remove());
            initGame();
        }

        // Event listeners
        commandInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !gameState.isJumping) {
                const command = this.value.trim();
                const settings = getSettings();
                
                if (isValidCommand(command)) {
                    jump();
                    showFeedback(true);
                    this.value = '';
                    
                    // Apply code highlighting if enabled
                    if (settings.codeHighlight) {
                        this.style.backgroundColor = '#4CAF50';
                        setTimeout(() => {
                            this.style.backgroundColor = '';
                        }, 200);
                    }
                } else {
                    showFeedback(false);
                    this.style.borderColor = '#f44336';
                    setTimeout(() => {
                        this.style.borderColor = '#333';
                    }, 500);
                }
            }
        });

        // Handle initials input
        initialsInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                saveHighScore();
            }
        });

        initialsInput.addEventListener('input', function(e) {
            this.value = this.value.toUpperCase().replace(/[^A-Z]/g, '');
        });

        // Start the game
        initGame();