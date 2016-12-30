function clearErrDivMsg(msg) {
    document.querySelector('.err-div').innerHTML = `<span></span>`;
}

function setErrDivMsg(msg) {
    document.querySelector('.err-div').innerHTML = `<span>${msg}</span>`;
}

/** OBTIENE EL VALOR DEL CAMPO DE TEXTO DE ID DE PROVEEDOR */
function providerIdFieldValue() {
    return document.querySelector("#add-provider-id").value;
}

/** OBTIENE EL VALOR DEL CAMPO DE TEXTO DE NOMBRE DE PROVEEDOR */
function providerNameFieldValue() {
    return document.querySelector("#add-provider-name").value;
}

/* SUBMIT DE FORMULARIO DE AGREGADO DE PROVEEDOR. */
$(document).ready(function () {
    $("#add-provider-button").click(function () {
        clearErrDivMsg();
        if (providerIdFieldValue() == "") {
            setErrDivMsg("No se ingreso un id de proveedor!");
        } else {
            document.querySelector("#add-provider-form").submit();
        }
    });
});

/* ACTUALIZACION DE PROVEEDORES */
$(document).ready(function () {
    $("#update-provider-button").click(function () {
        clearErrDivMsg();
        var selectedTrs = document.querySelectorAll('#providers-table tbody tr.is-selected');
        if (selectedTrs.length == 1) {
            var selectedTr = selectedTrs[0];
            var providerId = selectedTr.querySelector('td.id-cell').innerHTML;

            var newProviderId = providerIdFieldValue();
            var newProviderName = providerNameFieldValue();

            if (newProviderId.trim() == "" && newProviderName.trim() == "") {
                setErrDivMsg("No se indicaron datos de actualizacion");
                return;
            }

            $.ajax({
                url: '/api/providers/update',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    queryData: providerId,
                    newData: {
                        id: newProviderId,
                        name: newProviderName
                    }
                }),
                success: function (data) {
                    if (data.ok) {
                        var msg = encodeURIComponent(data.ok);
                        location.href = `/providers?succ=${msg}`
                    } if (data.err) {
                        setErrDivMsg(data.err.message);
                    }
                },
                error: function () {
                    setErrDivMsg(data.err.message);
                }
            });
        } else if (selectedTrs.length > 1) {
            setErrDivMsg("Solo se puede actualizar un proveedor a la vez");
        } else {
            setErrDivMsg("No se seleccionaron proveedores");
        }
    })
});

/* ELIMINACION DE PROVEEDORES SELECCIONADOS DE LA TABLA. */
$(document).ready(function () {
    document.querySelector('#delete-providers-button').onclick = function () {
        clearErrDivMsg();
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