import { Route, Routes as RouterDomRoutes } from "react-router-dom";

import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import PanelLayout from "../pages/panel/layout/PanelLayout";

import Dashboard from "../pages/panel/sections/Dashboard";
import CategoriesManager from "../pages/panel/sections/category/manager/CategoriesManager";
import TransactionsManager from "../pages/panel/sections/transactions/manager/TransactionsManager";

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

      <Route
        element={
          <RouteGuard>
            <PanelLayout />
          </RouteGuard>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<TransactionsManager />} />
        <Route path="/categories" element={<CategoriesManager />} />
      </Route>
    </RouterDomRoutes>
  );
}
