"use client"
import ProfileData from "./ProfileData";
import RecentAppointments from "./RecentAppointments";
import QuickStats from "./QuickStats";
import QuickActions from "./QuickActions";

export default function UserProfile() {
  return (
    <div className="py-10 min-h-screen bg-manzarri-white">
      {/* Header */}
      <ProfileData />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <QuickStats />
            {/* Recent Orders */}
            <RecentAppointments />
            {/* <UpcomingAppointments/> */}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <QuickActions />
            {/* Membership Status */}
            {/* <MemberShip /> */}
            {/* Support */}
            {/* <SupportLinks /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
