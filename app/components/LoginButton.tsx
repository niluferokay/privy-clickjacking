"use client";

import { usePrivy, useWallets } from "@privy-io/react-auth";

export function LoginButton() {
  const { ready, authenticated, login, logout, user } = usePrivy();
  const { wallets } = useWallets();

  const privyWallet = wallets.find((w) => w.walletClientType === "privy");

  if (!ready) {
    return <p className="text-gray-600">Loading...</p>;
  }

  if (!authenticated) {
    return (
      <div className="space-y-4">
        <p className="text-gray-600">Sign in to access your wallet and features</p>
        <button onClick={login} className="btn-primary w-full text-lg">
          Login or Sign Up
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">Logged in as:</p>
        <p className="font-mono text-sm break-all">
          {user?.email?.address ?? user?.wallet?.address ?? user?.id}
        </p>
        {privyWallet && (
          <div className="mt-2 text-sm">
            <p className="text-gray-600">Privy Wallet: {privyWallet.address}</p>
          </div>
        )}
      </div>

      <button onClick={logout} className="btn-logout w-full text-lg">
        Logout
      </button>
    </div>
  );
}
