import { useEffect, useState } from "react";

import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

import api from "../services/api";

function TransactionsPage() {

  const [transactions, setTransactions] =
    useState([]);


  const fetchTransactions =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response =
          await api.get(
            "/transactions",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setTransactions(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

    };


  useEffect(() => {

    fetchTransactions();

  }, []);


  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <Navbar />

        <div className="p-10
         bg-[url('../public/img7.webp')]
        bg-cover bg-center h-screen
        ">

          <h1
            className="
              text-4xl
              font-bold
              mb-10
              text-white
            "
          >
            Transactions
          </h1>


          <div
            className="
              bg-white/75
              p-5
              rounded-xl
              shadow-2xl
            "
          >

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="p-3 text-left">
                    Customer
                  </th>

                  <th className="p-3 text-left">
                    Type
                  </th>

                  <th className="p-3 text-left">
                    Product
                  </th>

                  <th className="p-3 text-left">
                    Quantity
                  </th>

                  <th className="p-3 text-left">
                    Amount
                  </th>

                </tr>

              </thead>

              <tbody>

                {transactions.map(
                  (transaction) => (

                    <tr
                      key={transaction._id}
                      className="
                        border-b
                      "
                    >

                      <td className="p-3">

                        {
                          transaction.customer
                            ?.name
                        }

                      </td>

                      <td className="p-3">

                        {
                          transaction.type
                        }

                      </td>

                      <td className="p-3">

                        {
                          transaction.product
                            ?.name ||
                          "-"
                        }

                      </td>

                      <td className="p-3">

                        {
                          transaction.quantity
                        }

                      </td>

                      <td className="p-3">

                        ₹
                        {
                          transaction.amount
                        }

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );

}

export default TransactionsPage;