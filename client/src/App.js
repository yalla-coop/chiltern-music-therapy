import { ThemeProvider } from '@emotion/react';
import { Global } from '@emotion/react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route as RouterRoute,
} from 'react-router-dom';
import theme, { globalStyle } from './theme';
import { Route } from './components';
import * as Pages from './pages';
import { navRoutes, roles } from './constants';
import { AuthProvider } from './context/auth';
import CookieBot from 'react-cookiebot';

import 'antd/dist/antd.css';

const domainGroupId = process.env.REACT_APP_COOKIEBOT_DOMAIN_ID;

function App() {
  return (
    <div className="app">
      <Global styles={globalStyle} />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Router basename={process.env.PUBLIC_URL}>
            <Switch>
              <RouterRoute exact path={navRoutes.GENERAL.HOME}>
                <Redirect to={navRoutes.GENERAL.LOGIN} />
              </RouterRoute>

              {/* Auth Routes */}
              <Route
                exact
                path={navRoutes.GENERAL.LOGIN}
                Component={Pages.GENERAL.Login}
                layout="onboarding"
                loggedOutOnly
              />

              <Route
                exact
                path={navRoutes.THERAPIST.SIGNUP}
                Component={Pages.THERAPIST.Signup}
                layout="onboarding"
                loggedOutOnly
              />

              <Route
                path={navRoutes.CLIENT.SIGNUP}
                Component={Pages.CLIENT.Signup}
                layout="onboarding"
                loggedOutOnly
              />

              <Route
                exact
                path={navRoutes.GENERAL.FORGOT_PASSWORD}
                Component={Pages.GENERAL.ForgotPassword}
                layout="onboarding"
                loggedOutOnly
              />

              <Route
                exact
                path={navRoutes.GENERAL.RESET_PASSWORD}
                Component={Pages.GENERAL.ResetPassword}
                layout="onboarding"
                loggedOutOnly
              />

              {/* Therapist Pages */}

              <Route
                exact
                path={navRoutes.THERAPIST.WELCOME}
                Component={Pages.GENERAL.Welcome}
                layout="info"
                section="welcome"
                isPrivate
                allowedRoles={[roles.THERAPIST]}
              />

              <Route
                exact
                path={navRoutes.THERAPIST.CLIENT}
                Component={Pages.THERAPIST.SingleClient}
                layout="general"
                goBack
                isPrivate
                allowedRoles={[roles.THERAPIST]}
              />
              <Route
                exact
                path={navRoutes.THERAPIST.CLIENT_HISTORY}
                Component={Pages.THERAPIST.SingleClient}
                layout="general"
                goBack
                clientHistory
                isPrivate
                allowedRoles={[roles.THERAPIST]}
              />

              <Route
                exact
                path={navRoutes.THERAPIST.EDIT_CLIENT}
                Component={Pages.THERAPIST.EditClient}
                layout="general"
                goBack
                isPrivate
                allowedRoles={[roles.THERAPIST]}
              />

              <Route
                exact
                path={navRoutes.THERAPIST.DASHBOARD}
                Component={Pages.THERAPIST.Dashboard}
                layout="general"
                isPrivate
                allowedRoles={[roles.THERAPIST]}
              />

              <Route
                exact
                path={navRoutes.THERAPIST.NEW_CLIENT}
                Component={Pages.THERAPIST.AddClient}
                isPrivate
                allowedRoles={[roles.THERAPIST]}
              />

              <Route
                exact
                path={navRoutes.THERAPIST.SINGLE_PROGRAMME}
                Component={Pages.THERAPIST.IndividProgramme}
                isPrivate
                allowedRoles={[roles.THERAPIST]}
              />

              <Route
                exact
                path={navRoutes.THERAPIST.PROFILE}
                Component={Pages.THERAPIST.Profile}
                layout="onboarding"
                isPrivate
                allowedRoles={[roles.THERAPIST]}
              />

              <Route
                exact
                path={navRoutes.THERAPIST.LIBRARY}
                Component={Pages.THERAPIST.Library}
                isPrivate
                allowedRoles={[roles.THERAPIST]}
              />

              <Route
                exact
                path={navRoutes.THERAPIST.ACCOUNT}
                Component={Pages.THERAPIST.MyAccount}
                goBack
                maxWidth="none"
                isPrivate
                allowedRoles={[roles.THERAPIST]}
              />

              <Route
                exact
                path={navRoutes.THERAPIST.CONTACT_CLIENT}
                Component={Pages.THERAPIST.ContactClient}
                goBack
                maxWidth="1200px"
                isPrivate
                allowedRoles={[roles.THERAPIST]}
              />

              <Route
                exact
                path={navRoutes.THERAPIST.PROGRESS_UPDATE}
                Component={Pages.THERAPIST.ViewUpdate}
                goBack
                isPrivate
                allowedRoles={[roles.THERAPIST]}
              />
              <Route
                exact
                path={navRoutes.THERAPIST.SUCCESS_UPDATE}
                Component={Pages.GENERAL.SuccessUpdate}
                goBack
                maxWidth="none"
              />

              {/* Admin Pages */}
              <Route
                exact
                path={navRoutes.ADMIN.ALL_CONTENT}
                Component={Pages.THERAPIST.Library}
                isPrivate
                allowedRoles={[roles.ADMIN]}
              />

              {/* Client Pages */}

              <Route
                exact
                path={navRoutes.CLIENT.WELCOME}
                Component={Pages.GENERAL.Welcome}
                layout="info"
                section="welcome"
                isPrivate
                allowedRoles={[roles.CLIENT]}
              />

              <Route
                exact
                path={navRoutes.CLIENT.DASHBOARD}
                Component={Pages.CLIENT.Dashboard}
                layout="general"
                isPrivate
                allowedRoles={[roles.CLIENT]}
              />

              <Route
                exact
                path={navRoutes.CLIENT.DELETE_ACCOUNT}
                Component={Pages.CLIENT.DeleteAccount}
                layout="general"
                allowedRoles={[roles.CLIENT]}
                isPrivate
              />

              <Route
                exact
                path={navRoutes.CLIENT.THERAPIST}
                Component={Pages.CLIENT.MyTherapist}
                layout="general"
                image="hands"
                goBack
                isPrivate
                allowedRoles={[roles.CLIENT]}
              />

              <Route
                exact
                path={navRoutes.CLIENT.CONTACT_THERAPIST}
                Component={Pages.CLIENT.MyTherapist}
                layout="general"
                image="hands"
                goBack
                contactDetails
                isPrivate
                allowedRoles={[roles.CLIENT]}
              />

              <Route
                exact
                path={navRoutes.CLIENT.INDIVID_PROGRAMME}
                Component={Pages.CLIENT.IndividProgramme}
                isPrivate
                allowedRoles={[roles.CLIENT]}
              />
              <Route
                exact
                path={navRoutes.CLIENT.PROGRAMMES}
                Component={Pages.CLIENT.AllProgrammes}
                isPrivate
                allowedRoles={[roles.CLIENT]}
              />

              <Route
                exact
                path={navRoutes.CLIENT.THERAPY_PLAN}
                Component={Pages.CLIENT.MyTherapyPlan}
                goBack
                isPrivate
                allowedRoles={[roles.CLIENT]}
              />

              <Route
                exact
                path={navRoutes.CLIENT.THERAPY_GOALS}
                Component={Pages.CLIENT.MyTherapyGoals}
                goBack
                maxWidth="none"
                isPrivate
                allowedRoles={[roles.CLIENT]}
              />
              <Route
                exact
                path={navRoutes.CLIENT.ACCOUNT}
                Component={Pages.CLIENT.MyAccount}
                goBack
                maxWidth="none"
              />

              <Route
                exact
                path={navRoutes.CLIENT.SEND_UPDATE}
                Component={Pages.CLIENT.Update}
                goBack
                maxWidth="none"
              />

              <Route
                exact
                path={navRoutes.CLIENT.SUCCESS_UPDATE}
                Component={Pages.GENERAL.SuccessUpdate}
                goBack
                maxWidth="none"
              />

              <Route
                exact
                path={navRoutes.CLIENT.SUCCESS_FEEDBACK}
                Component={Pages.GENERAL.SuccessFeedback}
                goBack
                maxWidth="none"
              />

              <Route
                exact
                path={navRoutes.CLIENT.SEND_FEEDBACK}
                Component={Pages.CLIENT.Feedback}
                maxWidth="none"
              />

              {/* therapist sub routes */}

              <Route
                path={navRoutes.THERAPIST.CREATE_PROGRAMME}
                Component={Pages.THERAPIST.CreateProgram}
                layout="general"
                allowedRoles={[roles.THERAPIST]}
                isPrivate
              />

              <Route
                path={navRoutes.THERAPIST.EDIT_PROGRAMME}
                Component={Pages.THERAPIST.EditProgramme}
                layout="general"
                allowedRoles={[roles.THERAPIST]}
              />

              {/* General routes */}

              <Route
                exact
                path={navRoutes.GENERAL.HOW_TO_RECORD}
                Component={Pages.GENERAL.HowToRecord}
                layout="general"
              />

              <Route
                exact
                path={navRoutes.GENERAL.ACCOUNT_DELETED_SUCCESS}
                Component={Pages.GENERAL.AccountDeletedSuccess}
                layout="onboarding"
                loggedOutOnly
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
        <CookieBot domainGroupId={domainGroupId} />
      </ThemeProvider>
    </div>
  );
}

export default App;
