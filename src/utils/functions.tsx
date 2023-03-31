/**
 * Replaces the path variables in a route with the given parameters
 *
 * @param route A route containing at least one path variable (e.g., /login/:role, where :role is the variable)
 * @param params A variable number of parameters
 * @returns The given route with path variables replaced
 */
export const paramRoute = (
  route: string,
  ...params: Array<string | undefined>
) => {
  let path = route;
  const regex = /:\w+/g;
  const variables = Array.from(route.matchAll(regex), (match) => match[0]);
  params.forEach(
    (param, i) => (path = path.replace(variables[i], param ?? ''))
  );
  return path;
};

/**
 * Gets the fragment (the part after #) from the given route
 *
 * @param route A url string
 * @returns The fragment from the route, or an empty string if no fragment
 */
export const getFragment = (route: string) => {
  const routeParts = route.split('#');
  return routeParts.length > 1 ? routeParts[1] : '';
};
