"use client";

import React, { ReactNode } from "react";
import { WalletManager, NetworkId, WalletId } from "@txnlab/use-wallet";
import { WalletProvider } from "@txnlab/use-wallet-react";

const walletManager = new WalletManager({
  networks: {
    [NetworkId.LOCALNET]: {
      algod: {
        baseServer: "http://localhost",
        port: "4001",
        token: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
    },
  },
  defaultNetwork: NetworkId.LOCALNET,
  wallets: [
    WalletId.PERA,
    WalletId.DEFLY,
    WalletId.LUTE,
    WalletId.KIBISIS,
    WalletId.MNEMONIC
  ]
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
