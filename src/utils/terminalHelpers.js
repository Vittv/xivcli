export function addLineToBlock(block, text) {
  const line = document.createElement("div");
  line.textContent = text;
  block.appendChild(line);

  const terminal = document.getElementById("terminal");
  requestAnimationFrame(() => {
    terminal.scrollTop = terminal.scrollHeight;
  });
  return line;
}

export function addLinkToBlock(block, url, prefix = "") {
  const line = document.createElement("div");

  if (prefix) {
    const prefixSpan = document.createElement("span");
    prefixSpan.textContent = prefix;
    line.appendChild(prefixSpan);
  }

  const link = document.createElement("a");
  link.href = url;
  link.textContent = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.style.color = "var(--vague-orange)";
  link.style.textDecoration = "underline";

  line.appendChild(link);
  block.appendChild(line);

  const terminal = document.getElementById("terminal");
  requestAnimationFrame(() => {
    terminal.scrollTop = terminal.scrollHeight;
  });
  return line;
}
