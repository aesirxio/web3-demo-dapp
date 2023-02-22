import { createContext, useContext } from "react";

const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children, content }) => {
  return (
    <AuthenticationContext.Provider value={content}>{children}</AuthenticationContext.Provider>
  );
};

/* Hook to use store in any functional component */
export const useAuthentication = () => useContext(AuthenticationContext);

/* HOC to inject store to any functional or class component */
export const withAuthentication = (Component) => (props) => {
  return <Component {...props} content={withAuthentication()} />;
};
