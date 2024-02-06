import React from 'react';
import { Route, Navigate } from 'react-router-dom';
function IsAuth({ Component }) {
    const isAuthenticated = localStorage.getItem('login-token') ? true : false;
    console.log(isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to='/login' />
    }
    
return <Component />;
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
//       }
//     />
//   );
}
export default IsAuth;