import { commands } from "./commands.js";
import { addLineToBlock, addLinkToBlock } from "./utils/terminalHelpers.js";
import {
  addToHistory,
  handleHistoryNavigation,
  handleAutocomplete,
} from "./utils/helpers.js";

export function init() {
  const output = document.getElementById("output");
  const input = document.getElementById("command-input");
  const terminal = document.getElementById("terminal");

  input.addEventListener("keydown", (e) => {
    handleHistoryNavigation(e, input);
    if (e.key === "Tab") {
      const block = output.lastElementChild;
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

  // Greet the user on load
  const greetBlock = document.createElement("div");
  greetBlock.className = "command-block";
  output.appendChild(greetBlock);
  commands.greeter(greetBlock);
}
