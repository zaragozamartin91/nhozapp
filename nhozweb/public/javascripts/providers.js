var ENTER_KEY = 13;

$("#search-input").keyup(function (event) {
    if (event.keyCode == ENTER_KEY) {
        console.log("SEARCHING PROVIDERS");
        document.getElementById("search-form").submit();
    }
});