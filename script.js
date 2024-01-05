// function toggleMenu() {
//   const menu = document.querySelector(".menu-links");
//   const icon = document.querySelector(".hamburger-icon");
//   menu.classList.toggle("open");
//   icon.classList.toggle("open");
// }

// function toggleMenu() {
//   const menu = document.querySelector(".menu-links");
//   const icon = document.querySelector(".hamburger-icon");
  
//   // Toggle the 'open' class for menu and icon
//   menu.classList.toggle("open");
//   icon.classList.toggle("open");
  
//   // Check if the menu is being opened
//   if (menu.classList.contains("open")) {
//     // Select all the links within the menu
//     const links = menu.querySelectorAll("a");

//     // Iterate through each link and set its target attribute
//     links.forEach(link => {
//       link.setAttribute("target", "_blank");
//     });
//   }
// }

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  
  // Toggle the 'open' class for menu and icon
  menu.classList.toggle("open");
  icon.classList.toggle("open");
  
  // Select all the links within the menu
  const links = menu.querySelectorAll("a");

  // Iterate through each link and set its target attribute
  links.forEach(link => {
    link.setAttribute("target", "_blank");
  });
}
