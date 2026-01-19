import Image from "next/image";

export default function LogoPng() {
  return (
    <Image
      src="/logo3.png"
      alt="Enta Show"
      width={140}
      height={140}
      priority
      style={{ width: "auto", height: 80, objectFit: "contain", }}
    />
  );
}

