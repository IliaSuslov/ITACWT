import { Outlet, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from '@/components/theme-provider';
import Layout from '@/components/layout';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Layout>
        <Outlet />
      </Layout>
    </ThemeProvider>
  );
}
