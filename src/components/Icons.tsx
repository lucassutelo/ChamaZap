import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

interface IProps {
    color: string;
    size?: number;
}

const hidden = {
    accessibilityElementsHidden: true,
    importantForAccessibility: 'no-hide-descendants',
} as const;

export function ArrowUpRightIcon({ color, size = 20 }: IProps) {
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...hidden}
        >
            <Path d="M7 17 17 7" />
            <Path d="M8 7h9v9" />
        </Svg>
    );
}

export function LockIcon({ color, size = 14 }: IProps) {
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...hidden}
        >
            <Rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5" />
            <Path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
        </Svg>
    );
}

export function AlertIcon({ color, size = 15 }: IProps) {
    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...hidden}
        >
            <Circle cx="12" cy="12" r="9.5" />
            <Path d="M12 7.5v5.5M12 16.5v.01" />
        </Svg>
    );
}
