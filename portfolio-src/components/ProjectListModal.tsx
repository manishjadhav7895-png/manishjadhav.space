import React from 'react';
import { X, Play, ExternalLink, Film, Sparkles, Award } from 'lucide-react';

interface ProjectListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectListModal: React.FC<ProjectListModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const projects = [
    {
      title: "Apex Motorsport Anthem",
      category: "Cinematic Motion & Sound Design",
      year: "2024",
      metric: "1.4M+ Views",
      description: "High-octane commercial edit with custom typography animation, speed ramping, and aggressive bass design.",
      tags: ["Premiere Pro", "After Effects", "Sound Design"],
    },
    {
      title: "Venture Capital Brand Doc",
      category: "Story-Driven Mini Documentary",
      year: "2024",
      metric: "Featured on ProductHunt",
      description: "Minimalist, rhythmically paced founder story integrating clean typography and kinetic infographics.",
      tags: ["Storytelling", "Color Grading", "DaVinci Resolve"],
    },
    {
      title: "Cybernetic UI Title Sequence",
      category: "Motion Graphics & 3D Typography",
      year: "2023",
      metric: "Motion Design Award",
      description: "Futuristic HUD graphics, glowing neon wireframes, and synchronized glitch transitions.",
      tags: ["After Effects", "Cinema 4D", "Keyframing"],
    },
    {
      title: "Fitness Coach Masterclass Launch",
      category: "High-Retention Social Video Edit",
      year: "2023",
      metric: "32% Conversion Lift",
      description: "Fast-paced, hook-driven social video series engineered for attention retention and engagement.",
      tags: ["Short-Form Video", "Kinetic Captions", "Sound FX"],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/60">
          <div className="flex items-center space-x-3">
            <Film className="w-5 h-5 text-red-500" />
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">Selected Projects</h2>
              <p className="text-xs text-neutral-400">Featured video editing and motion design work</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {projects.map((project, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-xl bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-800 transition-all hover:border-neutral-700 space-y-3 group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">{project.category}</span>
                    <span className="text-neutral-600">·</span>
                    <span className="text-xs text-neutral-400">{project.year}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1 group-hover:text-red-400 transition-colors">
                    {project.title}
                  </h3>
                </div>
                <span className="px-2.5 py-1 text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 rounded-full">
                  {project.metric}
                </span>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {project.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-800/80 text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-800 bg-neutral-900/50 text-xs text-neutral-400">
          <span>Total: 250+ Projects Completed Worldwide</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-medium rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
