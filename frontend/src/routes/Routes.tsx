import { Route, Routes as RouterDomRoutes } from "react-router-dom";

import Login from "../pages/auth/Login";

export default function Routes() {
  return (
    <RouterDomRoutes>
      <Route path="/login" element={<Login />} />
    </RouterDomRoutes>
  );
}
