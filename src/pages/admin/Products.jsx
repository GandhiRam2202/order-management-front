import { useEffect, useState } from "react"
import API from "../../services/api"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import toast from "react-hot-toast"

export default function Products() {

    const [products, setProducts] = useState([])
    const [editProduct, setEditProduct] = useState(null)
    const [search, setSearch] = useState("")



    const initialValues = {
        name: "",
        category: "",
        price: "",
        image: "",
        description: "",
        spec: ""
    }



    const validationSchema = Yup.object({

        name: Yup.string()
            .min(3, "Name must be at least 3 characters")
            .required("Product name is required"),

        category: Yup.string().required("Category required"),

        price: Yup.number()
            .positive("Price must be positive")
            .required("Price required"),

        image: Yup.string()
            .url("Must be valid URL")
            .required("Image required")

    })



    const loadProducts = async () => {

        try {

            const res = await API.get("/products")

            const sorted = res.data.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )

            setProducts(sorted)

        } catch (err) {

            console.log(err)

        }

    }



    const deleteProduct = async (id) => {

        await API.delete(`/products/delete/${id}`)
        toast.success("Product deleted successfully")
        loadProducts()

    }



    const addProduct = async (values, { resetForm }) => {

        await API.post("/products/add", values)

        resetForm()
        toast.success("Product added successfully")
        loadProducts()

    }



    const updateProduct = async (values) => {

        await API.put(`/products/update/${editProduct._id}`, values)

        setEditProduct(null)
        toast.success("Product updated successfully")
        loadProducts()

    }



    useEffect(() => {
        loadProducts()
    }, [])



    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
    )



    return (

        <div className="container mt-4">

            <h3 className="mb-3">Product Management</h3>



            {/* SEARCH */}

            <div className="mb-3">

                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by product name or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>



            {/* ADD PRODUCT */}

            <div className="card p-3 mb-4">

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={addProduct}
                >

                    <Form>

                        <div className="row">

                            <div className="col-md-3 mb-3">

                                <Field
                                    name="name"
                                    className="form-control"
                                    placeholder="Product Name"
                                />

                                <ErrorMessage name="name" component="div" className="text-danger" />

                            </div>



                            <div className="col-md-2 mb-3">

                                <Field as="select" name="category" className="form-select">

                                    <option value="">Category</option>
                                    <option value="Mobile">Mobile</option>
                                    <option value="Charger">Charger</option>
                                    <option value="Airpods">Airpods</option>
                                    <option value="Headphones">Headphones</option>
                                    <option value="Neckband">Neckband</option>
                                    <option value="Smartwatch">Smart Watch</option>

                                </Field>

                            </div>



                            <div className="col-md-2 mb-3">

                                <Field
                                    type="number"
                                    name="price"
                                    className="form-control"
                                    placeholder="Price"
                                />

                            </div>



                            <div className="col-md-3 mb-3">

                                <Field
                                    name="image"
                                    className="form-control"
                                    placeholder="Image URL"
                                />

                            </div>



                            <div className="col-md-2 mb-3">

                                <Field
                                    name="spec"
                                    className="form-control"
                                    placeholder="Spec"
                                />

                            </div>

                        </div>



                        <Field
                            as="textarea"
                            name="description"
                            className="form-control mb-3"
                            placeholder="Description"
                        />



                        <button className="btn btn-dark">
                            Add Product
                        </button>

                    </Form>

                </Formik>

            </div>



            {/* PRODUCT TABLE */}

            <div className="table-responsive">

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Spec</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {filteredProducts.map(product => (

                            <tr key={product._id}>

                                <td>
                                    <img
                                        src={product.image}
                                        width="60"
                                        height="60"
                                        style={{ objectFit: "cover" }}
                                        alt={product.name}
                                    />
                                </td>

                                <td>{product.name}</td>

                                <td>{product.category}</td>

                                <td>{product.spec}</td>

                                <td>₹ {product.price}</td>

                                <td>

                                    <button
                                        className="btn btn-primary btn-sm me-2"
                                        onClick={() => setEditProduct(product)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteProduct(product._id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>



            {/* EDIT MODAL */}

            {editProduct && (

                <div
                    className="modal show fade"
                    style={{ display: "block" }}
                >

                    <div className="modal-dialog">

                        <div className="modal-content">

                            <div className="modal-header">

                                <h5>Edit Product</h5>

                                <button
                                    className="btn-close"
                                    onClick={() => setEditProduct(null)}
                                ></button>

                            </div>



                            <div className="modal-body">
                                <Formik
                                    initialValues={editProduct}
                                    validationSchema={validationSchema}
                                    onSubmit={updateProduct}
                                    enableReinitialize
                                >

                                    <Form>

                                        <Field
                                            name="name"
                                            className="form-control mb-2"
                                            placeholder="Product Name"
                                        />

                                        <Field
                                            as="select"
                                            name="category"
                                            className="form-select mb-2"
                                        >
                                            <option value="">Category</option>
                                            <option value="Mobile">Mobile</option>
                                            <option value="Charger">Charger</option>
                                            <option value="Airpods">Airpods</option>
                                            <option value="Headphones">Headphones</option>
                                            <option value="Neckband">Neckband</option>
                                            <option value="Smartwatch">Smart Watch</option>
                                        </Field>

                                        <Field
                                            type="number"
                                            name="price"
                                            className="form-control mb-2"
                                            placeholder="Price"
                                        />

                                        <Field
                                            name="spec"
                                            className="form-control mb-2"
                                            placeholder="Spec"
                                        />

                                        <Field
                                            name="image"
                                            className="form-control mb-2"
                                            placeholder="Image URL"
                                        />

                                        <Field
                                            as="textarea"
                                            name="description"
                                            className="form-control mb-3"
                                            placeholder="Description"
                                        />

                                        <button className="btn btn-success w-100">
                                            Update Product
                                        </button>

                                    </Form>

                                </Formik>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>

    )

}