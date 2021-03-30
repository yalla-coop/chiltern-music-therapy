import { ThemeProvider } from '@emotion/react';
import { Global } from '@emotion/react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import theme, { globalStyle } from './theme';
import { Route } from './components';
import * as Pages from './Pages';
import { navRoutes } from './constants';
import { AuthProvider } from './context/auth';

import 'antd/dist/antd.css';

function App() {
  return (
    <div className="app">
      <Global styles={globalStyle} />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Router basename={process.env.PUBLIC_URL}>
            <Switch>
              {/* Auth Routes */}
              <Route
                exact
                path={navRoutes.GENERAL.HOME}
                Component={Pages.GENERAL.Example}
                layout="info"
                image="welcome3"
              />
              <Route
                Component={Pages.GENERAL.ErrorPages}
                layout="general"
                goBack
                status="404"
                title="Page not found"
                msg="Sorry, the page you're looking for doesn't seem to exist"
              />
            </Switch>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
