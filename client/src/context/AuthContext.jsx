import { createContext, useReducer, useEffect } from "react";

// Initial state för AuthContext
const initialState = {
  user: null,  // Användarinformation, t.ex. username eller token
};

// Reducer för att hantera LOGIN och LOGOUT
const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

// Skapa AuthContext
const AuthContext = createContext();

// Provider för AuthContext
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  // Kolla om det finns en inloggad användare i localStorage vid första sidladdningen
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  // När användaren loggar in/ut, uppdatera localStorage
  useEffect(() => {
    if (state.user) {
      window.localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      window.localStorage.removeItem("user");
    }
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
