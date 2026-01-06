const output = document.getElementById("output");
const input = document.getElementById("command-input");
const terminal = document.getElementById("terminal");

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    const command = input.value.trim();

    if (command) {
      const block = addInputBlock(command);
      
      // execute command
      if (commands[command]) {
        commands[command](block);
      } else {
        addLineToBlock(block, `${command}: command not found`);
      }

      input.value = "";
    }

    terminal.scrollTop = terminal.scrollHeight;
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

function addLineToBlock(block, text) {
  const line = document.createElement("div");
  line.textContent = text;
  block.appendChild(line);
}
