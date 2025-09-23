import React from 'react';

interface CursorProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  theme?: 'light' | 'dark';
}

const Cursor: React.FC<CursorProps> = ({
  size = 24,
  className = '',
  theme = 'dark',
  ...props
}) => {
  const isDark = theme === 'dark';
  return (
    <svg
      height={size}
      width={size}
      style={{ flex: 'none', lineHeight: 1 }}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <title>Cursor</title>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="lobe-icons-cursor-fill-0"
          x1="11.925"
          x2="11.925"
          y1="12"
          y2="24"
        >
          <stop offset=".16" stopColor={isDark ? "#fff" : "#000"} stopOpacity=".39" />
          <stop offset=".658" stopColor={isDark ? "#fff" : "#000"} stopOpacity=".8" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="lobe-icons-cursor-fill-1"
          x1="22.35"
          x2="11.925"
          y1="6.037"
          y2="12.15"
        >
          <stop offset=".182" stopColor={isDark ? "#fff" : "#000"} stopOpacity=".31" />
          <stop offset=".715" stopColor={isDark ? "#fff" : "#000"} stopOpacity="0" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="lobe-icons-cursor-fill-2"
          x1="11.925"
          x2="1.5"
          y1="0"
          y2="18"
        >
          <stop stopColor={isDark ? "#fff" : "#000"} stopOpacity=".6" />
          <stop offset=".667" stopColor={isDark ? "#fff" : "#000"} stopOpacity=".22" />
        </linearGradient>
      </defs>
      <path
        d="M11.925 24l10.425-6-10.425-6L1.5 18l10.425 6z"
        fill="url(#lobe-icons-cursor-fill-0)"
      />
      <path
        d="M22.35 18V6L11.925 0v12l10.425 6z"
        fill="url(#lobe-icons-cursor-fill-1)"
      />
      <path
        d="M11.925 0L1.5 6v12l10.425-6V0z"
        fill="url(#lobe-icons-cursor-fill-2)"
      />
      <path
        d="M22.35 6L11.925 24V12L22.35 6z"
        fill={isDark ? "#ccc" : "#555"}
      />
      <path
        d="M22.35 6l-10.425 6L1.5 6h20.85z"
        fill={isDark ? "#666" : "#000"}
      />
    </svg>
  );
};

export default Cursor;
