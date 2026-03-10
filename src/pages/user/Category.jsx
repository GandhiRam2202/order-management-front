import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import API from "../../services/api"
import ProductCard from "../../components/user/ProductCard"

export default function Category() {

    const { category } = useParams()

    const [products, setProducts] = useState([])

    useEffect(() => {

        API.get("/products")
            .then(res => {

                const filtered = res.data.filter(
                    p => p.category?.toLowerCase() === category.toLowerCase()
                )

                setProducts(filtered)

            })

    }, [category])

    return (

        <div className="container mt-4">

            <h2 className="mb-4">{category}</h2>

            <div className="row">

                {products.map(product => (
                    <ProductCard
                        key={product._id}
                        product={product}
                    />
                ))}

            </div>

        </div>

    )

}