import {
  ProfileData,
  QuickStats,
  RecentOrders,
  QuickActions,
} from "@/components/profile";

export default function UserProfile() {
  return (
    <div className="min-h-screen bg-manzarri-white py-6">
      {/* Header */}
      <ProfileData />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <QuickStats />
            {/* Recent Orders */}
            <RecentOrders />
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
