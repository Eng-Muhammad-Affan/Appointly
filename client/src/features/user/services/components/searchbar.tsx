// "use client";
// import axios from "axios";
// import { Search } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import { ClientService } from "../types";

// const useDebounce = (value: string, delay: number = 500) => {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const id = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => clearTimeout(id);
//   }, [value, delay]);

//   return debouncedValue;
// }

// export const SearchBar = () => {
//   const [searchFocused, setSearchFocused] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<ClientService[]>([]);
//   const abortControllerRef = useRef<AbortController | null>(null);

//   const debouncedQuery = useDebounce(searchQuery);


//   useEffect(() => {
//     const search = async () => {
//       // Cancel previous request if it exists
//       if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//       }

//       // Create new AbortController for this request
//       abortControllerRef.current = new AbortController();

//       try {
//         console.log(debouncedQuery)
//         const response = await axios.get(`/api/services?query=${debouncedQuery}`, {
//           signal: abortControllerRef.current.signal
//         });
//         const { data } = response;
//         console.log(data)
//         setSearchResults(data);
//       } catch (err) {
//         // Ignore abort errors
//         if (axios.isCancel(err)) {
//           return;
//         }
//         console.log(err);
//       }
//     }

//     if (debouncedQuery.trim() !== "") {
//       search();
//     } else {
//       // Clear results when query is empty or not focused
//       setSearchResults([]);
//     }
//   }, [debouncedQuery]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//       }
//     };
//   }, []);

//   return (
//     <div className="relative w-full">
//       <Search
//         className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
//         size={20}
//       />
//       <input
//         className="w-full h-12 pl-12 pr-4 bg-surface-container-lowest border border-muted/30 rounded-lg focus:outline-none focus:border-primary focus:ring-0 transition-all text-body-base"
//         placeholder="Search services..."
//         type="text"
//         onChange={(e) => setSearchQuery(e.target.value)}
//         onFocus={() => setSearchFocused(true)}
//         onBlur={() => {
//           // Delay hiding results to allow click on results
//           setTimeout(() => setSearchFocused(false), 200);
//         }}
//         value={searchQuery}
//       />
//       {searchFocused && searchResults.length > 0 && (
//         <div className="bg-surface-container-lowest absolute w-full max-h-[40vh] overflow-y-auto shadow-lg rounded-b-lg border border-t-0 border-muted/30">
//           {searchResults.map((service, idx) => (
//             <div
//               key={service.id || idx}
//               className="px-4 py-2 hover:bg-surface-container cursor-pointer"
//               onMouseDown={(e) => e.preventDefault()} // Prevent blur before click
//             >
//               {service.name}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

"use client";
import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ClientService } from "../types";

const useDebounce = (value: string, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value); // Initialize with value

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(id);
  }, [value, delay]);

  return debouncedValue;
}

export const SearchBar = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ClientService[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  const debouncedQuery = useDebounce(searchQuery);

  useEffect(() => {
    const search = async () => {
      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      try {
        // Use encodeURIComponent to properly encode the query
        const url = `/api/services?query=${encodeURIComponent(debouncedQuery)}`;
        console.log('Fetching:', url); // Debug log
        
        const response = await axios.get(url, {
          signal: abortControllerRef.current.signal
        });
        
        console.log('Response:', response.data); // Debug log
        setSearchResults(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request cancelled');
          return;
        }
        console.error('Search error:', err);
      }
    }

    // Check debouncedQuery, not searchQuery
    if (debouncedQuery.trim() !== "" && searchFocused) {
      search();
    } else {
      setSearchResults([]);
    }
  }, [debouncedQuery, searchFocused]); // Proper dependencies

  return (
    <div className="relative w-full">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        size={20}
      />
      <input
        className="w-full h-12 pl-12 pr-4 bg-surface-container-lowest border border-muted/30 rounded-lg focus:outline-none focus:border-primary focus:ring-0 transition-all text-body-base"
        placeholder="Search services..."
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => {
          // Small delay to allow click on results
          setTimeout(() => setSearchFocused(false), 200);
        }}
      />
      {searchFocused && searchResults.length > 0 && (
        <div className="bg-surface-container-lowest absolute w-full max-h-[40vh] overflow-y-auto shadow-lg rounded-b-lg border border-muted/30 z-10">
          {searchResults.map((service, idx) => (
            <div 
              key={service.id || idx}
              className="px-4 py-2 hover:bg-surface-container cursor-pointer"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                // Optional: handle service selection
                console.log('Selected:', service);
              }}
            >
              {service.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};