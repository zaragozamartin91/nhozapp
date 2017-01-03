$(document).ready(function () {
    var drawerImg = document.createElement('img');
    drawerImg.src = "images/ic_reorder_white_24px.svg";

    function replaceDrawerIcon() {
        var drawerButton = document.querySelector('.mdl-layout__drawer-button');

        if (drawerButton) {
            console.log("Cambiando drawer button");
            drawerButton.innerHTML = "";
            drawerButton.appendChild(drawerImg);
        } else {
            console.log("Esperando...");
            setTimeout(replaceDrawerIcon, 100);
        }
    }

    replaceDrawerIcon();
});