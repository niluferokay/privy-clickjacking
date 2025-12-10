"use client";

import { LoginButton } from "@/app/components/LoginButton";
import "./globals.css";
import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";

export default function Home() {
  const { authenticated } = usePrivy();

  return (
    <main className="min-h-screen p-8 max-w-md mx-auto">
      <div className="mb-12 text-center pt-12 animate-fadeIn">
        <h1 className="text-6xl font-bold mb-4 gradient-text animate-float">
          Privy NFT App
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Connect your wallet and mint exclusive cat NFTs in seconds
        </p>
      </div>

      <div className="flex flex-col gap-8 mb-8">
        <section className="card p-8 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Authentication</h2>
          </div>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            Securely log in or sign up using Privy's seamless authentication system
          </p>
          <LoginButton />
        </section>

        {authenticated && (
          <section className="card p-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Claim NFT</h2>
            </div>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Mint your unique cat NFT and join our exclusive community
            </p>
            <Link href="/nft">
              <button className="btn-primary w-full text-lg">
                🐱 Claim Your Cat NFT
              </button>
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
