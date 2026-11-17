import { toast } from 'sonner';
import { useState } from 'react';
import emailjs from 'emailjs-com';
// Icons
import { Mail, MessageSquare, Send, SendHorizontal } from 'lucide-react';
// Sounds
import { playSound } from '@/utils/playSound';
import ConfirmationSound from '@/assets/sound/notification.oga?url'
import ErrorSound from '@/assets/sound/error.oga?url'
// Components
import WatchingFace from '@/components/WatchingFace';
import { CartoonButton } from '@/components/ui/cartoon-button';

export default function Contact() {
  const [form, setForm] = useState({
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState<'idle' | 'sending' | 'success'>('idle');
  const [isTyping, setIsTyping] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidGmail = (email: string) => {
    return /@gmail\.com$/i.test(email.trim());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitted !== 'idle') return;
    if (!isValidGmail(form.email)) {
      toast.error('Please enter a valid Gmail address ending with @gmail.com');
      return;
    }
    setSubmitted('sending');
    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      e.currentTarget,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
        setSubmitted('success');
        setForm({ email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted('idle'), 5000);

        // Play this sound effect when the message is successfully sent
        playSound(ConfirmationSound)

        toast.success("Your message is successfully sent, I'll reach out to you soon <3");
	}, () => {
        setSubmitted('idle');
		playSound(ErrorSound);
        toast.error('Failed to send your message, please try again.');
    });
  };

  return (
    <section id="contact" className="flex-section-center section-padding px-4">
      <div className="mb-3 flex flex-col items-center justify-center gap-0">
        <h2 className="m-0 font-display text-[clamp(2.125rem,5vw,3.75rem)] text-foreground">Let’s talk</h2>
      </div>

      <div className="flex w-full max-w-xl flex-col gap-6 rounded-none border border-foreground bg-card p-8 shadow-[6px_6px_0_var(--foreground)]">

        <WatchingFace isTyping={isTyping} />

        <form className="flex flex-col gap-4 *:flex *:flex-col *:gap-1" onSubmit={handleSubmit}>

          <label>
            <div className="flex items-center gap-1 font-mono text-[0.6875rem] uppercase">
              <Mail size={20}/>
              <span className="font-medium">Your Email</span>
            </div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onFocus={() => setIsTyping(true)}
              onBlur={() => setIsTyping(false)}
              required
              className="contact-input"
              placeholder="you@email.com"
            />
          </label>

          <label>
            <div className="flex items-center gap-1 font-mono text-[0.6875rem] uppercase">
              <MessageSquare size={20}/>
              <span className="font-medium">Subject</span>
            </div>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              onFocus={() => setIsTyping(true)}
              onBlur={() => setIsTyping(false)}
              required
              className="contact-input"
              placeholder="What would you like to talk about?"
            />
          </label>

          <label>
            <div className="flex items-center gap-1 font-mono text-[0.6875rem] uppercase">
              <Send size={20}/>
              <span className="font-medium">Message</span>
            </div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              onFocus={() => setIsTyping(true)}
              onBlur={() => setIsTyping(false)}
              required
              rows={5}
              className="contact-input resize-none"
              placeholder="Write your message here..."
            />
          </label>

          <CartoonButton
            type="submit"
            color="bg-accent"
            className="mt-2 font-mono text-xs font-semibold uppercase"
            icon={<SendHorizontal aria-hidden="true" />}
            label={submitted === 'sending' ? 'Sending...' : submitted === 'success' ? 'Sent!' : 'Send'}
            disabled={submitted !== 'idle'}
          />

        </form>
      </div>
    </section>
  );
}
