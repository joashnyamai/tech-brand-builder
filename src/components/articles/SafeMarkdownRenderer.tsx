import React, { useState } from "react";
import {
  Check,
  Copy,
  Info,
  Lightbulb,
  AlertTriangle,
  ShieldAlert,
  Flame,
  TrendingUp,
  ExternalLink,
  CheckSquare,
  Square,
  ImageIcon
} from "lucide-react";

interface SafeMarkdownRendererProps {
  content: string;
}

// Interactive Code Block with copy button & language pill
function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-navy-border/80 bg-[#070c18] shadow-2xl group">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-navy-elevated/70 border-b border-navy-border/70 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <span className="text-[11px] font-mono text-cyan font-bold uppercase tracking-wider ml-2.5 px-2 py-0.5 rounded bg-cyan/10 border border-cyan/20">
            {language || "code"}
          </span>
          <span className="text-[10px] font-mono text-muted-foreground/60 hidden sm:inline">
            {lines.length} {lines.length === 1 ? "line" : "lines"}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-cyan px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-cyan/30 transition-all cursor-pointer"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-[11px] text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span className="text-[11px] font-semibold">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 sm:p-5 overflow-x-auto font-mono text-xs text-foreground/90 leading-relaxed scrollbar-thin">
        <pre className="m-0 font-mono">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

// Callout / Alert Box Component
function CalloutAlert({
  type,
  children,
}: {
  type: "NOTE" | "TIP" | "IMPORTANT" | "WARNING" | "CAUTION" | "STAT";
  children: React.ReactNode;
}) {
  const configs = {
    NOTE: {
      border: "border-cyan/40",
      bg: "bg-cyan/5",
      accent: "text-cyan",
      badgeBg: "bg-cyan/15",
      icon: <Info size={16} className="text-cyan flex-shrink-0 mt-0.5" />,
      label: "NOTE",
    },
    TIP: {
      border: "border-emerald-500/40",
      bg: "bg-emerald-500/5",
      accent: "text-emerald-400",
      badgeBg: "bg-emerald-500/15",
      icon: <Lightbulb size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />,
      label: "PRO TIP",
    },
    IMPORTANT: {
      border: "border-purple-500/40",
      bg: "bg-purple-500/5",
      accent: "text-purple-400",
      badgeBg: "bg-purple-500/15",
      icon: <Flame size={16} className="text-purple-400 flex-shrink-0 mt-0.5" />,
      label: "IMPORTANT",
    },
    WARNING: {
      border: "border-amber-500/40",
      bg: "bg-amber-500/5",
      accent: "text-amber-400",
      badgeBg: "bg-amber-500/15",
      icon: <AlertTriangle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />,
      label: "WARNING",
    },
    CAUTION: {
      border: "border-rose-500/40",
      bg: "bg-rose-500/5",
      accent: "text-rose-400",
      badgeBg: "bg-rose-500/15",
      icon: <ShieldAlert size={16} className="text-rose-400 flex-shrink-0 mt-0.5" />,
      label: "CAUTION",
    },
    STAT: {
      border: "border-cyan/50",
      bg: "bg-gradient-to-r from-cyan/10 via-blue-500/5 to-transparent",
      accent: "text-cyan",
      badgeBg: "bg-cyan/20",
      icon: <TrendingUp size={16} className="text-cyan flex-shrink-0 mt-0.5" />,
      label: "KEY METRIC",
    },
  };

  const c = configs[type] || configs.NOTE;

  return (
    <div
      className={`my-6 rounded-2xl p-4 sm:p-5 border ${c.border} ${c.bg} backdrop-blur-sm shadow-lg`}
    >
      <div className="flex items-start gap-3">
        {c.icon}
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full ${c.badgeBg} ${c.accent}`}
            >
              {c.label}
            </span>
          </div>
          <div className="text-xs sm:text-sm text-foreground/90 leading-relaxed pt-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Markdown Table Component
function MarkdownTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-navy-border/80 bg-navy-surface/50 shadow-xl">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-navy-elevated/90 border-b border-navy-border text-cyan font-mono text-[11px] uppercase tracking-wider">
              {headers.map((h, idx) => (
                <th key={idx} className="p-3.5 font-bold">
                  {parseInline(h.trim())}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-border/40">
            {rows.map((row, rIdx) => (
              <tr
                key={rIdx}
                className="hover:bg-cyan/5 transition-colors odd:bg-transparent even:bg-white/[0.01]"
              >
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="p-3.5 text-foreground/85 leading-relaxed">
                    {parseInline(cell.trim())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Parses inline formatting like **bold**, *italic*, `code`, and [links](url) safely into JSX
function parseInline(text: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // 1. Check for Image ![alt](url)
    const imgMatch = remaining.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
    if (imgMatch) {
      const altText = imgMatch[1];
      const imgUrl = imgMatch[2];
      elements.push(
        <div key={key++} className="my-6 rounded-2xl overflow-hidden border border-navy-border/70 bg-navy-surface/40 p-2 shadow-xl">
          <img
            src={imgUrl}
            alt={altText || "Article Image"}
            className="w-full h-auto rounded-xl object-cover max-h-[480px]"
            loading="lazy"
          />
          {altText && (
            <p className="text-[11px] text-center text-muted-foreground font-mono mt-2 flex items-center justify-center gap-1">
              <ImageIcon size={12} className="text-cyan" />
              <span>{altText}</span>
            </p>
          )}
        </div>
      );
      remaining = remaining.slice(imgMatch[0].length);
      continue;
    }

    // 2. Check for inline code `...`
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      elements.push(
        <code
          key={key++}
          className="px-1.5 py-0.5 rounded-md bg-cyan/10 border border-cyan/20 text-cyan text-[11px] font-mono font-semibold"
        >
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // 3. Check for Bold **...**
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      elements.push(
        <strong key={key++} className="font-bold text-foreground">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // 4. Check for Italic *...*
    const italicMatch = remaining.match(/^\*([^*]+)\*/);
    if (italicMatch) {
      elements.push(
        <em key={key++} className="italic text-foreground/90">
          {italicMatch[1]}
        </em>
      );
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    // 5. Check for Links [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      const linkText = linkMatch[1];
      const linkUrl = linkMatch[2];
      const isExternal = linkUrl.startsWith("http");
      elements.push(
        <a
          key={key++}
          href={linkUrl}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-1 text-cyan underline underline-offset-4 hover:text-cyan-glow transition-colors font-medium"
        >
          <span>{linkText}</span>
          {isExternal && <ExternalLink size={11} className="opacity-70" />}
        </a>
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    // 6. Plain character chunk
    const nextSpecialIndex = remaining.search(/[`*\[!]/);
    if (nextSpecialIndex === -1) {
      elements.push(<span key={key++}>{remaining}</span>);
      break;
    } else if (nextSpecialIndex > 0) {
      elements.push(<span key={key++}>{remaining.slice(0, nextSpecialIndex)}</span>);
      remaining = remaining.slice(nextSpecialIndex);
    } else {
      elements.push(<span key={key++}>{remaining[0]}</span>);
      remaining = remaining.slice(1);
    }
  }

  return elements;
}

export default function SafeMarkdownRenderer({ content }: SafeMarkdownRendererProps) {
  const lines = content.split("\n");
  const nodes: React.ReactNode[] = [];

  let i = 0;
  let keyIndex = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced Code block
    if (line.trim().startsWith("```")) {
      const language = line.trim().replace(/^```/, "").trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // Skip closing ```
      nodes.push(
        <CodeBlock
          key={`code-${keyIndex++}`}
          code={codeLines.join("\n")}
          language={language || "code"}
        />
      );
      continue;
    }

    // Markdown Table Detection (Line starting with | and next line starting with |---)
    if (
      line.trim().startsWith("|") &&
      i + 1 < lines.length &&
      lines[i + 1].trim().startsWith("|") &&
      lines[i + 1].includes("---")
    ) {
      const headerCells = line
        .trim()
        .slice(1, -1)
        .split("|");
      i += 2; // Skip header and separator line
      const tableRows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const rowCells = lines[i]
          .trim()
          .slice(1, -1)
          .split("|");
        tableRows.push(rowCells);
        i++;
      }
      nodes.push(
        <MarkdownTable
          key={`table-${keyIndex++}`}
          headers={headerCells}
          rows={tableRows}
        />
      );
      continue;
    }

    // Horizontal Rule
    if (line.trim() === "---" || line.trim() === "***" || line.trim() === "___") {
      nodes.push(
        <hr key={`hr-${keyIndex++}`} className="my-8 border-t border-navy-border/60" />
      );
      i++;
      continue;
    }

    // Headings with clean anchor ID generation
    if (line.startsWith("# ")) {
      const text = line.slice(2);
      const headingId = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      nodes.push(
        <h1
          id={headingId}
          key={`h1-${keyIndex++}`}
          className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-foreground mt-10 mb-4 tracking-tight scroll-mt-24"
        >
          {parseInline(text)}
        </h1>
      );
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      const text = line.slice(3);
      const headingId = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      nodes.push(
        <h2
          id={headingId}
          key={`h2-${keyIndex++}`}
          className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-foreground mt-10 mb-4 tracking-tight border-b border-navy-border/40 pb-2.5 flex items-center gap-2 scroll-mt-24 group"
        >
          <span className="w-1.5 h-5 rounded-full bg-cyan inline-block opacity-80" />
          <span>{parseInline(text)}</span>
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      const text = line.slice(4);
      const headingId = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      nodes.push(
        <h3
          id={headingId}
          key={`h3-${keyIndex++}`}
          className="font-display font-bold text-lg sm:text-xl text-cyan mt-7 mb-3 scroll-mt-24"
        >
          {parseInline(text)}
        </h3>
      );
      i++;
      continue;
    }

    if (line.startsWith("#### ")) {
      nodes.push(
        <h4
          key={`h4-${keyIndex++}`}
          className="font-display font-bold text-base sm:text-lg text-foreground mt-5 mb-2"
        >
          {parseInline(line.slice(5))}
        </h4>
      );
      i++;
      continue;
    }

    // Callout Alert Box or Blockquote (> [!NOTE], > [!TIP], > [!WARNING], > [!STAT], etc.)
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [line.slice(2)];
      i++;
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }

      const firstLine = quoteLines[0].trim();
      const alertMatch = firstLine.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|STAT)\]\s*(.*)$/i);

      if (alertMatch) {
        const alertType = alertMatch[1].toUpperCase() as "NOTE" | "TIP" | "IMPORTANT" | "WARNING" | "CAUTION" | "STAT";
        const inlineTitle = alertMatch[2];
        const remainingLines = inlineTitle ? [inlineTitle, ...quoteLines.slice(1)] : quoteLines.slice(1);

        nodes.push(
          <CalloutAlert key={`callout-${keyIndex++}`} type={alertType}>
            {remainingLines.map((ql, qIdx) => (
              <p key={qIdx} className={qIdx > 0 ? "mt-1.5" : ""}>
                {parseInline(ql)}
              </p>
            ))}
          </CalloutAlert>
        );
      } else {
        // Standard blockquote
        nodes.push(
          <blockquote
            key={`quote-${keyIndex++}`}
            className="my-6 border-l-4 border-cyan pl-4 py-2.5 bg-cyan/5 rounded-r-2xl text-foreground/85 italic text-sm leading-relaxed"
          >
            {quoteLines.map((ql, qIdx) => (
              <p key={qIdx} className={qIdx > 0 ? "mt-2" : ""}>
                {parseInline(ql)}
              </p>
            ))}
          </blockquote>
        );
      }
      continue;
    }

    // Task list / Checklist (- [ ] or - [x])
    if (line.trim().startsWith("- [ ] ") || line.trim().startsWith("- [x] ")) {
      const isChecked = line.trim().startsWith("- [x] ");
      const taskText = line.trim().slice(6);
      nodes.push(
        <div key={`task-${keyIndex++}`} className="flex items-start gap-2.5 my-2 text-sm text-foreground/90">
          {isChecked ? (
            <CheckSquare size={16} className="text-cyan flex-shrink-0 mt-0.5" />
          ) : (
            <Square size={16} className="text-muted-foreground flex-shrink-0 mt-0.5" />
          )}
          <span className={isChecked ? "line-through text-muted-foreground" : ""}>
            {parseInline(taskText)}
          </span>
        </div>
      );
      i++;
      continue;
    }

    // Bulleted list
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      const listItems: string[] = [line.trim().slice(2)];
      i++;
      while (
        i < lines.length &&
        (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* ")) &&
        !lines[i].trim().startsWith("- [ ] ") &&
        !lines[i].trim().startsWith("- [x] ")
      ) {
        listItems.push(lines[i].trim().slice(2));
        i++;
      }
      nodes.push(
        <ul key={`ul-${keyIndex++}`} className="my-4 space-y-2 pl-6 list-disc text-sm sm:text-base text-foreground/85">
          {listItems.map((item, lIdx) => (
            <li key={lIdx} className="leading-relaxed pl-1 marker:text-cyan">
              {parseInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line.trim())) {
      const listItems: string[] = [line.trim().replace(/^\d+\.\s/, "")];
      i++;
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      nodes.push(
        <ol key={`ol-${keyIndex++}`} className="my-4 space-y-2 pl-6 list-decimal text-sm sm:text-base text-foreground/85">
          {listItems.map((item, lIdx) => (
            <li key={lIdx} className="leading-relaxed pl-1 marker:text-cyan font-medium">
              {parseInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Empty lines
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Standard paragraph
    nodes.push(
      <p
        key={`p-${keyIndex++}`}
        className="my-4 text-sm sm:text-base text-foreground/85 leading-relaxed"
      >
        {parseInline(line)}
      </p>
    );
    i++;
  }

  return <div className="article-prose space-y-2">{nodes}</div>;
}

