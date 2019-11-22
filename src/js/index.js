let customDropdownToggler;
let customDropdown;

/* Custom sidenav toggler parameters */
let sidenav;
let customSidenavToggler;

/* Custom sidenav toggler recolor parameters */
let togglerLines;
const sections = document.querySelectorAll('section');
let currentSection;
let isSidenavEnabled = false;

const isSidenavTogglerEnabled = function () {
    return customSidenavToggler && window.getComputedStyle(customSidenavToggler, null).getPropertyValue('display') != 'none';
}

function loadComponentToPage(path, parent, initCallback) {
    return fetch(path)
        .then(componentResponse => componentResponse.text())
        .then(componentHTML => {
            parent.innerHTML = componentHTML;
            initCallback && initCallback();
        });
}

const setupSidenav = () => {
    customDropdownToggler = document.querySelector('.nav .nav-item .dropdown-toggle');
    customSidenavToggler = document.querySelector('.sidenav-toggler');
    customDropdown = document.querySelector('.nav .nav-item .dropdown-items');
    sidenav = document.querySelector('.sidenav');
    togglerLines = document.querySelectorAll('.sidenav-toggler-line');

    customDropdownToggler.addEventListener('click', toggleDropdown);
    customSidenavToggler.addEventListener('click', toggleSidenav);
}


const toggleDropdown = (e) => {
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

const toggleSidenav = (e) => {
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
const getColorLuminance = (color) => {
    let r = parseInt(color[0]);
    let g = parseInt(color[1]);
    let b = parseInt(color[2]);
    let luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    return luminance;
}

const animateNavColor = (e) => {
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

window.addEventListener('scroll', animateNavColor);

loadComponentToPage('./components/footer.html', document.querySelector('footer'));
loadComponentToPage('./components/sidenav.html', document.querySelector('nav'), setupSidenav);