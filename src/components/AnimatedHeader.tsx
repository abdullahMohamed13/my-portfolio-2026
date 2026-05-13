import { useRef } from 'react';
import VariableProximity from './react-bits/TextAnimations/VariableProximity';

interface TextProps {
    text: string
    className?: string
}

export default function AnimatedHeader({text, className}: TextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    
    return (
        <div
            ref={containerRef}
            className="relative mb-5">
            <VariableProximity
                label={`#${text}`}
                className={`text-4xl ${className || ''}`}
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 900"
                containerRef={containerRef}
                radius={150}
                falloff='linear'
                style={{
                    fontFamily: 'Syne, system-ui, sans-serif',
                    color: 'var(--accent)'
                }}
			/>
			{/*<img src="/line.png" className='h-10 object-contain absolute left-[0%] top-5' alt="" />*/}
        </div>
    );
}