// Copyright (c) 2023, ctgalega and contributors
// For license information, please see license.txt

frappe.ui.form.on("Expedientes", {
    refresh(frm) {

    },
});

frappe.ui.form.on('Documentacion asociada', {
    documentacion_add: function (frm, cdt, cdn) {
        if (frm.is_new()) {
            frm.get_field("documentacion").grid.grid_rows[0].remove()
            frappe.confirm('El formulario debe guardarse. ¿Continuar?', () => {
                frm.save()
            }, () => {
                //
            })
        }
    },

    principal: function (frm, cdt, cdn) {
        // comprobamos que só se marca un principal no child
        frm.doc.documentacion.forEach(function (dato) {
            if (dato.name !== cdn) {
                dato.principal = 0
            }
        })
        frm.refresh_field("documentacion")
    },

    previsualizar: (frm, cdt, cdn) => {
        let row = frappe.get_doc(cdt, cdn);
        let adjunto = row.adjunto;

        let html = `<iframe src="` + window.location.origin + "/" + adjunto + `"width="800" height="600"/>`
        console.log(html)
        $(frm.fields_dict.vista_previa.wrapper).html(html)
    }
})



