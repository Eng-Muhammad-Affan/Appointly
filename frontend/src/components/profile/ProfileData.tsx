// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star} from "lucide-react";
import { useProfile } from "@/stores/use-profile";
import {  useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";

const ProfileData = () => {
  const { data } = useProfile();
  const navigate = useNavigate();

  const letters = useMemo(() => {
    return data?.name ? data.name.slice(0, 2).toUpperCase() : "US";
  }, [data]);

  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  }, [data, navigate]); // Added navigate to dependencies

  // Add loading state or null check
  if (!data) {
    return null; // or a loading spinner
  }

  // Additional safety check for required fields
  if (!data.name || !data.email) {
    return null; // or an error state
  }

  return (
    <div className="bg-blue-500/10 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* <Avatar className="w-24 h-24">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback className="bg-manzarri-reddish-brown text-manzarri-white text-2xl">
              {data.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar> */}
          <div className="bg-blue-main w-[100px] h-[100px] text-3xl rounded-full flex justify-center items-center">
            {letters}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-manzarri-black mb-2">
              {data.name}
            </h1>
            <p className="text-manzarri-black/70 mb-4">{data.email}</p>
            <div className="flex items-center gap-4">
              <Badge className="bg-manzarri-faun text-manzarri-white">
                <Star className="w-3 h-3 mr-1" />
                Gold Member
              </Badge>
              <Badge
                variant="outline"
                className="border-manzarri-green text-manzarri-green"
              >
                Verified
              </Badge>
            </div>
          </div>
          {/* <Link to="/profile/settings">
            <Button
              variant="outline"
              className="border-manzarri-reddish-brown text-manzarri-reddish-brown hover:bg-manzarri-reddish-brown hover:text-manzarri-white"
            >
              <Settings className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileData;