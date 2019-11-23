const menuTypeItems = document.querySelectorAll('.menu-page-nav .nav-item .nav-link');
const menuPageTitle = document.querySelector('.menu-page-title .display-4');
const menuPageBody = document.querySelector('.menu-page-body');
let menuItemHTML;

const loadMenu = async (menuItem) => {
    menuTypeItems.forEach(item => item.classList.remove('active'));
    menuItem.classList.add('active');

    const menuType = menuItem.dataset.menu;
    const menuResponse = await fetch(`./assets/menu/${menuType}/${menuType}.json`);
    const menuData = await menuResponse.json();

    setupMenu(menuData, menuType);
}

const setupMenu = (menuData, type) => {
    menuPageTitle.textContent = menuData.title;
    menuPageBody.innerHTML = "";    // Resets body content

    const menuFragment = document.createDocumentFragment();
    menuData.dishes.forEach(menuItemData => {
        const menuItem = document.createElement('div');
        menuItem.innerHTML = menuItemHTML;

        const itemTitle = menuItem.querySelector('.menu-page-item-title');
        const itemDescription = menuItem.querySelector('.menu-page-item-desc');
        const itemImg = menuItem.querySelector('.menu-page-item-img');

        itemTitle.textContent = menuItemData.title;
        itemDescription.textContent = menuItemData.description;
        itemImg.src = `./assets/menu/${type}/${menuItemData.img}`;

        menuFragment.appendChild(menuItem);
    });

    menuPageBody.appendChild(menuFragment);
}

const init = async () => {
    // Loads menu item HTML
    const itemResponse = await fetch('./commons/menu-item.html');
    menuItemHTML = await itemResponse.text();

    menuTypeItems.forEach(item => item.addEventListener('click', (e) => loadMenu(e.target)));
    loadMenu(menuTypeItems[0]);
}

init();