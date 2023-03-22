// Define una lista de palabras para el juego
const words = ["libro", "ordenador", "teclado", "casa", "edificio", "elefante", "zorro"];

// Variables para controlar el estado del juego
let selectedWord = "";
let attempts = 6;
let guessedLetters = [];

// Variables para acceder a los elementos del DOM
const wordInput = document.getElementById("word-input");
const submitBtn = document.getElementById("submit-btn");
const infoBtn = document.getElementById("info-btn");
const infoPopup = document.getElementById("info-popup");
const wordLengthValue = document.getElementById("word-length-value");
const hints = document.getElementById("hints");
const message = document.getElementById("message");
const closeInfoBtn = document.getElementById("close-info-btn");

// Función para actualizar las pistas de la palabra en el DOM
function updateHints(guess) {
    const hintText = selectedWord
      .split("")
      .map((letter, index) =>
        guessedLetters.includes(letter)
          ? guess[index] === letter
            ? "[" + letter + "]"
            : selectedWord.includes(guess[index])
            ? guess[index]
            : "_"
          : "_"
      )
      .join(" ");
    hints.innerText = hintText;
  }

// Función para mostrar un mensaje en el DOM
function showMessage(text) {
    message.innerText = text;
    setTimeout(() => {
        message.innerText = "";
    }, 2000);
}

// Función para obtener una palabra aleatoria de la lista de palabras
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Función para iniciar el juego
function startGame() {
    attempts = 6;
    guessedLetters = [];
    selectedWord = getRandomWord();
    wordLengthValue.textContent = selectedWord.length;
    wordInput.setAttribute("maxlength", selectedWord.length);
}

// Evento que se ejecuta cuando se hace clic en el botón de enviar
submitBtn.addEventListener("click", () => {
    const guess = wordInput.value.toLowerCase();
    guessedLetters = [...new Set([...guessedLetters, ...guess])];

    // Comprueba que la longitud de la palabra del usuario es correcta
    if (guess.length !== selectedWord.length) {
        alert("Por favor, introduce una palabra con la longitud correcta.");
        return;
    }

    // Si el usuario adivina la palabra, muestra un mensaje de felicitación y los fuegos artificiales
    if (guess === selectedWord) {
        showMessage("¡Felicidades! Has adivinado la palabra.");
        hints.innerText = "";
        showFireworks(); // Muestra los fuegos artificiales
        setTimeout(() => {
            startGame(); // Reinicia el juego después de adivinar la palabra.
        }, 5000);
    } else {
        attempts--;

        // Si el usuario agota sus intentos, muestra un mensaje y reinicia el juego
        if (attempts <= 0) {
            alert(`Lo siento, has agotado tus intentos. La palabra era "${selectedWord}".`);
            hints.innerText = "";
            startGame(); // Reinicia el juego después de agotar los intentos.
        } else {
            // Si el usuario no adivina la palabra, actualiza las pistas y muestra un mensaje de intento restante
            updateHints(guess);
            showMessage(`Palabra incorrecta. Te quedan ${attempts} intento(s).`);
        }
    }

    wordInput.value = ""; // Limpia el campo de entrada.
});

// Evento que se ejecuta cuando se hace clic en el botón de información
infoBtn.addEventListener("click", () => {
    infoPopup.classList.toggle("hidden");
    infoPopup.classList.toggle("show");
});
    
// Función para crear los fuegos artificiales
function createFirework() {
    const celebration = document.getElementById("celebration");
    // Crea partículas de fuegos artificiales
for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.classList.add("firework-particle");
    celebration.appendChild(particle);
  }
  
  // Animación de las partículas de fuegos artificiales
  anime.timeline({
    targets: ".firework-particle",
    complete: () => {
      // Elimina las partículas de fuegos artificiales después de que la animación haya finalizado
      document.querySelectorAll(".firework-particle").forEach((particle) => {
        celebration.removeChild(particle);
      });
    },
  })
  .add({
    translateY: [-500, 0],
    translateX: () => anime.random(-200, 200),
    rotate: () => anime.random(-360, 360),
    scale: [0.5, 1],
    opacity: [
      { value: 1, duration: 100, easing: "linear" },
      { value: 0, duration: 800, easing: "easeOutQuad" },
    ],
    duration: 1000,
    delay: anime.stagger(20),
    easing: "easeOutExpo",
  })
  .add(
    {
      targets: ".firework-particle",
      backgroundColor: "#ffffff",
      duration: 1,
      delay: anime.stagger(1),
    },
    "-=400"
  );
}

// Función para mostrar los fuegos artificiales
function showFireworks() {
    console.log('mostrando fuegos artificiales');
    const celebration = document.getElementById("celebration");
    celebration.classList.remove("hidden");
    createFirework();
    setTimeout(() => {
        celebration.classList.add("hidden");
    }, 1500);
}

// Evento que se ejecuta cuando se hace clic en el botón de información
infoBtn.addEventListener("click", () => {
    infoPopup.classList.toggle("show");
});

// Evento que se ejecuta cuando se hace clic en el botón de cerrar información emergente
closeInfoBtn.addEventListener("click", () => {
    infoPopup.classList.add("hidden");
});

startGame(); // Inicia el juego al cargar la página.



