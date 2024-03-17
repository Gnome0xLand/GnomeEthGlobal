// @ts-nocheck

import { PrivyProvider } from "@privy-io/react-auth";

export default function Provider({ children }) {
  return (
    <PrivyProvider
      appId={"clmgl6x8q0m8ylb0fxnb44i4r" || ""}
      config={{
        loginMethods: ["wallet", "twitter", "email"],
        appearance: {
          theme: "dark",
          accentColor: "#676FFF",

          logo: "https://nftstorage.link/ipfs/bafkreiclz4ni5sqyqiq6tlqfd4onjubisfdbbpyzyawm6h4grqqivyybfe",
        },
        embeddedWallets: {
          createOnLogin: "all-users",
          noPromptOnSignature: false,
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
