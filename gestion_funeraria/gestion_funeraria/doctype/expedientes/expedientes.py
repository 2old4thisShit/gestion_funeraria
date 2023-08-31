# Copyright (c) 2023, ctgalega and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Expedientes(Document):
	def validate(self):
	# Obtiene la lista de tipos de documentos asociados ya presentes en la child table
		documentos_asociados = [row.tipo for row in self.documentacion_asociada]
		# Recorre las filas de la child table y verifica si algún tipo de documento está marcado como único
		for row in self.documentacion_asociada:
			# Obtiene el tipo de documento de "Tipo documentacion"
			tipo_doc = frappe.get_doc("Tipo documentacion", row.tipo)
			# Verifica si el tipo de documento debe ser único
			if tipo_doc.unico:
				# Cuenta cuántas veces aparece el tipo de documento en la lista de documentos asociados
				# Si aparece más de una vez, significa que hay duplicados
				if documentos_asociados.count(row.tipo) > 1:
					# Lanza una excepción con un mensaje de error indicando que no se pueden agregar documentos duplicados
					frappe.throw(f"¡No puedes agregar más de un documento del tipo '{tipo_doc.tipo}'!")