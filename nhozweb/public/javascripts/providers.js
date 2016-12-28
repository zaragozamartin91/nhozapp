/* SUBMIT DE FORMULARIO DE AGREGADO DE PROVEEDOR. */
$(document).ready(function () {
    $("#add-provider-button").click(function () {
        document.querySelector("#add-provider-form").submit();
    });
});

/* ELIMINACION DE PROVEEDORES SELECCIONADOS DE LA TABLA. */
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
                        document.querySelector('.err-div').innerHTML = "<span>Error al eliminar proveedores</span>";
                    }
                },
                error: function () {
                    document.querySelector('.err-div').innerHTML = "<span>Error al eliminar proveedores</span>";
                }
            });
        }
    };
});