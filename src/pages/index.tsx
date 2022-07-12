import { lazy, Suspense } from "react";

const Home = lazy(() => import("./Home"));
const Login = lazy(() => import("./Login"));
const Management = lazy(() => import("./Management"));
const PageNotFound = lazy(() => import("./PageNotFound"));
// PAGE IMPORT
const lazyLoadComponent = (Component: any) => (props: any) =>
  (
    <Suspense fallback={null}>
      <Component {...props} />
    </Suspense>
  );

export default [
  { path: "/", component: lazyLoadComponent(Home), exact: true, public: false },
  {
    path: "/login",
    component: lazyLoadComponent(Login),
    exact: true,
    public: true,
  },
  {
    path: "/management",
    component: lazyLoadComponent(Management),
    exact: true,
    public: false,
  },
  {
    path: "*",
    component: lazyLoadComponent(PageNotFound),
    exact: false,
    public: true,
  },
  // PAGE EXPORT
];
