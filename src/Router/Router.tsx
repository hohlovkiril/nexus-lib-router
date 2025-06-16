import React, { useEffect } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {NestedRouterProps, RoutePageProps, RouterProps, RoutesPathnamesMap} from "../types";
import {parseRoutesPathnames} from "../utils";

export const Router: React.FC<RouterProps> = (props) => {
  const { routes, layout } = props;

  useEffect(() => {
    const routesPathnames: RoutesPathnamesMap = {};

    parseRoutesPathnames(routesPathnames, routes);

    if (props.onParseRoutesPathnamesMap) {
      props.onParseRoutesPathnamesMap(routesPathnames);
    }
  }, [
    props,
  ])

  return (
    <BrowserRouter>
      <NestedRouter routes={routes} layout={layout} />
    </BrowserRouter>
  )
}

export const NestedRouter: React.FC<NestedRouterProps> = (props) => {
  const { routes, layout } = props;

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={Array.isArray(route.element)
            ? `${route.path}/*` : route.path}
          element={Array.isArray(route.element)
            ? <NestedRouter routes={route.element} layout={layout} />
            : <RoutePage element={route.element} layout={route.layout} defaultLayout={layout} />}
        />
      ))}
    </Routes>
  )
}

export const RoutePage: React.FC<RoutePageProps> = (props) => {
  const { element, layout: Layout, defaultLayout: DefaultLayout } = props;

  return (
    <>
      {Layout !== undefined ? (
        <>
          <Layout>
            {element}
          </Layout>
        </>
      ) : DefaultLayout !== undefined ? (
        <>
          <DefaultLayout>
            {element}
          </DefaultLayout>
        </>
      ) : (
        <>
          {element}
        </>
      )}
    </>
  )
}