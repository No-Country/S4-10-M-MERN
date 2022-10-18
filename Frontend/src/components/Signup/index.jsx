import { Field, Form, Formik, ErrorMessage  } from "formik";
import { Grid, Paper, Avatar, Typography, TextField, Link } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { FormControlLabel } from '@mui/material';
import {Checkbox} from '@mui/material';
import * as Yup from 'yup';
import "./index.css"
import { API } from "../../helpers/API";


const Signup = ({ handleChange }) => {
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    

    const initialValues = {
        username: '',
        fullname: '',
        email: '',
        password: '',
        passwordConfirm: ''      
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
        fullname: Yup.string().required("Required"),
        email: Yup.string().email('Please enter valid email').required("Required"),
        password: Yup.string()
            .min(6, 'at least 6 chars')
            .matches(/[a-z]/, 'at least one lowercase char')
            .matches(/[A-Z]/, 'at least one uppercase char')
            .matches(/[a-zA-Z]+[^a-zA-Z\s]+/, 'at least 1 number or special char (@,!,#, etc).')
            .required("Required"),
        passwordConfirm: Yup.string().min(6, "Password must be at least 6 characters").required("Confirm Password is required").oneOf([Yup.ref("password"), null], "Passwords does not match")
        
    })
    const onSubmit = async (values, props) => {
        console.log(values)
                
        const res = await API.register(values.email, values.password, values.fullname, values.username);
        console.log(res)

        if(res.response === "Mail de usuario ya existente") {handleChange("event", 1)}
        if(res.response === "usuario ha sido creado");
        //si no se registra: alert de usuario registrado
        //si se registra. navigate al login
        
       
        // setTimeout(() => {
        //     props.resetForm()
        //     props.setSubmitting(false)
        // }, 2000)
    }
    
    return (
        
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><AddCircleOutlineIcon/></Avatar>
                    <h2 className="Titulo" style={headerStyle}>Registro</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>

                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                        <Form className="formclass">
                            <Field className="inputLogin" as={TextField} fullWidth label='Username' name="username"  placeholder="Enter your Username"
                                helperText={<ErrorMessage name="username" />} />                           
                            <Field  className="inputLogin"as={TextField} fullWidth label='Full Name' name="fullname" placeholder="Enter your full name"
                                helperText={<ErrorMessage name="fullname" />} /> 
                            <Field className="inputLogin" as={TextField} fullWidth label='Email' name="email" placeholder="Enter your email" 
                                helperText={<ErrorMessage name="email" />} />
                            <Field className="inputLogin"as={TextField} label='Contraseña' name="password"
                                placeholder="********"  type='password' fullWidth required                              
                                helperText={<ErrorMessage name="password" />} />   
                            <Field className="inputLogin" as={TextField} label='Confirma contraseña' name="passwordConfirm"
                                placeholder="********"  type='password' fullWidth required                             
                                helperText={<ErrorMessage name="passwordConfirm" />} />  
                            <button className="buttonLogin" type='submit'>{props.isSubmitting ? "Loading" : "Registro"}</button>
                        </Form>
                    )}
                </Formik>
             {/*    <Typography > 
                     <Link href="#" onClick={() => handleChange("event", 1)} >
                        Sign In
                </Link>
                </Typography> */}
            </Paper>
        </Grid>
    )
}

export default Signup;