import AppLayout from '@/layouts/AppLayout/AppLayout';
import AuthLayout from '@/layouts/AuthLayout/AuthLayout';
import RootLayout from '@/layouts/RootLayout/RootLayout';
import { $account } from '@/modules/account';
import Dashboard from '@/pages/Dashboard/Dashboard';
import dashboardLoader from '@/pages/Dashboard/dashboardLoader';
import ForgotPassword from '@/pages/ForgotPassword/ForgotPassword';
import LoaderErrorBoundary from '@/pages/LoaderErrorBoundary/LoaderErrorBoundary';
import Login from '@/pages/Login/Login';
import Playground from '@/pages/Playground/Playground';
import redirectLoader from '@/pages/Redirect/redirectLoader';
import Register from '@/pages/Register/Register';
import ResetPassword from '@/pages/ResetPassword/ResetPassword';
import VerifyAccount from '@/pages/VerifyAccount/VerifyAccount';
import Guard from '@/router/Guard.component';
import { guard } from '@/router/guard.loader';
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
} from 'react-router';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<RootLayout />}
      errorElement={<LoaderErrorBoundary />}
    >
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
      <Route index element={<Navigate to="/dashboard" />} />

      {/* REDIRECT HANDLER ROUTE */}
      <Route path="redirect/:redirectType" loader={redirectLoader} />

      {/* DEV ROUTES */}
      {import.meta.env.MODE === 'development' && (
        <Route path="playground" element={<Playground />} />
      )}

      {/* AUTH ROUTES */}
      <Route element={<Guard type="guest-only" />}>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="verify-account" element={<VerifyAccount />} />
        </Route>
      </Route>

      {/* APP ROUTES */}
      <Route element={<Guard type="user-only" />}>
        <Route
          path="logout"
          loader={guard(() => {
            $account.reset();
            throw redirect('/');
          })}
        />
        <Route element={<AppLayout />}>
          <Route
            path="dashboard"
            element={<Dashboard />}
            loader={guard(dashboardLoader)}
          />

          {/* <Route path="users" element={<Users />} loader={guard(usersLoader)}>
            <Route
              path="add"
              element={<AddUserDialog />}
              loader={guard(addUserDialogLoader)}
            />
            <Route
              path=":userId"
              element={<UserDetailsDialog />}
              loader={guard(userDetailsDialogLoader)}
            />
            <Route path=":userId/delete" element={<DeleteUserDialog />} />
          </Route> */}
        </Route>
      </Route>
    </Route>
  )
);
