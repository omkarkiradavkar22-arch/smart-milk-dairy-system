import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

import api from "../services/api";

function CustomersPage() {

  const [customers, setCustomers] =
    useState([]);

    const [loading, setLoading] =
  useState(false);

    const [search, setSearch] =
  useState("");
const [editingId, setEditingId] =
  useState(null);
    const [name, setName] = useState("");

const [phone, setPhone] = useState("");

const [address, setAddress] =
  useState("");

const [dailyMilkQty, setDailyMilkQty] =
  useState("");

  const fetchCustomers = async () => {

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response =
        await api.get("/customers", {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        });

      setCustomers(response.data);

      setLoading(false);

    } catch (error) {

      toast.error("Something went wrong");

      setLoading(false);
    }

  };


  useEffect(() => {

    fetchCustomers();

  }, []);


const addCustomer = async () => {

  try {

    const token =
      localStorage.getItem("token");

    await api.post(
      "/customers",
      {
        name,
        phone,
        address,
        dailyMilkQty,
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );
toast.success("Customer Added");
    // refresh customers
    fetchCustomers();

    // clear fields
    setName("");
    setPhone("");
    setAddress("");
    setDailyMilkQty("");

  } catch (error) {

    toast.error("Something went wrong");

  }

};



const deleteCustomer = async (id) => {

  try {

    const token =
      localStorage.getItem("token");

    await api.delete(
      `/customers/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    toast.success("Customer Deleted");

    fetchCustomers();

  } catch (error) {

    toast.error("Something went wrong");

  }

};



const editCustomer = (customer) => {

  setEditingId(customer._id);

  setName(customer.name);

  setPhone(customer.phone);

  setAddress(customer.address);

  setDailyMilkQty(
    customer.dailyMilkQty
  );

};


const updateCustomer = async () => {

  try {

    const token =
      localStorage.getItem("token");

    await api.put(
      `/customers/${editingId}`,
      {
        name,
        phone,
        address,
        dailyMilkQty,
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    toast.success("Customer Updated");

    fetchCustomers();

    // reset
    setEditingId(null);

    setName("");
    setPhone("");
    setAddress("");
    setDailyMilkQty("");

  } catch (error) {

    toast.error("Something went wrong");

  }

};

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <Navbar />

        <div className="p-10 
         bg-[url('../public/img4.jpg')]
        bg-cover bg-center h-screen
        ">

          <h1
            className="
              text-4xl
              font-bold
              mb-10
            "
          >
            Customers
          </h1>

          <div
            className="
              bg-white/50
              p-5
              rounded-xl
              shadow-2xl
            "
          >
                <div
  className="
    bg-white/60
    p-5
    rounded-xl
    shadow-2xl
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
    Add Customer
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
      placeholder="Phone"
      value={phone}
      onChange={(e) =>
        setPhone(e.target.value)
      }
      className="
        border
        p-3
        rounded-lg
      "
    />

    <input
      type="text"
      placeholder="Address"
      value={address}
      onChange={(e) =>
        setAddress(e.target.value)
      }
      className="
        border
        p-3
        rounded-lg
      "
    />

    <input
      type="number"
      placeholder="Milk Qty"
      value={dailyMilkQty}
      onChange={(e) =>
        setDailyMilkQty(e.target.value)
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
      ? updateCustomer
      : addCustomer
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
      ? "Update Customer"
      : "Add Customer"
  }

</button>
</div>


<input
  type="text"
  placeholder="Search Customer..."
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


{
  loading && (

    <div
      className="
        text-center
        text-xl
        font-bold
        mb-5
      "
    >
      Loading...
    </div>

  )
}
            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="p-3 text-left">
                    Name
                  </th>

                  <th className="p-3 text-left">
                    Phone
                  </th>

                  <th className="p-3 text-left">
                    Address
                  </th>

                  <th className="p-3 text-left">
                    Milk Qty
                  </th>

                  <th className="p-3 text-left">
  Actions
</th>

                </tr>

              </thead>

              <tbody>

                {
  customers
    .filter((customer) =>

      customer.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

    )
    .map((customer) => (

                  <tr
                    key={customer._id}
                    className="border-b"
                  >

                    <td className="p-3">
                      {customer.name}
                    </td>

                    <td className="p-3">
                      {customer.phone}
                    </td>

                    <td className="p-3">
                      {customer.address}
                    </td>

                    <td className="p-3">
                      {customer.dailyMilkQty}
                    </td>

                    <td className="p-3">

<button
  onClick={() =>
    editCustomer(customer)
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
      deleteCustomer(customer._id)
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

export default CustomersPage;