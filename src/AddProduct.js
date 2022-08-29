import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { saveProduct } from "./utils/apiCalls";

export default function AddProduct() {
  const [error, setError] = useState("");
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const { hash } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    sku: "",
    name: "",

    price: "",
    product_type: "dvd",
    product_attribute: "",
    width: "",
    height: "",
    length: "",
  });
  const {
    sku,
    name,
    price,
    product_type,
    product_attribute,
    height,
    width,
    length,
  } = values;
  const handleChange = (name) => (e) => {
    setError("");
    setValues({ ...values, [name]: e.target.value });
    console.log(name, e.target.value);
  };
  // useEffect(() => {})
  const handleCancel = () => {
    setValues({
      sku: "",
      name: "",

      price: "",
      product_type: "",
      product_attribute: "",
      width: "",
      height: "",
      length: "",
    });
    navigate("/");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        sku,
        name,
        price,
        product_type,
        product_attribute,
      };
      if (product_type === "furniture") {
        let dimension = `${height}x${width}x${length}`;
        payload.product_attribute = dimension;
      }
      const result = await saveProduct(payload);
      console.log(result);
      if (result.message == "successful") {
        navigate("/");
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        {error && <p className="text-red-500 text-lg italic">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full mt-8 max-w-lg">
          <div className="flex flex-col flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                SKU
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="sku"
                value={sku}
                onChange={handleChange("sku")}
                required
              />
              {/* <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p> */}
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="name"
                value={name}
                onChange={handleChange("name")}
                required
              />
              {/* <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p> */}
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Price ($)
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="number"
                placeholder="price"
                value={price}
                onChange={handleChange("price")}
                required
              />
              {/* <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p> */}
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Type
              </label>
              <select
                onChange={handleChange("product_type")}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                // className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                // id="grid-state"
                required
              >
                <option value="dvd">DVD</option>
                <option value="book">BOOK</option>
                <option value="furniture">FURNITURE</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            {product_type === "dvd" && (
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  SIZE (MB)
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="number"
                  placeholder="size"
                  value={product_attribute}
                  onChange={handleChange("product_attribute")}
                  required
                />
                <p className="text-red-500 text-xs italic">
                  Please, provide size
                </p>
              </div>
            )}
            {product_type === "book" && (
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  WEIGHT (KG)
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="number"
                  placeholder="weight"
                  value={product_attribute}
                  onChange={handleChange("product_attribute")}
                  required
                />
                <p className="text-red-500 text-xs italic">
                  Please, provide weight
                </p>
              </div>
            )}
            {product_type === "furniture" && (
              <div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                    HEIGHT (CM)
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="number"
                    placeholder="height"
                    value={height}
                    onChange={handleChange("height")}
                    required
                  />
                  {/* <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p> */}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                    WIDTH (CM)
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="number"
                    placeholder="width"
                    value={width}
                    onChange={handleChange("width")}
                    required
                  />
                  {/* <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p> */}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-first-name"
                  >
                    LENGTH (CM)
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="number"
                    placeholder="length"
                    value={length}
                    onChange={handleChange("length")}
                    required
                  />
                  <p className="text-red-500 text-xs italic">
                    Please, provide dimensions
                  </p>
                </div>
              </div>
            )}
            <div className="px-4 py-3  flex space-between sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center mx-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
