import { ThemeProvider } from '@emotion/react';
import { Global } from '@emotion/react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import theme, { globalStyle } from './theme';
import { Route } from './components';
import * as Pages from './pages';
import { navRoutes, roles } from './constants';
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
                path={navRoutes.GENERAL.LOGIN}
                Component={Pages.GENERAL.Login}
                layout="onboarding"
              />

              <Route
                exact
                path={navRoutes.THERAPIST.SIGNUP}
                Component={Pages.THERAPIST.Signup}
                layout="onboarding"
              />

              <Route
                exact
                path={navRoutes.CLIENT.SIGNUP}
                Component={Pages.CLIENT.Signup}
                layout="onboarding"
              />

              <Route
                exact
                path={navRoutes.GENERAL.FORGOT_PASSWORD}
                Component={Pages.GENERAL.ForgotPassword}
                layout="onboarding"
              />

              <Route
                exact
                path={navRoutes.GENERAL.RESET_PASSWORD}
                Component={Pages.GENERAL.ResetPassword}
                layout="onboarding"
              />

              <Route
                exact
                path={navRoutes.GENERAL.HOME}
                Component={Pages.GENERAL.Example}
                layout="general"
                image="hands"
              />

              {/* Therapist Pages */}

              <Route
                exact
                path={navRoutes.THERAPIST.WELCOME}
                Component={Pages.GENERAL.Welcome}
                layout="info"
                section="welcome"
              />

              <Route
                exact
                path={navRoutes.THERAPIST.CLIENT}
                Component={Pages.THERAPIST.SingleClient}
                layout="general"
                goBack
              />
              <Route
                exact
                path={navRoutes.THERAPIST.CLIENT_HISTORY}
                Component={Pages.THERAPIST.SingleClient}
                layout="general"
                goBack
                clientHistory
              />

              <Route
                exact
                path={navRoutes.THERAPIST.DASHBOARD}
                Component={Pages.THERAPIST.Dashboard}
                layout="general"
              />

              <Route
                exact
                path={navRoutes.THERAPIST.NEW_CLIENT}
                Component={Pages.THERAPIST.AddClient}
              />

              <Route
                exact
                path={navRoutes.THERAPIST.CREATE_PROGRAM}
                Component={Pages.THERAPIST.CreateProgram}
              />

              <Route
                exact
                path={navRoutes.THERAPIST.PROFILE}
                Component={Pages.THERAPIST.Profile}
                layout="onboarding"
              />

              <Route
                exact
                path={navRoutes.THERAPIST.LIBRARY}
                Component={Pages.THERAPIST.Library}
              />

              {/* Admin Pages */}
              <Route
                exact
                path={navRoutes.ADMIN.ALL_CONTENT}
                Component={Pages.THERAPIST.Library}
              />

              {/* Client Pages */}

              <Route
                exact
                path={navRoutes.CLIENT.WELCOME}
                Component={Pages.GENERAL.Welcome}
                layout="info"
                section="welcome"
              />

              <Route
                exact
                path={navRoutes.CLIENT.DASHBOARD}
                Component={Pages.CLIENT.Dashboard}
                layout="general"
              />

              <Route
                exact
                path={navRoutes.CLIENT.THERAPIST}
                Component={Pages.CLIENT.MyTherapist}
                layout="general"
                image="hands"
                goBack
              />
              <Route
                exact
                path={navRoutes.CLIENT.CONTACT_THERAPIST}
                Component={Pages.CLIENT.MyTherapist}
                layout="general"
                image="hands"
                goBack
                contactDetails
              />
              <Route
                exact
                path={navRoutes.CLIENT.INDIVID_PROGRAMME}
                Component={Pages.CLIENT.IndividProgramme}
              />
              <Route
                exact
                path={navRoutes.CLIENT.PROGRAMMES}
                Component={Pages.CLIENT.AllProgrammes}
              />

              <Route
                exact
                path={navRoutes.CLIENT.THERAPY_PLAN}
                Component={Pages.CLIENT.MyTherapyPlan}
                goBack
              />
              <Route
                exact
                path={navRoutes.CLIENT.THERAPY_GOALS}
                Component={Pages.CLIENT.MyTherapyGoals}
                goBack
                maxWidth="none"
              />

              {/* therapist sub routes */}

              <Route
                path={navRoutes.THERAPIST.CREATE_PROGRAMME}
                Component={Pages.THERAPIST.CreateProgram}
                layout="general"
                allowedRoles={[roles.THERAPIST]}
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
