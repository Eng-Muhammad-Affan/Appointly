import React from "react";

interface MaterialSymbolProps {
  icon: string;
  filled?: boolean;
  className?: string;
  size?: number;
}

export const MaterialSymbol: React.FC<MaterialSymbolProps> = ({
  icon,
  filled = false,
  className = "",
  size,
}) => {
  const style: React.CSSProperties = {
    fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
  };

  if (size) {
    style.fontSize = `${size}px`;
  }

  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={style}
      aria-hidden="true"
    >
      {icon}
    </span>
  );
};