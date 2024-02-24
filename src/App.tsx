import { BrowserRouter } from "react-router-dom";

import "./shared/components/forms/TranslationYup";

import { AppDrawerProvider, AppThemeProvider, AuthProvider } from "./shared/contexts";
import { AppRoutes } from "./shared/routes";
import { Login, MenuDrawer } from "./shared/components";


export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider >

        <Login>

          <AppDrawerProvider >

            <BrowserRouter>
            
              <MenuDrawer>
                <AppRoutes />
              </MenuDrawer>

            </BrowserRouter >

          </AppDrawerProvider>

        </Login>

      </AppThemeProvider>
    </AuthProvider>
  );
};
