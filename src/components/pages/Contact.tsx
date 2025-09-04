import { ArrowLeft } from 'lucide-react';

interface ContactProps {
  onBack: () => void;
}

export default function Contact({ onBack }: ContactProps) {
  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Home</span>
        </button>
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Contact Us</h1>
        <div className="bg-gray-900/50 p-8 rounded-lg border border-white/10 max-w-lg mx-auto">
          <p className="text-center text-white/70 mb-6">Have a question or feedback? Fill out the form below to get in touch with us.</p>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">Name</label>
              <input type="text" id="name" name="name" className="w-full bg-black/30 border border-white/20 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">Email</label>
              <input type="email" id="email" name="email" className="w-full bg-black/30 border border-white/20 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">Message</label>
              <textarea id="message" name="message" rows={4} className="w-full bg-black/30 border border-white/20 rounded-md py-2 px-4 text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="bg-cyan-500 text-black font-bold py-2 px-6 rounded-full hover:bg-cyan-400 transition-colors">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
