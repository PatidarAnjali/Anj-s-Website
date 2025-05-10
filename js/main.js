// contains custom functionality

document.addEventListener('DOMContentLoaded', function() {
  // page-specific initialization
  
  // add animations to your hero section??
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.classList.add('animate');
  }
  
  // or initialize project filtering
  const projectFilters = document.querySelectorAll('.project-filter');
  if (projectFilters.length > 0) {
    projectFilters.forEach(filter => {
      filter.addEventListener('click', function() {
        const category = this.getAttribute('data-filter');
        //implement filtering logic here??
      });
    });
  }
  });