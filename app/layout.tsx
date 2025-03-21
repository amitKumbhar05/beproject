import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AuthProvider } from '../context/AuthContext';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Object Detection & Blurring",
  description: "Advanced AI-powered object detection and blurring for sensitive video content",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <div className="flex min-h-screen flex-col">
                  <header className="sticky top-0 z-40 border-b bg-background">
                    <div className="container flex h-16 items-center">
                      <MainNav />
                    </div>
                  </header>
                  {children}
                </div>
              </SidebarInset>
            </SidebarProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}