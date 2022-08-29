import * as Yup from 'yup';

//validar cantidad de caracteres, tipo y agregar mensaje de error
const tooLong = (field) => `El ${field} excede el máximo de caracteres.`
const tooShort = (field) => `El ${field} es muy corto.`
const requiredField = (field) => `El campo ${field} es obligatorio.`

export const SignupSchema = Yup.object().shape({
    nombre: Yup.string()
        .min(2, tooShort('Nombre'))
        .max(20, tooLong('Nombre'))
        .required(requiredField('Nombre')),

    apellido: Yup.string()
        .min(2, tooShort('Apellido'))
        .max(20, tooLong('Apellido'))
        .required(requiredField('Apellido')),

    fecha: Yup.date()
        .required(requiredField('Fecha de nacimiento'))
        .max(new Date(), 'Fecha invalida'),

    telefono: Yup.string()
        .required(requiredField('Telefono'))
        .matches(/^[0-9]+$/, "Deben ser solo números.")
        .min(10, 'Debe tener 10 dígitos.')
        .max(10, 'Debe tener 10 dígitos.'),

    correo: Yup.string()
        .email('Debe ser de tipo email ej: ana@gmail.com.')
        .max(30, tooLong('Correo electrónico'))
        .required(requiredField('Correo electrónico')),
});