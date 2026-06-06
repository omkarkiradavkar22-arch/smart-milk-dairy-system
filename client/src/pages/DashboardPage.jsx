import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";

import api from "../services/api";

function DashboardPage() {

  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalProducts: 0,
    totalTransactions: 0,
    pendingBills: 0,
    totalRevenue: 0,
  });


  const fetchDashboard = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await api.get("/dashboard", {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        });

      setStats(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  useEffect(() => {

    fetchDashboard();

  }, []);



  const chartData = [

  {
    name: "Customers",
    value: stats.totalCustomers,
  },

  {
    name: "Products",
    value: stats.totalProducts,
  },

  {
    name: "Revenue",
    value: stats.totalRevenue,
  },

  {
    name: "Bills",
    value: stats.pendingBills,
  },

];
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
          text-black
        "
      >
        Welcome Admin 🚀
      </h1>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-5
        "
      >

        {/* Customers */}
        <div
          className="
            bg-white-100
            p-5
            rounded-2xl
            shadow
            hover:shadow-2xl
            transition
            duration-300
            hover:-translate-y-1
          "
        >
          <h2 className="text-xl font-bold text-black">
            Customers
          </h2>

          <p className="text-3xl mt-3 text-black">
            {stats.totalCustomers}
          </p>
        </div>

        {/* Products */}
        <div
          className="
            bg-white-100
            p-5
            rounded-2xl
            shadow
            hover:shadow-2xl
            transition
            duration-300
            hover:-translate-y-1
          "
        >
          <h2 className="text-xl font-bold text-black">
            Products
          </h2>

          <p className="text-3xl mt-3 text-black">
            {stats.totalProducts}
          </p>
        </div>

        {/* Revenue */}
        <div
          className="
            bg-white-100
            p-5
            rounded-2xl
            shadow
            hover:shadow-2xl
            transition
            duration-300
            hover:-translate-y-1
          "
        >
          <h2 className="text-xl font-bold text-black">
            Revenue
          </h2>

          <p className="text-3xl mt-3 text-black">
            ₹{stats.totalRevenue}
          </p>
        </div>

        {/* Pending Bills */}
        <div
          className="
            bg-white-100
            p-5
            rounded-2xl
            shadow
            hover:shadow-2xl
            transition
            duration-300
            hover:-translate-y-1
          "
        >
          <h2 className="text-xl font-bold text-black">
            Pending Bills
          </h2>

          <p className="text-3xl mt-3 text-black">
            {stats.pendingBills}
          </p>
        </div>

      </div>

      {/* Analytics */}
      <div
        className="
          bg-white-100
          p-5
          rounded-2xl
          shadow
          hover:shadow-2xl
          transition
          duration-300
          hover:-translate-y-1
          mt-10
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            mb-5
            text-black
          "
        >
          Analytics
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart data={chartData}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="value" />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

      </div>

    </div>

  );

}

export default DashboardPage;