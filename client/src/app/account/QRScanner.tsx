"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

type QRScannerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScan: (payload: string) => void;
};

export const QRScannerDialog = ({
  open,
  onOpenChange,
  onScan,
}: QRScannerDialogProps) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const scannerId = "appointment-qr-reader";
    const scanner = new Html5Qrcode(scannerId);

    scannerRef.current = scanner;
    setError(null);

    const startScanner = async () => {
      try {
        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: {
              width: 250,
              height: 250,
            },
          },
          async (decodedText) => {
            console.log("QR Payload:", decodedText);

            onScan(decodedText);

            try {
              if (scanner.isScanning) {
                await scanner.stop();
              }

              scanner.clear();
            } catch (error) {
              console.error("Failed to stop QR scanner:", error);
            }
          },
          () => {
            // QR code not found in this frame.
            // Don't log this because it fires frequently.
          }
        );
      } catch (error) {
        console.error("Unable to access camera:", error);

        setError(
          "Unable to access the camera. Please allow camera permission and try again."
        );
      }
    };

    startScanner();

    return () => {
      const cleanup = async () => {
        try {
          if (scanner.isScanning) {
            await scanner.stop();
          }

          scanner.clear();
        } catch (error) {
          console.error("QR scanner cleanup failed:", error);
        }

        scannerRef.current = null;
      };

      cleanup();
    };
  }, [open, onScan]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-background rounded-xl shadow-2xl">
        {/* Header - same style as LogoutButton */}
        <div className="px-6 py-4 border-b border-border/20">
          <DialogHeader className="space-y-0">
            <DialogTitle className="text-xl font-bold">
              Complete Appointment
            </DialogTitle>

            <DialogDescription className="text-sm text-muted-foreground">
              Scan the appointment QR code to complete this appointment.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Scanner */}
        <div className="px-6 py-6">
          <div className="overflow-hidden rounded-xl border border-border bg-black">
            <div
              id="appointment-qr-reader"
              className="w-full"
            />
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-600">
              {error}
            </p>
          )}

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Point your camera at the QR code.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};