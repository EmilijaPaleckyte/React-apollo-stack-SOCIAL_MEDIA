import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "./authcontext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/signin" replace />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
