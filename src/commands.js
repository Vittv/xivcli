import { getBisLink, JOB_DATA } from "./data/jobs.js";
import { getUnlockLink } from "./data/unlocks.js";
import { addLineToBlock, addLinkToBlock } from "./terminal.js";

export const commands = {
  help: function(block) {
    addLineToBlock(block, "Commands:");
    addLineToBlock(block, "");
    
    const commandList = Object.keys(commands).sort();
    
    // find longest command name for padding
    const maxLength = Math.max(...commandList.map(cmd => cmd.length));
    
    commandList.forEach(cmd => {
      const desc = commands[cmd].description || "No description";
      
      // create line with separate styling
      const line = document.createElement("div");
      line.style.display = "flex";
      line.style.gap = "1rem";
      
      const cmdSpan = document.createElement("span");
      cmdSpan.textContent = cmd;
      cmdSpan.style.color = "var(--vague-yellow)";
      cmdSpan.style.fontWeight = "bold";
      cmdSpan.style.minWidth = `${maxLength + 2}ch`; // ch = character width
      cmdSpan.style.display = "inline-block";      
      const descSpan = document.createElement("span");
      descSpan.textContent = `- ${desc}`;
      
      line.appendChild(cmdSpan);
      line.appendChild(descSpan);
      block.appendChild(line);
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

  news: function(block, args = []) {
    const count = args[0] ? parseInt(args[0]) : 5;
    addLineToBlock(block, "Fetching latest news...");
    
    fetch('https://lodestonenews.com/news/topics')
      .then(res => res.json())
      .then(data => {
        data.slice(0, count).forEach(item => {
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
  reset: function(block) {
    const now = new Date();
    
    // daily reset: always 15:00 UTC
    const dailyReset = new Date(now);
    dailyReset.setUTCHours(15, 0, 0, 0);
    if (now >= dailyReset) {
      dailyReset.setUTCDate(dailyReset.getUTCDate() + 1);
    }
    
    // weekly reset: Tuesday 9:00 UTC
    const weeklyReset = new Date(now);
    weeklyReset.setUTCHours(9, 0, 0, 0);
    
    // calculate days until next Tuesday
    const currentDay = now.getUTCDay();
    const daysUntilTuesday = currentDay < 2
      ? 2 - currentDay
      : 9 - currentDay;
    
    weeklyReset.setUTCDate(now.getUTCDate() + daysUntilTuesday);
    
    // if it's Tuesday but past reset time, add 7 days
    if (currentDay === 2 && now.getUTCHours() >= 13) {
      weeklyReset.setUTCDate(weeklyReset.getUTCDate() + 7);
    }
    
    const dailyMs = dailyReset - now;
    const weeklyMs = weeklyReset - now;
    
    const formatTime = (ms) => {
      const hours = Math.floor(ms / (1000 * 60 * 60));
      const mins = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${mins}m`;
    };
    
    const dailyLocal = dailyReset.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    
    const weeklyLocal = weeklyReset.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    addLineToBlock(block, "Reset Times:");
    addLineToBlock(block, `Daily reset in: ${formatTime(dailyMs)}`);
    addLineToBlock(block, `Weekly reset in: ${formatTime(weeklyMs)}`);
    addLineToBlock(block, "");
    addLineToBlock(block, `Daily: ${dailyLocal} | Weekly: Tuesday ${weeklyLocal} (${timezone})`);
  },
  greeter: function(block) {
    // ASCII art
    const ascii = `
    ██╗  ██╗██╗██╗   ██╗  ██████╗██╗     ██╗
    ╚██╗██╔╝██║██║   ██║ ██╔════╝██║     ██║
     ╚███╔╝ ██║██║   ██║ ██║     ██║     ██║
     ██╔██╗ ██║╚██╗ ██╔╝ ██║     ██║     ██║
    ██╔╝ ██╗██║ ╚████╔╝  ╚██████╗███████╗██║
    ╚═╝  ╚═╝╚═╝  ╚═══╝    ╚═════╝╚══════╝╚═╝
    `;
    
    // add ASCII art
    const pre = document.createElement("pre");
    pre.textContent = ascii;
    pre.style.color = "var(--vague-cyan)";
    pre.style.margin = "0";
    pre.style.lineHeight = "1.2";
    block.appendChild(pre);
    
    addLineToBlock(block, "");
    addLineToBlock(block, "Welcome to xivcli!");
    addLineToBlock(block, "");

    // call news command with 3 items
    commands.news(block, ["3"]);
  
    addLineToBlock(block, "");
    const helpLine = addLineToBlock(block, "Type 'help' to see all available commands!!");
    helpLine.style.color = "var(--vague-purple)";
    helpLine.style.fontWeight = "bold";
  },
  unlock: function(block, args = []) {
    if (args.length === 0) {
      addLineToBlock(block, "Usage: unlock [content]");
      addLineToBlock(block, "");
      addLineToBlock(block, "Categories:");
      addLineToBlock(block, "  unreal  - Current unreal trial");
      addLineToBlock(block, "  savage  - All current savage fights");
      addLineToBlock(block, "  ultimate - All ultimate fights");
      addLineToBlock(block, "");
      addLineToBlock(block, "Specific:");
      addLineToBlock(block, "  m9s, m10s, m11s, m12s");
      addLineToBlock(block, "  uwu, ucob, tea, dsr, top, fru");
      return;
    }
    
    const query = args[0].toLowerCase();
    const result = getUnlockLink(query);
    
    if (!result) {
      addLineToBlock(block, `Unknown content: ${query}`);
      addLineToBlock(block, "Use 'unlock' with no args to see options");
      return;
    }
    
    addLineToBlock(block, "");
    
    result.links.forEach(({ name, url }) => {
      addLinkToBlock(block, url, `${name} - `);
    });
  },
};

commands.help.description = "Show every available command";
commands.clear.description = "Clears the terminal";
commands.bis.description = "Show BIS link for a job (e.g. bis drg)";
commands.news.description = "Fetch latest news from Lodestone";
commands.reset.description = "Daily and weekly reset timer";
commands.greeter.description = "Welcome message with latest news";
commands.unlock.description = "Unlock guides for duties";

commands.bis.jobs = JOB_DATA;
