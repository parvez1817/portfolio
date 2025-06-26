const themeWrapper = document.getElementById('theme-wrapper');
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');
const header = document.querySelector('.site-header');
const workItems = document.querySelectorAll('.work-item');
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.querySelector('.close-modal');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const currentYearElement = document.getElementById('current-year');
const contactForm = document.querySelector('form');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const sunIconMobile = document.getElementById('sun-icon-mobile');
const moonIconMobile = document.getElementById('moon-icon-mobile');

// Set current year in footer
currentYearElement.textContent = new Date().getFullYear();

// Check for saved theme preference or set based on user preference
const getThemePreference = () => {
  // Check if theme preference is stored in localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme;
  }
  
  // Check for system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Set theme function
const setTheme = (theme) => {
  if (theme === 'dark') {
    themeWrapper.classList.add('dark');
    // Update icons visibility
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
    sunIconMobile.classList.add('hidden');
    moonIconMobile.classList.remove('hidden');
  } else {
    themeWrapper.classList.remove('dark');
    // Update icons visibility
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
    sunIconMobile.classList.remove('hidden');
    moonIconMobile.classList.add('hidden');
  }
  
  // Save preference to localStorage
  localStorage.setItem('theme', theme);
};

// Initialize theme
setTheme(getThemePreference());

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
  const newTheme = themeWrapper.classList.contains('dark') ? 'light' : 'dark';
  setTheme(newTheme);
});

themeToggleMobile.addEventListener('click', () => {
  const newTheme = themeWrapper.classList.contains('dark') ? 'light' : 'dark';
  setTheme(newTheme);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

// Header scroll effect
const handleScroll = () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', handleScroll);

// Mobile menu functionality
mobileMenuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  // Toggle menu/close icons
  menuIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
});

// Close mobile menu when a nav link is clicked
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  });
});

// Create a modal for work items
const createModal = () => {
  if (!modal) return;
  
  workItems.forEach(item => {
    item.addEventListener('click', () => {
      const imageSrc = item.getAttribute('data-image');
      modalImage.src = imageSrc;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
  });
  
  // Close modal functionality
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.style.overflow = ''; // Re-enable scrolling
    });
  }
  
  // Close modal when clicking outside the image
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
  
  // Close modal with escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
};

// Initialize the modal
createModal();

// Form submission
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // In a real application, you would send the form data to a server
    // For this example, we'll just show a simple alert
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields.');
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
  });
}

// Add smooth scrolling behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Get the target element
    const targetId = this.getAttribute('href');
    if (targetId === '#') return; // Skip if it's just "#"
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Calculate offset to account for fixed header
      const headerHeight = header.offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - headerHeight;
      
      // Scroll to the element
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Add animation to cards when they come into view
const observeElements = () => {
  const elements = document.querySelectorAll('.project-card, .skill-category, .trait-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  elements.forEach(element => {
    // Set initial state
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    
    observer.observe(element);
  });
};

// Initialize animations when page is loaded
window.addEventListener('load', () => {
  observeElements();
});


