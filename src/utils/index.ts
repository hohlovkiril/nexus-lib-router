import { RouteType, RoutesPathnamesMap } from "../types";

export function parseRoutesPathnames(
  pathnames: RoutesPathnamesMap,
  routes: RouteType[],
  parentPath?: string,
) {
  routes.forEach((route: RouteType) => {
    if (!parentPath) {
      pathnames[route.path] = {
        regexp: route.pathRegexp,
        helmet: route.helmet,
        breadcrumbs: route.breadcrumbs,
      }

      if (Array.isArray(route.element)) {
        parseRoutesPathnames(pathnames, route.element, route.path);
      }
    } else {
      const path = `${parentPath}${route.path}`;

      pathnames[path] = {
        regexp: route.pathRegexp,
        helmet: route.helmet,
        breadcrumbs: route.breadcrumbs,
      }

      if (Array.isArray(route.element)) {
        parseRoutesPathnames(pathnames, route.element, path);
      }
    }
  })
}