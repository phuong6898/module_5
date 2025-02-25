import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./App.css";

const SEX_LIST = [
    { label: "Nam", value: "male" },
    { label: "Nữ", value: "female" },
];

function DeclareForm() {
    const validationSchema = Yup.object({
        name: Yup.string().required("Required"),
        passport: Yup.string().required("Required"),
        yearOfBirth: Yup.number()
            .typeError("Năm sinh phải là số")
            .required("Required")
            .min(1901, "Năm sinh > 1900"),
        nationality: Yup.string().required("Required"),
        province: Yup.string().required("Required"),
        district: Yup.string().required("Required"),
        ward: Yup.string().required("Required"),
        address: Yup.string().required("Required"),
        phone: Yup.string().required("Required"),
        email: Yup.string()
            .required("Required")
            .matches(
                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                "Invalid email address"
            ),
    });

    return (
        <Formik
            initialValues={{
                name: "",
                passport: "",
                yearOfBirth: "",
                nationality: "",
                sex: "",
                province: "",
                district: "",
                ward: "",
                address: "",
                phone: "",
                email: "",
                visitedAreas: "",
                symptoms: [],
                contact: [],
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                alert("Khai báo thành công!");
                console.log("Form values:", values);
            }}
        >
            {() => (
                <Form style={{ margin: "20px" }}>
                    <h1>Tờ khai y tế</h1>

                    <div>
                        <label>Họ tên</label>
                        <br />
                        <Field name="name" />
                        <ErrorMessage name="name" component="div" style={{ color: "red" }} />
                    </div>

                    <div>
                        <label>Số hộ chiếu / CMND</label>
                        <br />
                        <Field name="passport" />
                        <ErrorMessage name="passport" component="div" style={{ color: "red" }} />
                    </div>

                    <div>
                        <label>Năm sinh</label>
                        <br />
                        <Field name="yearOfBirth" type="number" />
                        <ErrorMessage name="yearOfBirth" component="div" style={{ color: "red" }} />
                    </div>

                    <div>
                        <label>Quốc tịch</label>
                        <br />
                        <Field name="nationality" />
                        <ErrorMessage name="nationality" component="div" style={{ color: "red" }} />
                    </div>

                    <div>
                        <label>Giới tính</label>
                        <br />
                        <Field as="select" name="sex">
                            <option value="">-- Chọn --</option>
                            {SEX_LIST.map((item) => (
                                <option key={item.value} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </Field>
                    </div>

                    <div>
                        <label>Tỉnh thành</label>
                        <br />
                        <Field name="province" />
                        <ErrorMessage name="province" component="div" style={{ color: "red" }} />
                    </div>

                    <div>
                        <label>Quận / huyện</label>
                        <br />
                        <Field name="district" />
                        <ErrorMessage name="district" component="div" style={{ color: "red" }} />
                    </div>

                    <div>
                        <label>Phường / xã</label>
                        <br />
                        <Field name="ward" />
                        <ErrorMessage name="ward" component="div" style={{ color: "red" }} />
                    </div>

                    <div>
                        <label>Số nhà, phố, tổ dân phố / thôn / đội</label>
                        <br />
                        <Field name="address" />
                        <ErrorMessage name="address" component="div" style={{ color: "red" }} />
                    </div>

                    <div>
                        <label>Điện thoại</label>
                        <br />
                        <Field name="phone" />
                        <ErrorMessage name="phone" component="div" style={{ color: "red" }} />
                    </div>

                    <div>
                        <label>Email</label>
                        <br />
                        <Field name="email" />
                        <ErrorMessage name="email" component="div" style={{ color: "red" }} />
                    </div>

                    <hr />
                    <h3>Thông tin sàng lọc (không bắt buộc)</h3>

                    <div>
                        <label>Trong vòng 14 ngày qua, Anh/Chị có đến quốc gia / vùng lãnh thổ nào?</label>
                        <br />
                        <Field name="visitedAreas" />
                    </div>

                    <div>
                        <label>Trong vòng 14 ngày qua, Anh/Chị có thấy xuất hiện dấu hiệu nào sau đây không?</label>
                        <div>
                            <label>
                                <Field type="checkbox" name="symptoms" value="Sốt" />
                                Sốt
                            </label>
                        </div>
                        <div>
                            <label>
                                <Field type="checkbox" name="symptoms" value="Ho" />
                                Ho
                            </label>
                        </div>
                        <div>
                            <label>
                                <Field type="checkbox" name="symptoms" value="Khó thở" />
                                Khó thở
                            </label>
                        </div>
                        <div>
                            <label>
                                <Field type="checkbox" name="symptoms" value="Viêm phổi" />
                                Viêm phổi
                            </label>
                        </div>
                        <div>
                            <label>
                                <Field type="checkbox" name="symptoms" value="Đau họng" />
                                Đau họng
                            </label>
                        </div>
                        <div>
                            <label>
                                <Field type="checkbox" name="symptoms" value="Mệt mỏi" />
                                Mệt mỏi
                            </label>
                        </div>
                    </div>

                    <div>
                        <label>Trong vòng 14 ngày qua, Anh/Chị có tiếp xúc với?</label>
                        <div>
                            <label>
                                <Field type="checkbox" name="contact" value="Người bệnh hoặc nghi ngờ bệnh COVID-19" />
                                Người bệnh hoặc nghi ngờ bệnh COVID-19
                            </label>
                        </div>
                        <div>
                            <label>
                                <Field type="checkbox" name="contact" value="Người từ nước có bệnh COVID-19" />
                                Người từ nước có bệnh COVID-19
                            </label>
                        </div>
                        <div>
                            <label>
                                <Field type="checkbox" name="contact" value="Người có biểu hiện (Sốt, ho, khó thở, viêm phổi)" />
                                Người có biểu hiện (Sốt, ho, khó thở, viêm phổi)
                            </label>
                        </div>
                    </div>

                    <br />
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );
}

export default DeclareForm;
