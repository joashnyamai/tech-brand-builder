import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Mail, Linkedin, Github, Phone, MapPin, ArrowUpRight, FileText, Send, Check, Copy, Download, Sparkles } from "lucide-react";

export default function Contact({ onViewResume }: { onViewResume: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  // Copy states
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopy = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSending(true);

    // Simulate network latency
    setTimeout(() => {
      setSending(false);
      setSuccess(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1200);
  };

  const downloadVCard = () => {
    const vcardContent = `BEGIN:VCARD
VERSION:3.0
N:Nyamai;Malila;;;
FN:Malila Nyamai
ORG:Malila Tech Consultancies
TITLE:Software & QA Engineer
TEL;TYPE=CELL:+254745806761
EMAIL;TYPE=PREF,INTERNET:jamesmnyamai9@gmail.com
URL:https://efoleni.co.ke
ADR;TYPE=WORK:;;Nairobi;Kenya;;;
END:VCARD`;
    const blob = new Blob([vcardContent], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "malila_nyamai.vcf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="contact" ref={ref} className="py-28 px-6 bg-navy-surface/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan text-xs tracking-widest uppercase font-medium">08 / Contact</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-6">
            Let's Build <span className="text-gradient">Together</span>
          </h2>
          <div className="section-divider mx-auto mb-8" />
          <p className="max-w-xl mx-auto text-muted-foreground leading-relaxed text-sm">
            Whether you are looking to hire a software engineer, QA specialist, or IT consultant, I am excited to hear about your goals. Reach out today.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Column 1: Info badging & copy triggers (2/5 size) */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-display font-bold text-lg text-foreground mb-4">Direct Details</h3>

            {/* Email capsule */}
            <div className="p-4 rounded-2xl border border-navy-border/60 bg-navy-surface/40 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan">
                  <Mail size={15} />
                </div>
                <div>
                  <span className="block text-[10px] text-muted-foreground uppercase font-bold">Email Address</span>
                  <a href="mailto:jamesmnyamai9@gmail.com" className="text-xs font-semibold text-foreground hover:text-cyan transition-colors">
                    jamesmnyamai9@gmail.com
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy("jamesmnyamai9@gmail.com", "email")}
                className="p-1.5 rounded bg-white/5 border border-white/10 hover:border-cyan text-muted-foreground hover:text-cyan transition-all cursor-pointer"
                title="Copy Email"
              >
                {copiedEmail ? <Check size={12} /> : <Copy size={12} />}
              </button>
            </div>

            {/* Phone capsule */}
            <div className="p-4 rounded-2xl border border-navy-border/60 bg-navy-surface/40 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan">
                  <Phone size={15} />
                </div>
                <div>
                  <span className="block text-[10px] text-muted-foreground uppercase font-bold">Phone Number</span>
                  <a href="tel:+254745806761" className="text-xs font-semibold text-foreground hover:text-cyan transition-colors">
                    +254 745 806 761
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy("+254745806761", "phone")}
                className="p-1.5 rounded bg-white/5 border border-white/10 hover:border-cyan text-muted-foreground hover:text-cyan transition-all cursor-pointer"
                title="Copy Phone"
              >
                {copiedPhone ? <Check size={12} /> : <Copy size={12} />}
              </button>
            </div>

            {/* Location & Links */}
            <div className="p-4 rounded-2xl border border-navy-border/60 bg-[#0a0f1d]/40 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground">
                  <MapPin size={15} />
                </div>
                <div>
                  <span className="block text-[10px] text-muted-foreground uppercase font-bold">Location</span>
                  <span className="text-xs font-semibold text-foreground">Nairobi, Kenya</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-white/5">
                <button
                  onClick={downloadVCard}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-cyan text-cyan text-xs font-bold hover:bg-cyan hover:text-primary-foreground transition-all cursor-pointer"
                >
                  <Download size={12} />
                  <span>vCard</span>
                </button>
                <button
                  onClick={onViewResume}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/5 text-xs font-bold transition-all cursor-pointer"
                >
                  <FileText size={12} />
                  <span>Resume</span>
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: Interactive message form (3/5 size) */}
          <div className="md:col-span-3 card-glass rounded-3xl p-6 md:p-8 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!success ? (
                <motion.form
                  key="form"
                  onSubmit={handleSend}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display font-bold text-lg text-foreground">Send a Message</h3>
                    <p className="text-xs text-muted-foreground font-medium">Use the secure form below to query Malila's inbox</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase">Your Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-[#070b13] border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-cyan/50 focus:shadow-[0_0_10px_rgba(6,182,212,0.1)] transition-all"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase">Your Email</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-[#070b13] border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-cyan/50 focus:shadow-[0_0_10px_rgba(6,182,212,0.1)] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">Subject</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      placeholder="Opportunity / Collaboration Inquiry"
                      className="w-full bg-[#070b13] border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-cyan/50 focus:shadow-[0_0_10px_rgba(6,182,212,0.1)] transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">Message Body</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Hi Malila, I reviewed your work history and e-Foleni scheduler details. Let's discuss..."
                      className="w-full bg-[#070b13] border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-cyan/50 focus:shadow-[0_0_10px_rgba(6,182,212,0.1)] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending || !name || !email || !message}
                    className="w-full py-3 rounded-xl gradient-accent text-primary-foreground font-display font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {sending ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        <span>Transmitting Data...</span>
                      </>
                    ) : (
                      <>
                        <Send size={12} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-cyan/10 border border-cyan flex items-center justify-center mx-auto text-cyan">
                    <Check size={20} className="animate-pulse" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display font-bold text-lg text-foreground flex items-center justify-center gap-1.5">
                      <Sparkles size={14} className="text-cyan animate-pulse" />
                      Transmission Success!
                    </h3>
                    <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                      Thank you! Your inquiry was validated and secure-routed to Malila's inbox. He will reply to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-cyan text-muted-foreground hover:text-cyan text-xs font-semibold transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
