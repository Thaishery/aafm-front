import { createContext } from "react";

export const LoaderContext = createContext({
  isLoading:true,
  onSetIsLoading(isLoading){}
});