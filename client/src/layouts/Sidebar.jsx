import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <div
      className="
        w-[200px]
md:w-[250px]
        h-screen
        bg-black
        text-white
        overflow-x-auto
        p-5
      "
    >

      <h1
        className="
          text-2xl
          font-bold
          mb-10
          overflow-x-auto
        "
      >
        Dairy System
      </h1>

      <ul className="space-y-5">

  <li>
    <Link to="/dashboard">
      Dashboard
    </Link>
  </li>

  <li>
    <Link to="/customers">
      Customers
    </Link>
  </li>

<li>
  <Link to="/milk">
    Milk Entries
  </Link>
</li>

  <li>
  <Link to="/products">
    Products
  </Link>
</li>

  <li>
  <Link to="/bills">
    Bills
  </Link>
</li>

  <li>
  <Link to="/transactions">
    Transactions
  </Link>
</li>


</ul>

    </div>

  );

}

export default Sidebar;