"use client"
import "./globals.css";
import { NodesProvider } from "../contexts/NodesContext";
import { AscendancyProvider } from "@/contexts/AscendancyContext";
import { AllNodesProvider } from "@/contexts/AllNodesContext";
import { SaveProvider } from "@/contexts/SaveContext";
import { TransformWrapper } from "react-zoom-pan-pinch";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AllNodesProvider>
          <SaveProvider>
              <NodesProvider>
                <AscendancyProvider>
                <TransformWrapper
                  initialScale={2}
                  minScale={0.8}
                  maxScale={15}
                  centerOnInit={true}
                  doubleClick={{disabled: true}}
                  panning={{velocityDisabled: true}}
                  smooth={true}
                  wheel={{step:0.3, smoothStep: 0.005}}
                  >
                    {children}
                </TransformWrapper>
                </AscendancyProvider>
              </NodesProvider>
          </SaveProvider>
        </AllNodesProvider>
      </body>
    </html>
  );
}