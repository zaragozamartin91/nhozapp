function setErrDivMsg(msg) {
    document.querySelector('.err-div').innerHTML = `<span>${msg}</span>`;
}

function providerIdFieldValue() {
    return document.querySelector("#add-provider-id").value;
}

function providerNameFieldValue() {
    return document.querySelector("#add-provider-name").value;
}

/* SUBMIT DE FORMULARIO DE AGREGADO DE PROVEEDOR. */
$(document).ready(function () {
    $("#add-provider-button").click(function () {
        if (providerIdFieldValue() == "") {
            setErrDivMsg("No se ingreso un id de proveedor!");
        } else {
            document.querySelector("#add-provider-form").submit();
        }
    });
});

$(document).ready(function () {
    $("#update-provider-button").click(function () {
        var selectedTrs = document.querySelectorAll('#providers-table tbody tr.is-selected');
        if (selectedTrs == 1) {
            var selectedTr = selectedTrs[0];
            var newProviderId = providerIdFieldValue();
            var newProviderName = providerNameFieldValue();

            // TODO: TERMINAR
        } else {
            setErrDivMsg("Solo se puede actualizar un proveedor a la vez");
        }
    })
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
                        setErrDivMsg("Error al eliminar proveedores");
                    }
                },
                error: function () {
                    setErrDivMsg("Error al eliminar proveedores");
                }
            });
        }
    };
});