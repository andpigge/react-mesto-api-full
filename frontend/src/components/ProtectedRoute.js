import { Route, Redirect } from "react-router-dom";

import { appUrl } from '../utils/constants';

const ProtectedRoute = ({ component: Сomponent, path, ...props }) => {
  return (
    <Route path={ path }>
      {
        props.loggedIn ? <Сomponent {...props} /> : <Redirect to={`${appUrl}/signin`} />
      }
    </Route>
  );
}

export default ProtectedRoute;
