import Image from "next/image";

interface LogoProps {
  href?: string;
  width?: number;
  height?: number;
}

export default function Logo({
  href = "/",
  width = 100,
  height = 40,
}: LogoProps) {
  return (
    <a href={href} className="flex items-center">
      <Image
        src="/imagens/logo.png" 
        alt="Logo"
        width={width}
        height={height}
        priority 
      />
    </a>
  );
}
