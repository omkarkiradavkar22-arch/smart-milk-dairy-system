import { useEffect, useState } from "react";
import { toast }from "react-toastify";

import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

import api from "../services/api";

function MilkEntryPage() {

  const [customers, setCustomers] =
    useState([]);

  const [entries, setEntries] =
    useState([]);

  const [customer, setCustomer] =
    useState("");

  const [shift, setShift] =
    useState("Morning");

  const [quantity, setQuantity] =
    useState("");

  const [date, setDate] =
    useState("");


  // FETCH CUSTOMERS
  const fetchCustomers = async () => {

    try {

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

    } catch (error) {

      console.log(error);

    }

  };


  // FETCH ENTRIES
  const fetchEntries = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await api.get("/milk", {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        });

      setEntries(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  useEffect(() => {

    fetchCustomers();

    fetchEntries();

  }, []);


  // ADD ENTRY
  const addEntry = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await api.post(
        "/milk",
        {
          customer,
          shift,
          quantity,
          date,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      toast.success("Milk Entry Added");

      fetchEntries();

      setCustomer("");
      setShift("Morning");
      setQuantity("");
      setDate("");

    } catch (error) {

      console.log(error);

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
            Milk Entries
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

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-4
                gap-5
              "
            >

              <select
                value={customer}
                onChange={(e) =>
                  setCustomer(
                    e.target.value
                  )
                }
                className="
                  border
                  p-3
                  rounded-lg
                "
              >

                <option value="">
                  Select Customer
                </option>

                {customers.map((c) => (

                  <option
                    key={c._id}
                    value={c._id}
                  >
                    {c.name}
                  </option>

                ))}

              </select>


              <select
                value={shift}
                onChange={(e) =>
                  setShift(
                    e.target.value
                  )
                }
                className="
                  border
                  p-3
                  rounded-lg
                "
              >

                <option>
                  Morning
                </option>

                <option>
                  Evening
                </option>

              </select>


              <input
                type="number"
                placeholder="Milk Quantity"
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    e.target.value
                  )
                }
                className="
                  border
                  p-3
                  rounded-lg
                "
              />


              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(
                    e.target.value
                  )
                }
                className="
                  border
                  p-3
                  rounded-lg
                "
              />

            </div>


            <button
              onClick={addEntry}
              className="
                mt-5
                bg-black
                text-white
                px-6
                py-3
                rounded-lg
              "
            >
              Add Entry
            </button>

          </div>


          {/* TABLE */}

          <div
            className="
              bg-white
              p-5
              rounded-xl
              shadow
              overflow-x-auto
            "
          >

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="p-3 text-left">
                    Customer
                  </th>

                  <th className="p-3 text-left">
                    Shift
                  </th>

                  <th className="p-3 text-left">
                    Quantity
                  </th>

                  <th className="p-3 text-left">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {entries.map((entry) => (

                  <tr
                    key={entry._id}
                    className="border-b"
                  >

                    <td className="p-3">
                      {
                        entry.customer?.name
                      }
                    </td>

                    <td className="p-3">
                      {entry.shift}
                    </td>

                    <td className="p-3">
                      {entry.quantity} L
                    </td>

                    <td className="p-3">
                      {
                        new Date(
                          entry.date
                        ).toLocaleDateString()
                      }
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

export default MilkEntryPage;