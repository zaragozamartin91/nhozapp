function findArticleIdFieldValue() {
    return document.querySelector('#find-article-id').value;
}

function findArticleProviderFieldValue() {
    return document.querySelector('#find-article-provider').value;
}

function findArticleNameFieldValue() {
    return document.querySelector('#find-article-name').value;
}

$(document).ready(function () {
    $('#find-article-button').click(function (event) {
        event.preventDefault();
        if (findArticleIdFieldValue() || findArticleProviderFieldValue() || findArticleNameFieldValue()) {
            document.querySelector('#find-article-form').submit();
        } else {
            setErrDivMsg("No se ingreso informacion para buscar el articulo");
        }
    });

    document.querySelector('#find-article-id').focus();
});