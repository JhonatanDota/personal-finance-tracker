import { Navigate } from "react-router-dom";
import { getToken } from "../functions/auth";

interface RouteGuardProps {
  children: React.ReactNode;
}

export default function RoutePublic(props: RouteGuardProps) {
  const { children } = props;
  const isAuthenticated = !!getToken();

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}
