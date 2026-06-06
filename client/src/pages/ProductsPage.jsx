import { useEffect, useState } from "react";
import { toast }from "react-toastify";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

import api from "../services/api";

function ProductsPage() {

  const [products, setProducts] =
    useState([]);
    const [search, setSearch] =
  useState("");

  const [name, setName] = useState("");

  const [type, setType] = useState("");

  const [price, setPrice] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);


  // FETCH PRODUCTS
  const fetchProducts = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await api.get("/products", {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        });

      setProducts(response.data);

    } catch (error) {

      toast.error("Something went wrong");

    }

  };


  useEffect(() => {

    fetchProducts();

  }, []);


  // ADD PRODUCT
  const addProduct = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await api.post(
        "/products",
        {
          name,
          type,
          price,
          stock,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success("Product Added");


      fetchProducts();

      setName("");
      setType("");
      setPrice("");
      setStock("");

    } catch (error) {

      toast.error("Something went wrong");

    }

  };


  // DELETE PRODUCT
  const deleteProduct = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await api.delete(
        `/products/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success("Product Deleted");

      fetchProducts();

    } catch (error) {

      toast.error("Something went wrong");

    }

  };


  // EDIT PRODUCT
  const editProduct = (product) => {

    setEditingId(product._id);

    setName(product.name);

    setType(product.type);

    setPrice(product.price);

    setStock(product.stock);

  };


  // UPDATE PRODUCT
  const updateProduct = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await api.put(
        `/products/${editingId}`,
        {
          name,
          type,
          price,
          stock,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success("Product Updated");

      fetchProducts();

      setEditingId(null);

      setName("");
      setType("");
      setPrice("");
      setStock("");

    } catch (error) {

      toast.error("Something went wrong");

    }

  };


  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <Navbar />

        <div className="p-10">

          <h1
            className="
              text-4xl
              font-bold
              mb-10
            "
          >
            Products
          </h1>


          {/* FORM */}

          <div
            className="
              bg-white
              p-5
              rounded-xl
              shadow
              mb-10
            "
          >

            <h2
              className="
                text-2xl
                font-bold
                mb-5
              "
            >
              {
                editingId
                  ? "Update Product"
                  : "Add Product"
              }
            </h2>

            <div className="grid grid-cols-4 gap-5">

              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="
                  border
                  p-3
                  rounded-lg
                "
              />

              <input
                type="text"
                placeholder="Type"
                value={type}
                onChange={(e) =>
                  setType(e.target.value)
                }
                className="
                  border
                  p-3
                  rounded-lg
                "
              />

              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                className="
                  border
                  p-3
                  rounded-lg
                "
              />

              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) =>
                  setStock(e.target.value)
                }
                className="
                  border
                  p-3
                  rounded-lg
                "
              />

            </div>

            <button
              onClick={
                editingId
                  ? updateProduct
                  : addProduct
              }
              className="
                mt-5
                bg-black
                text-white
                px-6
                py-3
                rounded-lg
              "
            >
              {
                editingId
                  ? "Update Product"
                  : "Add Product"
              }
            </button>

          </div>


          {/* TABLE */}

          <div
            className="
              bg-white
              p-5
              rounded-xl
              shadow
            "
          >


<input
  type="text"
  placeholder="Search Product..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  className="
    border
    p-3
    rounded-lg
    mb-5
    w-full
  "
/>
            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="p-3 text-left">
                    Name
                  </th>

                  <th className="p-3 text-left">
                    Type
                  </th>

                  <th className="p-3 text-left">
                    Price
                  </th>

                  <th className="p-3 text-left">
                    Stock
                  </th>

                  <th className="p-3 text-left">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {
  products
    .filter((product) =>

      product.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

    )
    .map((product) => (

                  <tr
                    key={product._id}
                    className="border-b"
                  >

                    <td className="p-3">
                      {product.name}
                    </td>

                    <td className="p-3">
                      {product.type}
                    </td>

                    <td className="p-3">
                      ₹{product.price}
                    </td>

                    <td className="p-3">
                      {product.stock}
                    </td>

                    <td className="p-3">

                      <button
                        onClick={() =>
                          editProduct(product)
                        }
                        className="
                          bg-blue-500
                          text-white
                          px-4
                          py-2
                          rounded-lg
                          mr-3
                        "
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteProduct(product._id)
                        }
                        className="
                          bg-red-500
                          text-white
                          px-4
                          py-2
                          rounded-lg
                        "
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ProductsPage;