import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import "./index.css"
import { API } from "../../helpers/API";
import { Link } from "react-router-dom";

const Signup = ({ handleChange }) => {

    const initialValues = {
        username: '',
        fullname: '',
        email: '',
        password: '',
        passwordConfirm: ''
    }
    const required = "Requerido"

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required(required),
        fullname: Yup.string().required(required),
        email: Yup.string().email("Ingrese un formato de email válido").required(required),
        password: Yup.string()
            .matches(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/, "La contraseña debe tener un mínimo de 8 caracteres y poseer al menos un número, un caracter especial, una letra mayúscula y una minúscula.")
            .required(required),
        passwordConfirm: Yup.string().required(required).oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")

    })
    const onSubmit = async (values, props) => {
        console.log(values)

        const res = await API.register(values.email, values.password, values.fullname, values.username);
        console.log(res)

        if (res.response === "Mail de usuario ya existente") { handleChange("event", 1) }
        if (res.response === "usuario ha sido creado");
        //si no se registra: alert de usuario registrado
        //si se registra. navigate al login
    }

    return (

        <div className="loginSignUpContainer">
            <main className={"loginContainer"}>
                <h2 className="loginTitle">Signup</h2>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form className="formLoginContainer">
                            <Field className="inputLogin" name="username" placeholder="username" />
                            <ErrorMessage component="div" name="username" className="errorMsg" />
                            <Field className="inputLogin" name="fullname" placeholder="full name" />
                            <ErrorMessage component="div" name="fullname" className="errorMsg" />
                            <Field className="inputLogin" name="email" placeholder="Enter your email" />
                            <ErrorMessage component="div" name="email" className="errorMsg" />
                            <Field className="inputLogin" name="password" placeholder="********" type='password' />
                            <ErrorMessage component="div" name="password" className="errorMsg" />
                            <Field className="inputLogin" label='Confirma contraseña' name="passwordConfirm" placeholder="********" type='password' />
                            <ErrorMessage component="div" name="passwordConfirm" className="errorMsg" />
                            <button className="buttonLogin" type='submit'>{props.isSubmitting ? "Loading" : "Registro"}</button>
                        </Form>
                    )}
                </Formik>
                <p className="loginText">¿Ya tenés una cuenta? Ingresá haciendo click <Link to={"/login"} className="loginLink">Acá</Link></p>
            </main>
        </div>
    )
}

export default Signup;