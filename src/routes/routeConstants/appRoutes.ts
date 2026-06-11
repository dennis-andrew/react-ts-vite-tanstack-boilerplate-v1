const createNestedRoutes = <T extends Record<string, string>>(
  basePath: string,
  routes: T,
): { [K in keyof T]: string } => {
  return Object.fromEntries(
    Object.entries(routes).map(([key, value]) => [key, `${basePath}${value}`]),
  ) as { [K in keyof T]: string }
}

const authRoutes = {
  LOGIN: '/login',
}

export const AppRoutes = {
  AUTH: createNestedRoutes('/auth', authRoutes),
  APP_COMPONENTS: '/app-components',
  HOME: '/',
}
