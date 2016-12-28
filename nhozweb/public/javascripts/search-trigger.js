var ENTER_KEY = 13;

$(document).ready(function () {
    $("#search-input").keyup(function (event) {
        if (event.keyCode == ENTER_KEY) {
            console.log("SEARCHING PROVIDERS");
            document.getElementById("search-form").submit();
        }
    });
})