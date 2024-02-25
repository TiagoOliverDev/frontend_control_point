import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./shared/components/forms/TranslationYup";

import { AppDrawerProvider, AppThemeProvider, AuthProvider, useAuthContext } from "./shared/contexts";
import { AppRoutes } from "./shared/routes";
import { Login, MenuDrawer } from "./shared/components";
import { Register } from "./pages"; 


export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<LoginWrapper />} />
          </Routes>
        </BrowserRouter>
      </AppThemeProvider>
    </AuthProvider>
  );
};

const LoginWrapper = () => {
  const { isAuthenticated }: { isAuthenticated: boolean } = useAuthContext();

  if (isAuthenticated) {
    return (
      <AppDrawerProvider>
        <MenuDrawer>
          <AppRoutes />
        </MenuDrawer>
      </AppDrawerProvider>
    );
  } else {
    return <Login />;
  }
};