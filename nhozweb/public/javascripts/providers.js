$(document).ready(function () {
    $("#add-provider-button").click(function () {
        document.querySelector("#add-provider-form").submit();
    });
});

$(document).ready(function () {
    document.querySelector('#delete-providers-button').onclick = function () {
        var selectedTds = document.querySelectorAll('#providers-table tbody tr.is-selected td.id-cell');
        if (selectedTds.length > 0) {
            var providerIds = [];
            selectedTds.forEach(function (td) {
                providerIds.push(td.innerHTML);
            });

            console.log(providerIds);

            $.ajax({
                url: '/api/providers/delete',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ providerIds: providerIds }),
                success: function (data) {
                    if (data.ok) {
                        var msg = encodeURIComponent("Proveedores eliminados");
                        location.href = `/providers?succ=${msg}`
                    } if (data.err) {
                        var msg = encodeURIComponent("Error al eliminar proveedores");
                        location.href = `/providers?err=${msg}`
                    }
                },
                error: function () {
                    var msg = encodeURIComponent("Error al eliminar proveedores");
                    location.href = `/providers?err=${msg}`
                }
            });
        }
    };
});