"use client"

import * as React from "react"

import { HiOutlineHome, HiUserGroup, } from "react-icons/hi";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { HiOutlineTag } from "react-icons/hi";
import Logo from "@/assets/logo.png";


import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router-dom";
import { Boxes } from "lucide-react";

const links = [
    {
        title: "Dashboard",
        url: "/admin", // Changed from "#" to actual route
        icon: HiOutlineHome,
    },
    {
        title: "Orders",
        url: "/admin/orders", // Changed from "#" to actual route
        icon: Boxes,
    },
    {
        title: "Services",
        url: "/admin", // Changed from "#" to actual route
        icon: HiOutlineHome,
    },
    {
        title: "Inventory",
        url: "/admin/inventory", // Changed from "#" to actual route
        icon: HiOutlineDevicePhoneMobile,
    },
    {
        title: "Categories",
        url: "/admin/categories", // Changed from "#" to actual route
        icon: HiOutlineTag,
    },

    {
        title: "Users",
        url: "/admin/users", // Changed from "#" to actual route
        icon: HiUserGroup,
    },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="data-[slot=sidebar-menu-button]:p-1.5!">
                        <img src={Logo} alt="Tech Waghera" className='h-12 w-auto lg:h-14 transition-all duration-300' />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu className="flex flex-col gap-2 p-3">
                    {links.map((link) => (
                        <SidebarMenuItem key={link.title}>
                            <SidebarMenuButton asChild tooltip={link.title} className="min-w-8 duration-300 ease-linear">
                                <NavLink
                                    to={link.url}
                                    className={({ isActive }) =>
                                        isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                                    }
                                >
                                    {link.icon && <link.icon />}
                                    <span>{link.title}</span>
                                </NavLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                {/* Add footer content here if needed */}
            </SidebarFooter>
        </Sidebar>
    )
}