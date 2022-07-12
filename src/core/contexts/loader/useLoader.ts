import { createContext, Dispatch, SetStateAction } from "react";
export interface LoaderContextInterface {
  setLoading: Dispatch<SetStateAction<any>>;
}
export const defaultLoaderContext = {
  setLoading: (): void => {},
};
const LoaderContext =
  createContext<LoaderContextInterface>(defaultLoaderContext);

export default LoaderContext;
