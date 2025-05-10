document.addEventListener('DOMContentLoaded', function(){
  // load saved theme from localStorage
  function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      return savedTheme;
    } else {
      // check user's system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        return 'dark';
      }
      return 'light';
    }
  }
  // Set initial theme
  const currentTheme = loadTheme();
  
  // Load the header
  const headerContainer = document.getElementById('header-container');
  if (headerContainer){
    headerContainer.innerHTML = `
      <div class="nav-container">
        <div class="logo-container">
          <a href="index.html" class="logo">
            <img src="assets/logo.png" alt="Logo" />
          </a>
          <div class="site-title">Anjali Patidar</div>
        </div>
        
        <button class="mobile-menu-toggle" aria-label="Toggle navigation menu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
        
        <nav>
          <ul>
            <li><a href="index.html#home">Home</a></li>
            <li><a href="index.html#about">About</a></li>
            <li><a href="index.html#projects">Projects</a></li>
            <li><a href="resume.html">Resume</a></li>
          </ul>
        </nav>
        <button class="theme-toggle" aria-label="Toggle dark mode">
          ${currentTheme === 'dark' ? '🌙' : '☀️'}
        </button>
      </div>
    `;
    
    // highlight current page in nav
    const currentPage = location.pathname.split('/').pop().split('?')[0].split('#')[0];
    const navLinks = headerContainer.querySelectorAll('nav a');
    navLinks.forEach(link => {
      const linkHref = link.getAttribute('href').split('#')[0];
      if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')){
        link.classList.add('active');
      }
    });
    
    // Set up mobile menu toggle
    const mobileMenuToggle = headerContainer.querySelector('.mobile-menu-toggle');
    const nav = headerContainer.querySelector('nav');
    
    if (mobileMenuToggle && nav) {
      mobileMenuToggle.addEventListener('click', function() {
        mobileMenuToggle.classList.toggle('active');
        nav.classList.toggle('active');
      });
      
      // Close mobile menu when clicking outside
      document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !mobileMenuToggle.contains(event.target) && nav.classList.contains('active')) {
          nav.classList.remove('active');
          mobileMenuToggle.classList.remove('active');
        }
      });
      
      // Close mobile menu when clicking a link
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          nav.classList.remove('active');
          mobileMenuToggle.classList.remove('active');
        });
      });
    }
    
    // Set up theme toggle
    const themeToggle = headerContainer.querySelector('.theme-toggle');
    if (themeToggle){
      themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update theme toggle icon
        themeToggle.innerHTML = newTheme === 'dark' ? '🌙' : '☀️';
      });
    }
  }
  
  // Load the footer
  const footerContainer = document.getElementById('footer-container');
  if (footerContainer) {
    footerContainer.innerHTML = `
      <div class="footer-content">
        <p>&copy; ${new Date().getFullYear()} Anjali Patidar</p>
        <div class="social-links">
          <a href="https://github.com/PatidarAnjali" class="social-link" aria-label="GitHub" target="_blank">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/anjalicpatidar/" class="social-link" aria-label="LinkedIn" target="_blank">
            <i class="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    `;
  }
  
  //initialize scroll-to-top button
  const scrollTopContainer = document.getElementById('scroll-top-container');
  if (scrollTopContainer) {
    scrollTopContainer.innerHTML = `<div class="scroll-top">↑</div>`;
    
    const scrollTopButton = scrollTopContainer.querySelector('.scroll-top');
    if (scrollTopButton){
      scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
      
      // show/hide button based on scroll position
      window.addEventListener('scroll', () =>{
        if (window.scrollY > 300){
          scrollTopButton.classList.add('visible');
        } else {
          scrollTopButton.classList.remove('visible');
        }
      });
      // unitial check for scroll position
      if (window.scrollY > 300){
        scrollTopButton.classList.add('visible');
      }
    }
  }
});