import Image from "next/image";

export default function LogoPng() {
  return (
    <Image
      src="/logo.png"
      alt="Enta Show"
      width={48}
      height={48}
      priority
      style={{ width: 48, height: 48 }}
    />
  );
}

