"use client";

import type * as React from "react";
import {
  IconCamera,
  IconFileAi,
  IconFileDescription,
  IconHelp,
  IconSettings,
  IconUsers,
  IconCircleDot,
  IconCalendarWeekFilled,
  IconCalendarClock,
} from "@tabler/icons-react";

import { Sidebar } from "@/components/ui/sidebar";
import { useDashboard } from "../hooks/use-dashboard";

const _data = {
  navMain: [
    {
      title: "Activity",
      url: "/dashboard",
      icon: IconCircleDot,
    },
    {
      title: "Appointments",
      url: "/dashboard/appointments",
      icon: IconUsers,
    },
    {
      title: "Schedule",
      url: "/dashboard/schedule",
      icon: IconCalendarWeekFilled,
    },
    {
      title: "Reschedules",
      url: "/dashboard/reschedules",
      icon: IconCalendarClock,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
  ],
};

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { services } = useDashboard();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <aside className="hidden md:flex flex-col h-screen w-64 sticky left-0 top-0 bg-surface dark:bg-surface py-xl px-md border-r border-outline-variant/20 z-50">
        <div className="mb-xl px-md">
          <h1 className="font-h3 text-h3 font-bold text-primary">Appointly</h1>
        </div>
        <div className="flex items-center gap-md mb-xl px-md">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container">
            <img
              alt="Provider Profile Image"
              className="w-full h-full object-cover"
              data-alt="A professional headshot of a female studio manager with a warm, confident smile in a bright, modern interior environment. The lighting is soft and airy, emphasizing a high-end wellness or beauty professional vibe. The background is slightly blurred with soft pastel colors and minimalist decor."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5Wz0UErGpyiseGaPLDEokeOjSaOd6q1mL9VSCaC_chd33M4Ps-tOcWMzcRV4szk3re6_z7i9GnT_r2wfUSs_-K2Fv6I50sAgjVoW0WtF4YlzYo3YyrVbEun6dIhCypVBQ94ncS657T1NEwQ0ZYGEXK2mSCEQGUoUV01h31omoj0RTjRKnTFI3CfZAi-f_NVnd9AW_Vy5L3vIk5EjVR7Gw4W4W5Q6FvaDb2G4QR75uriYVQUtKOHVSM2JdrukJq1A2N5upAx5IYttK"
            />
          </div>
          <div>
            <p className="font-label-bold text-label-bold text-on-surface">
              Appointly Provider
            </p>
            <p className="text-caption font-caption text-on-surface-variant">
              Managing Studio
            </p>
          </div>
        </div>
        <nav className="flex-1 space-y-sm">
          <a
            className="flex items-center gap-md text-on-surface-variant px-md py-sm hover:bg-surface-container-high rounded-lg transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-label-bold text-label-bold">Overview</span>
          </a>
          <a
            className="flex items-center gap-md bg-secondary-container text-on-secondary-container rounded-lg px-md py-sm active:opacity-80 transition-opacity"
            href="#"
          >
            <span className="material-symbols-outlined">event_note</span>
            <span className="font-label-bold text-label-bold">
              Appointments
            </span>
          </a>
          <a
            className="flex items-center gap-md text-on-surface-variant px-md py-sm hover:bg-surface-container-high rounded-lg transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">chat_bubble</span>
            <span className="font-label-bold text-label-bold">Messages</span>
          </a>
          <a
            className="flex items-center gap-md text-on-surface-variant px-md py-sm hover:bg-surface-container-high rounded-lg transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">
              account_balance_wallet
            </span>
            <span className="font-label-bold text-label-bold">Wallet</span>
          </a>
          <a
            className="flex items-center gap-md text-on-surface-variant px-md py-sm hover:bg-surface-container-high rounded-lg transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-bold text-label-bold">Settings</span>
          </a>
        </nav>
        <div className="mt-auto px-md">
          <button className="w-full bg-primary text-on-primary font-label-bold text-label-bold py-md rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-sm">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Book New
          </button>
        </div>
      </aside>
      {/* <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href={"/"}>
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Appointly</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {services.length <= 0 ? null : (
          <>
            <NavMain items={data.navMain} />
            <NavSecondary items={data.navSecondary} className="mt-auto" />
          </>
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter> */}
    </Sidebar>
  );
};
