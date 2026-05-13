import { toast } from 'sonner';
import { useState } from 'react';
import emailjs from 'emailjs-com';

import AnimatedHeader from './../components/AnimatedHeader';
import { Button } from '@/components/ui/button';

import { Mail, MessageSquare, Send, SendHorizontal } from 'lucide-react';

import { playSound } from '@/utils/playSound';
import ConfirmationSound from '@/assets/sound/notification.oga?url'
import ErrorSound from '@/assets/sound/error.oga?url'

export default function Contact() {
  const [form, setForm] = useState({
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValidGmail = (email: string) => {
    return /@gmail\.com$/i.test(email.trim());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidGmail(form.email)) {
      toast.error('Please enter a valid Gmail address ending with @gmail.com');
      return;
    }
    emailjs.sendForm(
      'service_x4ha7bn',
      'template_q4kyjou',
      e.currentTarget,
      '0zoGJUCb_5YDXPkDI'
    )
    .then(() => {
        setSubmitted(true);
        setForm({ email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);

        // Play this sound effect when the message is successfully sent
        playSound(ConfirmationSound)

        toast.success("Your message is successfully sent, I'll reach out to you soon <3");
	}, () => {
		playSound(ErrorSound);
        toast.error('Failed to send your message, please try again.');
    });
  };

  const inputStyle = 'rounded-lg px-3 py-2 bg-background border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition'

  return (
    <section id="contact" className="flex-section-center px-4 section-padding">
      <div className='flex items-center justify-center flex-col gap-0 mb-3'>
        <AnimatedHeader text='Contact Me'/>
        <h3 className='sub-heading'>
          /* Let's Have A Conversation! */
        </h3>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-xl bg-card rounded-2xl shadow-xl p-8">
        <p className="text-base text-destructive font-medium -mt-2">
          Kindly enter a valid gmail address to ensure I can get back to you.
        </p>

        <form className="flex flex-col gap-4 *:flex *:flex-col *:gap-1" onSubmit={handleSubmit}>

          <label>
            <div className='flex items-center gap-1'>
              <Mail size={20}/>
              <span className="font-medium">Your Email</span>
            </div>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className={inputStyle}
              placeholder="you@email.com"
            />
          </label>

          <label>
            <div className='flex items-center gap-1'>
              <MessageSquare size={20}/>
              <span className="font-medium">Subject</span>
            </div>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              className={inputStyle}
              placeholder="What would you like to talk about?"
            />
          </label>

          <label>
            <div className='flex items-center gap-1'>
              <Send size={20}/>
              <span className="font-medium">Message</span>
            </div>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className={`${inputStyle} resize-none`}
              placeholder="Write your message here..."
            />
          </label>

          <Button
            type="submit"
            className="mt-2 font-semibold bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2"
            disabled={submitted}
          >
            <div className='flex items-center gap-1'>
              <SendHorizontal />
              <span>
                {submitted ? 'Sent!' : 'Send'}
              </span>
            </div>
          </Button>

        </form>
      </div>
    </section>
  );
}