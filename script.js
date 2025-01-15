// Select elements
const nav = document.querySelector("header");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links li");
const footer = document.querySelector("footer");
const main = document.querySelector("main");
let lastScrollTop = 0;

// Add index to nav items for staggered animation
navItems.forEach((item, index) => {
   item.style.setProperty("--i", index);
});

// Toggle hamburger menu
hamburger.addEventListener("click", (e) => {
   e.stopPropagation();
   hamburger.classList.toggle("active");
   navLinks.classList.toggle("active");
   footer.classList.toggle("hidden"); // Toggle footer visibility
   main.classList.toggle("hidden"); // Toggle footer visibility
   document.body.classList.toggle("no-scroll"); // Prevent scrolling
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
   if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      footer.classList.remove("hidden"); // Show footer
      main.classList.remove("hidden"); // Show footer
      document.body.classList.remove("no-scroll");
   }
});

// Handle scroll behavior
window.addEventListener(
   "scroll",
   () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Only hide nav if menu is closed
      if (!navLinks.classList.contains("active")) {
         if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            nav.style.transform = "translateY(-100%)";
         } else {
            // Scrolling up
            nav.style.transform = "translateY(0)";
         }
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
   },
   { passive: true }
);

// // Close menu on window resize if open
// window.addEventListener("resize", () => {
//    if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
//       hamburger.classList.remove("active");
//       navLinks.classList.remove("active");
//    }
// });

// // Close menu when clicking a nav link
// navLinks.addEventListener("click", (e) => {
//    if (e.target.tagName === "A") {
//       hamburger.classList.remove("active");
//       navLinks.classList.remove("active");
//    }
// });

document.addEventListener("DOMContentLoaded", function () {
   const modal = document.getElementById("galleryModal");
   const galleryButtons = document.querySelectorAll(".view-gallery-btn");
   const closeButton = document.querySelector(".close-button");
   const prevButton = document.querySelector(".nav-button.prev");
   const nextButton = document.querySelector(".nav-button.next");
   const galleryView = document.querySelector(".gallery-view");
   const dotsContainer = document.querySelector(".dots-container");

   // Array of image paths
   const images = [
      "assets/pic.jpg", // Replace with your image paths
      "assets/pic2.jpg",
      "assets/pic3.jpg",
   ];

   let currentImageIndex = 0;

   // Create dots for navigation
   function createDots() {
      images.forEach((_, index) => {
         const dot = document.createElement("div");
         dot.className = `dot ${index === 0 ? "active" : ""}`;
         dot.addEventListener("click", () => showImage(index));
         dotsContainer.appendChild(dot);
      });
   }

   // Show specific image
   function showImage(index) {
      const currentImage = galleryView.querySelector(".gallery-image.active");
      if (currentImage) {
         currentImage.classList.remove("active");
      }

      // Update dots
      document.querySelectorAll(".dot").forEach((dot, i) => {
         dot.classList.toggle("active", i === index);
      });

      // Create and show new image
      const newImage = document.createElement("img");
      newImage.src = images[index];
      newImage.alt = `Gallery Image ${index + 1}`;
      newImage.className = "gallery-image";

      galleryView.appendChild(newImage);

      // Trigger reflow
      newImage.offsetHeight;

      // Add active class for transition
      newImage.classList.add("active");

      // Remove old images
      setTimeout(() => {
         Array.from(galleryView.children).forEach((child) => {
            if (child !== newImage) {
               child.remove();
            }
         });
      }, 500);

      currentImageIndex = index;
   }

   // Event Listeners
   galleryButtons.forEach((button) => {
      button.addEventListener("click", () => {
         modal.classList.add("active");
         showImage(0);
      });
   });

   closeButton.addEventListener("click", () => {
      modal.classList.remove("active");
      document.body.classList.toggle("no-scroll"); // Prevent scrolling
   });

   prevButton.addEventListener("click", () => {
      const newIndex =
         currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
      showImage(newIndex);
   });

   nextButton.addEventListener("click", () => {
      const newIndex =
         currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
      showImage(newIndex);
   });

   // Close modal when clicking outside
   modal.addEventListener("click", (e) => {
      if (ed.target === modal) {
         modal.classList.remove("active");
      }
   });

   // Handle keyboard navigation
   document.addEventListener("keydown", (e) => {
      if (!modal.classList.contains("active")) return;

      switch (e.key) {
         case "ArrowLeft":
            prevButton.click();
            break;
         case "ArrowRight":
            nextButton.click();
            break;
         case "Escape":
            closeButton.click();
            break;
      }
   });

   // Initialize dots
   createDots();
});

// Initialize EmailJS
// Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
(function () {
   emailjs.init("_sOkdmZ502mDI4GaU");
})();

// Get the form element
const contactForm = document.getElementById("contactForm");
const submitBtn = contactForm.querySelector(".submit-btn");

// Add submit event listener to the form
contactForm.addEventListener("submit", function (e) {
   e.preventDefault();

   // Disable the submit button during processing
   submitBtn.disabled = true;
   submitBtn.textContent = "Sending...";

   // Get form data
   const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value,
   };

   // Send email using EmailJS
   // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS service and template IDs
   emailjs
      .send("service_7s1d8gf", "template_ricyrlu", {
         from_name: formData.name,
         from_email: formData.email,
         phone_number: formData.phone,
         message: formData.message,
      })
      .then(function (response) {
         // Show success message
         showMessage("Message sent successfully!", "success");

         // Reset form
         contactForm.reset();
      })
      .catch(function (error) {
         // Show error message
         showMessage("Failed to send message. Please try again.", "error");
         console.error("EmailJS Error:", error);
      })
      .finally(function () {
         // Re-enable submit button
         submitBtn.disabled = false;
         submitBtn.textContent = "Send Message";
      });
});

// Function to show message to user
function showMessage(message, type) {
   // Create message element
   const messageDiv = document.createElement("div");
   messageDiv.className = `message ${type}`;
   messageDiv.textContent = message;

   // Insert message before the form
   contactForm.parentNode.insertBefore(messageDiv, contactForm);

   // Remove message after 5 seconds
   setTimeout(() => {
      messageDiv.remove();
   }, 5000);
}
