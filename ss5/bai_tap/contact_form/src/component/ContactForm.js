import React, {useState} from 'react';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./App.css"

function ContactForm() {
    const initialValues = {
        name: "",
        email: "",
        phone: "",
        message: ""
    };

    const handleSubmit = (values, { resetForm }) => {
        alert("Add contact successfully!!!");
        console.log("Dữ liệu form:", values);
        resetForm();
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Name không được để trống")
            .min(3, "Name không được nhỏ hơn 3 ký tự")
            .matches(/^[A-Za-z0-9 ]{3,100}$/, "Name phải đúng định dạng (chữ, số, dấu cách)"),
        email: Yup.string()
            .required("Email không được để trống")
            .matches(/^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/, "Email không hợp lệ"),
        phone: Yup.string()
            .required("Phone không được để trống"),
        message: Yup.string().max(200, "Message không được quá 200 ký tự"),
    });

    return (
        <div style={{ margin: "20px" }}>
            <h1>Contact Form</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div>
                        <label htmlFor="name">Name</label>
                        <Field id="name" name="name" type="text" />
                        <ErrorMessage name="name" component="div" style={{ color: "red" }} />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <Field id="email" name="email" type="text" />
                        <ErrorMessage name="email" component="div" style={{ color: "red" }} />
                    </div>

                    <div>
                        <label htmlFor="phone">Phone</label>
                        <Field id="phone" name="phone" type="text" />
                        <ErrorMessage name="phone" component="div" style={{ color: "red" }} />
                    </div>

                    <div>
                        <label htmlFor="message">Message</label>
                        <Field id="message" name="message" as="textarea" rows="4" />
                        <ErrorMessage name="message" component="div" style={{ color: "red" }} />
                    </div>

                    <button type="submit" style={{ marginTop: "10px" }}>Submit</button>
                </Form>
            </Formik>
        </div>
    );
}
export default ContactForm;