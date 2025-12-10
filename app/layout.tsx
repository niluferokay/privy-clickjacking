"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { sepolia } from "viem/chains";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
          config={{
            loginMethods: ["email", "sms", "google"],
            embeddedWallets: {
              createOnLogin: "all-users",
            },
            defaultChain: sepolia,
            supportedChains: [sepolia],
          }}
        >
          {children}
        </PrivyProvider>
      </body>
    </html>
  );
}
