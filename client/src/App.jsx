import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CustomersPage from "./pages/CustomersPage";
import ProductsPage from "./pages/ProductsPage";
import TransactionsPage from "./pages/TransactionsPage";
import BillsPage from "./pages/BillsPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import MilkEntryPage from "./pages/MilkEntryPage";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LoginPage />}
        />

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/customers"
  element={
    <ProtectedRoute>
      <CustomersPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/products"
  element={
    <ProtectedRoute>
      <ProductsPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/transactions"
  element={
    <ProtectedRoute>
      <TransactionsPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/bills"
  element={
    <ProtectedRoute>
      <BillsPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/milk"
  element={
    <ProtectedRoute>
      <MilkEntryPage />
    </ProtectedRoute>
  }
/>
      </Routes>

      <ToastContainer />

    </BrowserRouter>

  );

}

export default App;