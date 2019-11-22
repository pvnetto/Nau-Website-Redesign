const infoTitle = document.querySelector('.unit-page-info-title h2');
const contactContainer = document.querySelector('.unit-page-info-contact');
const addressContainer = document.querySelector('.unit-page-info-address');

const getQueryVariable = (variable) => {
    // window.location is the URL for the current page
    let query = window.location.search.substring(1);

    // Splits URL variables into multiple strings
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] === variable) {
            return decodeURIComponent(pair[1].replace(/\+/g, "%20"));
        }
    }
}

const updatePageInfo = (unitData) => {
    infoTitle.textContent = `NAU Frutos do Mar - ${unitData.location}`;

    // Updates contact info
    const phoneInfo = document.createElement('p');
    phoneInfo.textContent = `Tel.: ${unitData.phone}`;
    const emailInfo = document.createElement('p');
    emailInfo.textContent = `Email: ${unitData.email}`;

    contactContainer.appendChild(phoneInfo);
    contactContainer.appendChild(emailInfo);

    // Updates address info
    const addressInfo = document.createElement('p');
    addressInfo.textContent = unitData.address;

    addressContainer.appendChild(addressInfo);
}

const init = async () => {
    const unit = getQueryVariable('unit');

    const unitsResponse = await fetch('./assets/units.json');
    const unitsData = await unitsResponse.json();
    const unitData = unitsData[unit];

    updatePageInfo(unitData);
}

init();
