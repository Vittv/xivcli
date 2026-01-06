import { commands } from "./commands.js";
import {
  addToHistory,
  handleHistoryNavigation,
  handleAutocomplete
} from "./utils/helpers.js"

const output = document.getElementById("output");
const input = document.getElementById("command-input");
const terminal = document.getElementById("terminal");

input.addEventListener("keydown", (e) => {
  handleHistoryNavigation(e, input);

  if (e.key === "Tab") {
    const block = output.lastElementChild; // last block for printing suggestions
    handleAutocomplete(e, input, commands, addLineToBlock, block, terminal);
    return;
  }

  if (e.key === "Enter") {
    e.preventDefault();

    const raw = input.value.trim();
    if (!raw) return;

    addToHistory(raw);

    const block = addInputBlock(raw);

    const [cmd, ...args] = raw.split(/\s+/);
    const command = cmd.toLowerCase();

    if (commands[command]) {
      commands[command](block, args);
    } else {
      addLineToBlock(block, `${command}: command not found`);
    }

    input.value = "";

  }
});



function addInputBlock(command) {
  const blockWrapper = document.createElement("div");
  blockWrapper.className = "command-block";

  const promptDiv = document.createElement("div");
  const promptSpan = document.createElement("span");
  promptSpan.className = "prompt";
  promptSpan.textContent = "~ ";
  promptDiv.appendChild(promptSpan);
  blockWrapper.appendChild(promptDiv);

  const inputDiv = document.createElement("div");
  inputDiv.className = "input-container";

  const prefixSpan = document.createElement("span");
  prefixSpan.className = "input-prefix";
  prefixSpan.textContent = "> ";

  const commandSpan = document.createElement("span");
  commandSpan.textContent = command;
  commandSpan.style.color = "inherit";

  inputDiv.appendChild(prefixSpan);
  inputDiv.appendChild(commandSpan);
  blockWrapper.appendChild(inputDiv);

  output.appendChild(blockWrapper);

  return blockWrapper;
}

export function addLineToBlock(block, text) {
  const line = document.createElement("div");
  line.textContent = text;
  block.appendChild(line);

  // scroll to bottom after printing command output
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
  return line;
}
