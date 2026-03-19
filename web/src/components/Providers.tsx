"use client";

import React, { ReactNode } from "react";
import { WalletManager, NetworkId } from "@txnlab/use-wallet";
import { WalletProvider } from "@txnlab/use-wallet-react";

const walletManager = new WalletManager({
  networks: {
    [NetworkId.LOCALNET]: {
      algod: {
        baseServer: "http://localhost",
        port: "4001",
        token: "",
      },
    },
  },
  defaultNetwork: NetworkId.LOCALNET,
});

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <WalletProvider manager={walletManager}>
      {children}
    </WalletProvider>
  );
}
