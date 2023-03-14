import React, { useState } from "react";
import { AppShell, Footer, useMantineTheme } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthContext from "../context/Auth-context";

import { useContext } from "react";
import AddNewUser from "./user/AddNewUser";
import NavbarNested from "./NavbarNested";
import UpdateUser from "./user/UpdateUser";
import ErrorPage from "./error-page";
import UsersV2 from "./user/UsersV2";
import Inventory from "./inventory/Inventory";
import AddNewProduct from "./inventory/AddNewProduct";
import UpdateProduct from "./inventory/UpdateProduct";
import AddNewOrder from "./order/AddNewOrder";
import Orders from "./order/Orders";
import HeaderApp from "./HeaderApp";
import Signin from "./Signin";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";

const AppShellCustom = () => {
  const authCtx = useContext(AuthContext);
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const logoutHandler = () => {
    authCtx.onLogout();
  };

  return (
    <React.Fragment>
      <BrowserRouter>
        <AppShell
          styles={{
            main: {
              background:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          }}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          navbar={
            authCtx.isLoggedIn && (
              <NavbarNested onLogout={logoutHandler} hidden={!opened} />
            )
          }
          // aside={
          //   <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
          //       <Text>Application sidebar</Text>
          //     </Aside>
          //   </MediaQuery>
          // }
          footer={
            authCtx.isLoggedIn && (
              <Footer height={60} p="md">
                {/* Application footer */}
              </Footer>
            )
          }
          header={
            authCtx.isLoggedIn && (
              <HeaderApp theme={theme} opened={opened} onOpened={setOpened} />
            )
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <UsersV2 />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-user"
              element={
                <PrivateRoute>
                  <AddNewUser />
                </PrivateRoute>
              }
            />
            <Route
              path="/users/update-user/:id"
              element={
                <PrivateRoute>
                  <UpdateUser />
                </PrivateRoute>
              }
            />
            <Route
              path="/inventory"
              element={
                <PrivateRoute>
                  <Inventory />
                </PrivateRoute>
              }
            />
            <Route
              path="/inventory/search/:search"
              element={
                <PrivateRoute>
                  <Inventory />
                </PrivateRoute>
              }
            />
            <Route
              path="/inventory/add-new-product"
              element={
                <PrivateRoute>
                  <AddNewProduct />
                </PrivateRoute>
              }
            />
            <Route
              path="/inventory/update-product/:id"
              element={
                <PrivateRoute>
                  <UpdateProduct />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders/search/:search"
              element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              }
            />
            <Route
              path="/orders/add-new-customer-order"
              element={
                <PrivateRoute>
                  <AddNewOrder />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
        </AppShell>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default AppShellCustom;
