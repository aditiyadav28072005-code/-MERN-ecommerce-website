import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded ${
      isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="w-56 bg-white rounded-lg shadow p-4 space-y-1 h-fit">
      <NavLink to="/admin/dashboard" className={linkClass}>
        Dashboard
      </NavLink>
      <NavLink to="/admin/products" className={linkClass}>
        Manage Products
      </NavLink>
      <NavLink to="/admin/orders" className={linkClass}>
        Manage Orders
      </NavLink>
      <NavLink to="/admin/users" className={linkClass}>
        Manage Users
      </NavLink>
      <NavLink to="/admin/inventory" className={linkClass}>
        Inventory
      </NavLink>
    </div>
  );
};

export default AdminSidebar;
