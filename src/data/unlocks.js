const UNLOCK_DATA = {
  // current Unreal
  unreal: "https://ffxiv.consolegameswiki.com/wiki/Tsukuyomi's_Pain_(Unreal)",

  // current Savage Tier
  savage: {
    m9s: "https://ffxiv.consolegameswiki.com/wiki/AAC_Light-heavyweight_M1_(Savage)",
    m10s: "https://ffxiv.consolegameswiki.com/wiki/AAC_Light-heavyweight_M2_(Savage)",
    m11s: "https://ffxiv.consolegameswiki.com/wiki/AAC_Light-heavyweight_M3_(Savage)",
    m12s: "https://ffxiv.consolegameswiki.com/wiki/AAC_Light-heavyweight_M4_(Savage)",
  },

  // ultimates (permanent)
  ultimate: {
    uwu: "https://ffxiv.consolegameswiki.com/wiki/The_Weapon%27s_Refrain_(Ultimate)",
    ucob: "https://ffxiv.consolegameswiki.com/wiki/The_Unending_Coil_of_Bahamut_(Ultimate)",
    tea: "https://ffxiv.consolegameswiki.com/wiki/The_Epic_of_Alexander_(Ultimate)",
    dsr: "https://ffxiv.consolegameswiki.com/wiki/Dragonsong%27s_Reprise_(Ultimate)",
    top: "https://ffxiv.consolegameswiki.com/wiki/The_Omega_Protocol_(Ultimate)",
    fru: "https://ffxiv.consolegameswiki.com/wiki/Futures_Rewritten_(Ultimate)",
  },
};

export function getUnlockLink(query) {
  const q = query.toLowerCase();

  // direct unreal lookup
  if (q === "unreal") {
    return { links: [{ name: "Current Unreal", url: UNLOCK_DATA.unreal }] };
  }

  // all savage
  if (q === "savage") {
    return {
      links: Object.entries(UNLOCK_DATA.savage).map(([name, url]) => ({
        name: name.toUpperCase(),
        url,
      })),
    };
  }

  // specific savage
  if (UNLOCK_DATA.savage[q]) {
    return { links: [{ name: q.toUpperCase(), url: UNLOCK_DATA.savage[q] }] };
  }

  // all ultimates
  if (q === "ultimate") {
    return {
      links: Object.entries(UNLOCK_DATA.ultimate).map(([name, url]) => ({
        name: name.toUpperCase(),
        url,
      })),
    };
  }

  // specific ultimate
  if (UNLOCK_DATA.ultimate[q]) {
    return { links: [{ name: q.toUpperCase(), url: UNLOCK_DATA.ultimate[q] }] };
  }

  return null;
}
