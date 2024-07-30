import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateOrder } from "../../services/OrderService/OrderAxios";
import { ListProduct } from "../../services/ProductService/ProductAxios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddOrderForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state.products.products);

    useEffect(() => {
        dispatch(ListProduct());
    }, [dispatch]);

    const validationSchema = Yup.object({
        orderId: Yup.string().required("Mã đơn hàng không được để trống"),
        purchaseDate: Yup.date()
            .max(new Date(), "Ngày order không được lớn hơn hiện tại")
            .required("Ngày không được để trống"),
        totalPrice: Yup.number()
            .positive("Tổng giá phải lớn hơn 0")
            .required("Tổng giá không được để trống"),
        quantity: Yup.number()
            .integer("Số lượng phải là kiểu số")
            .positive("Số lượng phải lớn hơn 0")
            .required("Số lượng không được để trống"),
        productId: Yup.string().required("Product không được để trống"),
    });

    const handleSubmit = async (values, { resetForm }) => {
        const newOrder = {
            id: values.orderId,
            purchaseDate: values.purchaseDate,
            totalPrice: values.totalPrice,
            quantity: values.quantity,
            productId: values.productId
        };

        try {
            await dispatch(CreateOrder(newOrder));
            Swal.fire({
                title: 'Thêm thành công!',
                text: 'Thêm order thành công',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate("/list");
            });
            resetForm();
        } catch (error) {
            Swal.fire({
                title: 'Lỗi',
                text: 'Lỗi thêm sản phẩm',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
            <div className="w-75">
                <h1 className="text-center mb-4">Thêm mới đơn hàng</h1>

                <Formik
                    initialValues={{
                        orderId: '',
                        purchaseDate: '',
                        totalPrice: '',
                        quantity: 1,
                        productId: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="orderId" className="form-label">Order ID</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    id="orderId"
                                    name="orderId"
                                />
                                <ErrorMessage name="orderId" component="div" className="text-danger mt-2" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="purchaseDate" className="form-label">Purchase Date</label>
                                <Field
                                    type="date"
                                    className="form-control"
                                    id="purchaseDate"
                                    name="purchaseDate"
                                />
                                <ErrorMessage name="purchaseDate" component="div" className="text-danger mt-2" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="totalPrice" className="form-label">Total Price (USD)</label>
                                <Field
                                    type="number"
                                    className="form-control"
                                    id="totalPrice"
                                    name="totalPrice"
                                />
                                <ErrorMessage name="totalPrice" component="div" className="text-danger mt-2" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="quantity" className="form-label">Quantity</label>
                                <Field
                                    type="number"
                                    className="form-control"
                                    id="quantity"
                                    name="quantity"
                                />
                                <ErrorMessage name="quantity" component="div" className="text-danger mt-2" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="productId" className="form-label">Product</label>
                                <Field as="select" id="productId" name="productId" className="form-select">
                                    <option value="">Select a product</option>
                                    {products.map((product) => (
                                        <option key={product.id} value={product.id}>
                                            {product.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="productId" component="div" className="text-danger mt-2" />
                            </div>

                            <div className="d-flex justify-content-between">
                                <button type="submit" className="btn btn-primary me-2">Thêm mới</button>
                                <Link to="/list" className="btn btn-secondary">Quay lại</Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddOrderForm;
