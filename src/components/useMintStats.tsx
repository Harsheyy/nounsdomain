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

type NamedItem = { name?: string | null };
type SubgraphDomain = { name?: string | null };
type SubgraphResponse = {
  data?: {
    domain?: {
      subdomainCount?: string | number | null;
      subdomains?: SubgraphDomain[];
    };
    domains?: SubgraphDomain[];
  };
};

const extractNames = (items: NamedItem[]) =>
  items
    .map((item) => item.name)
    .filter((name): name is string => typeof name === "string" && name.length > 0);

export const useMintStats = ({
  limit = 7,
  refreshMs = 60000,
}: { limit?: number; refreshMs?: number } = {}) => {
  const { listingChainId, listedName, listingType } = useAppConfig();
  const ensSubgraphUrl =
    import.meta.env.VITE_APP_ENS_SUBGRAPH_URL ||
    "https://api.thegraph.com/subgraphs/name/ensdomains/ens";

  const [stats, setStats] = useState<MintStats>({
    totalMinted: 0,
    recentMints: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchMintStats = async () => {
      if (!listingChainId || !listedName) return;

      try {
        // Only show loading if we don't have data (count is 0)
        setStats((prev) =>
          prev.totalMinted === 0 ? { ...prev, isLoading: true, error: null } : prev
        );
        
        let totalMinted = 0;
        let recentMints: string[] = [];

        if (listingType === "L1") {
          // For L1 (ENS), we fetch directly from the subgraph to ensure consistency and performance
          // This allows us to get the TRUE total count (subdomainCount) + the list of names in one fast query
          try {
            const parentNode = namehash(normalize(listedName));
            
            const response = await axios.post<SubgraphResponse>(ensSubgraphUrl, {
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
              recentMints = extractNames(data.domains);
            }
            
            // Fallback: If list is empty but count > 0, try nested query (rare edge case)
            if (totalMinted > 0 && recentMints.length === 0) {
               const nestedResponse = await axios.post<SubgraphResponse>(ensSubgraphUrl, {
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
                 recentMints = extractNames(nestedDomains);
               }
            }
            
          } catch {
            
            // Fallback to ENS_CLIENT if subgraph fails
            try {
               const subnames = (await ENS_CLIENT.getSubnames({
                name: listedName,
                searchString: "",
                orderBy: "createdAt",
                orderDirection: "desc",
                pageSize: limit,
              })) as NamedItem[];
              
              if (subnames && subnames.length > 0) {
                recentMints = extractNames(subnames.slice(0, limit));
                totalMinted = subnames.length; // Fallback count might be capped, but better than nothing
              }
            } catch {
               recentMints = [];
            }
          }
        } else {
          // For L2, use the indexer API
          const { data } = await axios.get<{
            items: NamedItem[];
            totalItems: number;
          }>(`https://indexer.namespace.ninja/api/v1/nodes`, {
            params: {
              parentName: listedName,
              limit,
            },
            timeout: 5000 // 5s timeout
          });

          totalMinted = data.totalItems || 0;
          recentMints = data.items ? extractNames(data.items.slice(0, limit)) : [];
        }

        setStats({
          totalMinted,
          recentMints,
          isLoading: false,
          error: null,
        });

      } catch {
        setStats({
          totalMinted: 0,
          recentMints: [],
          isLoading: false,
          error: "Failed to fetch mint statistics",
        });
      }
    };

    fetchMintStats();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchMintStats, refreshMs);
    
    return () => clearInterval(interval);
  }, [listingChainId, listedName, listingType, limit, refreshMs, ensSubgraphUrl]);

  return stats;
};
