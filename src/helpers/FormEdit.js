import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import '../styles/addForm.scss'
import { SignupSchema } from '../helpers/FormValidation';
import { url } from './api';
import Swal from 'sweetalert2';

const FormEdit = ({ cliente }) => {

    const [Cliente] = useState(cliente)

    const handleSubmit = (values) => {
        //Agregar un nuevo cliente a la api
        fetch(url + '/' + cliente.id, {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
        //Alerta de agregado
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Registro de ${values.nombre} actualizado `,
            showConfirmButton: false,
            timer: 1500
        });
    }

    return (
        <div>
            <div>
                <h4>Editar cliente:</h4>
            </div>
            <Formik
                initialValues={
                    {
                        nombre: Cliente.nombre,
                        apellido: Cliente.apellido,
                        telefono: Cliente.telefono,
                        correo: Cliente.correo,
                        fecha: Cliente.fecha,
                        id: Cliente.id
                    }
                }
                validationSchema={SignupSchema}
                onSubmit={(values) => handleSubmit(values)}
            >
                {({ errors, touched, handleReset }) => (
                    <Form>

                        <div className="inputsCont">
                            <div>
                                <label htmlFor="nombre">Nombre:</label>
                                <Field name="nombre" type="text" required />
                                {errors.nombre && touched.nombre ?
                                    (<small className='errorMessage'><span className="fa fa-circle-exclamation mx-1"></span>{errors.nombre}</small>) : null}
                            </div>

                            <div>
                                <label htmlFor="apellido">Apellido:</label>
                                <Field name="apellido" type="text" required />
                                {errors.apellido && touched.apellido ?
                                    (<small className='errorMessage'><span className="fa fa-circle-exclamation mx-1"></span>{errors.apellido}</small>) : null}

                            </div>

                            <div>
                                <label htmlFor="telefono">Telefono:</label>
                                <Field name="telefono" type="number" required />
                                {errors.telefono && touched.telefono ?
                                    (<small className='errorMessage'><span class="fa fa-circle-exclamation mx-1"></span>{errors.telefono}</small>) : null}
                            </div>

                            <div>
                                <label htmlFor="correo">Correo electronico:</label>
                                <Field name="correo" type="email" required />
                                {errors.correo && touched.correo ?
                                    (<small className='errorMessage'><span class="fa fa-circle-exclamation mx-1"></span>{errors.correo}</small>) : null}
                            </div>

                            <div>
                                <label htmlFor="fecha">Fecha de nacimiento:</label>
                                <Field name="fecha" type="date" required />
                                {errors.fecha && touched.fecha ?
                                    (<small className='errorMessage'><span class="fa fa-circle-exclamation mx-1"></span>{errors.fecha}</small>) : null}
                            </div>
                            <button className='btnLimpiar' onClick={handleReset}>Restablecer campos</button>
                        </div>
                        <div className='buttons'>
                            <button type="submit">Enviar</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default FormEdit