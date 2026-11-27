export default function HeroArtwork() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
      <img className="absolute left-[1%] top-[6%] w-[clamp(3.5rem,9vw,7.5rem)] -rotate-6 max-[760px]:left-0 max-[760px]:top-[8%]" src="/icons/linux-penguin.webp" alt="" />
      <img className="absolute bottom-[23%] left-[3%] w-[clamp(3rem,7.5vw,6rem)] rotate-3 max-[760px]:left-0 max-[760px]:bottom-[30%]" src="/icons/chess-knight.webp" alt="" />
      <img className="absolute right-[1%] top-[10%] w-[clamp(3.75rem,10vw,8rem)] rotate-6 max-[760px]:right-0 max-[760px]:top-[14%]" src="/icons/boxing-gloves.webp" alt="" />
      <div className="absolute bottom-[12%] right-[2%] rotate-2 border-2 border-primary bg-background p-3 font-display text-[0.9375rem] uppercase leading-none text-primary shadow-[4px_4px_0_var(--foreground)] outline outline-2 outline-background max-[760px]:bottom-[8%] max-[760px]:right-0 max-[760px]:-rotate-2 max-[760px]:p-2 max-[760px]:text-[0.6875rem] max-[760px]:shadow-[2px_2px_0_var(--foreground)]">Built<br />with<br />intent</div>
    </div>
  );
}
