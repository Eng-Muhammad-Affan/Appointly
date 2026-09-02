"use client";

import { Badge } from "@/components/ui/badge";
import { Star, Settings, User} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

// Loading skeleton component
const ProfileSkeleton = () => {
  return (
    <div className="bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-secondary)]/20 py-12 animate-pulse">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar skeleton */}
          <div className="w-[100px] h-[100px] rounded-full bg-gray-300 dark:bg-gray-700" />
          
          <div className="flex-1 space-y-3">
            {/* Name and badge skeleton */}
            <div className="flex items-center gap-3">
              <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-6 w-28 bg-gray-300 dark:bg-gray-700 rounded-full" />
            </div>
            
            {/* Email skeleton */}
            <div className="h-5 w-64 bg-gray-300 dark:bg-gray-700 rounded" />
            
            {/* Badges skeleton */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
              <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded-full" />
            </div>
          </div>
          
          {/* Button skeleton */}
          <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />
        </div>
      </div>
    </div>
  );
};

// Main profile component
const ProfileData = () => {
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await authClient.getSession();
        
        if (error) {
          throw new Error(error.message || "Failed to fetch session");
        }
        
        setSession(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error occurred"));
        console.error("Session fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, []);

  // Show loading state
  if (isLoading) {
    return <ProfileSkeleton />;
  }

  // Show error state
  if (error) {
    return (
      <div className="bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-secondary)]/20 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
            <p className="text-red-600 dark:text-red-400">
              Failed to load profile. Please try again.
            </p>
            <Button 
              variant="outline" 
              className="mt-2"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // No session - user not logged in
  if (!session?.user) {
    return (
      <div className="bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-secondary)]/20 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[var(--color-on-surface-variant)]">
            Please sign in to view your profile.
          </p>
          <Link href="/auth/signin">
            <Button className="mt-4">Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-secondary)]/20 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-secondary-dark)] flex justify-center items-center text-3xl font-bold text-[var(--color-on-secondary)] shadow-lg border-2 border-white">
            {session.user.name?.[0] || session.user.email?.[0] || "U"}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-h1 text-[var(--color-on-surface)]">
                {session.user.name || "User"}
              </h1>
              <Badge className="bg-[var(--color-accent)] text-[var(--color-on-primary)] text-caption">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Gold Member
              </Badge>
            </div>
            <p className="text-body-base text-[var(--color-on-surface-variant)] mb-4">
              {session.user.email}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Badge className="bg-[var(--color-secondary)] text-[var(--color-on-secondary)]">
                <User className="w-3 h-3 mr-1" />
                Verified
              </Badge>
              <Badge variant="outline" className="border-[var(--color-outline)] text-[var(--color-on-surface-variant)]">
                Member since {new Date(session.user.createdAt || Date.now()).getFullYear()}
              </Badge>
            </div>
          </div>
          <Link href="/account/settings">
            <Button
              variant="outline"
              className="border-[var(--color-secondary)] text-[var(--color-secondary-dark)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-on-secondary)] transition-all duration-300"
            >
              <Settings className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileData;