function clearSuccDivMsg() {
    document.querySelector('.succ-div').innerHTML = `<span></span>`;
}

function setSuccDivMsg(msg) {
    document.querySelector('.succ-div').innerHTML = `<span>${msg}</span>`;
}

function clearErrDivMsg(msg) {
    document.querySelector('.err-div').innerHTML = `<span></span>`;
}

function setErrDivMsg(msg) {
    document.querySelector('.err-div').innerHTML = `<span>${msg}</span>`;
}