// Function to handle scrolling and centering
function scrollToSection(event) {
    event.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
  
    if (targetSection) {
      // Calculate the offset to center the content vertically
      const windowHeight = window.innerHeight;
      const sectionHeight = targetSection.clientHeight;
      const offset = (windowHeight - sectionHeight) / 2;
  
      // Scroll to the target section and center the content
      window.scrollTo({
        top: targetSection.offsetTop - offset,
        behavior: 'smooth', // Add smooth scrolling effect
      });
    }
  }
  
  // Wait for the DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Attach the click event handler to each navigation link
    const navLinks = document.querySelectorAll('nav a');
    console.log(navLinks);
    navLinks.forEach(function (link) {
      link.addEventListener('click', scrollToSection);
    });
  });
  