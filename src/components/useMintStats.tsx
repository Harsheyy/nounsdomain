import { useEffect, useState } from "react";
import { useAppConfig } from "./AppConfigContext";
import { ENS_CLIENT } from "./ens/ens-client";
import axios from "axios";

interface MintStats {
  totalMinted: number;
  recentMints: string[];
  isLoading: boolean;
  error: string | null;
}

import { namehash, normalize } from "viem/ens";

export const useMintStats = () => {
  const { listingChainId, listedName, listingType } = useAppConfig();

  // Initialize with cached data if available
  const [stats, setStats] = useState<MintStats>(() => {
    try {
      if (listedName) {
        const cached = localStorage.getItem(`mintStats-${listedName}`);
        if (cached) {
          const parsed = JSON.parse(cached);
          // Only use cache if it's less than 1 hour old
          if (Date.now() - parsed.timestamp < 3600000) {
            return {
              totalMinted: parsed.totalMinted,
              recentMints: parsed.recentMints,
              isLoading: false, // Start with false since we have data
              error: null
            };
          }
        }
      }
    } catch (e) {
      console.warn("Failed to load cached stats", e);
    }
    
    return {
      totalMinted: 0,
      recentMints: [],
      isLoading: true,
      error: null,
    };
  });

  useEffect(() => {
    const fetchMintStats = async () => {
      if (!listingChainId || !listedName) return;

      try {
        // Only show loading if we don't have data (count is 0)
        if (stats.totalMinted === 0) {
            setStats(prev => ({ ...prev, isLoading: true, error: null }));
        }
        
        let totalMinted = 0;
        let recentMints: string[] = [];
        const limit = 100;

        if (listingType === "L1") {
          // For L1 (ENS), we fetch directly from the subgraph to ensure consistency and performance
          // This allows us to get the TRUE total count (subdomainCount) + the list of names in one fast query
          try {
            const parentNode = namehash(normalize(listedName));
            
            const response = await axios.post("https://api.thegraph.com/subgraphs/name/ensdomains/ens", {
              query: `
                query {
                  domain(id: "${parentNode}") {
                    subdomainCount
                  }
                  domains(where: { parent: "${parentNode}" }, first: ${limit}, orderBy: createdAt, orderDirection: desc) {
                    name
                  }
                }
              `
            }, { timeout: 5000 }); // 5s timeout

            const data = response.data?.data;
            
            // 1. Get total count
            if (data?.domain?.subdomainCount) {
              totalMinted = Number(data.domain.subdomainCount);
            }

            // 2. Get recent mints
            if (data?.domains && Array.isArray(data.domains)) {
              recentMints = data.domains
                .filter((sub: any) => sub.name)
                .map((sub: any) => sub.name);
            }
            
            // Fallback: If list is empty but count > 0, try nested query (rare edge case)
            if (totalMinted > 0 && recentMints.length === 0) {
               const nestedResponse = await axios.post("https://api.thegraph.com/subgraphs/name/ensdomains/ens", {
                 query: `
                   query {
                     domain(id: "${parentNode}") {
                       subdomains(first: ${limit}, orderBy: createdAt, orderDirection: desc) {
                         name
                       }
                     }
                   }
                 `
               }, { timeout: 5000 });
               const nestedDomains = nestedResponse.data?.data?.domain?.subdomains;
               if (nestedDomains && Array.isArray(nestedDomains)) {
                 recentMints = nestedDomains.map((d: any) => d.name);
               }
            }
            
          } catch (err) {
            console.error("Failed to fetch from subgraph", err);
            
            // Fallback to ENS_CLIENT if subgraph fails
            try {
               const subnames = await ENS_CLIENT.getSubnames({
                name: listedName,
                searchString: "",
                orderBy: "createdAt",
                orderDirection: "desc",
                pageSize: limit,
              });
              
              if (subnames && subnames.length > 0) {
                recentMints = subnames.slice(0, limit).map((sub: any) => sub.name);
                totalMinted = subnames.length; // Fallback count might be capped, but better than nothing
              }
            } catch (fallbackErr) {
               console.error("ENS_CLIENT fallback also failed", fallbackErr);
            }
          }
        } else {
          // For L2, use the indexer API
          const { data } = await axios.get<{
            items: any[];
            totalItems: number;
          }>(`https://indexer.namespace.ninja/api/v1/nodes`, {
            params: {
              parentName: listedName,
              limit,
            },
            timeout: 5000 // 5s timeout
          });

          totalMinted = data.totalItems || 0;
          recentMints = data.items?.slice(0, limit).map(item => item.name) || [];
        }

        // Save to cache
        if (totalMinted > 0) {
            localStorage.setItem(`mintStats-${listedName}`, JSON.stringify({
              totalMinted,
              recentMints,
              timestamp: Date.now()
            }));
        }

        setStats({
          totalMinted,
          recentMints,
          isLoading: false,
          error: null,
        });

      } catch (error) {
        console.error("Error fetching mint stats:", error);
        setStats(prev => ({
          ...prev,
          isLoading: false,
          error: "Failed to fetch mint statistics",
        }));
      }
    };

    fetchMintStats();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchMintStats, 30000);
    
    return () => clearInterval(interval);
  }, [listingChainId, listedName, listingType]);

  return stats;
};
