// Links.tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Headphones, Truck, RefreshCw, MessageCircle } from "lucide-react";

const Links = () => {
  const supportLinks = [
    { label: "Contact Support", icon: Headphones, href: "/support" },
    { label: "Track Order", icon: Truck, href: "/track" },
    { label: "Return Policy", icon: RefreshCw, href: "/returns" },
    { label: "Live Chat", icon: MessageCircle, href: "/chat" },
  ];

  return (
    <Card className="border-[var(--color-outline-variant)] hover:shadow-lg transition-all duration-300">
      <div className="p-6">
        <h3 className="font-semibold text-[var(--color-on-surface)] text-h3 mb-4 flex items-center">
          <span className="w-1 h-6 bg-[var(--color-secondary)] rounded-full mr-3"></span>
          Need Help?
        </h3>
        <div className="space-y-2">
          {supportLinks.map((link, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start text-[var(--color-on-surface-variant)] hover:text-[var(--color-secondary-dark)] hover:bg-[var(--color-secondary)]/10 transition-all duration-300 rounded-lg"
              asChild
            >
              <a href={link.href}>
                <link.icon className="w-4 h-4 mr-3" />
                {link.label}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Links;
