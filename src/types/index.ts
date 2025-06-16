import React from 'react';

export type RoutesPathnamesMap = {
  [path: string]: {
    regexp?: RegExp;
    helmet?: any;
    breadcrumbs?: {
      title?: string;
      icon?: React.ReactNode;
    }
  }
}

export type RouteType = {
  helmet?: any;
  breadcrumbs?: {
    title?: string;
    icon?: React.ReactNode;
  }
  path: string;
  pathRegexp?: RegExp;
  element: React.ReactNode | RouteType[];
  layout?: React.ElementType;
}

export type RouterProps = {
  routes: RouteType[];
  layout?: React.ElementType;
  onParseRoutesPathnamesMap?: (breadcrumbs: RoutesPathnamesMap) => void;
}

export type NestedRouterProps = {
  routes: RouteType[];
  layout?: React.ElementType;
}

export type RoutePageProps = {
  element: React.ReactNode;
  layout?: React.ElementType;
  defaultLayout?: React.ElementType;
}
