import { createContext, useReducer } from "react";

export const SeriesData = createContext();

export const initialState = {
  episodes: [],
};

export function reducer(state, action) {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, episodes: action.payload };
    default:
      return state;
  }
}

const SeriesDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SeriesData.Provider value={{ state, dispatch }}>
      {children}
    </SeriesData.Provider>
  );
};

export default SeriesDataProvider;
