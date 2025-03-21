"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Upload,
  FileVideo,
  Settings,
  Users,
  HelpCircle,
  Mail,
  BarChart,
  Shield,
  Database,
  Cloud,
  Layers,
  Zap,
  BookOpen,
  FileText,
  Briefcase,
  Award,
  Cpu,
  Code,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const pathname = usePathname()

  const mainNavItems = [
    {
      title: "Home",
      href: "/",
      icon: Home,
    },
    {
      title: "Upload",
      href: "#upload",
      icon: Upload,
    },
    {
      title: "Videos",
      href: "/videos",
      icon: FileVideo,
    },
    // {
    //   title: "Settings",
    //   href: "/settings",
    //   icon: Settings,
    // },
  ]

  const analyticsItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: BarChart,
    },
    {
      title: "Reports",
      href: "/reports",
      icon: FileText,
    },
    {
      title: "Usage",
      href: "/usage",
      icon: Cpu,
    },
  ]

  const securityItems = [
    {
      title: "Security",
      href: "/security",
      icon: Shield,
    },
    {
      title: "Encryption",
      href: "/encryption",
      icon: Shield,
    },
    {
      title: "Permissions",
      href: "/permissions",
      icon: Users,
    },
  ]

  const technicalItems = [
    {
      title: "API",
      href: "/api",
      icon: Code,
    },
    {
      title: "Database",
      href: "/database",
      icon: Database,
    },
    {
      title: "Cloud Storage",
      href: "/storage",
      icon: Cloud,
    },
    {
      title: "Models",
      href: "/models",
      icon: Layers,
    },
    {
      title: "Performance",
      href: "/performance",
      icon: Zap,
    },
  ]

  const infoNavItems = [
    {
      title: "About Us",
      href: "/about",
      icon: Users,
    },
    {
      title: "Contact",
      href: "/contact",
      icon: Mail,
    },
    // {
    //   title: "Help",
    //   href: "/help",
    //   icon: HelpCircle,
    // },
    // {
    //   title: "Documentation",
    //   href: "/docs",
    //   icon: BookOpen,
    // },
    // {
    //   title: "Case Studies",
    //   href: "/case-studies",
    //   icon: Briefcase,
    // },
    // {
    //   title: "Certifications",
    //   href: "/certifications",
    //   icon: Award,
    // },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center px-2 py-3">
          <span className="text-lg font-semibold">Blurshield</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="custom-scrollbar">
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* <SidebarSeparator /> */}

        {/* <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analyticsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}

        {/* <SidebarSeparator /> */}

        {/* <SidebarGroup>
          <SidebarGroupLabel>Security</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {securityItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}

        {/* <SidebarSeparator /> */}

        {/* <SidebarGroup>
          <SidebarGroupLabel>Technical</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {technicalItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Information</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {infoNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <div className="px-3 py-2">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Blurshield</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

