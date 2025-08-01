import { Route, Routes as RouterDomRoutes } from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import RouteGuard from "./RouteGuard";
import RoutePublic from "./RoutePublic";

export default function Routes() {
  return (
    <RouterDomRoutes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <RoutePublic>
            <Login />
          </RoutePublic>
        }
      />
      <Route
        path="/register"
        element={
          <RoutePublic>
            <Register />
          </RoutePublic>
        }
      />
    </RouterDomRoutes>
  );
}
