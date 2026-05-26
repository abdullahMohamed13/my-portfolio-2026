'use client';
import type { ProjectButtonProps } from '@/types/ProjectProps';

export default function FlowButton({ text, icon: Icon, href, bgColor }: ProjectButtonProps) {
  return (
    <a href={href} className="group relative flex items-center justify-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] border-[#333333]/40 bg-transparent px-8 py-3 text-sm font-semibold text-[#111111] cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:rounded-[12px] active:scale-[0.95]">

      {/* Left icon — hidden off-screen, slides in on hover */}
      <Icon
        style={{ color: bgColor }}
        className="absolute w-4 h-4 left-[-25%] z-[9] opacity-0 group-hover:left-4 group-hover:opacity-100 group-hover:!text-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      />

      {/* Text */}
      <span className="relative z-[1] -translate-x-3 group-hover:translate-x-3 transition-all duration-[800ms] ease-out text-[#111111] group-hover:text-white">
        {text}
      </span>

      {/* Circle */}
      <span
        style={{ backgroundColor: bgColor }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full opacity-0 group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
      />

      {/* Right icon — visible by default, slides out on hover */}
      <Icon
        style={{ color: bgColor }}
        className="absolute w-4 h-4 right-4 z-[9] group-hover:right-[-25%] group-hover:opacity-0 group-hover:!text-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      />
    </a>
  );
}