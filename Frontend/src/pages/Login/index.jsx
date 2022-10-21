import { Field, Form, Formik, ErrorMessage } from "formik";

import * as Yup from "yup"
import "./index.css"
import { API } from "../../helpers/API";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()

    const initialValues = {
        email: '',
        password: ''
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Ingrese un email valido").required("Requerido"),
        password: Yup.string().required("Requerido")
    })
    const onSubmit = async (values, props) => {
        console.log(values.email, values.password)

        const res = await API.login(values.email, values.password);
        console.log(res.response.message);
        console.log(res)


        if (res.response.message === "usuario logeado") navigate("/");
        else alert(res.response.message)


    }
    return (
        <div className="loginSignUpContainer">
            <main className={"loginContainer"}>
                <h2 className="loginTitle">Login</h2>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form className="formLoginContainer">
                            <Field className="inputLogin" label='Email' name="email"
                                placeholder='Enter email' />
                            <ErrorMessage component="div" name="email" className="errorMsg" />
                            <Field className="inputLogin" label='Contraseña' name="password"
                                placeholder="********" type='password' />
                            <ErrorMessage name="password" />
                            <button className="buttonLogin" type='submit'>{props.isSubmitting ? "Loading" : "Sign in"}</button>
                        </Form>
                    )}
                </Formik>
                <p className="loginText">¿No tenés una cuenta? Creala haciendo click <Link to={"/signup"} className="loginLink">Acá</Link></p>
            </main>
        </div>
    )
}

export default Login