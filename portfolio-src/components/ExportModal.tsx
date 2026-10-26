import React, { useState } from 'react';
import { X, Download, Copy, Check, FileCode, Code2 } from 'lucide-react';
import { toPng, toJpeg } from 'html-to-image';
import { BannerData } from '../types/banner';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BannerData;
  bannerElementId?: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  data,
  bannerElementId = "portfolio-hero-banner",
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [exportFormat, setExportFormat] = useState<'png' | 'jpeg'>('png');

  if (!isOpen) return null;

  const handleDownloadImage = async () => {
    const node = document.getElementById(bannerElementId);
    if (!node) return;

    try {
      setIsExporting(true);
      const exportFn = exportFormat === 'png' ? toPng : toJpeg;
      const dataUrl = await exportFn(node, {
        quality: 0.98,
        pixelRatio: 2, // 2x retina crisp quality
        backgroundColor: '#000000',
      });

      const link = document.createElement('a');
      link.download = `manish-jadhav-hero-banner.${exportFormat}`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export banner:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const bannerEmbedCode = `<!-- Manish Jadhav Hero Banner — Video Editor & Motion Designer -->
<section style="background-color: #050505; position: relative; width: 100%; aspect-ratio: 16/10; overflow: hidden; font-family: 'Plus Jakarta Sans', sans-serif;">
  <!-- Background Editorial Texture "EDITOR" -->
  <div style="position: absolute; inset: 0; display: flex; justify-content: center; top: 6%; pointer-events: none;">
    <span style="font-family: 'Bebas Neue', sans-serif; font-size: 20vw; font-weight: 900; transform: scaleY(1.15); background: linear-gradient(180deg, #E6121D 0%, #590308 95%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
      ${data.backgroundTitle}
    </span>
  </div>

  <!-- Top Left: Video Editor / Motion Designer -->
  <div style="position: absolute; top: 40px; left: 48px;">
    <div style="color: #E6121D; font-weight: 700; letter-spacing: 0.22em; font-size: 13px;">${data.categoryLine1}</div>
    <div style="color: #FFFFFF; font-weight: 600; letter-spacing: 0.22em; font-size: 13px;">${data.categoryLine2}</div>
  </div>

  <!-- Top Right: Open to Work -->
  <div style="position: absolute; top: 40px; right: 48px; color: #FFFFFF; font-weight: 700; letter-spacing: 0.2em; font-size: 13px;">
    ● ${data.availabilityStatus}
  </div>

  <!-- Left Main Content -->
  <div style="position: absolute; left: 48px; top: 28%; max-width: 420px; z-index: 10;">
    <div style="font-family: 'Caveat', cursive; color: #FFFFFF; font-size: 40px;">${data.greetingScript}</div>
    <h1 style="font-family: 'Bebas Neue', sans-serif; font-size: 100px; line-height: 0.88; color: #FFFFFF; margin: 0;">${data.firstName}<br/>${data.lastName}</h1>
    <div style="color: #E6121D; font-weight: 700; font-size: 18px; margin-top: 14px;">${data.roleTitle}</div>
    <p style="color: #CBD5E1; font-size: 13px; line-height: 1.6; margin-top: 14px;">${data.supportingCopy}</p>
    <div style="margin-top: 20px;">
      <a href="#selected-work" style="display: inline-block; background: #E6121D; color: #fff; padding: 10px 18px; border-radius: 4px; font-size: 12px; font-weight: 700; text-decoration: none;">VIEW MY WORK →</a>
    </div>
  </div>
</section>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(bannerEmbedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/60">
          <div className="flex items-center space-x-2.5">
            <Download className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-bold text-white tracking-wide">Export Hero Banner</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-sm text-neutral-300">
          
          {/* High Resolution Image Export */}
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-white">Download Image (Retina 2X Quality)</h4>
                <p className="text-xs text-neutral-400">Crisp high-resolution export for website headers, Behance, or LinkedIn.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-lg p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setExportFormat('png')}
                  className={`px-3 py-1 rounded font-medium ${
                    exportFormat === 'png' ? 'bg-red-600 text-white' : 'text-neutral-400'
                  }`}
                >
                  PNG (Lossless)
                </button>
                <button
                  type="button"
                  onClick={() => setExportFormat('jpeg')}
                  className={`px-3 py-1 rounded font-medium ${
                    exportFormat === 'jpeg' ? 'bg-red-600 text-white' : 'text-neutral-400'
                  }`}
                >
                  JPEG
                </button>
              </div>

              <button
                type="button"
                onClick={handleDownloadImage}
                disabled={isExporting}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{isExporting ? 'Generating Image...' : `Download ${exportFormat.toUpperCase()}`}</span>
              </button>
            </div>
          </div>

          {/* Embed Snippet */}
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-red-500" />
                <h4 className="font-semibold text-white">Embed Code Snippet</h4>
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1 text-xs bg-neutral-800 hover:bg-neutral-700 text-white rounded-md cursor-pointer transition-colors"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy HTML</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-xs font-mono bg-neutral-950 p-3 rounded-lg border border-neutral-800 text-neutral-400 overflow-x-auto max-h-32">
              {bannerEmbedCode}
            </pre>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-neutral-800 bg-neutral-900/50">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
