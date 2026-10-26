import React, { useRef } from 'react';
import { X, Upload, RotateCcw, Sliders, Image as ImageIcon } from 'lucide-react';
import { BannerData, DEFAULT_BANNER_DATA } from '../types/banner';

interface BannerEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BannerData;
  onChange: (newData: BannerData) => void;
  onReset: () => void;
}

export const BannerEditorModal: React.FC<BannerEditorModalProps> = ({
  isOpen,
  onClose,
  data,
  onChange,
  onReset,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange({
            ...data,
            customPhotoUrl: event.target.result as string,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    onChange({
      ...data,
      customPhotoUrl: undefined,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/50">
          <div className="flex items-center space-x-2.5">
            <Sliders className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-bold text-white tracking-wide">Customize Hero Section</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onReset}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs text-neutral-400 hover:text-white bg-neutral-800/80 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
              title="Reset all values to reference defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-neutral-300">
          
          {/* Portrait Controls */}
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-red-500" />
                Center Portrait (Manish Jadhav)
              </span>
              <button
                type="button"
                onClick={() => onChange({ ...data, showPerson: !data.showPerson })}
                className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                  data.showPerson ? 'bg-red-600/20 border-red-500 text-red-400' : 'bg-neutral-800 border-neutral-700 text-neutral-400'
                }`}
              >
                {data.showPerson ? 'Visible' : 'Hidden'}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-sm"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Custom Photo</span>
              </label>

              {data.customPhotoUrl && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs cursor-pointer transition-colors"
                >
                  Use Default Illustration
                </button>
              )}
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Scale ({data.portraitScale}%)
                </label>
                <input
                  type="range"
                  min="70"
                  max="140"
                  value={data.portraitScale}
                  onChange={(e) => onChange({ ...data, portraitScale: Number(e.target.value) })}
                  className="w-full accent-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Vertical Shift ({data.portraitYOffset}px)
                </label>
                <input
                  type="range"
                  min="-60"
                  max="60"
                  value={data.portraitYOffset}
                  onChange={(e) => onChange({ ...data, portraitYOffset: Number(e.target.value) })}
                  className="w-full accent-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Red Rim Light ({data.rimLightIntensity}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={data.rimLightIntensity}
                  onChange={(e) => onChange({ ...data, rimLightIntensity: Number(e.target.value) })}
                  className="w-full accent-red-600"
                />
              </div>
            </div>
          </div>

          {/* Typography & Copy */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Identity & Copy</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-neutral-400">Background Word (Folio Texture)</label>
                  <button
                    type="button"
                    onClick={() => {
                      const next = !data.showBackgroundTitle;
                      onChange({
                        ...data,
                        showBackgroundTitle: next,
                        backgroundTitleColorMode: next ? 'red' : 'hidden',
                      });
                    }}
                    className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
                      data.showBackgroundTitle && data.backgroundTitleColorMode !== 'hidden'
                        ? 'bg-red-600/20 border-red-500 text-red-400'
                        : 'bg-neutral-800 border-neutral-700 text-neutral-400'
                    }`}
                  >
                    {data.showBackgroundTitle && data.backgroundTitleColorMode !== 'hidden' ? 'Visible' : 'Removed'}
                  </button>
                </div>
                <input
                  type="text"
                  value={data.backgroundTitle}
                  onChange={(e) => onChange({ ...data, backgroundTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white font-mono text-sm focus:border-red-500 focus:outline-none"
                  placeholder="EDITOR"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1">Role Title (Red)</label>
                <input
                  type="text"
                  value={data.roleTitle}
                  onChange={(e) => onChange({ ...data, roleTitle: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white text-sm focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1">Top-Left Line 1</label>
                <input
                  type="text"
                  value={data.categoryLine1}
                  onChange={(e) => onChange({ ...data, categoryLine1: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white text-sm focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1">Top-Left Line 2</label>
                <input
                  type="text"
                  value={data.categoryLine2}
                  onChange={(e) => onChange({ ...data, categoryLine2: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white text-sm focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1">Top-Right Status</label>
                <input
                  type="text"
                  value={data.availabilityStatus}
                  onChange={(e) => onChange({ ...data, availabilityStatus: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white text-sm focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1">Status Subtext</label>
                <input
                  type="text"
                  value={data.availabilitySubtext}
                  onChange={(e) => onChange({ ...data, availabilitySubtext: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white text-sm focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Supporting Copy</label>
              <textarea
                rows={2}
                value={data.supportingCopy}
                onChange={(e) => onChange({ ...data, supportingCopy: e.target.value })}
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white text-sm focus:border-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-neutral-400 mb-1">Bottom Tools Line</label>
              <input
                type="text"
                value={data.toolsList}
                onChange={(e) => onChange({ ...data, toolsList: e.target.value })}
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white font-mono text-xs focus:border-red-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Statistics Block */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">3 Clean Minimal Statistics</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-neutral-900/60 rounded-lg border border-neutral-800 space-y-2">
                <label className="block text-xs text-neutral-400">Stat 1</label>
                <input
                  type="text"
                  value={data.stat1Value}
                  onChange={(e) => onChange({ ...data, stat1Value: e.target.value })}
                  className="w-full px-2 py-1 bg-neutral-950 border border-neutral-800 rounded text-red-500 font-bold"
                />
                <input
                  type="text"
                  value={data.stat1Line1}
                  onChange={(e) => onChange({ ...data, stat1Line1: e.target.value })}
                  className="w-full px-2 py-1 bg-neutral-950 border border-neutral-800 rounded text-neutral-300 text-xs"
                />
                <input
                  type="text"
                  value={data.stat1Line2}
                  onChange={(e) => onChange({ ...data, stat1Line2: e.target.value })}
                  className="w-full px-2 py-1 bg-neutral-950 border border-neutral-800 rounded text-neutral-300 text-xs"
                />
              </div>

              <div className="p-3 bg-neutral-900/60 rounded-lg border border-neutral-800 space-y-2">
                <label className="block text-xs text-neutral-400">Stat 2</label>
                <input
                  type="text"
                  value={data.stat2Value}
                  onChange={(e) => onChange({ ...data, stat2Value: e.target.value })}
                  className="w-full px-2 py-1 bg-neutral-950 border border-neutral-800 rounded text-red-500 font-bold"
                />
                <input
                  type="text"
                  value={data.stat2Line1}
                  onChange={(e) => onChange({ ...data, stat2Line1: e.target.value })}
                  className="w-full px-2 py-1 bg-neutral-950 border border-neutral-800 rounded text-neutral-300 text-xs"
                />
                <input
                  type="text"
                  value={data.stat2Line2}
                  onChange={(e) => onChange({ ...data, stat2Line2: e.target.value })}
                  className="w-full px-2 py-1 bg-neutral-950 border border-neutral-800 rounded text-neutral-300 text-xs"
                />
              </div>

              <div className="p-3 bg-neutral-900/60 rounded-lg border border-neutral-800 space-y-2">
                <label className="block text-xs text-neutral-400">Stat 3</label>
                <input
                  type="text"
                  value={data.stat3Value}
                  onChange={(e) => onChange({ ...data, stat3Value: e.target.value })}
                  className="w-full px-2 py-1 bg-neutral-950 border border-neutral-800 rounded text-red-500 font-bold"
                />
                <input
                  type="text"
                  value={data.stat3Line1}
                  onChange={(e) => onChange({ ...data, stat3Line1: e.target.value })}
                  className="w-full px-2 py-1 bg-neutral-950 border border-neutral-800 rounded text-neutral-300 text-xs"
                />
                <input
                  type="text"
                  value={data.stat3Line2}
                  onChange={(e) => onChange({ ...data, stat3Line2: e.target.value })}
                  className="w-full px-2 py-1 bg-neutral-950 border border-neutral-800 rounded text-neutral-300 text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-neutral-800 bg-neutral-900/50">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold text-xs tracking-wide uppercase rounded-lg transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
