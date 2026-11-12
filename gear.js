const GEAR_STORAGE_KEY = "lightbind-shockadin-gear-v1";
const GUIDE_STORAGE_KEY = "lightbind-shockadin-guide-v1";
const ROADMAP_STORAGE_KEY = "lightbind-retribution-roadmap-v2";
const ICON_ROOT = "./assets/icons/";

const QUEST_CHAINS = {
  songstone: [
    questStep("The Smoldering Ruins of Thaurissan I", "Royal Historian Archesonus · Ironforge (38.4, 55.3)", "Listen to Archesonus and accept the follow-up that sends you to the Burning Steppes."),
    questStep("The Smoldering Ruins of Thaurissan II", "Royal Historian Archesonus · Ironforge (38.4, 55.3)", "Inspect 12 Thaurissan Relics in the Burning Steppes, then return to Archesonus."),
    questStep("Kharan Mighthammer", "King Magni · Ironforge (39.1, 56.2)", "Find Kharan in the BRD detention block. High Interrogator Gerstahn holds the prison key."),
    questStep("Kharan’s Tale", "Kharan Mighthammer · BRD detention block", "Listen to Kharan’s story and speak to him again."),
    questStep("The Bearer of Bad News", "Kharan Mighthammer · BRD → King Magni · Ironforge", "Carry Kharan’s news back to King Magni."),
    questStep("The Fate of the Kingdom", "King Magni · Ironforge (39.1, 56.2)", "Defeat Emperor Dagran Thaurissan in BRD while keeping Princess Moira alive, then speak to her."),
    questStep("The Princess’s Surprise", "Princess Moira · BRD → King Magni · Ironforge", "Return to King Magni and select Songstone of Ironforge."),
  ],
  "ice-barbed-spear": [
    questStep("The Battle of Alterac", "Prospector Stonehewer · Alterac Mountains (40.6, 79.6)", "Enter Alterac Valley and defeat Drek’Thar by winning the battleground, then return to Stonehewer."),
    questStep("Hero of the Stormpike", "Prospector Stonehewer · Alterac Mountains (40.6, 79.6)", "Accept the immediate follow-up and select Ice Barbed Spear."),
  ],
  "infernal-lasso": [
    questStep("The Burning Beast", "Weathered Etching · original location Searing Gorge (24, 36)", "Inspect the etching and find Bloodmage Lynnore in the Blasted Lands. Forever’s current starting-object location remains unconfirmed."),
    questStep("Chains That Bind", "Bloodmage Lynnore · Blasted Lands (50.6, 14.5)", "Collect 5 Infernal Chain Links from Shadowsworn mobs around (61, 40), then return to Lynnore."),
    questStep("Brought to Heel", "Bloodmage Lynnore · Blasted Lands (50.6, 14.5)", "Find Calefactus around (47, 48), weaken him, use the provided lasso, loot Fel Lifeblood, and return to Lynnore."),
  ],
  "blood-martyr": [
    questStep("Medallion of Faith", "Chest · living-side Stratholme", "Loot the Medallion of Faith from its chest."),
    questStep("Aurius", "Alonsus Chapel · Stratholme", "Give the Medallion of Faith to Aurius before fighting Baron Rivendare."),
    questStep("Baron Rivendare", "Undead-side Stratholme", "Defeat Baron Rivendare, then speak to Aurius and collect Blood of the Martyr."),
  ],
  "archlight-talisman": [
    questStep("Little Pamela", "Marlene Redpath · Western Plaguelands", "Travel to the ruins of Darrowshire in the Eastern Plaguelands and find Pamela Redpath."),
    questStep("Pamela’s Doll", "Pamela Redpath · Darrowshire (31.2, 78.0)", "Recover the three doll pieces around Darrowshire and return the restored doll to Pamela."),
    questStep("Auntie Marlene", "Pamela Redpath · Darrowshire", "Speak with Marlene Redpath near Sorrow Hill in the Western Plaguelands."),
    questStep("A Strange Historian", "Marlene Redpath · Western Plaguelands", "Find Chromie inside the ruined inn at Andorhal."),
    questStep("The Annals of Darrowshire", "Chromie · Andorhal", "Recover the Annals of Darrowshire from the ruined Andorhal town hall and return to Chromie."),
    questStep("Brother Carlin", "Chromie · Andorhal → Carlin Redpath · Light’s Hope Chapel", "Carry Chromie’s information to Carlin Redpath at Light’s Hope Chapel."),
    questStep("Heroes of Darrowshire", "Carlin Redpath · Light’s Hope Chapel", "Recover Davil’s Libram and Redpath’s Shield, then return them to Carlin."),
    questStep("Marauders of Darrowshire", "Carlin Redpath · Light’s Hope Chapel", "Collect the required Darrowshire relics from Scourge forces in the Eastern Plaguelands."),
    questStep("Return to Chromie", "Carlin Redpath · Light’s Hope Chapel → Chromie · Andorhal", "Bring the assembled relics back to Chromie."),
    questStep("The Battle of Darrowshire", "Chromie · Andorhal", "Use the relic bundle in Darrowshire, complete the battle event, and speak with Joseph Redpath."),
    questStep("Hidden Treasures", "Pamela Redpath · Darrowshire (31.2, 78.0)", "Use Joseph’s Key on Joseph’s Chest behind the house at (30.9, 77.8) and collect Archlight Talisman."),
  ],
};

const SET_BONUS_RULES = {
  "Lieutenant Commander's Vindication": [
    { pieces: 2, label: "2p: +23 Spell Damage/Healing", stats: { spellDamage: 23, healing: 23 } },
    { pieces: 4, label: "4p: −10 sec Hammer of Justice cooldown" },
    { pieces: 6, label: "6p: +20 Stamina", stats: { stamina: 20 } },
  ],
  "Lightforge Armor": [
    { pieces: 2, label: "2p: +8 All Resistances", stats: { resistance: 8 } },
    { pieces: 3, label: "3p: +18 Spell Damage/Healing", stats: { spellDamage: 18, healing: 18 } },
    { pieces: 4, label: "4p: 7% spell-silence retaliation" },
    { pieces: 5, label: "5p: chance to gain +65 Spell Damage/Healing" },
    { pieces: 6, label: "6p: +8 Mana per 5 sec", stats: { mp5: 8 } },
  ],
};

const SUMMARY_STATS = [
  ["armor", "Armor"],
  ["strength", "Strength"],
  ["agility", "Agility"],
  ["stamina", "Stamina"],
  ["intellect", "Intellect"],
  ["spirit", "Spirit"],
  ["hit", "Hit Chance"],
  ["criticalStrike", "Critical Strike Chance"],
  ["spellDamage", "Spell Damage"],
  ["healing", "Healing"],
  ["spellPenetration", "Spell Penetration"],
  ["mp5", "Mana / 5 sec"],
  ["resistance", "All Resistances"],
];

const PVP_RANKS = [
  "No rank",
  "Private",
  "Corporal",
  "Sergeant",
  "Master Sergeant",
  "Sergeant Major",
  "Knight",
  "Knight-Lieutenant",
  "Knight-Captain",
  "Knight-Champion",
  "Lieutenant Commander",
  "Commander",
  "Marshal",
  "Field Marshal",
  "Grand Marshal",
];

const ROADMAP_ACTIONS = [
  roadmapAction("greater-insignia", "Greater Insignia of the Alliance", "purchase", 1, {
    minRank: 2, honor: 5250, rewardId: "greater-insignia-alliance",
    reason: "Your essential crowd-control break and first rank reward.",
  }),
  roadmapAction("pvp-cloak", "Premier Sergeant's Cloak", "purchase", 55, {
    minRank: 3, rewardId: "sergeant-cape",
    reason: "Deterministic PvP cloak with +8 to every primary stat.",
  }),
  roadmapAction("base-wrists", "Premier Chevalier Armsplints", "purchase", 55, {
    honor: 4500, marks: { wsg: 10 },
    reason: "Buy the rare base early; it is required for the Rank 8 epic wrist upgrade.",
  }),
  roadmapAction("base-belt", "Premier Chevalier Cinch", "purchase", 55, {
    honor: 6000, marks: { ab: 10 },
    reason: "Buy the rare base early; it is required for the Rank 8 epic belt upgrade.",
  }),
  roadmapAction("base-boots", "Premier Chevalier Sabatons", "purchase", 55, {
    honor: 7500, marks: { darkspear: 10 },
    reason: "Required for the Rank 9 epic boots.",
  }),
  roadmapAction("base-gloves", "Premier Chevalier Gauntlets", "purchase", 55, {
    honor: 7500, marks: { wsg: 10 }, rewardId: "vindication-hands",
    reason: "Combines with boots for the Vindication 2-piece bonus.",
  }),
  roadmapAction("base-shoulders", "Premier Chevalier Shoulders", "purchase", 55, {
    honor: 6350, marks: { ab: 10 }, rewardId: "vindication-shoulders",
    reason: "Low-cost set piece on the path to Vindication 4-piece.",
  }),
  roadmapAction("base-legs", "Premier Chevalier Leggings", "purchase", 55, {
    honor: 9000, marks: { wsg: 15 }, rewardId: "vindication-legs",
    reason: "High-value set piece that helps complete the PvP 4-piece.",
  }),
  roadmapAction("base-head", "Premier Chevalier Headguard", "purchase", 55, {
    honor: 9000, marks: { av: 15 }, rewardId: "vindication-head",
    reason: "Later set purchase; collect AV Marks while completing the spear quest.",
  }),
  roadmapAction("base-chest", "Premier Chevalier Breastplate", "purchase", 55, {
    honor: 9350, marks: { ab: 15 }, rewardId: "vindication-chest",
    reason: "Finish the six-piece set after the cheaper breakpoints.",
  }),
  roadmapAction("seal-wrists", "Epic Chevalier wrist upgrade", "purchase", 60, {
    minRank: 8, honor: 1125, dependsOn: ["base-wrists"], rewardId: "epic-vindication-wrists",
    reason: "Rank 8 seal converts the rare Armsplints into epic Armguards.",
  }),
  roadmapAction("seal-belt", "Epic Chevalier belt upgrade", "purchase", 60, {
    minRank: 8, honor: 1500, dependsOn: ["base-belt"], rewardId: "epic-vindication-waist",
    reason: "Rank 8 seal converts the rare Cinch into the epic PvP belt.",
  }),
  roadmapAction("seal-boots", "Epic Chevalier boots upgrade", "purchase", 60, {
    minRank: 9, honor: 1500, dependsOn: ["base-boots"], rewardId: "epic-vindication-boots",
    reason: "Rank 9 seal upgrades the boots while preserving mixed-set counting.",
  }),
  roadmapAction("seal-gloves", "Epic Chevalier gloves upgrade", "purchase", 60, {
    minRank: 10, honor: 2250, dependsOn: ["base-gloves"],
    reason: "Rank 10 upgrade; prioritize it once raids are open.",
  }),
  roadmapAction("archlight", "Hidden Treasures — Archlight Talisman", "quest", 50, {
    rewardId: "archlight-talisman", reason: "Begin the Pamela/Darrowshire chain while leveling through the Plaguelands.",
  }),
  roadmapAction("infernal-lasso-quest", "Brought to Heel — Infernal Lasso", "quest", 45, {
    rewardId: "infernal-lasso", optional: true,
    reason: "Do this opportunistically; the live starting-object location remains uncertain.",
  }),
  roadmapAction("ice-spear", "Hero of the Stormpike — Ice Barbed Spear", "quest", 51, {
    rewardId: "ice-barbed-spear", reason: "Take the quest before AV so a rank-cap win also awards your weapon.",
  }),
  roadmapAction("songstone", "The Princess's Surprise — Songstone", "quest", 52, {
    rewardId: "songstone-ironforge", reason: "Complete the BRD princess chain during your leveling dungeon route.",
  }),
  roadmapAction("blood-martyr-quest", "Aurius / Baron Rivendare — Blood of the Martyr", "dungeon", 58, {
    rewardId: "blood-martyr", group: "Stratholme",
    reason: "Complete the Aurius event while running Baron Rivendare and select the ring reward.",
  }),
  roadmapAction("stalwart-helm-craft", "Craft Stalwart Helm", "craft", 56, {
    rewardId: "stalwart-helm",
    reason: "Plate-only raid headpiece with 2% Hit and 38 Spell Power.",
  }),
  roadmapAction("arcanoweave-cloak-roadmap", "Buy Arcanoweave Cloak", "currency", 60, {
    rewardId: "arcanoweave-cloak",
    reason: "Undermine vendor cloak adds the final 1% Hit plus 16 Spell Power without replacing plate armor.",
  }),
  roadmapAction("lightforge-belt-buy", "Buy Lightforge Belt", "market", 53, {
    rewardId: "lightforge-belt", reason: "Prefer the BoE belt from the Auction House over prolonged trash farming.",
  }),
  roadmapAction("briarwood", "UBRS — Briarwood Reed", "dungeon", 59, {
    rewardId: "briarwood-reed", group: "UBRS",
    reason: "Check for Jed Runewatcher on every UBRS run; this is the first dungeon priority.",
  }),
  roadmapAction("lightforge-shoulders", "UBRS — Lightforge Spaulders", "dungeon", 59, {
    rewardId: "lightforge-spaulders", group: "UBRS",
    reason: "The Beast drop and one of the three efficient Lightforge pieces.",
  }),
  roadmapAction("lightforge-chest", "UBRS — Lightforge Breastplate", "dungeon", 59, {
    rewardId: "lightforge-breastplate", group: "UBRS",
    reason: "Drakkisath drop that completes the efficient Lightforge 3-piece.",
  }),
  roadmapAction("draconic", "UBRS — Draconic Infused Emblem", "dungeon", 59, {
    rewardId: "draconic-emblem", group: "UBRS",
    reason: "Farm alongside the Lightforge chest; equip it immediately if it drops first.",
  }),
  roadmapAction("libram-law-roadmap", "Libram of Law", "currency", 60, {
    rewardId: "libram-law",
    reason: "Shared PvP and pre-raid relic target from Undermine after the core armor and trinket goals.",
  }),
];

const CORE_PRE_RAID_PRIORITY = [
  "briarwood",
  "stalwart-helm-craft",
  "arcanoweave-cloak-roadmap",
  "lightforge-belt-buy",
  "lightforge-shoulders",
  "lightforge-chest",
  "draconic",
];

const PVP_CONSUMABLES = [
  consumable("pvp-major-healing-draught", "Major Healing Draught", "BG recovery", "./assets/icons/forever-134818.png", "Requires Level 45 · Use: Restores 980 to 1,260 health · Battlegrounds only · 5 Min Cooldown", "PvP quartermaster"),
  consumable("pvp-major-mana-draught", "Major Mana Draught", "BG recovery", "./assets/icons/forever-134860.png", "Requires Level 45 · Use: Restores 980 to 1,260 mana · Battlegrounds only · 5 Min Cooldown", "PvP quartermaster"),
  consumable("pvp-major-healing-potion", "Major Healing Potion", "Macro fallback", "./assets/icons/forever-134834.png", "Requires Level 45 · Use: Restores 1,050 to 1,750 health · Normal-world fallback for the smart healing macro · 2 Min Cooldown", "Alchemy"),
  consumable("pvp-major-mana-potion", "Major Mana Potion", "Macro fallback", "./assets/icons/forever-134856.png", "Requires Level 49 · Use: Restores 1,350 to 2,250 mana · Normal-world fallback for the smart mana macro · 2 Min Cooldown", "Alchemy"),
  consumable("pvp-major-rejuvenation", "Major Rejuvenation Potion", "Optional recovery", "inv_potion_47", "Requires Level 50 · Use: Restores 1,440 to 1,760 health and mana · Expensive combined emergency option · 2 Min Cooldown", "Alchemy"),
  consumable("pvp-healthstone", "Major Healthstone", "Separate recovery", "./assets/icons/forever-135230.png", "Use: Restores 1,440 health · Separate from the potion cooldown · 2 Min Cooldown", "Warlock"),
  consumable("pvp-living-action", "Living Action Potion", "CC break", "inv_potion_07", "Requires Level 47 · Use: Removes stun and movement-impairing effects and grants immunity to them for 5 sec · 2 Min Cooldown", "Alchemy"),
  consumable("pvp-bandage", "Heavy Runecloth Bandage", "First Aid", "inv_misc_bandage_12", "Use: Heals 2,000 health over 8 sec · Damage interrupts the channel and applies Recently Bandaged", "First Aid"),
  consumable("pvp-thorium-grenade", "Thorium Grenade", "Engineering", "inv_misc_bomb_08", "Requires Engineering 260 · Use: Deals 300 to 500 Fire damage and stuns for 3 sec in a 3-yard radius · 1 Min Cooldown", "Engineering"),
  consumable("pvp-arcane-bomb", "Arcane Bomb", "Engineering · niche", "spell_shadow_mindbomb", "Requires Engineering 300 · Use: Burns 675 to 1,125 mana, deals half the mana drained as damage, and silences for 5 sec · 1 Min Cooldown", "Engineering"),
  consumable("pvp-protection-potions", "Greater Protection Potions", "Matchup choice", "inv_potion_54", "Use: Absorbs 1,950 to 3,250 damage from the selected magic school · Carry Fire, Frost, Nature, Shadow, Holy, and Arcane as needed · Shares the potion cooldown", "Alchemy"),
];

const RAID_CONSUMABLES = [
  consumable("raid-natural-accuracy", "Flask of Natural Accuracy", "Raid flask", "inv_potion_76", "Use: Grants +60 Stamina and +5% Hit Chance in Mount Hyjal, Hyjal Summit, and Barrow Deeps · Persists through death · Only one flask", "Alchemy"),
  consumable("raid-grizzly", "Elixir of the Grizzly", "Primary elixir", "inv_potione_6", "Requires Level 55 · Use: Grants +25 Strength and +2% Critical Strike Chance for 30 min", "Alchemy"),
  consumable("raid-firewater", "Distilled Firewater", "Attack power", "inv_potione_6", "Requires Level 45 · Use: Grants +35 melee Attack Power for 20 min · Does not stack with Winterfall Firewater", "Alchemy"),
  consumable("raid-dumplings", "Smoked Desert Dumplings", "Well Fed", "inv_misc_food_64", "Use: Grants +20 Strength for 15 min after eating · Replaces other Well Fed buffs", "Cooking"),
  consumable("raid-chili", "Dragonbreath Chili", "Extra food proc", "inv_misc_food_62", "Use: Occasionally breathes fire at enemies · Scales with Spell Power · Stacks with a Well Fed food", "Cooking"),
  consumable("raid-spellblasting", "Major Spellblasting Potion", "Combat potion", "inv_potione_6", "Requires Level 55 · Use: Grants +47 Spell Damage for 30 sec · Use this as the single offensive potion for the Holy-heavy Seal of Righteousness build · Shares the potion cooldown", "Alchemy"),
  consumable("raid-mana", "Major Mana Potion", "Recovery", "./assets/icons/forever-134856.png", "Requires Level 49 · Use: Restores 1,350 to 2,250 mana · 2 Min Cooldown", "Alchemy"),
  consumable("raid-healing", "Major Healing Potion", "Recovery", "./assets/icons/forever-134834.png", "Requires Level 45 · Use: Restores 1,050 to 1,750 health · 2 Min Cooldown", "Alchemy"),
  consumable("raid-rejuvenation", "Major Rejuvenation Potion", "Combined recovery", "inv_potion_47", "Requires Level 50 · Use: Restores 1,440 to 1,760 health and mana · 2 Min Cooldown", "Alchemy"),
  consumable("raid-healthstone", "Major Healthstone", "Separate recovery", "./assets/icons/forever-135230.png", "Use: Restores 1,440 health · Separate from the potion cooldown · 2 Min Cooldown", "Warlock"),
  consumable("raid-wizard-oil", "Brilliant Wizard Oil", "Weapon coating", "inv_potion_100", "Requires Level 45 · Use: Adds +36 Spell Damage and Healing and +1% Spell Critical Strike Chance to a weapon for 30 min · Stacks with the weapon's permanent enchant · Planned coating for the Holy-heavy Seal of Righteousness build", "Enchanting"),
  consumable("raid-protection-potions", "Greater Protection Potions", "Encounter-specific", "inv_potion_54", "Use: Absorbs 1,950 to 3,250 damage from the selected magic school · Bring the school required by the encounter · Shares the potion cooldown", "Alchemy"),
  consumable("raid-thorium-grenade", "Thorium Grenade", "Engineering · control", "inv_misc_bomb_08", "Requires Engineering 260 · Use: Deals 300 to 500 Fire damage and stuns for 3 sec in a 3-yard radius · Useful on stunnable trash · 1 Min Cooldown", "Engineering"),
  consumable("raid-sapper", "Goblin Sapper Charge", "Engineering · AoE", "spell_fire_selfdestruct", "Requires Engineering 205 · Use: Deals 450 to 750 Fire damage around you and 375 to 625 damage to you · No targeting reticle · 5 Min Cooldown", "Engineering"),
  consumable("raid-repair-bot", "Field Repair Bot 74A", "Engineering · raid utility", "inv_misc_enggizmos_03", "Requires Engineering 300 · Use: Deploys a repair and vendor bot for the raid for 10 min · Consumed on use", "Engineering"),
  consumable("raid-bandage", "Heavy Runecloth Bandage", "Emergency", "inv_misc_bandage_12", "Use: Heals 2,000 health over 8 sec · Damage interrupts the channel and applies Recently Bandaged", "First Aid"),
];

const PVP_CONSUMABLE_GROUPS = [
  {
    title: "Recovery",
    note: "Battleground draughts, macro fallbacks, and separate recovery",
    ids: [
      "pvp-major-healing-draught", "pvp-major-mana-draught",
      "pvp-major-healing-potion", "pvp-major-mana-potion",
      "pvp-major-rejuvenation", "pvp-healthstone", "pvp-bandage",
    ],
  },
  {
    title: "Defensive utility",
    note: "Choose according to enemy control and damage schools",
    ids: ["pvp-living-action", "pvp-protection-potions"],
  },
  {
    title: "Engineering",
    note: "Control tools sharing the Engineering explosive cooldown",
    ids: ["pvp-thorium-grenade", "pvp-arcane-bomb"],
  },
];

const RAID_CONSUMABLE_GROUPS = [
  {
    title: "Persistent raid buffs",
    note: "Refresh after expiration; the flask persists through death",
    ids: ["raid-natural-accuracy", "raid-grizzly", "raid-firewater", "raid-dumplings", "raid-chili"],
  },
  {
    title: "Damage consumables",
    note: "Spellblasting is the single planned offensive potion",
    ids: ["raid-spellblasting"],
  },
  {
    title: "Weapon coating",
    note: "Use Brilliant Wizard Oil for the Holy-heavy build",
    ids: ["raid-wizard-oil"],
  },
  {
    title: "Recovery and protection",
    note: "Potion choices share a cooldown; Healthstone remains separate",
    ids: [
      "raid-mana", "raid-healing", "raid-rejuvenation",
      "raid-healthstone", "raid-protection-potions", "raid-bandage",
    ],
  },
  {
    title: "Engineering raid kit",
    note: "Trash control, burst AoE, and group repair utility",
    ids: ["raid-thorium-grenade", "raid-sapper", "raid-repair-bot"],
  },
];

const CONSUMABLE_LOCKOUTS = {
  "pvp-major-healing-draught": lockout("BG DRAUGHT · SHARED 5M", "draught"),
  "pvp-major-mana-draught": lockout("BG DRAUGHT · SHARED 5M", "draught"),
  "pvp-major-healing-potion": lockout("POTION · SHARED 2M", "potion"),
  "pvp-major-mana-potion": lockout("POTION · SHARED 2M", "potion"),
  "pvp-major-rejuvenation": lockout("POTION · SHARED 2M", "potion"),
  "pvp-healthstone": lockout("HEALTHSTONE · SEPARATE 2M", "separate"),
  "pvp-living-action": lockout("POTION · SHARED 2M", "potion"),
  "pvp-bandage": lockout("BANDAGE · 60S LOCKOUT", "separate"),
  "pvp-thorium-grenade": lockout("EXPLOSIVE · SHARED 1M", "engineering"),
  "pvp-arcane-bomb": lockout("EXPLOSIVE · SHARED 1M", "engineering"),
  "pvp-protection-potions": lockout("POTION · SHARED 2M", "potion"),
  "raid-natural-accuracy": lockout("FLASK · ONE ACTIVE", "buff"),
  "raid-grizzly": lockout("ELIXIR · 3S", "buff"),
  "raid-firewater": lockout("FIREWATER · 1M", "buff"),
  "raid-dumplings": lockout("WELL FED · ONE ACTIVE", "buff"),
  "raid-chili": lockout("FOOD PROC · STACKS", "separate"),
  "raid-spellblasting": lockout("POTION · SHARED 2M", "potion"),
  "raid-mana": lockout("POTION · SHARED 2M", "potion"),
  "raid-healing": lockout("POTION · SHARED 2M", "potion"),
  "raid-rejuvenation": lockout("POTION · SHARED 2M", "potion"),
  "raid-healthstone": lockout("HEALTHSTONE · SEPARATE 2M", "separate"),
  "raid-wizard-oil": lockout("WEAPON COATING · 30M", "weapon"),
  "raid-protection-potions": lockout("POTION · SHARED 2M", "potion"),
  "raid-thorium-grenade": lockout("EXPLOSIVE · SHARED 1M", "engineering"),
  "raid-sapper": lockout("EXPLOSIVE · 1M SHARED / 5M SELF", "engineering"),
  "raid-repair-bot": lockout("DEVICE · 10M", "engineering"),
  "raid-bandage": lockout("BANDAGE · 60S LOCKOUT", "separate"),
};

const leftSlots = [
  slot("head", "Head", "inv_helmet_05", [
    item("vindication-head", "Premier Chevalier Headguard", "PvP · Level 55 · Honor + Marks", {
      itemId: 272743,
      icon: "./assets/icons/item-272743.jpg",
      quality: "Rare",
      enchant: enchant("BUDGET", "Lesser Arcanum of Constitution · +100 Health", "budget"),
      tooltip: vindicationTooltip("509 Armor · +25 Stamina · +11 Strength · +7 Intellect · +7 Critical Strike · +7 Spell Power"),
    }),
  ]),
  slot("neck", "Neck", "inv_jewelry_necklace_01", [
    item("archlight-talisman", "Archlight Talisman", "Hidden Treasures quest", {
      itemId: 15856,
      icon: "inv_jewelry_necklace_11",
      quality: "Rare",
      enchant: enchant("FINAL", "Necklace Spell Power · +6 Spell Power", "final", "Necklace Strength · +5 Strength"),
      tooltip: "Item Level 60 · Binds when picked up · Neck · +8 Stamina · +10 Intellect · +12 Spell Power",
    }),
  ]),
  slot("shoulders", "Shoulders", "inv_shoulder_01", [
    item("vindication-shoulders", "Premier Chevalier Shoulders", "PvP · Level 55 · Honor + Marks", {
      itemId: 272745,
      icon: "./assets/icons/item-272745.jpg",
      quality: "Rare",
      tooltip: vindicationTooltip("470 Armor · +19 Stamina · +11 Strength · +5 Intellect · +7 Spell Power"),
    }),
  ]),
  slot("back", "Back", "inv_misc_cape_20", [
    item("sergeant-cape", "Premier Sergeant's Cloak", "PvP · Rank 3", {
      itemId: 272698,
      icon: "inv_misc_cape_21",
      quality: "Rare",
      enchant: enchant("BUDGET", "+3 Agility", "budget"),
      tooltip: "Item Level 60 · Binds when picked up · Back · 43 Armor · +8 Strength · +8 Agility · +8 Stamina · +8 Intellect · +8 Spirit · Requires Level 55 · Requires Sergeant (Rank 3)",
    }),
  ]),
  slot("chest", "Chest", "inv_chest_plate04", [
    item("vindication-chest", "Premier Chevalier Breastplate", "PvP · Level 55 · Honor + Marks", {
      itemId: 272742,
      icon: "./assets/icons/item-272742.jpg",
      quality: "Rare",
      enchant: enchant("BUDGET", "+4 All Stats", "budget"),
      tooltip: vindicationTooltip("627 Armor · +25 Stamina · +11 Strength · +11 Intellect · +7 Critical Strike"),
    }),
  ]),
  slot("wrists", "Wrists", "inv_bracer_13", [
    item("epic-vindication-wrists", "Premier Knight-Captain's Chevalier Armguards", "Rank 8 · Wrist upgrade seal", {
      itemId: 272778,
      icon: "./assets/icons/item-272778.jpg",
      quality: "Epic",
      enchant: enchant("FINAL", "Greater Spellpower · +16 Spell Power", "final", "+9 Strength"),
      tooltip: mixedVindicationTooltip("Item Level 65 · Binds when picked up · Wrist · Plate · 323 Armor · +20 Stamina · +12 Strength · +7 Intellect · Requires Level 60"),
    }),
  ]),
  slot("weapon", "Two-Hand", "inv_spear_04", [
    item("ice-barbed-spear", "Ice Barbed Spear", "Hero of the Stormpike", {
      itemId: 19106,
      icon: "inv_spear_04",
      quality: "Rare",
      enchant: enchant("BUDGET", "Greater Impact · +7 Weapon Damage", "budget"),
      tooltip: "Item Level 63 · Two-Hand Polearm · 155–233 Damage · Speed 3.60 · +13 Strength · +21 Agility · +20 Stamina",
    }),
  ]),
  slot("relic", "Libram", "inv_relics_libramofhope", [
    item("libram-law", "Libram of Law", "Undermine · 50 Tarnished Reals", {
      itemId: 272435,
      icon: "inv_misc_book_04",
      quality: "Rare",
      tooltip: "Item Level 65 · Increases the damage of Judgement by 4%.",
    }),
  ]),
];

const rightSlots = [
  slot("hands", "Hands", "inv_gauntlets_29", [
    item("vindication-hands", "Premier Chevalier Gauntlets", "PvP · Level 55 · Honor + Marks", {
      itemId: 272719,
      icon: "./assets/icons/item-272719.jpg",
      quality: "Rare",
      enchant: enchant("BUDGET", "Mystic Heavy Armor Kit · +4 Spell Power / +24 Armor", "budget"),
      tooltip: vindicationTooltip("392 Armor · +19 Stamina · +11 Strength · +5 Intellect · +7 Spell Power · Increases the duration of Repentance by 1 sec"),
    }),
  ]),
  slot("waist", "Waist", "inv_belt_13", [
    item("epic-vindication-waist", "Premier Knight-Captain's Chevalier Belt", "Rank 8 · Belt upgrade seal", {
      itemId: 272779,
      icon: "./assets/icons/item-272779.jpg",
      quality: "Epic",
      enchant: enchant("TINKER", "Nitro Boosts · Engineering 280 · up to +160% movement speed for up to 8 sec", "final"),
      tooltip: mixedVindicationTooltip("Item Level 65 · Binds when picked up · Waist · Plate · 415 Armor · +26 Stamina · +17 Strength · +10 Intellect · Requires Level 60"),
    }),
  ]),
  slot("legs", "Legs", "inv_pants_plate_04", [
    item("vindication-legs", "Premier Chevalier Leggings", "PvP · Level 55 · Honor + Marks", {
      itemId: 272744,
      icon: "./assets/icons/item-272744.jpg",
      quality: "Rare",
      enchant: enchant("BUDGET", "Mystic Heavy Armor Kit · +4 Spell Power / +24 Armor; save Rapidity for epic legs", "budget"),
      tooltip: vindicationTooltip("548 Armor · +25 Stamina · +13 Strength · +7 Critical Strike · +7 Spell Power"),
    }),
  ]),
  slot("feet", "Feet", "inv_boots_plate_03", [
    item("epic-vindication-boots", "Premier Knight-Champion's Chevalier Boots", "Rank 9 · Feet upgrade seal", {
      itemId: 272781,
      icon: "./assets/icons/item-272781.jpg",
      quality: "Epic",
      enchant: enchant("FINAL", "Mystic Rugged Armor Kit · +6 Spell Power / +40 Armor", "final", "Mystic Heavy Armor Kit · +4 Spell Power / +24 Armor"),
      tooltip: mixedVindicationTooltip("Item Level 65 · 507 Armor · +26 Stamina · +12 Strength · +8 Intellect · +14 Spell Power"),
    }),
  ]),
  slot("ring-one", "Finger 1", "inv_jewelry_ring_15", [
    item("songstone-ironforge", "Songstone of Ironforge", "BRD quest", {
      itemId: 12543,
      icon: "inv_jewelry_ring_05",
      quality: "Rare",
      tooltip: "Item Level 60 · Finger · +7 Intellect · +2 Spell Penetration · +18 Spell Damage and Healing",
    }),
  ]),
  slot("ring-two", "Finger 2", "inv_jewelry_ring_21", [
    item("blood-martyr", "Blood of the Martyr", "Stratholme quest", {
      itemId: 17045,
      icon: "inv_jewelry_ring_25",
      quality: "Rare",
      tooltip: "Item Level 61 · Finger · +10 Stamina · +10 Intellect · +12 Spell Damage and Healing",
    }),
  ]),
  slot("trinket-one", "Trinket 1", "inv_jewelry_trinketpvp_01", [
    item("greater-insignia-alliance", "Greater Insignia of the Alliance", "PvP · Rank 2 · 5,250 Honor", {
      itemId: 274445,
      icon: "inv_jewelry_trinketpvp_01",
      quality: "Rare",
      tooltip: "Item Level 1 · Binds when picked up · Unique-Equipped · Trinket · Use: Removes all movement impairing effects and all effects which cause loss of control of your character. (5 Min Cooldown)",
    }),
  ]),
  slot("trinket-two", "Trinket 2", "spell_nature_slow", [
    item("infernal-lasso", "Infernal Lasso", "Quest", {
      itemId: 219345,
      icon: "spell_nature_slow",
      quality: "Rare",
      tooltip: "Item Level 50 · Trinket · +8 Spell Power · Use: 504 Fire damage over 12 sec and roots Demons and Beasts for 6 sec.",
    }),
  ]),
];

const preRaidLeftSlots = leftSlots.map((gearSlot) => {
  if (gearSlot.id === "head") {
    return slot("pre-raid-head", "Head", "./assets/icons/stalwart-helm.png", [
      item("stalwart-helm", "Stalwart Helm", "Crafted · Blacksmithing", {
        itemId: 250599,
        icon: "./assets/icons/stalwart-helm.png",
        quality: "Epic",
        enchant: enchant("FINAL", "Arcanum of Rapidity · +1% Haste", "final", "Lesser Arcanum of Voracity · +8 Strength"),
        tooltip: "Item Level 61 · Binds when equipped · Head · Plate · 565 Armor · +12 Strength · +20 Hit · +38 Spell Damage and Healing · Requires Level 56",
      }),
    ]);
  }
  if (gearSlot.id === "shoulders") {
    return slot("pre-raid-shoulders", "Shoulders", "inv_shoulder_20", [
      item("lightforge-spaulders", "Lightforge Spaulders", "UBRS · The Beast", {
        itemId: 16729,
        icon: "inv_shoulder_20",
        quality: "Rare",
        tooltip: lightforgeTooltip("Item Level 60 · 470 Armor · +9 Strength · +5 Agility · +15 Stamina · +10 Intellect · +9 Hit"),
      }),
    ]);
  }
  if (gearSlot.id === "back") {
    return slot("pre-raid-back", "Back", "./assets/icons/arcanoweave-cloak.png", [
      item("arcanoweave-cloak", "Arcanoweave Cloak", "Undermine · Pix Xizzix", {
        itemId: 272411,
        icon: "./assets/icons/arcanoweave-cloak.png",
        quality: "Rare",
        enchant: enchant("FINAL", "+5 Agility — durable item-level 65 target", "final", "+3 Agility"),
        tooltip: "Item Level 65 · Binds when picked up · Back · 46 Armor · +8 Intellect · +10 Hit · +16 Spell Damage and Healing · Requires Level 60",
      }),
    ]);
  }
  if (gearSlot.id === "chest") {
    return slot("pre-raid-chest", "Chest", "inv_chest_plate03", [
      item("lightforge-breastplate", "Lightforge Breastplate", "UBRS · General Drakkisath", {
        itemId: 16726,
        icon: "inv_chest_plate03",
        quality: "Rare",
        enchant: enchant("BUDGET", "+4 All Stats", "budget"),
        tooltip: lightforgeTooltip("Item Level 63 · 657 Armor · +13 Strength · +21 Stamina · +16 Intellect · +8 Spirit · +7 Critical Strike"),
      }),
    ]);
  }
  if (gearSlot.id === "wrists") {
    return slot("pre-raid-wrists", "Wrists", "inv_bracer_18", [
      item("epic-vindication-wrists", "Premier Knight-Captain's Chevalier Armguards", "Rank 8 · Wrist upgrade seal", {
        itemId: 272778,
        icon: "./assets/icons/item-272778.jpg",
        quality: "Epic",
        enchant: enchant("FINAL", "Greater Spellpower · +16 Spell Power", "final", "+9 Strength"),
        tooltip: mixedVindicationTooltip("Item Level 65 · Binds when picked up · Wrist · Plate · 323 Armor · +20 Stamina · +12 Strength · +7 Intellect · Requires Level 60"),
      }),
    ]);
  }
  return gearSlot;
});

const preRaidRightSlots = rightSlots.map((gearSlot) => {
  if (gearSlot.id === "waist") {
    return slot("pre-raid-waist", "Waist", "./assets/icons/lightforge-belt.jpg", [
      item("lightforge-belt", "Lightforge Belt", "Stratholme trash · BoE", {
        itemId: 16723,
        icon: "./assets/icons/lightforge-belt.jpg",
        quality: "Rare",
        enchant: enchant("TINKER", "Nitro Boosts · Engineering 280 · up to +160% movement speed for up to 8 sec", "final"),
        tooltip: lightforgeTooltip("Item Level 58 · 341 Armor · +10 Strength · +9 Stamina · +15 Intellect · +5 Hit · +7 Spell Damage and Healing"),
      }),
    ]);
  }
  if (gearSlot.id === "feet") {
    return slot("pre-raid-feet", "Feet", "inv_boots_plate_03", [
      item("epic-vindication-boots", "Premier Knight-Champion's Chevalier Boots", "Rank 9 · Feet upgrade seal", {
        itemId: 272781,
        icon: "./assets/icons/item-272781.jpg",
        quality: "Epic",
        enchant: enchant("FINAL", "Mystic Rugged Armor Kit · +6 Spell Power / +40 Armor", "final", "Mystic Heavy Armor Kit · +4 Spell Power / +24 Armor"),
        tooltip: mixedVindicationTooltip("Item Level 65 · 507 Armor · +26 Stamina · +12 Strength · +8 Intellect · +14 Spell Power"),
      }),
    ]);
  }
  if (gearSlot.id === "trinket-one") {
    return slot("pre-raid-trinket-one", "Trinket 1", "inv_misc_root_02", [
        item("briarwood-reed", "Briarwood Reed", "UBRS · Jed Runewatcher", {
          itemId: 12930,
          icon: "inv_misc_root_02",
          quality: "Rare",
          tooltip: "Item Level 60 · Trinket · +15 Spell Damage and Healing; doubled in Marsh and Swamp areas.",
        }),
      ]);
  }
  if (gearSlot.id === "trinket-two") {
    return slot("pre-raid-trinket-two", "Trinket 2", "inv_jewelry_talisman_09", [
      item("draconic-emblem", "Draconic Infused Emblem", "UBRS · General Drakkisath", {
        itemId: 22268,
        icon: "inv_jewelry_talisman_09",
        quality: "Rare",
        tooltip: "Item Level 63 · Binds when picked up · Unique · Trinket · Requires Level 58 · Equip: Chance on harmful spellcast to gain +35 Spell Damage and Healing for 10 sec; spell damage is doubled against Dragonkin.",
      }),
    ]);
  }
  return gearSlot;
});

const PVP_LOADOUT_TARGETS = new Set(
  [...leftSlots, ...rightSlots].flatMap((gearSlot) => gearSlot.items.map((candidate) => candidate.id)),
);
const PRE_RAID_LOADOUT_TARGETS = new Set(
  [...preRaidLeftSlots, ...preRaidRightSlots].flatMap((gearSlot) => gearSlot.items.map((candidate) => candidate.id)),
);

let obtained = loadObtained();
let completedGuideItems = loadSavedSet(GUIDE_STORAGE_KEY);
let roadmapState = loadRoadmapState();
let toastTimer;

function questStep(title, location, objective) {
  return { title, location, objective };
}

function roadmapAction(id, title, type, minLevel, options = {}) {
  return {
    id,
    title,
    type,
    minLevel,
    minRank: options.minRank ?? 0,
    honor: options.honor ?? 0,
    marks: options.marks ?? {},
    dependsOn: options.dependsOn ?? [],
    rewardId: options.rewardId,
    reason: options.reason ?? "",
    group: options.group,
    optional: options.optional ?? false,
  };
}

function item(id, name, source, options = {}) {
  return {
    id,
    name,
    source,
    trackable: options.trackable ?? true,
    itemId: options.itemId,
    icon: options.icon,
    quality: options.quality,
    enchant: options.enchant,
    tooltip: options.tooltip ?? "Exact item details have not been selected yet.",
  };
}

function consumable(id, name, category, icon, tooltip, source) {
  return {
    id,
    name,
    category,
    icon,
    tooltip,
    source,
    quality: "Common",
  };
}

function lockout(label, tone) {
  return { label, tone };
}

function enchant(label, name, tier, budget) {
  return { label, name, tier, budget };
}

function vindicationTooltip(stats) {
  return `Item Level 60 · ${stats} · Lieutenant Commander's Vindication — (2) +23 Spell Damage and Healing · (4) −10 sec Hammer of Justice cooldown · (6) +20 Stamina`;
}

function mixedVindicationTooltip(stats) {
  return `${stats} · Lieutenant Commander's Vindication — (2) +23 Spell Damage and Healing · (4) −10 sec Hammer of Justice cooldown · (6) +20 Stamina`;
}

function lightforgeTooltip(stats) {
  return `${stats} · Lightforge Armor — (2) +8 All Resistances · (3) +18 Spell Damage and Healing · (4) 7% chance when struck by a harmful spell to silence the caster for 3 sec (60 sec cooldown) · (5) Chance on melee autoattack and spellcast to gain +65 Spell Damage and Healing for 10 sec · (6) +8 Mana per 5 sec`;
}

function slot(id, name, icon, items) {
  return { id, name, icon, items };
}

function iconUrl(icon) {
  if (icon.startsWith("./")) return icon;
  return `${ICON_ROOT}${icon}.jpg`;
}

function loadObtained() {
  return loadSavedSet(GEAR_STORAGE_KEY);
}

function loadSavedSet(storageKey) {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return new Set(Array.isArray(saved) ? saved : []);
  } catch {
    return new Set();
  }
}

function saveObtained() {
  localStorage.setItem(GEAR_STORAGE_KEY, JSON.stringify([...obtained]));
}

function saveGuideProgress() {
  localStorage.setItem(GUIDE_STORAGE_KEY, JSON.stringify([...completedGuideItems]));
}

function defaultRoadmapState() {
  return {
    level: 42,
    rank: 0,
    weeklyCapReached: false,
    honor: 0,
    expectedCapHonor: 0,
    marks: { av: 0, ab: 0, wsg: 0, darkspear: 0 },
    completed: [],
    skipped: [],
    transactions: {},
  };
}

function loadRoadmapState() {
  const defaults = defaultRoadmapState();
  try {
    const saved = JSON.parse(localStorage.getItem(ROADMAP_STORAGE_KEY));
    if (!saved || typeof saved !== "object") return defaults;
    return {
      ...defaults,
      ...saved,
      marks: { ...defaults.marks, ...(saved.marks ?? {}) },
      completed: Array.isArray(saved.completed) ? saved.completed : [],
      skipped: Array.isArray(saved.skipped) ? saved.skipped : [],
      transactions: saved.transactions && typeof saved.transactions === "object" ? saved.transactions : {},
    };
  } catch {
    return defaults;
  }
}

function saveRoadmapState() {
  localStorage.setItem(ROADMAP_STORAGE_KEY, JSON.stringify(roadmapState));
}

function candidateMarkup(candidate, compact = false) {
  const checked = obtained.has(candidate.id);
  const disabled = !candidate.trackable;
  const icon = candidate.icon ?? "inv_misc_questionmark";
  return `
    <label class="gear-candidate${checked ? " obtained" : ""}${disabled ? " pending" : ""}${compact ? " compact" : ""}" data-gear-id="${candidate.id}">
      <input
        type="checkbox"
        data-item-id="${candidate.id}"
        ${checked ? "checked" : ""}
        ${disabled ? "disabled" : ""}
      >
      ${compact ? "" : `<img class="gear-candidate-icon" src="${iconUrl(icon)}" alt="">`}
      <span class="gear-check" aria-hidden="true">${checked ? "✓" : ""}</span>
      <span class="gear-item-copy">
        <strong>${candidate.name}</strong>
        <small>${candidate.source}</small>
        ${candidate.enchant ? enchantMarkup(candidate.enchant) : ""}
      </span>
    </label>
  `;
}

function enchantMarkup(recommendation) {
  return `
    <span class="gear-enchant gear-enchant-${recommendation.tier}">
      <b>✦ ${recommendation.label}</b>
      <em>${recommendation.name}</em>
    </span>
    ${recommendation.budget ? `
      <span class="gear-enchant gear-enchant-budget">
        <b>◇ BUDGET</b>
        <em>${recommendation.budget}</em>
      </span>
    ` : ""}
  `;
}

function slotMarkup(gearSlot) {
  const displayIcon = gearSlot.items[0]?.icon ?? gearSlot.icon;
  return `
    <article class="gear-slot-card" data-slot="${gearSlot.id}">
      <img src="${iconUrl(displayIcon)}" alt="">
      <div class="gear-slot-copy">
        <span>${gearSlot.name}</span>
        ${gearSlot.items
          .map((candidate) =>
            candidateMarkup({ ...candidate, icon: candidate.icon ?? gearSlot.icon }, true),
          )
          .join("")}
      </div>
    </article>
  `;
}

function consumableMarkup(candidate) {
  const itemLockout = CONSUMABLE_LOCKOUTS[candidate.id];
  return `
    <article class="consumable-card" data-gear-id="${candidate.id}" tabindex="0">
      <img src="${iconUrl(candidate.icon)}" alt="">
      <span>
        <small>${candidate.category}</small>
        <strong>${candidate.name}</strong>
        ${itemLockout ? `<em class="consumable-lockout consumable-lockout-${itemLockout.tone}">${itemLockout.label}</em>` : ""}
      </span>
    </article>
  `;
}

function consumableGroupsMarkup(groups, candidates) {
  const byId = new Map(candidates.map((candidate) => [candidate.id, candidate]));
  return groups
    .map((group) => `
      <section class="consumable-group">
        <div class="consumable-group-heading">
          <strong>${group.title}</strong>
          <small>${group.note}</small>
        </div>
        <div class="consumable-group-grid">
          ${group.ids.map((id) => consumableMarkup(byId.get(id))).join("")}
        </div>
      </section>
    `)
    .join("");
}

function render() {
  document.querySelector("#gearLeft").innerHTML = leftSlots.map(slotMarkup).join("");
  document.querySelector("#gearRight").innerHTML = rightSlots.map(slotMarkup).join("");
  document.querySelector("#preRaidGearLeft").innerHTML = preRaidLeftSlots.map(slotMarkup).join("");
  document.querySelector("#preRaidGearRight").innerHTML = preRaidRightSlots.map(slotMarkup).join("");
  document.querySelector("#pvpConsumables").innerHTML = consumableGroupsMarkup(PVP_CONSUMABLE_GROUPS, PVP_CONSUMABLES);
  document.querySelector("#raidConsumables").innerHTML = consumableGroupsMarkup(RAID_CONSUMABLE_GROUPS, RAID_CONSUMABLES);
  document.querySelector("#pvpStatRecap").innerHTML = loadoutSummaryMarkup(leftSlots, rightSlots);
  document.querySelector("#preRaidStatRecap").innerHTML = loadoutSummaryMarkup(preRaidLeftSlots, preRaidRightSlots);
  renderRoadmap();
  bindTooltips();
  updateProgress();
}

function renderRoadmap() {
  syncRoadmapControls();
  const evaluation = evaluateRoadmap();
  document.querySelector("#roadmapDecision").innerHTML = decisionMarkup(evaluation.decision);
  document.querySelector("#roadmapNow").innerHTML = evaluation.now.map(roadmapCardMarkup).join("") || emptyRoadmapMarkup("Nothing urgent.");
  document.querySelector("#roadmapNext").innerHTML = evaluation.next.map(roadmapCardMarkup).join("") || emptyRoadmapMarkup("No queued objective.");
  document.querySelector("#roadmapLater").innerHTML = evaluation.later.map(roadmapCardMarkup).join("") || emptyRoadmapMarkup("No blocked objective.");
  document.querySelector("#roadmapCompleted").innerHTML = evaluation.completed.map(completedRoadmapCardMarkup).join("") || emptyRoadmapMarkup("No completed objectives yet.");
  document.querySelector("#roadmapCompletedCount").textContent = evaluation.completed.length;
}

function evaluateRoadmap() {
  const activeActions = ROADMAP_ACTIONS.filter((action) => !isRoadmapActionDone(action));
  const completed = ROADMAP_ACTIONS.filter(isRoadmapActionDone);
  const affordablePurchase = activeActions.find((action) =>
    action.type === "purchase" &&
    !roadmapState.skipped.includes(action.id) &&
    actionBlockers(action).length === 0 &&
    actionAffordable(action),
  );
  const nextPurchase = activeActions.find((action) =>
    action.type === "purchase" &&
    !roadmapState.skipped.includes(action.id) &&
    actionBlockers(action).length === 0,
  );
  const coreUpgrade = CORE_PRE_RAID_PRIORITY
    .map((id) => activeActions.find((action) => action.id === id))
    .find((action) =>
      action &&
      !roadmapState.skipped.includes(action.id) &&
      actionBlockers(action).length === 0
    );
  const decision = honorDecision(affordablePurchase, nextPurchase, coreUpgrade);
  const now = [];
  const next = [];
  const later = [];

  if (!roadmapState.weeklyCapReached) {
    now.push({
      synthetic: true,
      id: "weekly-cap",
      title: "Cap Rank Points for this reset",
      type: "pvp",
      reason: "This always comes first. Target the Marks needed by your next PvP purchase while capping.",
      meta: roadmapState.rank ? `Current rank: ${PVP_RANKS[roadmapState.rank]}` : "Starting from Rank 0",
    });
  } else if (decision.mode === "farm") {
    now.push({
      synthetic: true,
      id: "honor-farm",
      title: `Keep farming for ${decision.target.title}`,
      type: "pvp",
      reason: decision.detail,
      meta: decision.meta,
    });
  }

  activeActions.forEach((action) => {
    const blockers = actionBlockers(action);
    if (roadmapState.skipped.includes(action.id)) {
      later.push({ ...action, state: "skipped", blockers: ["Deferred manually"] });
      return;
    }
    if (blockers.length) {
      const onlyLevelBlocked = blockers.every((blocker) => blocker.startsWith("Requires level"));
      const destination = onlyLevelBlocked && action.type !== "purchase" ? next : later;
      destination.push({ ...action, state: "blocked", blockers });
      return;
    }

    if (action.type === "purchase") {
      if (roadmapState.weeklyCapReached && decision.mode === "spend" && action.id === affordablePurchase?.id) now.push({ ...action, state: "affordable" });
      else if (roadmapState.weeklyCapReached && decision.mode === "farm" && action.id === nextPurchase?.id) now.push({ ...action, state: "target" });
      else next.push({ ...action, state: "waiting", blockers: affordabilityBlockers(action) });
      return;
    }

    if (!roadmapState.weeklyCapReached) {
      next.push({ ...action, state: "after-cap" });
      return;
    }

    if (action.type === "quest") {
      (decision.mode === "farm" ? next : now).push({ ...action, state: "available" });
      return;
    }
    if (action.type === "dungeon") {
      const sameRun = decision.mode === "dungeon" &&
        (action.id === decision.target?.id || (action.group && action.group === decision.target?.group));
      (sameRun ? now : next).push({ ...action, state: "available" });
      return;
    }
    if (decision.mode === "dungeon" && action.id === decision.target?.id) {
      now.push({ ...action, state: "available" });
      return;
    }
    next.push({ ...action, state: "available" });
  });

  now.sort((a, b) => roadmapSortScore(a, decision, true) - roadmapSortScore(b, decision, true));
  next.sort((a, b) => {
    const priorityDifference = roadmapSortScore(a, decision, false) - roadmapSortScore(b, decision, false);
    return priorityDifference || (a.minLevel ?? 0) - (b.minLevel ?? 0);
  });

  return {
    decision,
    now,
    next,
    later,
    completed,
  };
}

function roadmapSortScore(action, decision, isNow) {
  if (action.synthetic) return 0;
  if (action.id === decision.target?.id) return 1;
  if (decision.mode === "dungeon") {
    const coreIndex = CORE_PRE_RAID_PRIORITY.indexOf(action.id);
    if (coreIndex >= 0) return 2 + coreIndex;
    if (action.group && action.group === decision.target?.group) return 8;
    if (action.type === "quest") return 12;
    if (action.type === "dungeon" || action.type === "market") return 16;
    if (action.type === "purchase") return 30;
  }
  if (decision.mode === "spend" && action.type === "purchase") return 2;
  if (isNow && action.type === "quest") return 10;
  return 20;
}

function honorDecision(affordablePurchase, nextPurchase, coreUpgrade) {
  if (!roadmapState.weeklyCapReached) {
    return {
      mode: "cap",
      title: "Cap PvP first",
      detail: "The Honor-versus-dungeon decision unlocks after you mark this reset capped.",
    };
  }
  if (coreUpgrade && roadmapState.honor < 24000) {
    return {
      mode: "dungeon",
      target: coreUpgrade,
      title: `Prioritize ${coreUpgrade.title}`,
      detail: "Your core pre-raid route takes priority over extra Honor farming. Use the Honor naturally earned by next reset instead.",
    };
  }
  if (affordablePurchase) {
    return {
      mode: "spend",
      title: `Spend now: ${affordablePurchase.title}`,
      detail: "You can buy this target from your current balance. Completing it here will deduct its Honor and Marks.",
    };
  }
  if (!nextPurchase) {
    return {
      mode: "dungeon",
      title: "Go to quests and dungeons",
      detail: "No currently unlocked PvP purchase needs additional farming.",
    };
  }
  if (roadmapState.honor >= 24000 && !actionAffordable(nextPurchase)) {
    return {
      mode: "dungeon",
      title: "Preserve Honor-cap headroom",
      detail: `You are near the 25,000 Honor cap but cannot buy ${nextPurchase.title} yet. Stop farming Honor until its blocker clears.`,
    };
  }
  const markGaps = missingMarks(nextPurchase);
  if (markGaps.length) {
    return {
      mode: "farm",
      target: nextPurchase,
      title: `Keep farming ${markGaps.map((entry) => entry.label).join(" / ")}`,
      detail: `${nextPurchase.title} is unlocked, but ${markGaps.map((entry) => `${entry.missing} ${entry.label}`).join(" and ")} still block the purchase.`,
      meta: purchaseCostLabel(nextPurchase),
    };
  }
  const honorGap = Math.max(0, nextPurchase.honor - roadmapState.honor);
  if (!roadmapState.expectedCapHonor) {
    return {
      mode: "unknown",
      title: "Choose using your first cap result",
      detail: `${nextPurchase.title} needs ${honorGap.toLocaleString()} more Honor. Record the Honor normally earned while capping to know whether to farm now or let next reset cover it.`,
    };
  }
  if (honorGap > roadmapState.expectedCapHonor) {
    const farmNow = honorGap - roadmapState.expectedCapHonor;
    return {
      mode: "farm",
      target: nextPurchase,
      title: `Farm ${farmNow.toLocaleString()} Honor, then go dungeons`,
      detail: `Leave the final ${roadmapState.expectedCapHonor.toLocaleString()} Honor for next reset's normal rank cap.`,
      meta: `${roadmapState.honor.toLocaleString()} / ${nextPurchase.honor.toLocaleString()} Honor`,
    };
  }
  return {
    mode: "dungeon",
    title: "Go to quests and dungeons",
    detail: `Next reset's expected ${roadmapState.expectedCapHonor.toLocaleString()} Honor covers the ${honorGap.toLocaleString()} gap for ${nextPurchase.title}.`,
  };
}

function actionBlockers(action) {
  const blockers = [];
  if (roadmapState.level < action.minLevel) blockers.push(`Requires level ${action.minLevel}`);
  if (roadmapState.rank < action.minRank) blockers.push(`Requires Rank ${action.minRank} — ${PVP_RANKS[action.minRank]}`);
  action.dependsOn.forEach((dependency) => {
    const dependencyAction = ROADMAP_ACTIONS.find((candidate) => candidate.id === dependency);
    if (dependencyAction && !isRoadmapActionDone(dependencyAction)) blockers.push(`First complete ${dependencyAction.title}`);
  });
  return blockers;
}

function missingMarks(action) {
  const names = { av: "AV Marks", ab: "AB Marks", wsg: "WSG Marks", darkspear: "Darkspear Marks" };
  return Object.entries(action.marks)
    .map(([mark, required]) => ({ mark, label: names[mark], missing: Math.max(0, required - roadmapState.marks[mark]) }))
    .filter((entry) => entry.missing);
}

function affordabilityBlockers(action) {
  const blockers = [];
  if (action.honor > roadmapState.honor) blockers.push(`${(action.honor - roadmapState.honor).toLocaleString()} Honor short`);
  blockers.push(...missingMarks(action).map((entry) => `${entry.missing} ${entry.label} short`));
  return blockers;
}

function actionAffordable(action) {
  return action.honor <= roadmapState.honor && missingMarks(action).length === 0;
}

function hasPurchaseCost(action) {
  return action.honor > 0 || Object.keys(action.marks).length > 0;
}

function isRoadmapActionDone(action) {
  return roadmapState.completed.includes(action.id) || (action.rewardId && obtained.has(action.rewardId));
}

function purchaseCostLabel(action) {
  const parts = [];
  if (action.honor) parts.push(`${action.honor.toLocaleString()} Honor`);
  Object.entries(action.marks).forEach(([mark, count]) => {
    const label = { av: "AV", ab: "AB", wsg: "WSG", darkspear: "Darkspear" }[mark];
    parts.push(`${count} ${label} Marks`);
  });
  return parts.join(" · ") || "Rank reward";
}

function decisionMarkup(decision) {
  return `
    <span>${decision.mode === "farm" ? "Battlegrounds" : decision.mode === "spend" ? "Vendor" : decision.mode === "cap" ? "Weekly reset" : "Recommended route"}</span>
    <div>
      <strong>${decision.title}</strong>
      <p>${decision.detail}</p>
      ${decision.meta ? `<small>${decision.meta}</small>` : ""}
    </div>
  `;
}

function roadmapCardMarkup(action) {
  const rewardAttribute = action.rewardId ? ` data-reward-id="${action.rewardId}"` : "";
  const loadoutLabel = roadmapLoadoutLabel(action.rewardId);
  const purchaseBlocked = action.type === "purchase" &&
    (!actionAffordable(action) || actionBlockers(action).length > 0);
  const completeLabel = action.type === "purchase"
    ? purchaseBlocked ? "Need currency" : hasPurchaseCost(action) ? "Buy & deduct" : "Claim"
    : action.state === "skipped" ? "Complete anyway" : "Done";
  const cost = action.synthetic
    ? action.meta
    : action.type === "purchase"
      ? purchaseCostLabel(action)
      : action.group || (action.minLevel > roadmapState.level ? `Available at level ${action.minLevel}` : "");
  const blockers = action.blockers?.length ? action.blockers : [];
  return `
    <article class="roadmap-card ${action.state ?? ""}">
      <div class="roadmap-card-head">
        <span>${roadmapTypeLabel(action.type)}</span>
        <div>
          ${loadoutLabel ? `<b>${loadoutLabel}</b>` : ""}
          ${action.optional ? "<em>Optional</em>" : ""}
        </div>
      </div>
      <strong${rewardAttribute}>${action.title}</strong>
      <p>${action.reason}</p>
      ${cost ? `<small>${cost}</small>` : ""}
      ${blockers.length ? `<div class="roadmap-blockers">${blockers.join(" · ")}</div>` : ""}
      ${action.synthetic ? "" : `
        <div class="roadmap-card-actions">
          <button type="button" data-roadmap-complete="${action.id}" ${purchaseBlocked ? "disabled" : ""}>${completeLabel}</button>
          <button type="button" data-roadmap-skip="${action.id}">${action.state === "skipped" ? "Restore" : "Defer"}</button>
        </div>
      `}
    </article>
  `;
}

function completedRoadmapCardMarkup(action) {
  const rewardAttribute = action.rewardId ? ` data-reward-id="${action.rewardId}"` : "";
  const transaction = roadmapState.transactions[action.id];
  return `
    <article class="roadmap-card completed">
      <div class="roadmap-card-head">
        <span>${roadmapTypeLabel(action.type)}</span>
        <div><b>Completed</b></div>
      </div>
      <strong${rewardAttribute}>${action.title}</strong>
      ${transaction ? `<small>Spent ${purchaseCostLabel(action)}</small>` : ""}
      <div class="roadmap-card-actions">
        <button type="button" data-roadmap-undo="${action.id}">Undo${transaction ? " & refund" : ""}</button>
      </div>
    </article>
  `;
}

function roadmapLoadoutLabel(rewardId) {
  if (!rewardId) return "";
  const inPvp = PVP_LOADOUT_TARGETS.has(rewardId);
  const inPreRaid = PRE_RAID_LOADOUT_TARGETS.has(rewardId);
  if (inPvp && inPreRaid) return "Both loadouts";
  if (inPvp) return "PvP loadout";
  if (inPreRaid) return "Pre-raid loadout";
  return "";
}

function roadmapTypeLabel(type) {
  return {
    purchase: "PvP purchase",
    quest: "Quest",
    dungeon: "Dungeon",
    craft: "Crafted",
    market: "Auction House",
    currency: "Currency",
    pvp: "PvP",
  }[type] ?? type;
}

function emptyRoadmapMarkup(message) {
  return `<p class="roadmap-empty">${message}</p>`;
}

function loadoutSummaryMarkup(left, right) {
  const candidates = [...left, ...right].flatMap((gearSlot) => gearSlot.items);
  const totals = Object.fromEntries(SUMMARY_STATS.map(([key]) => [key, 0]));
  const setCounts = new Map();

  candidates.forEach((candidate) => {
    addStaticStats(totals, candidate.tooltip);
    const setName = candidateSetName(candidate);
    if (setName) setCounts.set(setName, (setCounts.get(setName) ?? 0) + 1);
  });

  const activeSets = [];
  setCounts.forEach((count, setName) => {
    const activeBonuses = (SET_BONUS_RULES[setName] ?? []).filter((bonus) => count >= bonus.pieces);
    activeBonuses.forEach((bonus) => {
      Object.entries(bonus.stats ?? {}).forEach(([stat, value]) => {
        totals[stat] += value;
      });
    });
    if (activeBonuses.length) {
      activeSets.push(`
        <div>
          <strong>${setName} · ${count} pieces</strong>
          ${activeBonuses.map((bonus) => `<small>${bonus.label}</small>`).join("")}
        </div>
      `);
    }
  });

  const stats = SUMMARY_STATS
    .filter(([key]) => totals[key])
    .map(([key, label]) => {
      let talentBonus = "";
      if (key === "strength") {
        talentBonus = `<em class="stat-derived" title="Divine Strength: +10% Strength">(+${Math.floor(totals.strength * 0.1)})</em>`;
      }
      if (key === "spellDamage") {
        talentBonus = `<em class="stat-derived" title="Champion of the Light: 60% of Intellect">(+${Math.floor(totals.intellect * 0.6)})</em>`;
      }
      return `<span><small>${label}</small><strong>${formatSummaryStat(key, totals[key])}${talentBonus}</strong></span>`;
    })
    .join("");

  return `
    <p>Loadout totals</p>
    <div class="stat-recap-grid">${stats}</div>
    <div class="stat-recap-sets">
      <span>Active set bonuses</span>
      ${activeSets.join("")}
    </div>
  `;
}

function formatSummaryStat(stat, value) {
  if (stat === "hit") return `+${trimDecimals(value / 10)}%`;
  if (stat === "criticalStrike") return `+${trimDecimals(value / 14)}%`;
  return `+${value}`;
}

function trimDecimals(value) {
  return Number(value.toFixed(2));
}

function addStaticStats(totals, tooltip) {
  const setIndex = tooltip.indexOf(" — (");
  const staticText = setIndex < 0
    ? tooltip
    : tooltip.slice(0, tooltip.lastIndexOf(" · ", setIndex));

  staticText.split(" · ").forEach((segment) => {
    if (/^(Equip:|Use:|Increases|Chance)/i.test(segment)) return;
    addStatMatch(totals, segment, /(\d+)\s+Armor/i, "armor");
    addStatMatch(totals, segment, /\+(\d+)\s+Strength/i, "strength");
    addStatMatch(totals, segment, /\+(\d+)\s+Agility/i, "agility");
    addStatMatch(totals, segment, /\+(\d+)\s+Stamina/i, "stamina");
    addStatMatch(totals, segment, /\+(\d+)\s+Intellect/i, "intellect");
    addStatMatch(totals, segment, /\+(\d+)\s+Spirit/i, "spirit");
    addStatMatch(totals, segment, /\+(\d+)\s+Hit/i, "hit");
    addStatMatch(totals, segment, /\+(\d+)\s+(?:Critical Strike|Crit Rating)/i, "criticalStrike");
    addStatMatch(totals, segment, /\+(\d+)\s+Spell Penetration/i, "spellPenetration");
    addStatMatch(totals, segment, /\+?(\d+)\s+(?:Mana per 5 sec|mana per 5 sec)/i, "mp5");

    const sharedPower = segment.match(/\+(\d+)\s+(?:Spell Power|Spell Damage and Healing)/i);
    if (sharedPower) {
      totals.spellDamage += Number(sharedPower[1]);
      totals.healing += Number(sharedPower[1]);
      return;
    }
    addStatMatch(totals, segment, /\+(\d+)\s+Spell Damage/i, "spellDamage");
    addStatMatch(totals, segment, /\+(\d+)\s+Healing/i, "healing");
  });
}

function addStatMatch(totals, text, pattern, stat) {
  const value = text.match(pattern)?.[1];
  if (value) totals[stat] += Number(value);
}

function candidateSetName(candidate) {
  return candidate.tooltip.match(/ · ([^·]+) — \(\d+\)/)?.[1];
}

function activeLoadoutSlots() {
  return document.querySelector('[data-gear-tab="pre-raid"]')?.classList.contains("active")
    ? [preRaidLeftSlots, preRaidRightSlots]
    : [leftSlots, rightSlots];
}

function trackedItems() {
  return activeLoadoutSlots()
    .flatMap((slots) => slots.flatMap((gearSlot) => gearSlot.items))
    .filter((candidate) => candidate.trackable);
}

function updateProgress() {
  const all = trackedItems();
  const complete = all.filter((candidate) => obtained.has(candidate.id)).length;
  const percent = all.length ? Math.round((complete / all.length) * 100) : 0;
  document.querySelector("#gearProgressText").textContent = `${complete} / ${all.length} obtained`;
  document.querySelector("#gearProgressPercent").textContent = `${percent}%`;
  document.querySelector("#gearProgressBar").style.width = `${percent}%`;
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1900);
}

document.querySelectorAll(".character-sheet").forEach((sheet) => {
  sheet.addEventListener("change", handleItemChange);
});

function handleItemChange(event) {
  const input = event.target.closest("[data-item-id]");
  if (!input) return;
  hideGearTooltip();
  if (input.checked) obtained.add(input.dataset.itemId);
  else obtained.delete(input.dataset.itemId);
  saveObtained();
  render();
}

function allGearItems() {
  return [
    ...leftSlots.flatMap((gearSlot) => gearSlot.items),
    ...rightSlots.flatMap((gearSlot) => gearSlot.items),
    ...preRaidLeftSlots.flatMap((gearSlot) => gearSlot.items),
    ...preRaidRightSlots.flatMap((gearSlot) => gearSlot.items),
    ...PVP_CONSUMABLES,
    ...RAID_CONSUMABLES,
  ];
}

function bindTooltips() {
  const byId = new Map(allGearItems().map((candidate) => [candidate.id, candidate]));
  document.querySelectorAll("[data-gear-id], [data-reward-id]").forEach((element) => {
    const candidate = byId.get(element.dataset.gearId ?? element.dataset.rewardId);
    if (!candidate || element.dataset.tooltipBound) return;
    element.dataset.tooltipBound = "true";
    element.addEventListener("mouseenter", (event) => showGearTooltip(event, candidate));
    element.addEventListener("mousemove", positionGearTooltip);
    element.addEventListener("mouseleave", hideGearTooltip);
  });
}

function showGearTooltip(event, candidate) {
  hideGearTooltip();
  hideQuestTooltip();
  const tooltip = document.createElement("div");
  const qualityClass = (candidate.quality ?? "common").toLowerCase();
  tooltip.className = `slot-tooltip gear-item-tooltip quality-${qualityClass}`;
  tooltip.id = "gearItemTooltip";
  tooltip.innerHTML = `
    <div class="tooltip-head">
      <div>
        <strong>${candidate.name}</strong>
      </div>
    </div>
    <div class="wow-item-lines">${formatItemTooltip(candidate.tooltip, equippedSetPieces(candidate))}</div>
    ${candidate.enchant ? `
      <div class="wow-enchant wow-enchant-${candidate.enchant.tier}">
        <span>✦ ${candidate.enchant.label}</span>
        ${candidate.enchant.name}
        ${candidate.enchant.budget ? `
          <div class="wow-enchant-budget">
            <b>◇ BUDGET</b>
            ${candidate.enchant.budget}
          </div>
        ` : ""}
      </div>
    ` : ""}
    <div class="wow-item-source">Source: ${candidate.source}</div>
    ${candidate.itemId
      ? `<small>Item ID: ${candidate.itemId}</small>`
      : candidate.category
        ? `<small>${candidate.category}</small>`
        : "<small>Target placeholder</small>"}
  `;
  document.body.append(tooltip);
  positionGearTooltip(event);
}

function equippedSetPieces(candidate) {
  const setName = candidate.tooltip.match(/ · ([^·]+) — \(\d+\)/)?.[1];
  if (!setName) return 0;
  return activeLoadoutSlots()
    .flatMap((slots) => slots.flatMap((gearSlot) => gearSlot.items))
    .filter((itemCandidate) => itemCandidate.tooltip.includes(` · ${setName} — (`))
    .length;
}

function setBonusClass(line, equippedPieces) {
  const requiredPieces = Number(line.match(/^\((\d+)\)/)?.[1] ?? Infinity);
  return requiredPieces <= equippedPieces ? "unlocked" : "locked";
}

function formatItemTooltip(text, equippedPieces = 0) {
  return text
    .split(" · ")
    .map((line) => {
      const setBonusStart = line.match(/^(.*?) — (\(\d+\).*)$/);
      if (setBonusStart) {
        const bonusClass = setBonusClass(setBonusStart[2], equippedPieces);
        return `<span class="wow-set-name">${setBonusStart[1]}</span><span class="wow-effect wow-set-bonus ${bonusClass}">${highlightItemStats(setBonusStart[2])}</span>`;
      }
      const setBonus = /^\(\d+\)/.test(line);
      const effect = /^(Equip:|Use:|Increases|Reduces|Harmful|doubled|\(\d+\))/i.test(line);
      const itemLevel = /^Item Level/i.test(line);
      const bonusClass = setBonus ? ` ${setBonusClass(line, equippedPieces)}` : "";
      return `<span class="${effect ? `wow-effect${setBonus ? ` wow-set-bonus${bonusClass}` : ""}` : itemLevel ? "wow-item-level" : "wow-stat"}">${highlightItemStats(line)}</span>`;
    })
    .join("");
}

function highlightItemStats(line) {
  return line
    .replace(
      /(\+\d+%?\s+(?:Healing|Spell Power|Spell Penetration|Spell Damage(?: and Healing)?))/gi,
      '<span class="wow-green-stat">$1</span>',
    )
    .replace(
      /(\+\d+%\s+Flash of Light critical strike chance)/gi,
      '<span class="wow-green-stat">$1</span>',
    )
    .replace(
      /(\+\d+\s+Hit)/gi,
      '<span class="wow-green-stat">$1</span>',
    )
    .replace(
      /(\+\d+\s+(?:Critical Strike|Crit Rating))/gi,
      '<span class="wow-green-stat">$1</span>',
    )
    .replace(
      /(\+?\d+\s+Mana per 5 sec)/gi,
      '<span class="wow-green-stat">$1</span>',
    )
    .replace(
      /(doubled in Marsh and Swamp areas\.?)/gi,
      '<span class="wow-green-stat">$1</span>',
    );
}

function positionGearTooltip(event) {
  const tooltip = document.querySelector("#gearItemTooltip");
  if (!tooltip) return;
  const margin = 14;
  let left = event.clientX + margin;
  let top = event.clientY + margin;
  if (left + tooltip.offsetWidth > window.innerWidth - 10) {
    left = event.clientX - tooltip.offsetWidth - margin;
  }
  if (top + tooltip.offsetHeight > window.innerHeight - 10) {
    top = event.clientY - tooltip.offsetHeight - margin;
  }
  tooltip.style.left = `${Math.max(10, left)}px`;
  tooltip.style.top = `${Math.max(10, top)}px`;
}

function hideGearTooltip() {
  document.querySelector("#gearItemTooltip")?.remove();
}

function setupQuestTooltips() {
  document.querySelectorAll(".questie-list:not(.compact) > li").forEach((entry) => {
    entry.addEventListener("mouseenter", (event) => showQuestTooltip(event, entry));
    entry.addEventListener("mousemove", (event) => {
      if (event.target.closest("[data-reward-id]")) return;
      if (!document.querySelector("#questPanelTooltip")) showQuestTooltip(event, entry);
      else positionQuestTooltip(event);
    });
    entry.addEventListener("mouseleave", hideQuestTooltip);
  });
}

function setupQuestChains() {
  Object.entries(QUEST_CHAINS).forEach(([targetId, steps]) => {
    const entry = document.querySelector(`[data-guide-id="${targetId}"]`);
    const title = entry?.querySelector(".questie-quest-title");
    if (!entry || !title) return;
    const chain = document.createElement("div");
    chain.className = "quest-chain";
    chain.setAttribute("aria-label", "Quest chain");
    steps.forEach((step, index) => {
      const chainId = `${targetId}:${index}`;
      const button = document.createElement("button");
      button.className = "quest-chain-step";
      button.type = "button";
      button.dataset.chainId = chainId;
      button.dataset.stepNumber = String(index + 1);
      button.innerHTML = `<span>${index + 1}</span>${step.title}`;
      button.addEventListener("mouseenter", (event) => showChainQuestTooltip(event, step, index + 1, steps.length));
      button.addEventListener("mousemove", positionQuestTooltip);
      button.addEventListener("mouseleave", hideQuestTooltip);
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        if (completedGuideItems.has(chainId)) completedGuideItems.delete(chainId);
        else completedGuideItems.add(chainId);
        saveGuideProgress();
        updateGuideChecklist();
      });
      chain.append(button);
    });
    title.insertAdjacentElement("afterend", chain);
  });
}

function showChainQuestTooltip(event, step, number, total) {
  hideQuestTooltip();
  hideGearTooltip();
  const tooltip = document.createElement("div");
  tooltip.className = "quest-panel-tooltip";
  tooltip.id = "questPanelTooltip";
  tooltip.innerHTML = `
    <div class="quest-panel-header">
      <span>!</span>
      <div>
        <strong>${step.title}</strong>
        <small>Chain step ${number} of ${total}</small>
      </div>
    </div>
    <div class="quest-panel-location">
      <b>Start / location</b>
      <span>${step.location}</span>
    </div>
    <div class="quest-panel-section">
      <b>What to do</b>
      <p>${step.objective}</p>
    </div>
    <small class="quest-panel-hint">Click this chain step to mark it complete</small>
  `;
  document.body.append(tooltip);
  positionQuestTooltip(event);
}

function showQuestTooltip(event, entry) {
  hideQuestTooltip();
  hideGearTooltip();
  const title = entry.querySelector(".questie-quest-title strong")?.textContent ?? "Tracked objective";
  const description = entry.querySelector(":scope > p")?.innerHTML ?? "";
  const reward = entry.querySelector(".questie-reward")?.textContent ?? "";
  const levelRange = entry.closest(".plan-phase")?.querySelector(".plan-level span")?.textContent ?? "";
  const marker = entry.querySelector(".questie-marker")?.textContent?.trim() || "!";
  const tooltip = document.createElement("div");
  tooltip.className = "quest-panel-tooltip";
  tooltip.id = "questPanelTooltip";
  tooltip.innerHTML = `
    <div class="quest-panel-header">
      <span class="${marker === "!" ? "" : "objective"}">${marker}</span>
      <div>
        <strong>${title}</strong>
        <small>Recommended level ${levelRange}</small>
      </div>
    </div>
    <div class="quest-panel-section">
      <b>What to do</b>
      <p>${description}</p>
    </div>
    ${reward ? `<div class="quest-panel-reward"><b>Reward</b><span>${reward.replace(/^Reward(?: choice)?:\s*|^Drop:\s*/i, "")}</span></div>` : ""}
    <small class="quest-panel-hint">Hover the green reward text for item details</small>
  `;
  document.body.append(tooltip);
  positionQuestTooltip(event);
}

function positionQuestTooltip(event) {
  const tooltip = document.querySelector("#questPanelTooltip");
  if (!tooltip) return;
  const margin = 16;
  let left = event.clientX + margin;
  let top = event.clientY + margin;
  if (left + tooltip.offsetWidth > window.innerWidth - 10) {
    left = event.clientX - tooltip.offsetWidth - margin;
  }
  if (top + tooltip.offsetHeight > window.innerHeight - 10) {
    top = event.clientY - tooltip.offsetHeight - margin;
  }
  tooltip.style.left = `${Math.max(10, left)}px`;
  tooltip.style.top = `${Math.max(10, top)}px`;
}

function hideQuestTooltip() {
  document.querySelector("#questPanelTooltip")?.remove();
}

function setupRoadmapControls() {
  const rankSelect = document.querySelector("#roadmapRank");
  rankSelect.innerHTML = PVP_RANKS
    .map((name, rank) => `<option value="${rank}">${rank ? `Rank ${rank} — ` : ""}${name}</option>`)
    .join("");

  const numericBindings = {
    roadmapLevel: ["level", 1, 60],
    roadmapRank: ["rank", 0, 14],
    roadmapHonor: ["honor", 0, 25000],
    roadmapCapHonor: ["expectedCapHonor", 0, 25000],
    roadmapMarkAv: ["marks.av", 0, 999],
    roadmapMarkAb: ["marks.ab", 0, 999],
    roadmapMarkWsg: ["marks.wsg", 0, 999],
    roadmapMarkDarkspear: ["marks.darkspear", 0, 999],
  };

  Object.entries(numericBindings).forEach(([id, [path, min, max]]) => {
    const input = document.querySelector(`#${id}`);
    input.addEventListener("change", () => {
      const value = Math.min(max, Math.max(min, Number(input.value) || 0));
      setRoadmapValue(path, value);
      saveRoadmapState();
      render();
    });
  });

  document.querySelector("#roadmapWeeklyCap").addEventListener("change", (event) => {
    roadmapState.weeklyCapReached = event.target.checked;
    saveRoadmapState();
    render();
  });

  document.querySelector("#roadmapNewReset").addEventListener("click", () => {
    roadmapState.weeklyCapReached = false;
    saveRoadmapState();
    render();
    showToast("New reset started — cap Rank Points first");
  });

  document.querySelector(".roadmap-shell").addEventListener("click", (event) => {
    const completeButton = event.target.closest("[data-roadmap-complete]");
    const skipButton = event.target.closest("[data-roadmap-skip]");
    const undoButton = event.target.closest("[data-roadmap-undo]");
    if (completeButton) completeRoadmapAction(completeButton.dataset.roadmapComplete);
    if (skipButton) toggleSkippedRoadmapAction(skipButton.dataset.roadmapSkip);
    if (undoButton) undoRoadmapAction(undoButton.dataset.roadmapUndo);
  });
}

function syncRoadmapControls() {
  const values = {
    roadmapLevel: roadmapState.level,
    roadmapRank: roadmapState.rank,
    roadmapHonor: roadmapState.honor,
    roadmapCapHonor: roadmapState.expectedCapHonor,
    roadmapMarkAv: roadmapState.marks.av,
    roadmapMarkAb: roadmapState.marks.ab,
    roadmapMarkWsg: roadmapState.marks.wsg,
    roadmapMarkDarkspear: roadmapState.marks.darkspear,
  };
  Object.entries(values).forEach(([id, value]) => {
    const input = document.querySelector(`#${id}`);
    if (input && document.activeElement !== input) input.value = value;
  });
  document.querySelector("#roadmapWeeklyCap").checked = roadmapState.weeklyCapReached;
}

function setRoadmapValue(path, value) {
  if (path.startsWith("marks.")) {
    roadmapState.marks[path.split(".")[1]] = value;
  } else {
    roadmapState[path] = value;
  }
}

function completeRoadmapAction(actionId) {
  const action = ROADMAP_ACTIONS.find((candidate) => candidate.id === actionId);
  if (!action) return;
  if (action.type === "purchase" && (!actionAffordable(action) || actionBlockers(action).length)) {
    showToast("That purchase is not available from your current balance");
    return;
  }
  if (action.type === "purchase" && hasPurchaseCost(action)) {
    roadmapState.honor = Math.max(0, roadmapState.honor - action.honor);
    Object.entries(action.marks).forEach(([mark, amount]) => {
      roadmapState.marks[mark] = Math.max(0, roadmapState.marks[mark] - amount);
    });
    roadmapState.transactions[action.id] = {
      honor: action.honor,
      marks: { ...action.marks },
    };
  }
  if (!roadmapState.completed.includes(actionId)) roadmapState.completed.push(actionId);
  roadmapState.skipped = roadmapState.skipped.filter((id) => id !== actionId);
  if (action.rewardId) obtained.add(action.rewardId);
  saveRoadmapState();
  saveObtained();
  render();
  showToast(`${action.title} completed`);
}

function undoRoadmapAction(actionId) {
  const action = ROADMAP_ACTIONS.find((candidate) => candidate.id === actionId);
  if (!action) return;
  const transaction = roadmapState.transactions[actionId];
  if (transaction) {
    roadmapState.honor = Math.min(25000, roadmapState.honor + (transaction.honor ?? 0));
    Object.entries(transaction.marks ?? {}).forEach(([mark, amount]) => {
      roadmapState.marks[mark] = (roadmapState.marks[mark] ?? 0) + amount;
    });
    delete roadmapState.transactions[actionId];
  }
  roadmapState.completed = roadmapState.completed.filter((id) => id !== actionId);
  if (action.rewardId) obtained.delete(action.rewardId);
  saveRoadmapState();
  saveObtained();
  render();
  showToast(`${action.title} restored${transaction ? " and currency refunded" : ""}`);
}

function toggleSkippedRoadmapAction(actionId) {
  if (roadmapState.skipped.includes(actionId)) {
    roadmapState.skipped = roadmapState.skipped.filter((id) => id !== actionId);
  } else {
    roadmapState.skipped.push(actionId);
  }
  saveRoadmapState();
  render();
}

document.querySelector("#resetGearButton").addEventListener("click", () => {
  if (!window.confirm("Clear all gear, roadmap, and guide progress?")) return;
  obtained = new Set();
  completedGuideItems = new Set();
  roadmapState = defaultRoadmapState();
  saveObtained();
  saveGuideProgress();
  saveRoadmapState();
  render();
  updateGuideChecklist();
  showToast("All progress reset");
});

function setupGuideChecklist() {
  document.querySelectorAll("[data-guide-id]").forEach((entry) => {
    const button = document.createElement("button");
    button.className = "questie-complete";
    button.type = "button";
    button.innerHTML = '<span aria-hidden="true"></span><em>Done</em>';
    button.addEventListener("click", () => {
      const id = entry.dataset.guideId;
      if (completedGuideItems.has(id)) completedGuideItems.delete(id);
      else completedGuideItems.add(id);
      saveGuideProgress();
      updateGuideChecklist();
    });
    entry.append(button);
  });
  updateGuideChecklist();
}

function updateGuideChecklist() {
  document.querySelectorAll("[data-guide-id]").forEach((entry) => {
    const complete = completedGuideItems.has(entry.dataset.guideId);
    entry.classList.toggle("completed", complete);
    const button = entry.querySelector(".questie-complete");
    if (!button) return;
    button.classList.toggle("checked", complete);
    button.setAttribute("aria-pressed", String(complete));
    button.setAttribute("aria-label", complete ? "Mark objective incomplete" : "Mark objective complete");
    button.querySelector("span").textContent = complete ? "✓" : "";
  });
  document.querySelectorAll("[data-chain-id]").forEach((step) => {
    const complete = completedGuideItems.has(step.dataset.chainId);
    step.classList.toggle("completed", complete);
    step.setAttribute("aria-pressed", String(complete));
    step.querySelector("span").textContent = complete ? "✓" : step.dataset.stepNumber;
  });
}

function setupGearTabs() {
  const tabs = [...document.querySelectorAll("[data-gear-tab]")];
  const panels = [...document.querySelectorAll("[data-gear-panel]")];

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const selectedTab = tab.dataset.gearTab;
      tabs.forEach((candidate) => {
        const active = candidate === tab;
        candidate.classList.toggle("active", active);
        candidate.setAttribute("aria-selected", String(active));
      });
      panels.forEach((panel) => {
        const active = panel.dataset.gearPanel === selectedTab;
        panel.classList.toggle("active", active);
        panel.hidden = !active;
      });
      updateProgress();
    });
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", String(tab.classList.contains("active")));
  });
}

setupRoadmapControls();
render();
setupGearTabs();
setupQuestChains();
setupGuideChecklist();
setupQuestTooltips();
