export default function HeroArtwork() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 w-[45%] max-[760px]:w-[62%] max-[760px]:opacity-70" aria-hidden="true">
      <img className="absolute left-[6%] top-[14%] w-[clamp(5rem,11vw,9rem)] -rotate-6" src="/icons/linux-penguin.webp" alt="" />
      <img className="absolute right-[4%] top-[39%] w-[clamp(5.5rem,12vw,10rem)] rotate-6" src="/icons/boxing-gloves.webp" alt="" />
      <img className="absolute bottom-[13%] left-[30%] w-[clamp(4.5rem,9vw,7.5rem)] rotate-3" src="/icons/chess-knight.webp" alt="" />
      <div className="absolute bottom-[19%] right-[7%] rotate-2 border-2 border-primary bg-background p-3 font-display text-[0.9375rem] uppercase leading-none text-primary shadow-[4px_4px_0_var(--foreground)] outline outline-2 outline-background">Built<br />with<br />intent</div>
    </div>
  );
}
