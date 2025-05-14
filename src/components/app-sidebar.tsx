import { Home, Contact, Award } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link } from '@tanstack/react-router';
import { ModeToggle } from './mode-toggle';

const items = [
  {
    title: 'Home',
    url: '/',
    icon: <Home />,
  },
  {
    title: 'Contacts',
    url: '/contacts',
    icon: <Contact />,
  },
  {
    title: 'Pages',
    url: '/pages',
    icon: <Award />,
  },
  {
    title: 'Price Plans',
    url: '/price_plans',
    icon: <Award />,
  },
  {
    title: 'Products',
    url: '/products',
    icon: <Award />,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between">
            ISR Template
            <ModeToggle />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <Link key={item.title} to={item.url}>
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <div>
                        {item.icon} {item.title}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
