import { socialMedia } from "@/data/social-media";
import { GiTalk } from "react-icons/gi";

export default function Footer() {
  return (
    <footer
      className="relative w-full border-t px-4 sm:px-0 py-8 pb-18 md:pb-10"
    >
      <div className='flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-4 justify-around'>

        {/* left section */}
        <div className='flex gap-3'>
          <img src="/me.webp" className='rounded-full h-20' alt="Picture of Abdallah" />
          <div>
            <h3 className='text-2xl font-bold text-black'>Thanks for Stopping By!</h3>
            <p className='text-muted-foreground'>I'm open for freelance projects & full-time roles.</p>
            <p className='text-muted-foreground'>Let's connect if you're into tech, ideas, or just good conversation.</p>
          </div>
        </div>

        {/* right section */}
        <div className='flex flex-col gap-4 sm:gap-6 *:flex *:flex-col *:gap-1'>
          <div className='flex-center'>
            <p className='text-md flex items-center gap-1.5 text-black'><GiTalk className='sm:text-primary' /> Contact Me</p>
            <div className="flex items-center justify-center gap-3">
                {socialMedia.map((item) => {
                    return (
                        <a key={item.id} title={item.name} href={item.href} target="_blank" rel="noopener noreferrer">
                            <img src={item.image} alt={item.name} className="w-8 h-8" />
                        </a>
                    );
                })}
            </div>
          </div>
        </div>
			</div>
      
      <p className='mt-8 text-center font-light text-sm leading-5.5 mb-1'>©2026 Abdallah Aziz - All Rights Reserved</p>
  
    {/* Bottom section */}
      {/* <div className='mt-4 [max-width:300px]:hidden'>
        Don't Forget 🙏
        <div>⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛</div>
        <div>🟥🟥🟥🟥⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜</div>
        <div>🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩</div>
      </div> */}
    </footer>
  );
}