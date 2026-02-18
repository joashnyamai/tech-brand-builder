export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-navy-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} <span className="text-cyan">Malila Nyamai</span>. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          Full-Stack Engineer · QA Specialist · IT Consultant · Nairobi, Kenya
        </p>
      </div>
    </footer>
  );
}
