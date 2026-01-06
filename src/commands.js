const commands = {
  help: function(block) {
    addLineToBlock(block, "commands:");

    const commandList = Object.keys(commands).sort();
    commandList.forEach(cmd => {
      addLineToBlock(block, ` ${cmd}`);
    });
  },

  clear: function() {
    const output = document.getElementById("output");
    output.replaceChildren();
  },
};
