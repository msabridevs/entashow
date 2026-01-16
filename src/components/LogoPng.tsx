// src/components/LogoPng.tsx
import Image from "next/image";

export default function LogoPng({
  alt,
  height = 52,
}: {
  alt: string;
  height?: number;
}) {
  return (
    <Image
      src="/logo.png"
      alt={alt}
      width={Math.round(height * 4)}
      height={height}
      priority
      style={{ height, width: "auto", display: "block" }}
    />
  );
}

