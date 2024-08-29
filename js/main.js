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


//==============================Esfera==============================
const words = [
  'Python', 'JavaScript', 'Java', 'PHP', 'HTML', 'CSS', 'Flask', 'MySQL', 'Laravel', 'Vue.js', 'Git', 'Bootstrap',
];

const sphere = document.getElementById('sphere');
const radius = 130;

words.forEach((word, index) => {
  const theta = Math.acos(-0.8 + (1.6 * index) / (words.length - 1)); // Ajustar el rango de theta
  const phi = Math.sqrt(words.length * Math.PI) * theta;

  const x = radius * Math.sin(theta) * Math.cos(phi);
  const y = radius * Math.sin(theta) * Math.sin(phi);
  const z = radius * Math.cos(theta);

  const wordElement = document.createElement('div');
  wordElement.className = 'word';
  wordElement.textContent = word;
  wordElement.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;

  sphere.appendChild(wordElement);
});

function updateOrientation() {
  const words = document.querySelectorAll('.word');
  words.forEach(word => {
      const transform = word.style.transform;
      const coordinates = transform.match(/translate3d\((.*)\)/)[1].split(', ').map(parseFloat);
      const [x, y, z] = coordinates;

      const angleY = Math.atan2(x, z);
      const angleX = Math.atan2(y, Math.sqrt(x * x + z * z));

      word.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${angleY}rad) rotateX(${-angleX}rad)`;
  });
}

updateOrientation();
setInterval(updateOrientation, 50);

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