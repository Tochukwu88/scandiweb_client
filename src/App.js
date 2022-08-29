import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProduct, deleteProduct } from "./utils/apiCalls";

function App() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [product, setProduct] = useState([]);
  const [productIds, setProductIds] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(false);

  useEffect(async () => {
    const result = await getProduct();
    const data = result ? result : [];
    setProduct(data);
  }, [count]);

  const handleDelete = async () => {
    const payload = {
      ids: `(${productIds.join(",")})`,
    };
    console.log(payload);
    const result = await deleteProduct(payload);
    if (result.message == "successful") {
      setCount(count + 1);
    }

    console.log(result);

    try {
    } catch (error) {}
  };
  const handleSelect = async (e) => {
    const index = productIds.findIndex((id) => {
      return id == e.target.value;
    });
    if (index > -1) {
      let filtered = productIds.filter((id) => id != e.target.value);
      setProductIds(filtered);
    } else {
      console.log(index);
      setProductIds([...productIds, e.target.value]);
    }
  };
  // "id": 8,
  // "sku": "123b3ssddcer",
  // "name": "test3",
  // "price": 50,
  // "product_type": "dvd",
  // "product_attribute": "20"

  return (
    <div className=" grid grid-cols-1  place-items-center   ">
      <div>
        <div className="px-4 py-3  flex text-right space-between sm:px-6">
          <Link to="/add-products">
            <button
              type="submit"
              className="inline-flex justify-center mx-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              ADD
            </button>
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            MASS DELETE
          </button>
        </div>
        <div className="grid gap-6 mt-8 md:grid-cols-2 xl:grid-cols-4">
          {product.length > 0 &&
            product.map((p) => {
              let attr;
              let ext;
              if (p.product_type == "DVD-disc") {
                attr = "SIZE";
                ext = "MB";
              } else if (p.product_type == "Book") {
                attr = "   WEIGHT";
                ext = "KG";
              } else {
                attr = "DIMENSION";
                ext = "";
              }
              return (
                <div class="md:flex bg-white rounded-lg p-6">
                  <input
                    type="checkbox"
                    className="delete-checkbox"
                    value={p.id}
                    onChange={handleSelect}
                  />
                  <div class="text-center">
                    <h2 class="text-lg">SKU:{p.sku}</h2>
                    <div class="text-purple-500">NAME:{p.name}</div>
                    <div class="text-gray-600">PRICE:${p.price}</div>
                    <div class="text-gray-600">TYPE:{p.product_type}</div>
                    <div class="text-gray-600">{`${attr}:${p.product_attribute} ${ext}`}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
