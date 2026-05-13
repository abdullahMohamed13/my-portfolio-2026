import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FiEye, FiDownload } from 'react-icons/fi';

export default function Resume() {

    return <main className='px-3 md:px-0 pt-5 sm:pt-3'>
        <header className='flex items-center justify-between mx-4'>
            <a href='/' className='flex items-center gap-2'>
                <img src="/me.webp" className="h-10 sm:h-15 rounded-full" alt="Abdallah's Image" />
                <h1 className="font-clash font-bold text-primary pl-2 border-l-4 border-secondary text-2xl sm:text-3xl">
                    Abdallah
                </h1>
            </a>
            <Link to='/' className='flex items-center gap-1 hover:text-primary hover:underline'>
                /Home
            </Link>
        </header>

        <div className='mt-10 sm:mt-15 flex flex-col items-center justify-center text-center'>
            <code className='text-xl'>
                // A concise overview of my background, skills, and projects in frontend development.
            </code>
        </div>

        <div className='flex my-10 items-center justify-center flex-col gap-3'>
            <div className='relative border-2 shadow border-primary/60 rounded-lg bg-background'>
                <img
                    src='/resume-screenshots/resume.webp'
                    className='max-h-screen w-full object-contain'
                    alt="Resume Image"
                />
                <div className='absolute bottom-0.5 sm:bottom-1.5 left-1/2 -translate-x-1/2'>
                    <Button asChild className='mr-2 bg-accent'>
                        <a href='/pdf-files/Abdallah_Aziz-Frontend-Developer.pdf' rel="noopener noreferrer" title='Open Resume'>
                            <FiEye />
                            <span className='hidden sm:block'>Open</span>
                        </a>
                    </Button>
                    <Button asChild className='bg-accent'>
                        <a href='/pdf-files/Abdallah_Aziz-Frontend-Developer.pdf' download title='Download Resume'>
                            <FiDownload />
                            <span className='hidden sm:block'>Download</span>
                        </a>
                    </Button>
                </div>
            </div>
        </div>
    </main>
}
