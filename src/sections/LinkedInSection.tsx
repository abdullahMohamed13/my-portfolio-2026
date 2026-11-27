import { useState } from 'react';
import { Linkedin } from 'pixelarticons/react';
import LinkedInPostCard from '@/components/LinkedInPostCard';
import { linkedinPosts } from '@/data/linkedin-posts';
import { CartoonButton } from '@/components/ui/cartoon-button';
export default function LinkedInSection() {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  return (
    <section id="linkedin" className="bg-background px-5 py-8 sm:py-15" aria-labelledby="linkedin-post-title">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary"><Linkedin aria-hidden="true" className="h-4 w-4" /> From LinkedIn</p>
        <h2 id="linkedin-post-title" className="font-display text-3xl font-bold sm:text-5xl">Things I&rsquo;ve shared</h2>
        <CartoonButton
          type="button"
          className="mt-5 rounded-full border border-foreground px-5 py-2 font-semibold transition-colors hover:bg-foreground hover:text-background"
          onClick={() => setLanguage((current) => current === 'ar' ? 'en' : 'ar')}
          aria-pressed={language === 'en'}
        >
          {language === 'ar' ? 'Read all posts in English' : 'عرض جميع المنشورات بالعربية'}
        </CartoonButton>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {linkedinPosts.map((post) => <LinkedInPostCard key={post.id} post={post} language={language} />)}
      </div>
    </section>
  );
}
