import React from 'react';

function renderInline(text: string, keyCounter: { v: number }): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  const inlineRules: [RegExp, (m: RegExpExecArray) => { node: React.ReactNode; len: number }][] = [
    [/`([^`]+)`/g, (m) => ({ node: <code key={keyCounter.v++} className="bg-white/10 text-app-accent px-1.5 py-0.5 rounded text-sm font-mono">{m[1]}</code>, len: m[0].length })],
    [/\*\*(.+?)\*\*/g, (m) => ({ node: <strong key={keyCounter.v++} className="text-white font-bold">{m[1]}</strong>, len: m[0].length })],
    [/\*(.+?)\*/g, (m) => ({ node: <em key={keyCounter.v++} className="italic text-app-text-muted">{m[1]}</em>, len: m[0].length })],
  ];
  while (remaining.length > 0) {
    let earliest: { node: React.ReactNode; len: number; idx: number } | null = null;
    for (const [rx, fn] of inlineRules) {
      rx.lastIndex = 0;
      const match = rx.exec(remaining);
      if (match && (earliest === null || match.index < earliest.idx)) {
        earliest = { node: fn(match).node, len: match[0].length, idx: match.index };
      }
    }
    if (earliest && earliest.idx >= 0) {
      if (earliest.idx > 0) parts.push(remaining.slice(0, earliest.idx));
      parts.push(earliest.node);
      remaining = remaining.slice(earliest.idx + earliest.len);
    } else {
      parts.push(remaining);
      break;
    }
  }
  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

export function SimpleMarkdown({ children }: { children: string }) {
  const lines = children.split('\n');
  const elements: React.ReactNode[] = [];
  let inList = false;
  let listItems: React.ReactNode[] = [];
  const k = { v: 0 };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Headers
    const h3 = trimmed.match(/^### (.+)/);
    if (h3) {
      if (inList) { elements.push(<ul key={k.v++} className="list-disc list-inside space-y-1 my-3 text-app-text-muted">{listItems}</ul>); listItems = []; inList = false; }
      elements.push(<h3 key={k.v++} className="text-xl font-black text-white mt-6 mb-3">{renderInline(h3[1], k)}</h3>);
      continue;
    }
    const h2 = trimmed.match(/^## (.+)/);
    if (h2) {
      if (inList) { elements.push(<ul key={k.v++} className="list-disc list-inside space-y-1 my-3 text-app-text-muted">{listItems}</ul>); listItems = []; inList = false; }
      elements.push(<h2 key={k.v++} className="text-2xl font-black text-white mt-8 mb-4">{renderInline(h2[1], k)}</h2>);
      continue;
    }
    const h1 = trimmed.match(/^# (.+)/);
    if (h1) {
      if (inList) { elements.push(<ul key={k.v++} className="list-disc list-inside space-y-1 my-3 text-app-text-muted">{listItems}</ul>); listItems = []; inList = false; }
      elements.push(<h1 key={k.v++} className="text-3xl font-black text-white mt-8 mb-4">{renderInline(h1[1], k)}</h1>);
      continue;
    }

    // List item
    const liMatch = trimmed.match(/^[-*]\s+(.+)/);
    if (liMatch) {
      inList = true;
      listItems.push(<li key={k.v++}>{renderInline(liMatch[1], k)}</li>);
      continue;
    }

    // Empty line — flush list
    if (trimmed === '') {
      if (inList) { elements.push(<ul key={k.v++} className="list-disc list-inside space-y-1 my-3 text-app-text-muted">{listItems}</ul>); listItems = []; inList = false; }
      continue;
    }

    // Regular paragraph
    if (inList) { elements.push(<ul key={k.v++} className="list-disc list-inside space-y-1 my-3 text-app-text-muted">{listItems}</ul>); listItems = []; inList = false; }
    elements.push(<p key={k.v++} className="my-2 text-app-text-muted leading-relaxed">{renderInline(trimmed, k)}</p>);
  }

  if (inList) elements.push(<ul key={k.v++} className="list-disc list-inside space-y-1 my-3 text-app-text-muted">{listItems}</ul>);

  return <>{elements}</>;
}
