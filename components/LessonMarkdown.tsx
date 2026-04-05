"use client";

interface Props {
  content: string;
}

// Simple markdown renderer — handles headers, bold, italic, code, lists, tables
export default function LessonMarkdown({ content }: Props) {
  const html = renderMarkdown(content);
  return (
    <div
      className="prose prose-sm max-w-none text-gray-800 leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function renderMarkdown(text: string): string {
  return text
    // Escape HTML
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Code blocks
    .replace(/```[\w]*\n([\s\S]*?)```/g, "<pre class=\"bg-gray-100 rounded-lg p-4 overflow-x-auto text-xs font-mono my-4\"><code>$1</code></pre>")
    // Inline code
    .replace(/`([^`]+)`/g, "<code class=\"bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono text-gray-800\">$1</code>")
    // Headers
    .replace(/^### (.+)$/gm, "<h3 class=\"text-base font-semibold text-gray-900 mt-5 mb-2\">$1</h3>")
    .replace(/^## (.+)$/gm, "<h2 class=\"text-lg font-bold text-gray-900 mt-6 mb-3\">$1</h2>")
    .replace(/^# (.+)$/gm, "<h1 class=\"text-xl font-bold text-gray-900 mt-0 mb-4\">$1</h1>")
    // Bold + italic
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong class=\"font-semibold text-gray-900\">$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em class=\"italic\">$1</em>")
    // Tables
    .replace(/^\|(.+)\|$/gm, (line) => {
      if (line.match(/^\|[\s-|]+\|$/)) return ""; // skip separator rows
      const cells = line.slice(1, -1).split("|").map(c => c.trim());
      const isHeader = false; // simplified
      const cellHtml = cells.map(c => `<td class="px-3 py-2 text-sm border-b border-gray-200">${c}</td>`).join("");
      return `<tr>${cellHtml}</tr>`;
    })
    // Wrap table rows
    .replace(/((<tr>.*<\/tr>\n?)+)/gs, "<div class=\"overflow-x-auto my-4\"><table class=\"w-full border-collapse border border-gray-200 rounded-lg\">$1</table></div>")
    // Unordered lists
    .replace(/^[-*] (.+)$/gm, "<li class=\"ml-4 list-disc text-sm text-gray-700 my-0.5\">$1</li>")
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, "<li class=\"ml-4 list-decimal text-sm text-gray-700 my-0.5\">$1</li>")
    // Wrap consecutive li items
    .replace(/((<li[^>]*>.*<\/li>\n?)+)/gs, "<ul class=\"my-3 space-y-0.5\">$1</ul>")
    // Blockquotes
    .replace(/^> (.+)$/gm, "<blockquote class=\"border-l-4 border-indigo-300 pl-4 my-3 italic text-gray-600 text-sm\">$1</blockquote>")
    // Horizontal rules
    .replace(/^---$/gm, "<hr class=\"my-6 border-gray-200\">")
    // Paragraphs (lines not starting with HTML tags)
    .replace(/^(?!<[a-z])(.+)$/gm, (line) => {
      if (!line.trim()) return line;
      return `<p class="my-2 text-sm text-gray-700">${line}</p>`;
    })
    // Clean up empty lines
    .replace(/\n{3,}/g, "\n\n");
}
