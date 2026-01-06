import { getBisLink, JOB_DATA } from "./data/jobs.js";
import { addLineToBlock, addLinkToBlock } from "./terminal.js";

export const commands = {
  help: function(block) {
    addLineToBlock(block, "commands:");

    const commandList = Object.keys(commands).sort();
    commandList.forEach(cmd => {
      const desc = commands[cmd].description || "No description";
      addLineToBlock(block, ` ${cmd.padEnd(10)} - ${desc}`);
    });
  },

  clear: function() {
    const output = document.getElementById("output");
    output.replaceChildren();
  },

  bis: function(block, args = []) {
    if (args.length === 0) {
      addLineToBlock(block, "Available BIS links:");
      Object.keys(JOB_DATA)
        .sort()
        .forEach(code => {
          const link = getBisLink(code);
          addLinkToBlock(block, link, `${code.padEnd(4)} - `);
        });
      return;
    }
    
    const jobCode = args[0].toLowerCase();
    const link = getBisLink(jobCode);
    if (!link) {
      addLineToBlock(block, `Unknown job: ${jobCode}`);
      addLineToBlock(block, "Use bis (job)");
      return;
    }
    addLinkToBlock(block, link);
  },

  news: function(block) {
    addLineToBlock(block, "Fetching latest news...");
    
    fetch('https://lodestonenews.com/news/topics')
      .then(res => res.json())
      .then(data => {
        data.slice(0, 5).forEach(item => {
          console.log(data);
          // format date
          const date = new Date(item.time);
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
          });
          const dateLine = addLineToBlock(block, `  ${formattedDate}`);
          dateLine.classList.add("news-date");
          const titleLine = addLineToBlock(block, `• ${item.title}`);
          titleLine.classList.add("news-title");
          const linkLine = addLinkToBlock(block, ` ${item.url}`)
          linkLine.classList.add("news-link");
        });
      })
      .catch(err => {
        addLineToBlock(block, `Error: ${err.message}`);
      });
  },
};

commands.help.description = "Shows every available command";
commands.clear.description = "Clears the terminal";
commands.bis.description = "Shows BIS link for a job (e.g. bis drg)";
commands.news.description = "Fetch latest news from Lodestone"

commands.bis.jobs = JOB_DATA;
