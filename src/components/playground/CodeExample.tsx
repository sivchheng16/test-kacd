import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";
import { Copy, Check, ExternalLink, Code2, Monitor, RotateCcw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface CodeExampleProps {
  html: string;
  css: string;
  title?: string;
  height?: string;
}

export function CodeExample({
  html,
  css,
  title,
  height = "300px",
}: CodeExampleProps) {
  const [copied, setCopied] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 500);
  };

  const previewDoc = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { 
          font-family: system-ui, -apple-system, sans-serif; 
          padding: 20px; 
          margin: 0; 
          background-color: white;
          color: #333;
        }
        ${css}
      </style>
    </head>
    <body>
      ${html}
    </body>
    </html>
  `;

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const showCss = css && css.trim().length > 0;

  return (
    <div className="my-10 rounded-2xl border border-border overflow-hidden bg-white shadow-xl group/example">
      {/* Header */}
      <div className="px-5 py-3 border-b border-border bg-stone-50/80 backdrop-blur-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]/20 border border-[#FF5F56]/40" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]/20 border border-[#FFBD2E]/40" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]/20 border border-[#27C93F]/40" />
          </div>
          {title && (
            <span className="ml-2 text-xs font-semibold text-muted-foreground tracking-wide font-mono">
              {title}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
           <button 
             onClick={handleRefresh}
             className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-stone-200/50 hover:bg-stone-200 text-[10px] font-mono text-muted-foreground hover:text-foreground font-bold uppercase tracking-wider transition-all active:scale-95"
             title="Refresh Result"
           >
             <RotateCcw size={10} className={cn("transition-transform duration-500", isSpinning && "rotate-[-360deg]")} />
             Refresh
           </button>
           <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-stone-200/50 text-[10px] font-mono text-muted-foreground font-bold uppercase tracking-wider">
             <Monitor size={10} />
             Result
           </div>
        </div>
      </div>

      {/* Result Preview */}
      <div className="relative bg-white" style={{ height }}>
        <iframe
          key={refreshKey}
          srcDoc={previewDoc}
          title="Preview"
          className="w-full h-full border-0"
          sandbox="allow-scripts"
        />
      </div>

      {/* Code Section */}
      <div className="border-t border-border bg-[#fdf6e3]">
        <Tabs defaultValue={showCss ? "css" : "html"} className="w-full">
          <div className="flex items-center justify-between px-4 border-b border-[#eee8d5] bg-[#eee8d5]/30">
            <TabsList className="bg-transparent border-0 h-10 gap-4">
              {showCss && (
                <TabsTrigger 
                  value="css" 
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#c2622d] rounded-none px-1 text-xs font-mono font-bold text-[#586e75]"
                >
                  style.css
                </TabsTrigger>
              )}
              <TabsTrigger 
                value="html" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#c2622d] rounded-none px-1 text-xs font-mono font-bold text-[#586e75]"
              >
                index.html
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(showCss ? css : html)}
                className="p-1.5 rounded-md text-[#586e75] hover:bg-[#eee8d5] transition-colors"
                title="Copy code"
              >
                {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          {showCss && (
            <TabsContent value="css" className="m-0">
              <div className="max-h-[300px] overflow-auto custom-scrollbar">
                <SyntaxHighlighter
                  language="css"
                  style={solarizedlight}
                  customStyle={{
                    margin: 0,
                    padding: "1.25rem",
                    fontSize: "0.85rem",
                    lineHeight: "1.6",
                    background: "transparent",
                    fontFamily: "var(--font-mono, JetBrains Mono, monospace)",
                  }}
                >
                  {css.trim()}
                </SyntaxHighlighter>
              </div>
            </TabsContent>
          )}
          
          <TabsContent value="html" className="m-0">
            <div className="max-h-[300px] overflow-auto custom-scrollbar">
              <SyntaxHighlighter
                language="html"
                style={solarizedlight}
                customStyle={{
                  margin: 0,
                  padding: "1.25rem",
                  fontSize: "0.85rem",
                  lineHeight: "1.6",
                  background: "transparent",
                  fontFamily: "var(--font-mono, JetBrains Mono, monospace)",
                }}
              >
                {html.trim()}
              </SyntaxHighlighter>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
