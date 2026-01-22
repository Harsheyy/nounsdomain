import { addEnsContracts, ensPublicActions, ensSubgraphActions } from "@ensdomains/ensjs";
import { createPublicClient, publicActions } from "viem";
import { mainnet } from "viem/chains";
import { http } from "viem";

const ENS_SUBGRAPH_URL =
    import.meta.env.VITE_APP_ENS_SUBGRAPH_URL ||
    "https://api.thegraph.com/subgraphs/name/ensdomains/ens";

export const ENS_CLIENT = createPublicClient({
    chain: {
        ...addEnsContracts(mainnet),
        subgraphs: {
            ens: {
                url: ENS_SUBGRAPH_URL
            }
        }
    },
    transport: http()
}).extend(publicActions).extend(ensPublicActions).extend(ensSubgraphActions);
