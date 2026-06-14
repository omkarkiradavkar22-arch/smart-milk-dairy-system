import { useEffect, useState } from "react";
import jsPDF from "jspdf";

import autoTable
from "jspdf-autotable";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

import api from "../services/api";

function BillsPage() {

  const [bills, setBills] =
    useState([]);


  const fetchBills = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await api.get("/bills", {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        });

      setBills(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  useEffect(() => {

    fetchBills();

  }, []);

  
  const downloadBill = (bill) => {

  const doc = new jsPDF();

  doc.setFontSize(20);

  doc.text(
    "Smart Dairy Bill",
    70,
    20
  );

  doc.setFontSize(12);

  doc.text(
    `Customer: ${
      bill.customer?.name || "N/A"
    }`,
    20,
    40
  );

  doc.text(
    `Month: ${bill.month}`,
    20,
    50
  );

  autoTable(doc, {

    startY: 70,

    head: [[
      "Milk Cost",
      "Product Cost",
      "Total Amount",
      "Status",
    ]],

    body: [[
      `₹${bill.totalMilkCost}`,
      `₹${bill.productCost}`,
      `₹${bill.totalAmount}`,
      bill.paymentStatus,
    ]],

  });

  doc.save(
    `${bill.customer?.name}-bill.pdf`
  );

};

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">

        <Navbar />

        <div className="p-10
         bg-[url('../public/img5.png')]
        bg-cover bg-center h-screen
        ">

          <h1
            className="
              text-4xl
              font-bold
              mb-10
            "
          >
            Bills
          </h1>


          <div
            className="
              bg-white
              p-5
              rounded-xl
              shadow
            "
          >

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="p-3 text-left">
                    Customer
                  </th>

                  <th className="p-3 text-left">
                    Month
                  </th>

                  <th className="p-3 text-left">
                    Milk Cost
                  </th>

                  <th className="p-3 text-left">
                    Product Cost
                  </th>

                  <th className="p-3 text-left">
                    Total
                  </th>

                  <th className="p-3 text-left">
                    Status
                  </th>

                  <th className="p-3 text-left">
  Download
</th>

                </tr>

              </thead>

              <tbody>

                {bills.map((bill) => (

                  <tr
                    key={bill._id}
                    className="border-b"
                  >

                    <td className="p-3">

                      {
                        bill.customer?.name
                        || "N/A"
                      }

                    </td>

                    <td className="p-3">

                      {bill.month}

                    </td>

                    <td className="p-3">

                      ₹
                      {bill.totalMilkCost}

                    </td>

                    <td className="p-3">

                      ₹
                      {bill.productCost}

                    </td>

                    <td className="p-3">

                      ₹
                      {bill.totalAmount}

                    </td>

                    <td className="p-3">

                      <span
                        className={
                          bill.paymentStatus ===
                          "paid"

                            ? "text-green-600 font-bold"

                            : "text-red-600 font-bold"
                        }
                      >

                        {
                          bill.paymentStatus
                        }

                      </span>

                    </td>

                    <td className="p-3">

  <button
    onClick={() =>
      downloadBill(bill)
    }
    className="
      bg-black
      text-white
      px-4
      py-2
      rounded-lg
    "
  >
    PDF
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

export default BillsPage;