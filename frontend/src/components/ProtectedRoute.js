import { Route, Redirect } from "react-router-dom";

// import { appUrl } from '../utils/constants';

const ProtectedRoute = ({ component: Сomponent, path, ...props }) => {
  return (
    <Route path={ path }>
      {
        /* Убрал ${appUrl}/signin */
        props.loggedIn ? <Сomponent {...props} /> : <Redirect to={`/signin`} />
      }
    </Route>
  );
}

export default ProtectedRoute;
