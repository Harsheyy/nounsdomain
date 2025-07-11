
# Nouns Subname Minting Website

                  ***************************************     **************************************
                  ***************************************     **************************************
                  ***************************************     **************************************
                  *******::::::::::::+%%%%%%%%%%%%*******     ******+::::::::::::#%%%%%%%%%%%%******
                  *******            +@@@@@@@@@@@@*******     ******=            #@@@@@@@@@@@@******
                  *******            +@@@@@@@@@@@@*******     ******=            #@@@@@@@@@@@@******
*************************            +@@@@@@@@@@@@******************=            #@@@@@@@@@@@@******
*************************            +@@@@@@@@@@@@******************=            #@@@@@@@@@@@@******
*************************            +@@@@@@@@@@@@******************=            #@@@@@@@@@@@@******
*************************            +@@@@@@@@@@@@******************=            #@@@@@@@@@@@@******
*******           *******            +@@@@@@@@@@@@*******     ******=            #@@@@@@@@@@@@******
*******           *******            +@@@@@@@@@@@@*******     ******=            #@@@@@@@@@@@@******
*******           *******            +@@@@@@@@@@@@*******     ******=            #@@@@@@@@@@@@******
*******           *******            +@@@@@@@@@@@@*******     ******=            #@@@@@@@@@@@@******
*******           *******            +@@@@@@@@@@@@*******     ******=            #@@@@@@@@@@@@******
*******           *******            +@@@@@@@@@@@@*******     ******=            #@@@@@@@@@@@@******
*******           *******::::::::::::+%%%%%%%%%%%%*******     ******+::::::::::::#%%%%%%%%%%%%******
                  ***************************************     **************************************
                  ***************************************     **************************************
                  ***************************************     **************************************

## Features

-  **Quick Setup**: Get started with a fully functional subname-minting website in minutes.
-  **Customizable Design:** Easily tailor the website's appearance to align with your brand.
-  **Wallet Integration**: Seamless wallet connection using RainbowKit.
-  **ENS Integration:** Seamlessly manage subname issuance under your primary ENS domain.
-  **Responsive Design**: Fully responsive design that works on all devices.
-  **L1 and L2 Compatibility:** Supports both Layer 1 and Layer 2 chains and subnames.
-  **User-Friendly Interface:** Simplifies the minting process for end-users.
-  **Referral System**: Built-in referral system to incentivize users to invite others.

# Launch your own Subpage

## Listing and configuring ENS Name

To be able to issue subnames on L1 or L2s, you need to list the name through the Namespace platform.

1. Go to [https://app.namespace.ninja](https://app.namespace.ninja)
2. Navigate to Account -> Manager
3. Select the ENS name you want to list (and issue subnames from)
4. Go through the listing process
    1. Choose the chain you want to issue subnames on
    2. Customize subname price (or issue them for free)
    3. Reserve subnames from being minted
    4. Add whitelisting options for wallets
    5. Implement token-gating based on ERC20, ERC721, or ERC1155
5. List the name!
6. Done.

For more information, or assistance, ping @thecaphimself on Telegram or read through our [official docs](https://docs.namespace.tech/namespace-platform/manager/listing-an-ens-name).

## Running the Project

### Prerequisites

- **Node.js**
- **npm**

### Installation

1. Clone the repository
2. Install the dependencies:
```bash
yarn install
```

### Configure

Create .env file in the folder root and add required environment variables
```
VITE_APP_LISTED_NAME=⌐◨-◨.eth // YOUR listed name
VITE_APP_LISTING_CHAIN=mainnet // Listed name chain, supported values are [mainnet, base, optimism] or [baseSepolia, sepolia] for testnet
VITE_APP_ALCHEMY_TOKEN=dF2... // Optional alchemy token, if not provided, public RPC used by default
VITE_APP_DEFAULT_AVATAR=https://avatar-uri // Default avatar for minted subnames
VITE_APP_IS_TESTNET=false // Optional, specify wheter listed names is on mainnet or sepolia
VITE_APP_MINT_SOURCE=// Optional, mint source can be used to track where the mints come from
```

### Development

To run the project in development mode with hot module replacement:
```bash
yarn run dev
```
This will start the development server and watch for changes in the theme.json file.

### Build

To build the project for production:
```bash
yarn run build
```
This will create a dist directory with the production build of the project.

### Preview

To preview the production build:
```bash
yarn run preview
```
This will start a local server to preview the production build.

### Lint

To lint the project:
```bash
yarn run lint
```
This will run ESLint on the project to check for code quality issues.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

