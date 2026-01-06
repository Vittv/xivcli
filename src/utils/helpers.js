let history = [];
let historyIndex = -1;

export function addToHistory(command) {
  if (!command) return;

  // avoid duplicate consecutive entries
  if (history[history.length - 1] !== command) {
    history.push(command);
  }
  historyIndex = history.length;
}

export function handleHistoryNavigation(e, input) {
  if (history.length === 0) return;

  if (e.key === "ArrowUp") {
    e.preventDefault();
    historyIndex = Math.max(0, historyIndex - 1);
    input.value = history[historyIndex] ?? "";
  }

  if (e.key === "ArrowDown") {
    e.preventDefault();
    historyIndex = Math.min(history.length, historyIndex + 1);
    input.value = history[historyIndex] ?? "";
  }
}

export function handleAutocomplete(e, input, commands, addLineToBlock, block, terminal) {
  if (e.key !== "Tab") return;

  e.preventDefault();

  // Use the raw input value
  const rawValue = input.value; 

   let parts = rawValue.split(/\s+/).filter(p => p !== "");
    if (rawValue.endsWith(' ') && rawValue.trim() !== '') {
       parts.push("");
   }

  const current = parts[parts.length - 1]?.toLowerCase() || "";
  let matches = [];
  const command = parts[0]?.toLowerCase();

  if (parts.length === 1 && !rawValue.endsWith(' ')) {
    matches = Object.keys(commands).filter(cmd =>
      cmd.startsWith(current)
    );
  }

  if (command === "bis" && parts.length > 1) {
    const JOB_CODES = Object.keys(commands.bis.jobs || {});
    matches = JOB_CODES.filter(code => code.startsWith(current || ""));
  }

  applyAutocomplete(matches, input, current, addLineToBlock, block, terminal);
}

function applyAutocomplete(matches, input, current, addLineToBlock, block, terminal) {
  if (matches.length === 0) return;

  if (matches.length === 1) {
    // single match - autocomplete
    input.value = input.value.slice(0, -current.length) + matches[0];
    return;
  }

  // multiple matches - show all options (bash-style)
  addLineToBlock(block, matches.join("  "));

  // always scroll terminal when options are shown
  if (terminal) {
    requestAnimationFrame(() => {
      terminal.scrollTop = terminal.scrollHeight;
    });
  }
}

