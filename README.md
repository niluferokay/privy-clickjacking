# Privy Clickjacking Demonstration

A security research project demonstrating clickjacking vulnerabilities in Privy wallet authentication flows.

## ⚠️ Disclaimer

This project demonstrates a clickjacking attack vector against Privy embedded wallet authentication to raise awareness about UI security vulnerabilities.

**DO NOT** use this for malicious purposes. Unauthorized access to user accounts or funds is illegal.

## 🎯 Overview

This demonstration shows how an attacker could potentially overlay malicious UI elements on top of legitimate Privy authentication modals to trick users into approving unintended transactions.

### Attack Flow

1. User visits the application and authenticates via Privy
2. User is presented with an attractive "NFT Claim" modal
3. Behind the scenes, Privy modals are hidden using CSS (`opacity: 0`)
4. User clicks thinking they're claiming an NFT
5. They unknowingly approve a transaction that drains their wallet to the attacker's address

## 🏗️ Technical Implementation

### Key Components

- **[app/nft/styles.css](app/nft/styles.css)**: CSS that hides Privy modals while keeping them interactive
- **[app/nft/page.tsx](app/nft/page.tsx)**: Displays the fake "NFT Claim" modal overlay
- **[app/components/SendMaxETH.tsx](app/components/SendMaxETH.tsx)**: Automatically triggers maximum ETH transfer

### How It Works

The attack leverages:
- CSS `opacity: 0` to hide authentication UI
- `pointer-events: auto` to keep hidden elements clickable
- Attractive fake UI overlaid on top of hidden modals
- Auto-triggering transaction flow when `auto=true` parameter is present

## 🚀 Setup & Installation

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Add your NEXT_PUBLIC_PRIVY_APP_ID
# Add your PRIVY_APP_SECRET

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📋 Usage

1. Navigate to the home page and authenticate with Privy
2. Click "Claim Your Cat NFT" button
3. Observe the hidden Privy modal interaction
4. Transaction sends maximum ETH to the configured recipient address

## 📝 Configuration

The recipient address for transferred funds is configured in:
- `app/components/SendMaxETH.tsx` - Line 8: `RECIPIENT_ADDRESS`

Network configuration:
- Chain: Sepolia Testnet (Chain ID: 11155111)
- Gas Price: 1 gwei
- Gas Limit: 21000

## 📄 License

This project is provided as-is for educational and authorized security testing purposes.


