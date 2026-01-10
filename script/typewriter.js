// Typewriter effect
const TYPEWRITER_TEXTS = ['HIYA', 'SALUT', 'HEY'];
const TYPEWRITER_SPEEDS = { type: 100, erase: 80, pause: 800, nextWord: 300 };

let currentIndex = 0;

function typeWriter() {
  const typewriterElement = document.getElementById('typewriter');
  if (!typewriterElement) return;
  
  const currentText = TYPEWRITER_TEXTS[currentIndex];
  let charIndex = 0;
  
  // Start with invisible character to maintain height
  typewriterElement.textContent = '\u00A0'; // Non-breaking space
  
  // Type out the text
  const typeInterval = setInterval(() => {
    typewriterElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    
    if (charIndex >= currentText.length) {
      clearInterval(typeInterval);
      
      // Wait before erasing
      setTimeout(() => {
        // Erase the text
        let eraseIndex = currentText.length;
        const eraseInterval = setInterval(() => {
          const remainingText = currentText.substring(0, eraseIndex - 1);
          typewriterElement.textContent = remainingText || '\u00A0'; // Use non-breaking space when empty
          eraseIndex--;
          
          if (eraseIndex <= 0) {
            clearInterval(eraseInterval);
            currentIndex = (currentIndex + 1) % TYPEWRITER_TEXTS.length;
            
            // Wait before typing next word
            setTimeout(typeWriter, TYPEWRITER_SPEEDS.nextWord);
          }
        }, TYPEWRITER_SPEEDS.erase);
      }, TYPEWRITER_SPEEDS.pause);
    }
  }, TYPEWRITER_SPEEDS.type);
}

// Start typewriter effect
setTimeout(typeWriter, 1000);
