const form = document.querySelector('form');
const cpfField = form.querySelector('input[name="cpf"]');

const setInputFilter = (inputField, inputFilter) => {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach((event) => {
        inputField.addEventListener(event, () => {
            if (inputFilter(inputField.value)) {
                inputField.oldValue = inputField.value;
                inputField.oldSelectionStart = inputField.selectionStart;
                inputField.oldSelectionEnd = inputField.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                inputField.value = inputField.oldValue;
                inputField.setSelectionRange(inputField.oldSelectionStart, inputField.oldSelectionEnd);
            } else {
                inputField.value = inputField.oldValue;
            }
        });
    });
}

const filterNonNumeric = (value) => {
    return /^[0-9]*$/.test(value);
}

const sendMessageFromForm = (e) => {
    e.preventDefault();
    $('.alert').show();

    setTimeout(() => {
        $('.alert').hide();
    }, 2000);
    form.reset();
}

setInputFilter(cpfField, filterNonNumeric);
form.addEventListener('submit', sendMessageFromForm);