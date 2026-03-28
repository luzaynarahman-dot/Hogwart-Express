// Mobile menu toggle functionality
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

if (menuIcon) {
  menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Close menu when clicking on a link (optional)
const navItems = document.querySelectorAll('.nav-links li a');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ========== MAGICAL GALLERY SLIDER ==========
const slides = document.querySelectorAll('.gallery-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('galleryDots');

let currentSlide = 0;
const totalSlides = slides.length;

// Create dots
function createDots() {
  dotsContainer.innerHTML = '';
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === currentSlide) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

// Update active slide
function updateSlides() {
  slides.forEach((slide, index) => {
    slide.classList.remove('active');
    if (index === currentSlide) {
      slide.classList.add('active');
    }
  });
  
  // Update dots
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.remove('active');
    if (index === currentSlide) {
      dot.classList.add('active');
    }
  });
}

// Go to specific slide
function goToSlide(index) {
  if (index < 0) index = 0;
  if (index >= totalSlides) index = totalSlides - 1;
  currentSlide = index;
  updateSlides();
}

// Next slide
function nextSlide() {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
  } else {
    currentSlide = 0; // Loop back to first
  }
  updateSlides();
}

// Previous slide
function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
  } else {
    currentSlide = totalSlides - 1; // Loop to last
  }
  updateSlides();
}

// Event listeners
if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    prevSlide();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
  }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

const sliderWrapper = document.querySelector('.gallery-slider');

if (sliderWrapper) {
  sliderWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  sliderWrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      nextSlide();
    } else if (touchEndX - touchStartX > 50) {
      prevSlide();
    }
  });
}

// Initialize gallery
createDots();
updateSlides();

// Auto-rotate gallery every 8 seconds (optional - pause on hover)
let autoRotate = setInterval(nextSlide, 8000);

const gallerySection = document.querySelector('.gallery');
if (gallerySection) {
  gallerySection.addEventListener('mouseenter', () => {
    clearInterval(autoRotate);
  });
  gallerySection.addEventListener('mouseleave', () => {
    autoRotate = setInterval(nextSlide, 8000);
  });
}

console.log('🏰 Magical Gallery loaded with', totalSlides, 'locations!');


// ========== ALUMNI MOVING PORTRAITS ==========

// Alumni Data
const alumniData = {
  harry: {
    name: "Harry James Potter",
    house: "Gryffindor",
    houseColor: "gryffindor",
    quote: "\"I'm not going to be murdered. I'm going to live, and then I'm going to be an Auror.\"",
    achievements: [
      "Defeated Lord Voldemort",
      "Head of Auror Office",
      "Master of Death",
      "Order of Merlin, First Class"
    ],
    legacy: "Harry Potter, The Boy Who Lived, became the youngest Head of Auror Office in history. His bravery during the Second Wizarding War and his role in defeating the Dark Lord cemented his place as one of the greatest wizards of all time. He later served as a frequent guest lecturer at Hogwarts, inspiring generations of young witches and wizards."
  },
  hermione: {
    name: "Hermione Jean Granger",
    house: "Gryffindor",
    houseColor: "gryffindor",
    quote: "\"I'm hoping to do some good in the world, and I think I can achieve more if I'm in a position of influence.\"",
    achievements: [
      "Minister for Magic",
      "Brightest Witch of Her Age",
      "S.P.E.W. Founder",
      "Order of Merlin, First Class"
    ],
    legacy: "Hermione Granger revolutionized the Ministry of Magic, eradicating pure-blood supremacy and championing house-elf rights. Her intellect and determination made her the youngest Minister for Magic in history. She continues to fight for equality and education in the wizarding world."
  },
  ron: {
    name: "Ronald Bilius Weasley",
    house: "Gryffindor",
    houseColor: "gryffindor",
    quote: "\"Bloody hell!\"",
    achievements: [
      "Auror at Ministry of Magic",
      "Keeper for Gryffindor",
      "Weasley's Wizard Wheezes Co-owner",
      "Order of Merlin, Second Class"
    ],
    legacy: "Ron Weasley served as an Auror alongside Harry before joining his brother George at Weasleys' Wizard Wheezes. His strategic mind and unwavering loyalty made him an invaluable friend and hero of the Second Wizarding War. He remains one of the most beloved figures in wizarding history."
  },
  draco: {
    name: "Draco Lucius Malfoy",
    house: "Slytherin",
    houseColor: "slytherin",
    quote: "\"My father will hear about this!\"",
    achievements: [
      "Reformed Death Eater",
      "Father of Scorpius Malfoy",
      "Reconciled with Harry Potter",
      "Philanthropist"
    ],
    legacy: "Draco Malfoy's journey from privileged pure-blood to a man who rejected his family's dark legacy is one of redemption. After the war, he worked tirelessly to rehabilitate the Malfoy name, becoming a respected philanthropist and raising his son Scorpius to be a force for good in the wizarding world."
  },
  neville: {
    name: "Neville Longbottom",
    house: "Gryffindor",
    houseColor: "gryffindor",
    quote: "\"I'll join you when hell freezes over.\"",
    achievements: [
      "Hero of Hogwarts",
      "Herbology Professor at Hogwarts",
      "Destroyed Nagini",
      "Order of Merlin, First Class"
    ],
    legacy: "Neville Longbottom became one of the most beloved Herbology professors in Hogwarts history. His courage during the Battle of Hogwarts, where he destroyed the final Horcrux, made him a legend. He continues to inspire students with his kindness, bravery, and expertise in magical plants."
  },
  luna: {
    name: "Luna Lovegood",
    house: "Ravenclaw",
    houseColor: "ravenclaw",
    quote: "\"Wit beyond measure is man's greatest treasure.\"",
    achievements: [
      "Renowned Magizoologist",
      "Discovered new magical creatures",
      "The Quibbler Editor",
      "Married Rolf Scamander"
    ],
    legacy: "Luna Lovegood became the world's foremost Magizoologist, discovering many previously unknown magical creatures. Her open-mindedness and unique perspective challenged the wizarding world to embrace the extraordinary. She continues her father's legacy as editor of The Quibbler."
  },
  cedric: {
    name: "Cedric Diggory",
    house: "Hufflepuff",
    houseColor: "hufflepuff",
    quote: "\"That's my son! That's my boy!\"",
    achievements: [
      "Hogwarts Champion, Triwizard Tournament",
      "Gryffindor-Hufflepuff Quidditch Seeker",
      "Head Boy",
      "Posthumous Order of Merlin"
    ],
    legacy: "Cedric Diggory's memory lives on as the embodiment of Hufflepuff values—fair play, loyalty, and integrity. His tragic death at the hands of Voldemort united Hogwarts against the Dark Lord. The Cedric Diggory Memorial Scholarship continues to support students who demonstrate exceptional character."
  },
  mcgonagall: {
    name: "Minerva McGonagall",
    house: "Gryffindor",
    houseColor: "gryffindor",
    quote: "\"I've always wanted to use that spell!\"",
    achievements: [
      "Headmistress of Hogwarts",
      "Master Transfigurer",
      "Order of Merlin, First Class",
      "Animagus (Cat)"
    ],
    legacy: "Minerva McGonagall served as Hogwarts Headmistress for over two decades, guiding the school through its most challenging times. Her fierce protection of students, unparalleled Transfiguration skills, and unwavering moral compass made her one of the greatest headmasters in Hogwarts history."
  }
};

// DOM Elements
const portraits = document.querySelectorAll('.portrait-frame');
const storyArea = document.getElementById('storyArea');

// Function to display story
function displayStory(alumniId) {
  const alumni = alumniData[alumniId];
  if (!alumni) return;
  
  // Remove active class from all portraits
  portraits.forEach(p => p.classList.remove('active'));
  
  // Add active class to clicked portrait
  const clickedPortrait = document.querySelector(`.portrait-frame[data-alumni="${alumniId}"]`);
  if (clickedPortrait) {
    clickedPortrait.classList.add('active');
  }
  
  // Get house badge color
  let houseBadgeClass = '';
  switch(alumni.houseColor) {
    case 'gryffindor':
      houseBadgeClass = 'gryffindor-badge';
      break;
    case 'slytherin':
      houseBadgeClass = 'slytherin-badge';
      break;
    case 'ravenclaw':
      houseBadgeClass = 'ravenclaw-badge';
      break;
    case 'hufflepuff':
      houseBadgeClass = 'hufflepuff-badge';
      break;
  }
  
  // Create story HTML
  const storyHTML = `
    <div class="story-content">
      <div class="story-header">
        <div class="story-icon">
          <i class="fas fa-crown"></i>
        </div>
        <div class="story-title">
          <h3>${alumni.name}</h3>
          <span class="story-house ${houseBadgeClass}">${alumni.house}</span>
        </div>
      </div>
      <div class="story-quote">
        ${alumni.quote}
      </div>
      <div class="story-achievements">
        ${alumni.achievements.map(achievement => `
          <div class="achievement">
            <i class="fas fa-trophy"></i>
            <span>${achievement}</span>
          </div>
        `).join('')}
      </div>
      <div class="story-legacy">
        <i class="fas fa-history"></i>
        <p>${alumni.legacy}</p>
      </div>
    </div>
  `;
  
  // Animate story area
  storyArea.style.opacity = '0';
  setTimeout(() => {
    storyArea.innerHTML = storyHTML;
    storyArea.style.opacity = '1';
  }, 200);
}

// Add click event to portraits
portraits.forEach(portrait => {
  portrait.addEventListener('click', () => {
    const alumniId = portrait.getAttribute('data-alumni');
    displayStory(alumniId);
  });
});

// Optional: Auto-display first alumni on page load (Harry Potter)
setTimeout(() => {
  displayStory('harry');
}, 500);

console.log('🎭 Alumni Moving Portraits loaded!');

// ========== ADMISSIONS - SUPPLIES TOGGLE ==========
const suppliesBtn = document.querySelector('.supplies-btn');
const suppliesList = document.getElementById('suppliesList');

if (suppliesBtn && suppliesList) {
  suppliesBtn.addEventListener('click', () => {
    suppliesList.classList.toggle('active');
    const icon = suppliesBtn.querySelector('.fa-chevron-down');
    if (icon) {
      icon.style.transform = suppliesList.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
    }
  });
}

// ========== SMOOTH SCROLL FOR FOOTER LINKS ==========
document.querySelectorAll('.footer a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId !== '#' && targetId !== '') {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

console.log('📜 Admissions & Footer sections loaded!');
