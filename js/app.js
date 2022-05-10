/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navBar = document.getElementById('navbar__list');
const headerNav = document.getElementsByClassName('navbar__menu')
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * @description - checks if a specified element is currently displayed in the viewport
 * @param - accepts any HTML element
 * @returns - a boolean true or false 
*/ 
function isInViewport(element) {
    let rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight) &&
        rect.bottom <= (window.innerWidth)
    );
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


/**
 * @description - creates a 'li' element with an anchor to a specific section for each section in the document and appends the 'li' elements to the navigation bar
*/
function buildNavbar() {
    for (let section of sections) {
        let navBtn = document.createElement('li');
        let navLink = document.createElement('a');
        let linkAncr = section.attributes[0].value;
        let linkText = section.attributes[1].value;
        navBtn.appendChild(navLink);
        navLink.outerHTML = '<a class="menu__link" href=#'+linkAncr+'>'+linkText+'</a>';
        navBar.appendChild(navBtn);
    }
}


/**
 * @description - checks if each section element is inside the viewport and applies or removes the active styles based on the return value of the isInViewport function
*/
function applyActiveClass() {
    document.addEventListener('scroll', function() {
        for (let section of sections) {
            if (isInViewport(section) === true) {
                section.classList.add('in-view-active');
            }else section.classList.remove('in-view-active');
        }
    })
}


/**
 * @description - listens for a click on each navbar button and replaces the default jump behavior with a smooth scroll
*/
function linkScroll() {
    let navLinks = document.querySelectorAll('a.menu__link');

    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function(evnt) {
            evnt.preventDefault()
            sections[i].scrollIntoView({behavior:'smooth'})
        });  
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.body.onload = buildNavbar();

// Scroll to section on link click
headerNav.onload = linkScroll();

// Set sections as active
window.onscroll = applyActiveClass();

