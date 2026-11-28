const GEAR_STORAGE_KEY = "lightbind-shockadin-gear-v1";
const GUIDE_STORAGE_KEY = "lightbind-shockadin-guide-v1";
const ACTION_BAR_STORAGE_KEY = "lightbind-paladin-layout-v1";
const ICON_ROOT = "./assets/icons/";
const MYTHICSIM_SHOCKADIN_TALENTS = "05025210221021--0523330110130033";
const MYTHICSIM_PALADIN_TALENT_SPELL_IDS = [
  [
    20205, 20262, 20237, 1310899, 20224, 429144, 20216, 20210, 1237268,
    1310904, 426065, 1328548, 1310905, 1311606, 1328550, 5923, 1310911,
  ],
  [
    20257, 20127, 20189, 20174, 1224697, 1311015, 20487, 20150, 20143,
    1310994, 20468, 20096, 1328546, 20925, 20177, 1311034, 1328544,
  ],
  [
    20060, 20101, 25956, 20117, 1311074, 9452, 9453, 20375, 26022,
    9799, 1311087, 20111, 1328370, 20066, 20049, 1311084, 1310735,
  ],
];
const MYTHICSIM_SLOT_ORDER = [
  "Head",
  "Neck",
  "Shoulders",
  "Back",
  "Chest",
  "Wrists",
  "Hands",
  "Waist",
  "Legs",
  "Feet",
  "Finger 1",
  "Finger 2",
  "Trinket 1",
  "Trinket 2",
  "Two-Hand",
  "Libram",
];
const MYTHICSIM_ENCHANTS = {
  "pvp-starter": {
    Head: 1506,
    Neck: 8218,
    Back: 7667,
    Chest: 1891,
    Wrists: 7665,
    Hands: 7646,
    Legs: 8492,
    Feet: 8492,
    "Two-Hand": 37,
  },
  "pre-raid": {
    Head: 1506,
    Neck: 8218,
    Back: 7667,
    Chest: 1891,
    Wrists: 7665,
    Hands: 7646,
    Legs: 8492,
    Feet: 8492,
    "Two-Hand": 7662,
  },
  "pre-raid-degen": {
    Head: 1506,
    Neck: 8218,
    Back: 7667,
    Chest: 1891,
    Wrists: 7665,
    Hands: 7646,
    Legs: 8492,
    Feet: 8492,
    "Two-Hand": 7662,
  },
};

const QUEST_CHAINS = {
  "ice-barbed-spear": [
    questStep("The Battle of Alterac", "Prospector Stonehewer · Alterac Mountains (40.6, 79.6)", "Enter Alterac Valley and defeat Drek’Thar by winning the battleground, then return to Stonehewer."),
    questStep("Hero of the Stormpike", "Prospector Stonehewer · Alterac Mountains (40.6, 79.6)", "Accept the immediate follow-up and select Ice Barbed Spear."),
  ],
  "sanctified-orb": [
    questStep("Dispelling Evil", "High Priest Thel'danis · Western Plaguelands (52.1, 83.3)", "Complete the Paladin class quest at Chillwind Point."),
    questStep("Inert Scourgestones", "High Priest Thel'danis · Western Plaguelands (52.1, 83.3)", "Carry the Inert Scourgestone to Commander Ashlam Valorfist at Chillwind Point (42.7, 84.0)."),
    questStep("Forging the Mightstone", "Commander Ashlam Valorfist · Western Plaguelands (42.7, 84.0)", "Kill Gasher, Mijan, Zolo, Hukku, Zul'lor, and Loro in the Sunken Temple for two feathers of each color, then select Sanctified Orb."),
  ],
  "blood-martyr": [
    questStep("Medallion of Faith", "Chest · living-side Stratholme", "Loot the Medallion of Faith from its chest."),
    questStep("Aurius", "Alonsus Chapel · Stratholme", "Give the Medallion of Faith to Aurius before fighting Baron Rivendare."),
    questStep("Baron Rivendare", "Undead-side Stratholme", "Defeat Baron Rivendare, then speak to Aurius and collect Blood of the Martyr."),
  ],
};

const SET_BONUS_RULES = {
  "Lieutenant Commander's Vindication": [
    { pieces: 2, label: "2p: +23 Spell Damage/Healing", stats: { spellDamage: 23, healing: 23 } },
    { pieces: 4, label: "4p: −10 sec Hammer of Justice cooldown" },
    { pieces: 6, label: "6p: +20 Stamina", stats: { stamina: 20 } },
  ],
  "Field Marshal's Vindication": [
    { pieces: 2, label: "2p: +20 Stamina", stats: { stamina: 20 } },
    { pieces: 3, label: "3p: −10 sec Hammer of Justice cooldown" },
    { pieces: 6, label: "6p: +23 Spell Damage/Healing", stats: { spellDamage: 23, healing: 23 } },
  ],
  "Lightforge Armor": [
    { pieces: 2, label: "2p: +8 All Resistances", stats: { resistance: 8 } },
    { pieces: 3, label: "3p: +18 Spell Damage/Healing", stats: { spellDamage: 18, healing: 18 } },
    { pieces: 4, label: "4p: 7% spell-silence retaliation" },
    { pieces: 5, label: "5p: chance to gain +65 Spell Damage/Healing" },
    { pieces: 6, label: "6p: +8 Mana per 5 sec", stats: { mp5: 8 } },
  ],
  "Soulforge Armor": [
    { pieces: 2, label: "2p: +8 All Resistances", stats: { resistance: 8 } },
    { pieces: 3, label: "3p: +8 Mana per 5 sec", stats: { mp5: 8 } },
    { pieces: 4, label: "4p: chance to gain +65 Spell Damage/Healing" },
    { pieces: 5, label: "5p: 7% spell-silence retaliation" },
    { pieces: 6, label: "6p: +23 Spell Damage/Healing", stats: { spellDamage: 23, healing: 23 } },
  ],
};

const SUMMARY_STATS = [
  ["armor", "Armor"],
  ["strength", "Strength"],
  ["attackPower", "Attack Power"],
  ["agility", "Agility"],
  ["stamina", "Stamina"],
  ["intellect", "Intellect"],
  ["spirit", "Spirit"],
  ["hit", "Hit Chance"],
  ["expertise", "Expertise"],
  ["criticalStrike", "Critical Strike Chance"],
  ["spellDamage", "Spell Damage"],
  ["healing", "Healing"],
  ["spellPenetration", "Spell Penetration"],
  ["mp5", "Mana / 5 sec"],
  ["resistance", "All Resistances"],
];

const PVP_CONSUMABLES = [
  consumable("pvp-major-healing-draught", "Major Healing Draught", "BG recovery", "./assets/icons/forever-134818.png", "Requires Level 45 · Use: Restores 980 to 1,260 health · Battlegrounds only · Shares the normal potion cooldown category · 5 Min Cooldown", "PvP quartermaster"),
  consumable("pvp-major-mana-draught", "Major Mana Draught", "BG recovery", "./assets/icons/forever-134860.png", "Requires Level 45 · Use: Restores 980 to 1,260 mana · Battlegrounds only · Shares the normal potion cooldown category · 5 Min Cooldown", "PvP quartermaster"),
  consumable("pvp-major-healing-potion", "Major Healing Potion", "Macro fallback", "./assets/icons/forever-134834.png", "Requires Level 45 · Use: Restores 1,050 to 1,750 health · Normal-world fallback for the smart healing macro · Shares its cooldown family with Battleground draughts · 2 Min Cooldown", "Alchemy"),
  consumable("pvp-major-mana-potion", "Major Mana Potion", "Macro fallback", "./assets/icons/forever-134856.png", "Requires Level 49 · Use: Restores 1,350 to 2,250 mana · Normal-world fallback for the smart mana macro · Shares its cooldown family with Battleground draughts · 2 Min Cooldown", "Alchemy"),
  consumable("pvp-major-rejuvenation", "Major Rejuvenation Potion", "Optional recovery", "inv_potion_47", "Requires Level 50 · Use: Restores 1,440 to 1,760 health and mana · Expensive combined emergency option · 2 Min Cooldown", "Alchemy"),
  consumable("pvp-healthstone", "Major Healthstone", "Separate recovery", "./assets/icons/forever-135230.png", "Use: Restores 1,440 health · Separate from the potion cooldown · 2 Min Cooldown", "Warlock"),
  consumable("pvp-swiftness", "Swiftness Potion", "Mobility", "inv_potion_95", "Requires Level 5 · Use: Increases run speed by 50% for 15 sec · Shares the potion cooldown · 2 Min Cooldown", "Alchemy"),
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
    note: "Draughts and normal potions share one potion family; Healthstone and bandage are separate",
    ids: [
      "pvp-major-healing-draught", "pvp-major-mana-draught",
      "pvp-major-healing-potion", "pvp-major-mana-potion",
      "pvp-major-rejuvenation", "pvp-healthstone", "pvp-bandage",
    ],
  },
  {
    title: "Mobility and defensive utility",
    note: "Choose speed or protection according to the battleground and enemy damage",
    ids: ["pvp-swiftness", "pvp-protection-potions"],
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
  "pvp-major-healing-draught": lockout("POTION FAMILY · 5M", "potion"),
  "pvp-major-mana-draught": lockout("POTION FAMILY · 5M", "potion"),
  "pvp-major-healing-potion": lockout("POTION FAMILY · 2M", "potion"),
  "pvp-major-mana-potion": lockout("POTION FAMILY · 2M", "potion"),
  "pvp-major-rejuvenation": lockout("POTION FAMILY · 2M", "potion"),
  "pvp-healthstone": lockout("HEALTHSTONE · SEPARATE 2M", "separate"),
  "pvp-swiftness": lockout("POTION FAMILY · 2M", "potion"),
  "pvp-bandage": lockout("BANDAGE · 60S LOCKOUT", "separate"),
  "pvp-thorium-grenade": lockout("EXPLOSIVE · SHARED 1M", "engineering"),
  "pvp-arcane-bomb": lockout("EXPLOSIVE · SHARED 1M", "engineering"),
  "pvp-protection-potions": lockout("POTION FAMILY · 2M", "potion"),
  "raid-spellblasting": lockout("POTION FAMILY · 2M", "potion"),
  "raid-mana": lockout("POTION FAMILY · 2M", "potion"),
  "raid-healing": lockout("POTION FAMILY · 2M", "potion"),
  "raid-rejuvenation": lockout("POTION FAMILY · 2M", "potion"),
  "raid-healthstone": lockout("HEALTHSTONE · SEPARATE 2M", "separate"),
  "raid-protection-potions": lockout("POTION FAMILY · 2M", "potion"),
  "raid-thorium-grenade": lockout("EXPLOSIVE · SHARED 1M", "engineering"),
  "raid-sapper": lockout("EXPLOSIVE · 1M SHARED / 5M SELF", "engineering"),
  "raid-bandage": lockout("BANDAGE · 60S LOCKOUT", "separate"),
};

const leftSlots = [
  slot("head", "Head", "./assets/icons/item-272743.jpg", [
    item("vindication-head", "Premier Chevalier Headguard", "PvP · Level 55 · Honor + Marks", {
      itemId: 272743,
      icon: "./assets/icons/item-272743.jpg",
      quality: "Rare",
      enchant: enchant("BUDGET", "Lesser Arcanum of Constitution · +100 Health", "budget"),
      tooltip: vindicationTooltip("509 Armor · +25 Stamina · +11 Strength · +7 Intellect · +7 Critical Strike · +7 Spell Power"),
    }),
  ]),
  slot("neck", "Neck", "./assets/icons/emberfury-talisman.jpg", [
    item("emberfury-talisman", "Emberfury Talisman", "UBRS · Pyroguard Emberseer", {
      itemId: 12929,
      icon: "./assets/icons/emberfury-talisman.jpg",
      quality: "Rare",
      enchant: enchant("OPTIMAL", "Necklace Spell Power · +6 Spell Power", "final", "Necklace Strength · +5 Strength"),
      tooltip: "Item Level 61 · Binds when picked up · Neck · +8 Stamina · +7 Fire Resistance · +14 Critical Strike · +6 Spell Power · Requires Level 56",
    }),
  ]),
  slot("shoulders", "Shoulders", "./assets/icons/item-272745.jpg", [
    item("vindication-shoulders", "Premier Chevalier Shoulders", "PvP · Level 55 · Honor + Marks", {
      itemId: 272745,
      icon: "./assets/icons/item-272745.jpg",
      quality: "Rare",
      tooltip: vindicationTooltip("470 Armor · +19 Stamina · +11 Strength · +5 Intellect · +7 Spell Power"),
    }),
  ]),
  slot("back", "Back", "./assets/icons/shroud-of-the-exile.jpg", [
    item("shroud-of-the-exile", "Shroud of the Exile", "In Dreams quest", {
      itemId: 15421,
      icon: "./assets/icons/shroud-of-the-exile.jpg",
      quality: "Rare",
      enchant: enchant("OPTIMAL", "Cloak Agility · +5 Agility", "final", "+3 Agility"),
      tooltip: "Item Level 63 · Binds when picked up · Back · 45 Armor · +10 Intellect · +7 Spirit · +7 Stamina · +12 Spell Power",
    }),
  ]),
  slot("chest", "Chest", "./assets/icons/item-272742.jpg", [
    item("vindication-chest", "Premier Chevalier Breastplate", "PvP · Level 55 · Honor + Marks", {
      itemId: 272742,
      icon: "./assets/icons/item-272742.jpg",
      quality: "Rare",
      enchant: enchant("BUDGET", "Greater Stats · +4 All Stats", "budget"),
      tooltip: vindicationTooltip("627 Armor · +25 Stamina · +11 Strength · +11 Intellect · +7 Critical Strike"),
    }),
  ]),
  slot("wrists", "Wrists", "./assets/icons/item-272778.jpg", [
    item("epic-vindication-wrists", "Premier Knight-Captain's Chevalier Armguards", "PvP · Rank 8 seal upgrade", {
      itemId: 272778,
      icon: "./assets/icons/item-272778.jpg",
      quality: "Epic",
      enchant: enchant("OPTIMAL", "Greater Spellpower · +16 Spell Power", "final", "+9 Strength"),
      tooltip: "Item Level 65 · Binds when picked up · Wrist · Plate · 323 Armor · +12 Strength · +20 Stamina · +7 Intellect · Requires Level 60",
    }),
  ]),
  slot("weapon", "Two-Hand", "./assets/icons/unstoppable-force.jpg", [
    item("unstoppable-force", "The Unstoppable Force", "Alterac Valley", {
      itemId: 19323,
      icon: "./assets/icons/unstoppable-force.jpg",
      quality: "Epic",
      enchant: enchant("OPTIMAL PVP", "Steel Weapon Chain · Immune to Disarm", "final"),
      tooltip: "Item Level 60 · Binds when picked up · Unique · Two-Hand Mace · 152–255 Damage · Speed 3.60 · +18 Strength · +17 Stamina · +28 Critical Strike · Chance on hit: Stuns target for 1 sec · Requires Level 55",
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
  slot("hands", "Hands", "./assets/icons/item-272719.jpg", [
    item("vindication-hands", "Premier Chevalier Gauntlets", "PvP · Level 55 · Honor + Marks", {
      itemId: 272719,
      icon: "./assets/icons/item-272719.jpg",
      quality: "Rare",
      enchant: enchant("BUDGET", "Mystic Heavy Armor Kit · +4 Spell Power / +24 Armor", "budget"),
      tooltip: vindicationTooltip("392 Armor · +19 Stamina · +11 Strength · +5 Intellect · +7 Spell Power · Increases the duration of Repentance by 1 sec"),
    }),
  ]),
  slot("waist", "Waist", "./assets/icons/item-272779.jpg", [
    item("epic-vindication-waist", "Premier Knight-Captain's Chevalier Belt", "PvP · Rank 8 seal upgrade", {
      itemId: 272779,
      icon: "./assets/icons/item-272779.jpg",
      quality: "Epic",
      tooltip: "Item Level 65 · Binds when picked up · Waist · Plate · 415 Armor · +17 Strength · +26 Stamina · +10 Intellect · Requires Level 60",
    }),
  ]),
  slot("legs", "Legs", "./assets/icons/item-272744.jpg", [
    item("vindication-legs", "Premier Chevalier Leggings", "PvP · Level 55 · Honor + Marks", {
      itemId: 272744,
      icon: "./assets/icons/item-272744.jpg",
      quality: "Rare",
      enchant: enchant("BUDGET", "Mystic Heavy Armor Kit · +4 Spell Power / +24 Armor", "budget"),
      tooltip: vindicationTooltip("548 Armor · +25 Stamina · +13 Strength · +7 Critical Strike · +7 Spell Power"),
    }),
  ]),
  slot("feet", "Feet", "./assets/icons/item-272718.jpg", [
    item("vindication-boots", "Premier Chevalier Sabatons", "PvP · Level 55 · Honor + Marks", {
      itemId: 272718,
      icon: "./assets/icons/item-272718.jpg",
      quality: "Rare",
      enchant: enchant("BUDGET", "Mystic Heavy Armor Kit · +4 Spell Power / +24 Armor", "budget"),
      tooltip: vindicationTooltip("431 Armor · +19 Stamina · +10 Strength · +7 Intellect · +7 Spell Power"),
    }),
  ]),
  slot("ring-one", "Finger 1", "./assets/icons/don-julios-band.jpg", [
    item("don-julios-band", "Don Julio's Band", "Alterac Valley · Stormpike Guard Exalted", {
      itemId: 19325,
      icon: "./assets/icons/don-julios-band.jpg",
      quality: "Epic",
      tooltip: "Item Level 60 · Binds when picked up · Unique-Equipped: Band of Don (1) · Finger · +10 Stamina · +10 Hit · +14 Critical Strike · +14 Attack Power · Requires Level 55",
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
  slot("trinket-two", "Trinket 2", "./assets/icons/sanctified-orb.jpg", [
    item("sanctified-orb", "Sanctified Orb", "Forging the Mightstone quest", {
      itemId: 20512,
      icon: "./assets/icons/sanctified-orb.jpg",
      quality: "Rare",
      tooltip: "Item Level 52 · Binds when picked up · Unique · Trinket · +15 Spell Power · Use: Restores 319 to 361 mana, doubled in Wasteland or Haunted areas · 5 Min Cooldown",
    }),
  ]),
];

const preRaidLeftSlots = leftSlots.map((gearSlot) => {
  if (gearSlot.id === "head") {
    return slot("pre-raid-head", "Head", "./assets/icons/grand-crusaders-helm.jpg", [
      item("grand-crusaders-helm", "Grand Crusader's Helm", "Stratholme Live · Balnazzar", {
        itemId: 18718,
        icon: "./assets/icons/grand-crusaders-helm.jpg",
        quality: "Rare",
        enchant: enchant("OPTIMAL", "Lesser Arcanum of Voracity · +8 Strength", "final", "Lesser Arcanum of Constitution · +100 Health"),
        tooltip: "Item Level 63 · Binds when picked up · Head · Plate · 534 Armor · +16 Strength · +16 Stamina · +10 Spirit · +10 Shadow Resistance · +17 Holy Spell Damage · Requires Level 58",
      }),
    ]);
  }
  if (gearSlot.id === "neck") {
    return slot("pre-raid-neck", "Neck", "./assets/icons/emberfury-talisman.jpg", [
      item("emberfury-talisman", "Emberfury Talisman", "UBRS · Pyroguard Emberseer", {
        itemId: 12929,
        icon: "./assets/icons/emberfury-talisman.jpg",
        quality: "Rare",
        enchant: enchant("OPTIMAL", "Necklace Spell Power · +6 Spell Power", "final", "Necklace Strength · +5 Strength"),
        tooltip: "Item Level 61 · Binds when picked up · Neck · +8 Stamina · +7 Fire Resistance · +14 Critical Strike · +6 Spell Power · Requires Level 56",
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
        enchant: enchant("OPTIMAL", "Cloak Agility · +5 Agility", "final", "+3 Agility"),
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
        enchant: enchant("OPTIMAL", "Greater Stats · +4 All Stats", "final"),
        tooltip: lightforgeTooltip("Item Level 63 · 657 Armor · +13 Strength · +21 Stamina · +16 Intellect · +8 Spirit · +7 Critical Strike"),
      }),
    ]);
  }
  if (gearSlot.id === "wrists") {
    return slot("pre-raid-wrists", "Wrists", "./assets/icons/battleborn-armbraces.jpg", [
      item("battleborn-armbraces", "Battleborn Armbraces", "UBRS · Warchief Rend Blackhand", {
        itemId: 12936,
        icon: "./assets/icons/battleborn-armbraces.jpg",
        quality: "Rare",
        enchant: enchant("OPTIMAL", "Greater Spellpower · +16 Spell Power", "final", "+9 Strength"),
        tooltip: "Item Level 63 · Binds when picked up · Wrist · Plate · 287 Armor · +7 Spirit · +10 Hit · +14 Critical Strike · Requires Level 58",
      }),
    ]);
  }
  if (gearSlot.id === "weapon") {
    return slot("pre-raid-weapon", "Two-Hand", "./assets/icons/unstoppable-force.jpg", [
      item("unstoppable-force", "The Unstoppable Force", "Alterac Valley", {
        itemId: 19323,
        icon: "./assets/icons/unstoppable-force.jpg",
        quality: "Epic",
        enchant: enchant("OPTIMAL", "Spellblasting · +65 Spell Power", "final", "Greater Impact · +7 Weapon Damage"),
        tooltip: "Item Level 60 · Binds when picked up · Unique · Two-Hand Mace · 152–255 Damage · Speed 3.60 · +18 Strength · +17 Stamina · +28 Critical Strike · Chance on hit: Stuns target for 1 sec · Requires Level 55",
      }),
    ]);
  }
  return gearSlot;
});

const preRaidRightSlots = rightSlots.map((gearSlot) => {
  if (gearSlot.id === "hands") {
    return slot("pre-raid-hands", "Hands", "./assets/icons/heartflame-gauntlets.jpg", [
      item("heartflame-gauntlets", "Heartflame Gauntlets", "Shaper's Terrace · Cinder / Vitrix", {
        itemId: 280028,
        icon: "./assets/icons/heartflame-gauntlets.jpg",
        quality: "Rare",
        enchant: enchant("OPTIMAL", "Holy Power · +20 Holy Damage", "final", "Mystic Heavy Armor Kit · +4 Spell Power / +24 Armor"),
        tooltip: "Item Level 63 · Binds when picked up · Hands · Plate · 410 Armor · +14 Intellect · +14 Critical Strike · +18 Holy Spell Damage · Requires Level 58",
      }),
    ]);
  }
  if (gearSlot.id === "waist") {
    return slot("pre-raid-waist", "Waist", "./assets/icons/lightforge-belt.jpg", [
      item("lightforge-belt", "Lightforge Belt", "BoE · Auction House", {
        itemId: 16723,
        icon: "./assets/icons/lightforge-belt.jpg",
        quality: "Rare",
        enchant: enchant("TINKER", "Nitro Boosts · Engineering 280 · up to +160% movement speed for up to 8 sec", "final"),
        tooltip: lightforgeTooltip("Item Level 58 · 341 Armor · +10 Strength · +9 Stamina · +15 Intellect · +5 Hit · +7 Spell Damage and Healing"),
      }),
    ]);
  }
  if (gearSlot.id === "legs") {
    return slot("pre-raid-legs", "Legs", "./assets/icons/item-272744.jpg", [
      item("vindication-legs", "Premier Chevalier Leggings", "PvP · Level 55 · Honor + Marks", {
        itemId: 272744,
        icon: "./assets/icons/item-272744.jpg",
        quality: "Rare",
        enchant: enchant("BUDGET", "Mystic Heavy Armor Kit · +4 Spell Power / +24 Armor", "budget"),
        tooltip: vindicationTooltip("548 Armor · +25 Stamina · +13 Strength · +7 Critical Strike · +7 Spell Power"),
      }),
    ]);
  }
  if (gearSlot.id === "feet") {
    return slot("pre-raid-feet", "Feet", "./assets/icons/item-272718.jpg", [
      item("vindication-boots", "Premier Chevalier Sabatons", "PvP · Level 55 · Honor + Marks", {
        itemId: 272718,
        icon: "./assets/icons/item-272718.jpg",
        quality: "Rare",
        enchant: enchant("BUDGET", "Mystic Heavy Armor Kit · +4 Spell Power / +24 Armor", "budget"),
        tooltip: vindicationTooltip("431 Armor · +19 Stamina · +10 Strength · +7 Intellect · +7 Spell Power"),
      }),
    ]);
  }
  if (gearSlot.id === "ring-one") {
    return slot("pre-raid-ring-one", "Finger 1", "./assets/icons/don-julios-band.jpg", [
      item("don-julios-band", "Don Julio's Band", "Alterac Valley · Stormpike Guard Exalted", {
        itemId: 19325,
        icon: "./assets/icons/don-julios-band.jpg",
        quality: "Epic",
        tooltip: "Item Level 60 · Binds when picked up · Unique-Equipped: Band of Don (1) · Finger · +10 Stamina · +10 Hit · +14 Critical Strike · +14 Attack Power · Requires Level 55",
      }),
    ]);
  }
  if (gearSlot.id === "ring-two") {
    return slot("pre-raid-ring-two", "Finger 2", "./assets/icons/jeremans-bauble.jpg", [
      item("jeremans-bauble", "Jereman's Bauble", "Mount Hyjal · Return to Jereman", {
        itemId: 275738,
        icon: "./assets/icons/jeremans-bauble.jpg",
        quality: "Rare",
        tooltip: "Item Level 61 · Binds when picked up · Finger · +11 Intellect · +7 Spirit · +15 Spell Power",
      }),
    ]);
  }
  if (gearSlot.id === "trinket-one") {
    return slot("pre-raid-trinket-one", "Trinket 1", "inv_jewelry_talisman_09", [
      item("draconic-emblem", "Draconic Infused Emblem", "UBRS · General Drakkisath", {
        itemId: 22268,
        icon: "inv_jewelry_talisman_09",
        quality: "Rare",
        tooltip: "Item Level 63 · Binds when picked up · Unique · Trinket · Requires Level 58 · Equip: Chance on harmful spellcast to gain +35 Spell Damage and Healing for 10 sec; spell damage is doubled against Dragonkin.",
      }),
    ]);
  }
  if (gearSlot.id === "trinket-two") {
    return slot("pre-raid-trinket-two", "Trinket 2", "./assets/icons/sanctified-orb.jpg", [
      item("sanctified-orb", "Sanctified Orb", "Forging the Mightstone quest", {
        itemId: 20512,
        icon: "./assets/icons/sanctified-orb.jpg",
        quality: "Rare",
        tooltip: "Item Level 52 · Binds when picked up · Unique · Trinket · +15 Spell Power · Use: Restores 319 to 361 mana, doubled in Wasteland or Haunted areas · 5 Min Cooldown",
      }),
    ]);
  }
  return gearSlot;
});

const preRaidDegenLeftSlots = preRaidLeftSlots.map((gearSlot) => {
  if (gearSlot.name === "Head") {
    return slot("pre-raid-degen-head", "Head", "inv_helmet_08", [
      item("soulforge-helm", "Soulforge Helm", "Dungeon Set 2 questline · final upgrade", {
        itemId: 226997,
        icon: "inv_helmet_08",
        quality: "Epic",
        enchant: enchant("OPTIMAL", "Lesser Arcanum of Voracity · +8 Strength", "final", "Lesser Arcanum of Constitution · +100 Health"),
        tooltip: soulforgeTooltip("Item Level 60 · Binds when picked up · Head · Plate · 556 Armor · +16 Strength · +17 Stamina · +17 Intellect · +12 Spirit · +14 Critical Strike · +14 Spell Power"),
      }),
    ]);
  }
  if (gearSlot.name === "Neck") {
    return slot("pre-raid-degen-neck", "Neck", "./assets/icons/nacreous-shell-necklace.jpg", [
      item("nacreous-shell-necklace", "Nacreous Shell Necklace", "Stratholme Live · Cannon Master Willey", {
        itemId: 22403,
        icon: "./assets/icons/nacreous-shell-necklace.jpg",
        quality: "Rare",
        enchant: enchant("OPTIMAL", "Necklace Spell Power · +6 Spell Power", "final", "Necklace Strength · +5 Strength"),
        tooltip: "Item Level 61 · Binds when picked up · Neck · +8 Intellect · +7 Stamina · +10 Hit · +9 Spell Power · Requires Level 56",
      }),
    ]);
  }
  if (gearSlot.name === "Shoulders") {
    return slot("pre-raid-degen-shoulders", "Shoulders", "inv_shoulder_10", [
      item("soulforge-spaulders", "Soulforge Spaulders", "Dungeon Set 2 questline · Anthion's Parting Words", {
        itemId: 226969,
        icon: "inv_shoulder_10",
        quality: "Rare",
        tooltip: soulforgeTooltip("Item Level 65 · Binds when picked up · Shoulder · Plate · 507 Armor · +10 Strength · +11 Stamina · +11 Intellect · +10 Expertise · +8 Spell Power"),
      }),
    ]);
  }
  if (gearSlot.name === "Chest") {
    return slot("pre-raid-degen-chest", "Chest", "inv_chest_plate03", [
      item("soulforge-chest", "Soulforge Chest", "Dungeon Set 2 questline · final upgrade", {
        itemId: 227000,
        icon: "inv_chest_plate03",
        quality: "Epic",
        enchant: enchant("OPTIMAL", "Greater Stats · +4 All Stats", "final"),
        tooltip: soulforgeTooltip("Item Level 60 · Binds when picked up · Chest · Plate · 684 Armor · +16 Strength · +17 Stamina · +17 Intellect · +12 Spirit · +14 Critical Strike · +14 Spell Power"),
      }),
    ]);
  }
  return gearSlot;
});

const preRaidDegenRightSlots = preRaidRightSlots.map((gearSlot) => {
  if (gearSlot.name === "Waist") {
    return slot("pre-raid-degen-waist", "Waist", "inv_belt_11", [
      item("soulforge-waist", "Soulforge Waist", "Dungeon Set 2 questline · Just Compensation", {
        itemId: 226994,
        icon: "inv_belt_11",
        quality: "Rare",
        enchant: enchant("TINKER", "Nitro Boosts · Engineering 280 · up to +160% movement speed for up to 8 sec", "final"),
        tooltip: soulforgeTooltip("Item Level 65 · Binds when picked up · Waist · Plate · 380 Armor · +10 Strength · +11 Stamina · +11 Intellect · +4 Mana per 5 sec · +12 Spell Power"),
      }),
    ]);
  }
  if (gearSlot.name === "Legs") {
    return slot("pre-raid-degen-legs", "Legs", "inv_pants_04", [
      item("epic-vindication-legs", "Premier Marshal's Chevalier Legplates", "PvP · Rank 10 seal upgrade", {
        itemId: 272784,
        icon: "inv_pants_04",
        quality: "Epic",
        enchant: enchant("OPTIMAL", "Mystic Rugged Armor Kit · +6 Spell Power / +40 Armor", "final", "Mystic Heavy Armor Kit · +4 Spell Power / +24 Armor"),
        tooltip: epicVindicationTooltip("646 Armor · +15 Strength · +34 Stamina · +14 Critical Strike · +14 Spell Power"),
      }),
    ]);
  }
  if (gearSlot.name === "Feet") {
    return slot("pre-raid-degen-feet", "Feet", "./assets/icons/item-272781.jpg", [
      item("epic-vindication-boots", "Premier Knight-Champion's Chevalier Boots", "PvP · Rank 9 seal upgrade", {
        itemId: 272781,
        icon: "./assets/icons/item-272781.jpg",
        quality: "Epic",
        enchant: enchant("OPTIMAL", "Mystic Rugged Armor Kit · +6 Spell Power / +40 Armor", "final", "Mystic Heavy Armor Kit · +4 Spell Power / +24 Armor"),
        tooltip: epicVindicationTooltip("507 Armor · +12 Strength · +26 Stamina · +8 Intellect · +14 Spell Power"),
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

const hadStoredGear = localStorage.getItem(GEAR_STORAGE_KEY) !== null;
let obtained = loadObtained();
let lockedObtained = new Set();
let completedGuideItems = loadSavedSet(GUIDE_STORAGE_KEY);
let toastTimer;

function questStep(title, location, objective) {
  return { title, location, objective };
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

function epicVindicationTooltip(stats) {
  return `Item Level 65 · ${stats} · Field Marshal's Vindication — (2) +20 Stamina · (3) −10 sec Hammer of Justice cooldown · (6) +23 Spell Damage and Healing`;
}

function lightforgeTooltip(stats) {
  return `${stats} · Lightforge Armor — (2) +8 All Resistances · (3) +18 Spell Damage and Healing · (4) 7% chance when struck by a harmful spell to silence the caster for 3 sec (60 sec cooldown) · (5) Chance on melee autoattack and spellcast to gain +65 Spell Damage and Healing for 10 sec · (6) +8 Mana per 5 sec`;
}

function soulforgeTooltip(stats) {
  return `${stats} · Soulforge Armor — (2) +8 All Resistances · (3) +8 Mana per 5 sec · (4) Chance on melee autoattack and spellcast to gain +65 Spell Damage and Healing for 10 sec · (5) 7% chance when struck by a harmful spell to silence the caster for 3 sec (60 sec cooldown) · (6) +23 Spell Damage and Healing`;
}

function slot(id, name, icon, items) {
  return { id, name, icon, items };
}

function iconUrl(icon) {
  if (icon.startsWith("./") || icon.startsWith("https://")) return icon;
  return `${ICON_ROOT}${icon}.jpg`;
}

function loadObtained() {
  const saved = loadSavedSet(GEAR_STORAGE_KEY);
  const migrations = [
    ["emberfury-owned-v1", "emberfury-talisman"],
    ["unstoppable-force-owned-v1", "unstoppable-force"],
    ["grand-crusaders-helm-owned-v1", "grand-crusaders-helm"],
    ["epic-pvp-wrists-owned-v1", "epic-vindication-wrists"],
    ["epic-pvp-belt-owned-v1", "epic-vindication-waist"],
    ["don-julios-band-owned-v1", "don-julios-band"],
  ];
  let changed = false;
  migrations.forEach(([migration, itemId]) => {
    const migrationKey = `${GEAR_STORAGE_KEY}-${migration}`;
    if (localStorage.getItem(migrationKey) !== "1") {
      saved.add(itemId);
      localStorage.setItem(migrationKey, "1");
      changed = true;
    }
  });
  const blueVindicationMigration = `${GEAR_STORAGE_KEY}-blue-vindication-owned-v1`;
  if (localStorage.getItem(blueVindicationMigration) !== "1") {
    [
      "epic-vindication-head",
      "epic-vindication-shoulders",
      "epic-vindication-chest",
      "epic-vindication-hands",
      "epic-vindication-legs",
      "epic-vindication-boots",
    ].forEach((itemId) => saved.delete(itemId));
    [
      "vindication-head",
      "vindication-shoulders",
      "vindication-chest",
      "vindication-hands",
      "vindication-legs",
      "vindication-boots",
    ].forEach((itemId) => saved.add(itemId));
    localStorage.setItem(blueVindicationMigration, "1");
    changed = true;
  }
  if (changed) {
    localStorage.setItem(GEAR_STORAGE_KEY, JSON.stringify([...saved]));
  }
  return saved;
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

function candidateMarkup(candidate, compact = false) {
  const checked = obtained.has(candidate.id);
  const pending = !candidate.trackable;
  const locked = lockedObtained.has(candidate.id);
  const disabled = pending || locked;
  const icon = candidate.icon ?? "inv_misc_questionmark";
  return `
    <label class="gear-candidate${checked ? " obtained" : ""}${pending ? " pending" : ""}${locked ? " locked-obtained" : ""}${compact ? " compact" : ""}">
      <input
        type="checkbox"
        data-item-id="${candidate.id}"
        ${checked ? "checked" : ""}
        ${disabled ? "disabled" : ""}
        ${locked ? 'title="Saved as obtained in your profile"' : ""}
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
  const displayItem = gearSlot.items[0];
  return `
    <article class="gear-slot-card" data-slot="${gearSlot.id}"${displayItem ? ` data-gear-id="${displayItem.id}"` : ""}>
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
  document.querySelector("#preRaidDegenGearLeft").innerHTML = preRaidDegenLeftSlots.map(slotMarkup).join("");
  document.querySelector("#preRaidDegenGearRight").innerHTML = preRaidDegenRightSlots.map(slotMarkup).join("");
  document.querySelector("#pvpConsumables").innerHTML = consumableGroupsMarkup(PVP_CONSUMABLE_GROUPS, PVP_CONSUMABLES);
  document.querySelector("#raidConsumables").innerHTML = consumableGroupsMarkup(RAID_CONSUMABLE_GROUPS, RAID_CONSUMABLES);
  document.querySelector("#degenRaidConsumables").innerHTML = consumableGroupsMarkup(RAID_CONSUMABLE_GROUPS, RAID_CONSUMABLES);
  document.querySelector("#pvpStatRecap").innerHTML = loadoutSummaryMarkup(leftSlots, rightSlots);
  document.querySelector("#preRaidStatRecap").innerHTML = loadoutSummaryMarkup(preRaidLeftSlots, preRaidRightSlots);
  document.querySelector("#preRaidDegenStatRecap").innerHTML = loadoutSummaryMarkup(preRaidDegenLeftSlots, preRaidDegenRightSlots);
  bindTooltips();
  updateProgress();
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
  if (stat === "expertise") return `+${trimDecimals(value / 10)}%`;
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
    addStatMatch(totals, segment, /\+(\d+)\s+Attack Power/i, "attackPower");
    addStatMatch(totals, segment, /\+(\d+)\s+Agility/i, "agility");
    addStatMatch(totals, segment, /\+(\d+)\s+Stamina/i, "stamina");
    addStatMatch(totals, segment, /\+(\d+)\s+Intellect/i, "intellect");
    addStatMatch(totals, segment, /\+(\d+)\s+Spirit/i, "spirit");
    addStatMatch(totals, segment, /\+(\d+)\s+Hit/i, "hit");
    addStatMatch(totals, segment, /\+(\d+)\s+Expertise/i, "expertise");
    addStatMatch(totals, segment, /\+(\d+)\s+(?:Critical Strike|Crit Rating)/i, "criticalStrike");
    addStatMatch(totals, segment, /\+(\d+)\s+Spell Penetration/i, "spellPenetration");
    addStatMatch(totals, segment, /\+?(\d+)\s+(?:Mana per 5 sec|mana per 5 sec)/i, "mp5");

    const sharedPower = segment.match(/\+(\d+)\s+(?:Spell Power|Spell Damage and Healing|Holy Spell Damage)/i);
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
  if (document.querySelector('[data-gear-tab="pre-raid-degen"]')?.classList.contains("active")) {
    return [preRaidDegenLeftSlots, preRaidDegenRightSlots];
  }
  if (document.querySelector('[data-gear-tab="pre-raid"]')?.classList.contains("active")) {
    return [preRaidLeftSlots, preRaidRightSlots];
  }
  return [leftSlots, rightSlots];
}

function mythicSimExport(loadoutId) {
  const loadouts = {
    "pvp-starter": [leftSlots, rightSlots],
    "pre-raid": [preRaidLeftSlots, preRaidRightSlots],
    "pre-raid-degen": [preRaidDegenLeftSlots, preRaidDegenRightSlots],
  };
  const [left, right] = loadouts[loadoutId] ?? loadouts["pvp-starter"];
  const slotsByName = new Map([...left, ...right].map((gearSlot) => [gearSlot.name, gearSlot]));
  const items = MYTHICSIM_SLOT_ORDER.flatMap((slotName) => {
    const candidate = slotsByName.get(slotName)?.items[0];
    if (!candidate?.itemId) return [];
    const exported = { id: candidate.itemId };
    const enchantId = MYTHICSIM_ENCHANTS[loadoutId]?.[slotName];
    if (enchantId) exported.enchant = enchantId;
    return [exported];
  });

  return JSON.stringify({
    name: {
      "pvp-starter": "Grimar PvP",
      "pre-raid": "Grimar Pre-raid",
      "pre-raid-degen": "Grimar Pre-Raid Degen",
    }[loadoutId] ?? "Grimar PvP",
    realm: "",
    flavor: "forever",
    race: "Human",
    class: "paladin",
    level: 60,
    talents: MYTHICSIM_SHOCKADIN_TALENTS,
    mythicsim: {
      clientBuild: "70707",
      talentSource: "traits",
      talentSpells: mythicSimTalentSpells(MYTHICSIM_SHOCKADIN_TALENTS),
    },
    professions: [{ name: "Engineering", level: 300 }],
    gear: { items },
  }, null, 2);
}

function mythicSimTalentSpells(talents) {
  const ranksByTree = talents.split("-");
  return MYTHICSIM_PALADIN_TALENT_SPELL_IDS.map((spellIds, treeIndex) => {
    const ranks = ranksByTree[treeIndex] || "";
    return spellIds.map((spellId, nodeIndex) => [
      spellId,
      Number(ranks[nodeIndex] || 0),
    ]);
  });
}

async function copyMythicSimText(textarea) {
  try {
    await navigator.clipboard.writeText(textarea.value);
  } catch {
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
  }
  showToast("MythicSim export copied");
}

function setupMythicSimExport() {
  const dialog = document.querySelector("#mythicSimExportDialog");
  const textarea = document.querySelector("#mythicSimExportText");
  const title = document.querySelector("#mythicSimExportTitle");

  document.querySelectorAll("[data-mythicsim-export]").forEach((button) => {
    button.addEventListener("click", () => {
      const loadoutId = button.dataset.mythicsimExport;
      textarea.value = mythicSimExport(loadoutId);
      title.textContent = {
        "pvp-starter": "Export PvP loadout",
        "pre-raid": "Export pre-raid loadout",
        "pre-raid-degen": "Export Pre-Raid Degen loadout",
      }[loadoutId] ?? "Export loadout";
      dialog.showModal();
      textarea.focus();
      textarea.select();
    });
  });

  document.querySelector("#copyMythicSimExport").addEventListener("click", () => {
    copyMythicSimText(textarea);
  });
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
  if (lockedObtained.has(input.dataset.itemId)) return;
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
    ...preRaidDegenLeftSlots.flatMap((gearSlot) => gearSlot.items),
    ...preRaidDegenRightSlots.flatMap((gearSlot) => gearSlot.items),
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
      const effect = /^(Equip:|Use:|Chance|Increases|Reduces|Harmful|doubled|\(\d+\))/i.test(line);
      const itemLevel = /^Item Level/i.test(line);
      const bonusClass = setBonus ? ` ${setBonusClass(line, equippedPieces)}` : "";
      return `<span class="${effect ? `wow-effect${setBonus ? ` wow-set-bonus${bonusClass}` : ""}` : itemLevel ? "wow-item-level" : "wow-stat"}">${highlightItemStats(line)}</span>`;
    })
    .join("");
}

function highlightItemStats(line) {
  return line
    .replace(
      /(\+\d+%?\s+(?:Healing|Spell Power|Spell Penetration|(?:Holy )?Spell Damage(?: and Healing)?))/gi,
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
      /(\+\d+\s+Expertise)/gi,
      '<span class="wow-green-stat">$1</span>',
    )
    .replace(
      /(\+\d+\s+Parry)/gi,
      '<span class="wow-green-stat">$1</span>',
    )
    .replace(
      /(\+\d+\s+Shadow Resistance)/gi,
      '<span class="wow-green-stat">$1</span>',
    )
    .replace(
      /(\+\d+\s+(?:Critical Strike|Crit Rating))/gi,
      '<span class="wow-green-stat">$1</span>',
    )
    .replace(
      /(\+\d+\s+Attack Power)/gi,
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

async function saveRepositoryProfile() {
  if (!window.showSaveFilePicker) {
    showToast("Profile-file saving requires Chrome or Edge");
    return;
  }
  let actionBars = null;
  try {
    actionBars = JSON.parse(localStorage.getItem(ACTION_BAR_STORAGE_KEY));
  } catch {
    actionBars = null;
  }
  if (!actionBars?.layouts || (actionBars.version ?? 0) < 18) {
    const response = await fetch("./grimar-layout-2026-11-12.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Could not load action-bar preset");
    actionBars = await response.json();
  }
  const profile = {
    app: "Grimar",
    format: "repository-profile",
    version: 2,
    savedAt: new Date().toISOString(),
    actionBars,
    lockedObtainedGear: [...lockedObtained],
    obtainedGear: [...obtained],
    completedGuideItems: [...completedGuideItems],
  };
  const handle = await window.showSaveFilePicker({
    suggestedName: "grimar-profile.json",
    types: [{
      description: "Grimar profile",
      accept: { "application/json": [".json"] },
    }],
  });
  const writable = await handle.createWritable();
  await writable.write(`${JSON.stringify(profile, null, 2)}\n`);
  await writable.close();
  showToast("grimar-profile.json updated");
}

async function hydrateRepositoryProfile() {
  const response = await fetch("./grimar-profile.json", { cache: "no-store" });
  if (!response.ok) return;
  const profile = await response.json();
  if (profile?.format !== "repository-profile") return;
  const profileObtained = Array.isArray(profile.obtainedGear)
    ? new Set(profile.obtainedGear)
    : new Set();
  lockedObtained = new Set(
    Array.isArray(profile.lockedObtainedGear)
      ? profile.lockedObtainedGear
      : profile.obtainedGear ?? [],
  );
  if (Array.isArray(profile.obtainedGear)) {
    if (!hadStoredGear) obtained = profileObtained;
    lockedObtained.forEach((itemId) => obtained.add(itemId));
    saveObtained();
  }
  if (!hadStoredGear && Array.isArray(profile.completedGuideItems)) {
    completedGuideItems = new Set(profile.completedGuideItems);
    saveGuideProgress();
  }
  render();
  updateGuideChecklist();
}

document.querySelector("#saveProfileButton").addEventListener("click", () => {
  saveRepositoryProfile().catch((error) => {
    if (error?.name === "AbortError") return;
    console.error(error);
    showToast("Could not save profile file");
  });
});

document.querySelector("#resetGearButton").addEventListener("click", () => {
  if (!window.confirm("Clear all gear and guide progress?")) return;
  obtained = new Set(lockedObtained);
  completedGuideItems = new Set();
  saveObtained();
  saveGuideProgress();
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

render();
setupGearTabs();
hydrateRepositoryProfile().catch(console.error);
setupMythicSimExport();
setupQuestChains();
setupGuideChecklist();
setupQuestTooltips();
