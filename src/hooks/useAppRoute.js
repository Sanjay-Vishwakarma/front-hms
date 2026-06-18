import { useCallback, useEffect, useMemo, useState } from 'react';

const VIEW_PARAM = 'view';

export function useAppRoute(routes) {
  const defaultRoute = routes[0].id;
  const validRoutes = useMemo(() => new Set(routes.map((route) => route.id)), [routes]);

  const readRoute = useCallback(() => {
    const route = new URLSearchParams(window.location.search).get(VIEW_PARAM);
    return validRoutes.has(route) ? route : defaultRoute;
  }, [defaultRoute, validRoutes]);

  const [activeRoute, setActiveRoute] = useState(readRoute);

  const navigate = useCallback((route) => {
    if (!validRoutes.has(route)) {
      return;
    }

    const url = new URL(window.location.href);
    url.searchParams.set(VIEW_PARAM, route);
    window.history.pushState({}, '', url);
    setActiveRoute(route);
  }, [validRoutes]);

  useEffect(() => {
    const handlePopState = () => setActiveRoute(readRoute());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [readRoute]);

  return { activeRoute, navigate };
}
