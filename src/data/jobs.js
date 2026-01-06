const BALANCE_BASE = "https://www.thebalanceffxiv.com/jobs";

export const JOB_DATA = {
  // Melee
  "drg": { role: "melee", name: "dragoon" },
  "mnk": { role: "melee", name: "monk" },
  "nin": { role: "melee", name: "ninja" },
  "sam": { role: "melee", name: "samurai" },
  "rpr": { role: "melee", name: "reaper" },
  "vpr": { role: "melee", name: "viper" },
  
  // Tanks
  "pld": { role: "tanks", name: "paladin" },
  "war": { role: "tanks", name: "warrior" },
  "drk": { role: "tanks", name: "dark-knight" },
  "gnb": { role: "tanks", name: "gunbreaker" },
  
  // Healers
  "whm": { role: "healers", name: "white-mage" },
  "sch": { role: "healers", name: "scholar" },
  "ast": { role: "healers", name: "astrologian" },
  "sge": { role: "healers", name: "sage" },
  
  // Ranged
  "brd": { role: "ranged", name: "bard" },
  "mch": { role: "ranged", name: "machinist" },
  "dnc": { role: "ranged", name: "dancer" },
  
  // Casters
  "blm": { role: "casters", name: "black-mage" },
  "smn": { role: "casters", name: "summoner" },
  "rdm": { role: "casters", name: "red-mage" },
  "pct": { role: "casters", name: "pictomancer" }
};

export function getBisLink(jobCode) {
  const job = JOB_DATA[jobCode];
  if (!job) return null;
  return `${BALANCE_BASE}/${job.role}/${job.name}/best-in-slot/`;
}
