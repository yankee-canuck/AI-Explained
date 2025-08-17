"use client";
export default function Mascot({ size = 140 }: { size?: number }) {
  // Replace /mascot.png later with your own illustration
  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <img
        src="/mascot.png"
        alt=""
        className="absolute inset-0 w-full h-full object-contain drop-shadow-md animate-bounce [animation-duration:2.5s]"
      />
    </div>
  );
}
