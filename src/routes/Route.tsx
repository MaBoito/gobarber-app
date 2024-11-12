import React  from 'react';
import {
  RouteProps as ReactDOMRouterProps,
  Route as ReactDOMRoute,
  Navigate,
} from 'react-router-dom';
import { useAuth } from '../hooks/Auth';

interface CustomRouteProps extends ReactDOMRouterProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<CustomRouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={() => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Navigate to={{ pathname: isPrivate ? '/' : '/dashboard' }} />
        );
      }}
    />
  );
};

export default Route;
