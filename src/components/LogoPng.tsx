import Image from "next/image";

export default function LogoPng() {
  return (
    <Image
      src="/logo-v2.png"
      alt="Enta Show"
      width={72}
      height={72}
      priority
      style={{ width: 72, height: 72, objectFit: "contain", }}
    />
  );
}

