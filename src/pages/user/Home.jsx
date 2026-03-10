import { useEffect,useState } from "react"
import API from "../../services/api"
import ProductCard from "../../components/user/ProductCard"

export default function Home(){

const [products,setProducts] = useState([])

const formatCategory = (text)=>{
  return text
  ?.replace(/_/g," ")
  .replace(/\b\w/g,c=>c.toUpperCase())
}

useEffect(()=>{

API.get("/products")
.then(res=>{

const formattedProducts = res.data.map(p=>({
...p,
category: formatCategory(p.category)
}))

setProducts(formattedProducts)

})

},[])

return(

<div className="container mt-4">

<div className="row">

{products.map(product=>(
<ProductCard
key={product._id}
product={product}
/>
))}

</div>

</div>

)

}