import * as Yup from 'yup';

//validar cantidad de caracteres, tipo y agregar mensaje de error
export const SignupSchema = Yup.object().shape({
    nombre: Yup.string()
        .min(2, 'El nombre es muy corto.')
        .max(20, 'excede el máximo.')
        .required('El campo nombre es obligatorio.'),

    apellido: Yup.string()
        .min(2, 'El apellido es muy corto.')
        .max(20, 'excede el máximo.')
        .required('El campo apellido es obligatorio.'),

    fecha: Yup.date()
        .required('El campo fecha de nacimiento es obligatorio.'),

    telefono: Yup.string()
        .required('El campo telefono es obligatorio.')
        .matches(/^[0-9]+$/, "Deben ser solo números.")
        .min(10, 'Debe tener 10 dígitos.')
        .max(10, 'Debe tener 10 dígitos.'),

    correo: Yup.string()
        .email('Debe ser de tipo email ej: ana@gmail.com.')
        .max(50, 'excede el máximo.')
        .required('El campo correo electronico es obligatorio.'),
});