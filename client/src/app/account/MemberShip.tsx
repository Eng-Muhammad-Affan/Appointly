// import { Card } from "@/components/ui/card";
// import { Star } from "lucide-react";

// const MemberShip = () => {
//   return (
//     <Card className="border-manzarri-black/10 bg-gradient-to-br from-manzarri-faun/10 to-manzarri-reddish-brown/10">
//       <div className="p-6">
//         <div className="flex items-center mb-4">
//           <Star className="w-6 h-6 text-manzarri-faun mr-2" />
//           <h3 className="font-semibold text-manzarri-black">Gold Member</h3>
//         </div>
//         <p className="text-sm text-manzarri-black/70 mb-4">
//           Enjoy exclusive benefits including free shipping, early access to
//           sales, and personalized recommendations.
//         </p>
//         <div className="space-y-2 text-xs text-manzarri-black/60">
//           <div className="flex justify-between">
//             <span>Progress to Platinum</span>
//             <span>$1,200 / $5,000</span>
//           </div>
//           <div className="w-full bg-manzarri-skin/50 rounded-full h-2">
//             <div
//               className="bg-manzarri-faun h-2 rounded-full"
//               style={{ width: "24%" }}
//             ></div>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default MemberShip;

// MemberShip.tsx
import { Card } from "@/components/ui/card";
import { Crown } from "lucide-react";

const MemberShip = () => {
  return (
    <Card className="border-[var(--color-outline-variant)] bg-gradient-to-br from-[var(--color-secondary)]/20 to-[var(--color-accent)]/10 hover:shadow-lg transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-[var(--color-secondary)]/20 rounded-full mr-3">
            <Crown className="w-5 h-5 text-[var(--color-secondary-dark)]" />
          </div>
          <h3 className="font-semibold text-[var(--color-on-surface)] text-h3">
            Gold Member
          </h3>
        </div>
        <p className="text-body-small text-[var(--color-on-surface-variant)] mb-4">
          Enjoy exclusive benefits including free shipping, early access to
          sales, and personalized recommendations.
        </p>
        <div className="space-y-2">
          <div className="flex justify-between text-caption text-[var(--color-on-surface-variant)]">
            <span>Progress to Platinum</span>
            <span>$1,200 / $5,000</span>
          </div>
          <div className="w-full bg-[var(--color-surface-container)] rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] h-2 rounded-full transition-all duration-500"
              style={{ width: "24%" }}
            ></div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MemberShip;
