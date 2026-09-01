"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookCheck, QrCode } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import type { Html5Qrcode } from "html5-qrcode";
import { useDashboard } from "../dashboard-service";
import Image from "next/image";

export const CompletionsButton = () => {
  const { selectedService } = useDashboard();
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  // const [isScanning, setIsScanning] = useState(false);
  const [_scanResult, setScanResult] = useState<string | null>(null);
  const [_showScanner, setShowScanner] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const generateQRCode = async () => {
    try {
      // Create a verification payload
      const qrPayload = JSON.stringify({
        type: "appointment_completion",
        service_id: selectedService.id,
        action: "verify_completion",
      });

      // Generate QR code as data URL
      const dataUrl = await QRCode.toDataURL(qrPayload, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
        errorCorrectionLevel: "H",
      });

      setQrCodeDataUrl(dataUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  // Generate QR code when dialog opens
  useEffect(() => {
    if (isDialogOpen) {
      generateQRCode();
    }

    // Cleanup scanner on unmount
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(console.error);
        scannerRef.current.clear();
      }
    };
  }, [isDialogOpen, generateQRCode]);

  // const startScanning  // biome-ignore lint/suspicious/noExplicitAny:required= async () => {
  //   if (!scannerRef.current) {
  //     scannerRef.current = new Html5Qrcode("qr-reader");
  //   }

  //   try {
  //     setIsScanning(true);
  //     setShowScanner(true);

  //     await scannerRef.current.start(
  //       { facingMode: "environment" },
  //       {
  //         fps: 10,
  //         qrbox: { width: 250, height: 250 },
  //         aspectRatio: 1.0,
  //       },
  //       async (decodedText) => {
  //         // On successful scan
  //         setScanResult(decodedText);
  //         await handleScanSuccess(decodedText);
  //         stopScanning();
  //       },
  //       (errorMessage) => {
  //         // Ignore errors during scanning (they're common)
  //         console.log("Scan error (ignored):", errorMessage);
  //       }
  //     );
  //   } catch (err) {
  //     console.error("Failed to start scanner:", err);
  //     setIsScanning(false);
  //     setShowScanner(false);
  //   }
  // };

  // const stopScanning = async () => {
  //   if (scannerRef.current) {
  //     try {
  //       await scannerRef.current.stop();
  //       await scannerRef.current.clear();
  //     } catch (error) {
  //       console.error("Error stopping scanner:", error);
  //     }
  //     setIsScanning(false);
  //   }
  // };
  const steps = [
    "Show this QR code to the client for verification",
    "The client will scan this code to acknowledge about appointment completion",
    "Ensure the QR code is clearly visible on your screen",
    "This code is valid for one-time use only",
  ];

  const _handleScanSuccess = async (decodedText: string) => {
    try {
      const parsedData = JSON.parse(decodedText);

      // Verify this is the correct type of QR code
      if (parsedData.type === "appointment_completion") {
        // Send acknowledgement to your backend
        const response = await fetch("/api/appointments/complete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            slotId: parsedData.slotId,
            serviceId: parsedData.serviceId,
            verificationTimestamp: Date.now(),
          }),
        });

        if (response.ok) {
          console.log("Appointment completion verified successfully");
          // You can add a success toast here
        }
      } else {
        console.error("Invalid QR code type");
      }
    } catch (error) {
      console.error("Error processing scanned QR:", error);
    }
  };

  const handleDialogClose = async () => {
    // await stopScanning();
    setShowScanner(false);
    setScanResult(null);
    setQrCodeDataUrl("");
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-accent text-black font-semibold text-sm py-3 rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
          <BookCheck size={20} />
          Completions
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-background rounded-xl shadow-2xl">
        {/* Custom Header */}
        <div className="px-6 py-4 flex justify-between items-center border-b border-border/20">
          <DialogHeader className="space-y-0">
            <DialogTitle className="text-xl font-bold">
              Appointment Completion
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Scan the QR code to verify and complete the appointment
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 py-4 max-h-[70vh] overflow-y-auto space-y-6">
          {/* QR Code Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <QrCode className="stroke-accent" size={20} />
              <h3 className="text-xs font-semibold uppercase tracking-wider">
                Verification QR Code
              </h3>
            </div>

            <div className="bg-muted/20 rounded-lg p-6 border border-border/50 flex flex-col items-center">
              {qrCodeDataUrl ? (
                <Image
                  src={qrCodeDataUrl}
                  alt="Appointment QR Code"
                  width={64}
                  height={64}
                  className="w-64 h-64 border-2 border-gray-200 rounded-lg"
                />
              ) : (
                <div className="w-64 h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Generating QR code...
                  </p>
                </div>
              )}

              {/* Instructions */}
              <div className="mt-6 w-full space-y-3">
                <h4 className="text-sm font-semibold text-foreground">
                  Instructions:
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {steps.map((step) => (
                    <li className="flex items-start gap-2" key={step}>
                      <span className="text-accent mt-1">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Scanner Section (for providers) */}
          {/* <section className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Scan className="stroke-accent" size={20} />
              <h3 className="text-xs font-semibold uppercase tracking-wider">
                Provider Scanner
              </h3>
            </div>

            <div className="bg-muted/20 rounded-lg p-4 border border-border/50">
              {!showScanner ? (
                <Button
                  // onClick={startScanning}
                  className="w-full"
                  variant="outline"
                >
                  <Scan className="mr-2" size={16} />
                  Open Scanner
                </Button>
              ) : (
                <div className="space-y-3">
                  <div id="qr-reader" className="w-full" />
                  <Button
                    // onClick={stopScanning}
                    variant="destructive"
                    className="w-full"
                  >
                    Stop Scanner
                  </Button>
                </div>
              )}

              {scanResult && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                  <p className="text-sm font-medium text-green-800">
                    ✓ Scan Successful!
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    Appointment completion verified
                  </p>
                </div>
              )}
            </div>
          </section> */}
        </div>

        {/* Footer */}
        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 px-6 py-4 border-t border-border/20">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto hover:bg-muted"
              onClick={handleDialogClose}
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
