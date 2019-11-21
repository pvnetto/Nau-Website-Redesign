const customDropdownToggler = document.querySelector('.nav .nav-item .dropdown-toggle');
const customDropdown = document.querySelector('.nav .nav-item .dropdown-items');

/* Custom sidenav toggler parameters */
const sidenav = document.querySelector('.sidenav');
const customSidenavToggler = document.querySelector('.sidenav-toggler');

/* Custom sidenav toggler recolor parameters */
const togglerLines = document.querySelectorAll('.sidenav-toggler-line');
const sections = document.querySelectorAll('section');
let currentSection;

window.addEventListener('scroll', animateNavColor);
customDropdownToggler.addEventListener('click', toggleDropdown);
customSidenavToggler.addEventListener('click', toggleSidenav);

let isSidenavEnabled = false;
let isSidenavTogglerEnabled = function () {
    return window.getComputedStyle(customSidenavToggler, null).getPropertyValue('display') != 'none';
}

function toggleDropdown(e) {
    if (isSidenavEnabled) {
        customDropdown.classList.remove('toggled');
        customDropdownToggler.classList.remove('toggled');
        isSidenavEnabled = false;
    }
    else {
        customDropdown.classList.add('toggled');
        customDropdownToggler.classList.add('toggled');
        isSidenavEnabled = true;
    }
}

function toggleSidenav(e) {
    if (sidenav.classList.contains('toggled')) {
        sidenav.classList.remove('toggled');
        customSidenavToggler.classList.remove('close');
    }
    else {
        sidenav.classList.add('toggled');
        customSidenavToggler.classList.add('close');
    }
}

// Luminance values range from 0-255, 0 being the darkest and 255 the lightest
function getColorLuminance(color) {
    let r = parseInt(color[0]);
    let g = parseInt(color[1]);
    let b = parseInt(color[2]);
    let luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    return luminance;
}

function animateNavColor(e) {
    if (isSidenavTogglerEnabled()) {
        let scrollHeight = window.scrollY;
        let previousSection = currentSection;
        currentSection = undefined;

        if (isSidenavEnabled) {
            currentSection = sidenav;
        }
        else {
            sections.forEach(item => {
                // Distance from the current item's footer to the top of the page
                let itemFooterToTop = item.offsetTop + item.clientHeight;

                if (scrollHeight >= item.offsetTop && scrollHeight <= itemFooterToTop) {
                    currentSection = item;
                }
            });
        }

        // Only change the colors if the sections have changed
        if (currentSection != previousSection) {
            // If currentSection is undefined, its color is assumed to be white
            let bgColor = ['255', '255', '255'];
            if (currentSection) {
                bgColor = window.getComputedStyle(currentSection, null).getPropertyValue('background-color');
                bgColor = bgColor.replace(/[^\d,]/g, '').split(',');
            }

            let bgLuminance = getColorLuminance(bgColor);
            let newNavColor = 'rgb(0, 0, 0)';
            if (bgLuminance < 128) {
                newNavColor = 'rgb(255, 255, 255)';
            }

            // Setting the colors of the menu toggler lines
            togglerLines.forEach(togglerLine => togglerLine.style.backgroundColor = newNavColor);
        }
    }
}