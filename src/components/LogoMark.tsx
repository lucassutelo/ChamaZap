import React from 'react';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

interface IProps {
    size: number;
}

/** Ícone do app (docs/design/logo/icon-a-direto.svg) com os cantos do ícone de sistema. */
export default function LogoMark({ size }: IProps) {
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 1024 1024"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
        >
            <Defs>
                <LinearGradient id="logoBg" x1="0" y1="0" x2="1" y2="1">
                    <Stop offset="0" stopColor="#12402F" />
                    <Stop offset="1" stopColor="#061A13" />
                </LinearGradient>
                <LinearGradient
                    id="logoBubble"
                    x1="212"
                    y1="222"
                    x2="812"
                    y2="842"
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop offset="0" stopColor="#5CF0B4" />
                    <Stop offset="1" stopColor="#16C47F" />
                </LinearGradient>
            </Defs>
            <Rect width="1024" height="1024" rx="230" fill="url(#logoBg)" />
            <Rect
                x="212"
                y="222"
                width="600"
                height="500"
                rx="168"
                fill="url(#logoBubble)"
            />
            <Path
                d="M300 660 L236 846 L470 712 Z"
                fill="url(#logoBubble)"
                stroke="url(#logoBubble)"
                strokeWidth={28}
                strokeLinejoin="round"
            />
            <Path
                d="M404 580 L620 364 M456 364 L620 364 L620 528"
                fill="none"
                stroke="#062017"
                strokeWidth={80}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
