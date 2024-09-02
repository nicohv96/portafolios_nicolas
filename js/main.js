//==============================DOM==============================
const header = document.querySelector(".header");
const nav = document.querySelector('.nav');
const overlay = document.querySelector('.overlay');
const topButton = document.querySelector('.top-button');

const menuToggle = document.querySelector('.menu-toggle');
const burger_nav = document.querySelector('.burger-nav');

menuToggle.addEventListener('click', () => {
  burger_nav.classList.toggle('show');
  menuToggle.classList.toggle('active');
  overlay.classList.toggle('active'); 
});

overlay.addEventListener('click', () => {
  burger_nav.classList.remove('show');
  menuToggle.classList.remove('active');
  overlay.classList.remove('active');
});


window.addEventListener('resize', () => {
  if (window.innerWidth < 768) {
    nav.classList.add('disable');
    menuToggle.classList.add('show');
  }else{
    burger_nav.classList.remove('show');
    nav.classList.remove('disable');
    menuToggle.classList.remove('show');
    menuToggle.classList.remove('active');
    overlay.classList.remove('active');
  }
});

window.addEventListener("scroll", () => {
  header.classList.toggle("down",window.scrollY>0);
  topButton.classList.toggle("show",window.scrollY>0);
});

//==============================Email==============================

function getToastPosition() {
  return window.innerWidth <= 798 ? 'top' : 'top-end';
}

document.getElementById('form-contact').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (!validateForm(name, email, message)) {
    return;
  }

  Swal.fire({
    toast: true,
    position: getToastPosition(), // Usar la posición determinada
    title: 'Procesando la solicitud...',
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  fetch("https://formsubmit.co/ajax/7676a43ac97754cd00a29285390e48e1", {
    method: "POST",
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      Nombre: name,
      Email: email,
      Mensaje: message
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success === "false") {
      throw new Error(data.message);
    }
    
    Swal.close();

    Swal.fire({
      toast: true,
      position: getToastPosition(), // Usar la misma posición
      icon: 'success',
      title: 'Formulario enviado con éxito.',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
    document.getElementById('form-contact').reset();
    removeErrorStyles();
  })
  .catch(error => {
    Swal.close();

    Swal.fire({
      toast: true,
      position: toastPosition, // Usar la misma posición
      icon: 'error',
      title: 'Hubo un error al enviar el formulario. Intentalo de nuevo.',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  });
});

// Función para validar el formulario
function validateForm(name, email, message) {
  let isValid = true;

  removeErrorStyles();

  if (!name) {
    addErrorStyle(document.getElementById('name'));
    isValid = false;
  }

  if (!email || !validateEmail(email)) {
    addErrorStyle(document.getElementById('email'));
    isValid = false;
  }

  if (!message) {
    addErrorStyle(document.getElementById('message'));
    isValid = false;
  }

  if (!isValid) {
    showValidationError('Por favor, corrige los errores en los campos resaltados.');
  }

  return isValid;
}

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function showValidationError(message) {
  Swal.fire({
    icon: 'error',
    title: 'Error de validación',
    text: message,
    toast: true,
    position: getToastPosition(),
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  });
}

function addErrorStyle(field) {
  field.classList.add('input-error');
}

function removeErrorStyles() {
  document.querySelectorAll('.input-error').forEach(field => {
    field.classList.remove('input-error');
  });
}

//==============================Esfera==============================
const words = [
  'Python', 'JavaScript', 'Java', 'PHP', 'HTML', 'CSS', 'Flask', 'MySQL', 'Laravel', 'Vue.js', 'Git', 'Bootstrap'
];

const sphere = document.getElementById('sphere');
const radius = 120;
const wordElements = [];
const numWords = words.length;

words.forEach((word, index) => {
  // Distribución uniforme usando la fórmula de la esfera de Fibonacci
  const phi = Math.acos(1 - (2 * (index + 0.5)) / numWords);
  const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 0.5);

  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);

  const wordElement = document.createElement('div');
  wordElement.className = 'word';
  wordElement.textContent = word;
  wordElement.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;

  sphere.appendChild(wordElement);
  wordElements.push(wordElement);
});

let angleX = 0;
let angleY = 0;

function rotateSphere() {
  angleX += 0.01; // Velocidad de rotación en X
  angleY += 0.02; // Velocidad de rotación en Y

  sphere.style.transform = `rotateX(${angleX}rad) rotateY(${angleY}rad)`;

  wordElements.forEach(word => {
    const transform = word.style.transform;
    const coordinates = transform.match(/translate3d\((.*)\)/)[1].split(', ').map(parseFloat);
    const [x, y, z] = coordinates;

    // Mantener la orientación de las palabras frente a la cámara
    const angleYWord = Math.atan2(x, z);
    const angleXWord = Math.atan2(y, Math.sqrt(x * x + z * z));

    word.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${angleYWord}rad) rotateX(${-angleXWord}rad)`;
  });

  requestAnimationFrame(rotateSphere);
}

rotateSphere(); // Inicia la rotación


document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function() {
    this.blur(); // Quita el foco del botón después del clic
  });
});

//==============================Particulas==============================
particlesJS(
    {
        "particles": {
          "number": {
            "value": 200,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 1,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 1,
              "opacity_min": 0,
              "sync": false
            }
          },
          "size": {
            "value": 2,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 4,
              "size_min": 0.3,
              "sync": false
            }
          },
          "line_linked": {
            "enable": false,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 0.2,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 600
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": false,
              "mode": "bubble"
            },
            "onclick": {
              "enable": false,
              "mode": "repulse"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 250,
              "size": 0,
              "duration": 2,
              "opacity": 0,
              "speed": 3
            },
            "repulse": {
              "distance": 400,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": false
      }
);