const STORAGE_KEY = "lightbind-paladin-layout-v1";
const barSizes = { main: 12, numberRow: 8, nagaBase: 12, nagaShift: 12, mouse: 1 };
const barKeys = {
  main: ["1", "2", "3", "4", "Q", "E", "F", "C", "S+Q", "S+E", "S+F", "S+C"],
  numberRow: ["5", "6", "7", "8", "9", "0", "-", "="],
  nagaBase: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  nagaShift: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11", "S12"],
  mouse: ["M3"],
};
const layoutModes = ["pvp", "pve", "pvpReckoning"];
const modeNames = {
  pvp: "PvP - Shock",
  pve: "PvE",
  pvpReckoning: "PvP - Reckoning",
};
const presetPaths = {
  default: "./grimar-layout-2026-11-12.json",
};

const spellMap = new Map(spells.map((spell) => [spell.id, spell]));
const spellAliases = { "turn-evil": "turn-undead" };
let activeFilter = "All";
let query = "";
let dragPayload = null;
let toastTimer;

const storedState = loadLayouts();
let activeMode = storedState.activeMode;
let layouts = storedState.layouts;
let layout = layouts[activeMode];

const spellList = document.querySelector("#spellList");
const spellCount = document.querySelector("#spellCount");
const searchInput = document.querySelector("#searchInput");
const toast = document.querySelector("#toast");
const exportDialog = document.querySelector("#exportDialog");
const exportText = document.querySelector("#exportText");
const macroExportDialog = document.querySelector("#macroExportDialog");
const accountMacrosText = document.querySelector("#accountMacrosText");
const characterMacrosText = document.querySelector("#characterMacrosText");
const presetSelect = document.querySelector("#presetSelect");

const macroExportNames = {
  "macro-self-holy-shock": "ShockHeal",
  "macro-mouseover-flash-light": "FlashMouse",
  "macro-mouseover-holy-light": "HolyLightMouse",
  "macro-mouseover-freedom": "FreedomMouse",
  "macro-mouseover-protection": "BoPMouse",
  "macro-mouseover-cleanse": "CleanseMouse",
  "macro-mouseover-lay-on-hands": "LoHMouse",
  "macro-mouseover-sacrifice": "SacMouse",
  "macro-mouseover-divine-intervention": "DIMouse",
  "macro-repentance-stopattack": "RepentStop",
  "macro-crusader-judgement": "CrusaderJudge",
  "macro-offensive-holy-shock": "ShockDamage",
  "macro-hammer-wrath-judgement": "HoWJudge",
  "macro-holy-strike-judgement": "HolyStrikeJudge",
  "macro-swift-judgement": "SwiftDoubleJudge",
  "macro-shield-devotion": "ShieldDevAura",
  "macro-2h-retribution": "TwoHandRetAura",
  "macro-thorium-cursor": "GrenadeCursor",
  "macro-dps-trinket": "DPSTrinket",
  "macro-smart-healing-potion": "HealPotion",
  "macro-smart-mana-potion": "ManaPotion",
};

function emptyLayout() {
  return Object.fromEntries(
    Object.entries(barSizes).map(([bar, size]) => [bar, Array(size).fill(null)]),
  );
}

function normalizeLayout(candidate) {
  const clean = emptyLayout();
  for (const [bar, size] of Object.entries(barSizes)) {
    if (!Array.isArray(candidate?.[bar])) continue;
    clean[bar] = candidate[bar]
      .slice(0, size)
      .map((id) => spellAliases[id] ?? id)
      .map((id) => (spellMap.has(id) ? id : null));
    while (clean[bar].length < size) clean[bar].push(null);
  }
  return clean;
}

function migrateWeaponSwapIntent(sourceLayout) {
  const migrated = normalizeLayout(sourceLayout);
  if (migrated.main[8] === "devotion-aura") {
    migrated.main[8] = "macro-shield-devotion";
  }
  if (migrated.main[9] === "retribution-aura") {
    migrated.main[9] = "macro-2h-retribution";
  }
  return migrated;
}

function migrateGrenadeIntent(sourceLayout) {
  const source = {
    ...sourceLayout,
    mouse: Array.isArray(sourceLayout?.mouse) ? [...sourceLayout.mouse] : [],
  };
  if (
    source.mouse[0] === "thorium-grenade" ||
    source.mouse[0] === "macro-thorium-feet"
  ) {
    source.mouse[0] = "macro-thorium-cursor";
  }
  return normalizeLayout(source);
}

function migrateMacroIntent(sourceLayout) {
  const migrated = normalizeLayout(sourceLayout);
  const supportMacros = {
    "flash-light": "macro-mouseover-flash-light",
    "holy-light": "macro-mouseover-holy-light",
    "blessing-freedom": "macro-mouseover-freedom",
    "blessing-protection": "macro-mouseover-protection",
    cleanse: "macro-mouseover-cleanse",
    "lay-on-hands": "macro-mouseover-lay-on-hands",
    "blessing-sacrifice": "macro-mouseover-sacrifice",
    "divine-intervention": "macro-mouseover-divine-intervention",
    repentance: "macro-repentance-stopattack",
    "seal-crusader": "macro-crusader-judgement",
    "holy-shock": "macro-offensive-holy-shock",
    "hammer-wrath": "macro-hammer-wrath-judgement",
    "holy-strike": "macro-holy-strike-judgement",
  };
  for (const bar of Object.keys(barSizes)) {
    migrated[bar] = migrated[bar].map((id) => supportMacros[id] ?? id);
  }
  return migrated;
}

function loadLayouts() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.layouts) {
      const savedMode = layoutModes.includes(saved.activeMode)
        ? saved.activeMode
        : "pvp";
      const migrateIntent = (saved.version ?? 0) < 4;
      const migrateGrenade = (saved.version ?? 0) < 6;
      let pvp = migrateGrenade
        ? migrateGrenadeIntent(saved.layouts.pvp)
        : normalizeLayout(saved.layouts.pvp);
      let pve = migrateGrenade
        ? migrateGrenadeIntent(saved.layouts.pve)
        : normalizeLayout(saved.layouts.pve);
      if (migrateIntent) {
        pvp = migrateWeaponSwapIntent(pvp);
        pve = migrateWeaponSwapIntent(pve);
      }
      if ((saved.version ?? 0) < 7 && pve.main[6] === null) {
        pve.main[6] = "macro-dps-trinket";
      }
      if (
        (saved.version ?? 0) < 8 &&
        pvp.main[1] === "major-healing-draught"
      ) {
        pvp.main[1] = "macro-smart-healing-potion";
      }
      if (
        (saved.version ?? 0) < 9 &&
        pvp.main[0] === "major-mana-draught"
      ) {
        pvp.main[0] = "macro-smart-mana-potion";
      }
      if ((saved.version ?? 0) < 15) {
        pvp = migrateMacroIntent(pvp);
        pve = migrateMacroIntent(pve);
      }
      const duplicatedV2Layout =
        (saved.version ?? 0) < 3 &&
        JSON.stringify(pvp) === JSON.stringify(pve) &&
        Object.values(pvp).some((bar) => bar.some(Boolean));
      if (duplicatedV2Layout) pve = emptyLayout();
      let pvpReckoning = normalizeLayout(saved.layouts.pvpReckoning);
      const reckoningIsEmpty = Object.values(pvpReckoning).every((bar) =>
        bar.every((id) => id === null),
      );
      if ((saved.version ?? 0) < 17 && reckoningIsEmpty) {
        pvpReckoning = normalizeLayout(pvp);
      }
      return {
        activeMode: savedMode,
        layouts: { pvp, pve, pvpReckoning },
      };
    }
    return {
      activeMode: "pvp",
      layouts: {
        pvp: normalizeLayout(saved),
        pve: emptyLayout(),
        pvpReckoning: emptyLayout(),
      },
    };
  } catch {
    return {
      activeMode: "pvp",
      layouts: {
        pvp: emptyLayout(),
        pve: emptyLayout(),
        pvpReckoning: emptyLayout(),
      },
    };
  }
}

function saveLayout() {
  const snapshot = normalizeLayout(layout);
  layouts = { ...layouts, [activeMode]: snapshot };
  layout = snapshot;
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ version: 17, activeMode, layouts }),
  );
  const state = document.querySelector("#saveState");
  state.innerHTML = "<span>✓</span> Saved locally";
}

function iconUrl(spell) {
  return spell.iconUrl ?? `${ICON_ROOT}${spell.icon}.jpg`;
}

function makeSpellItem(spell) {
  const item = document.createElement("article");
  item.className = "spell-item";
  item.draggable = true;
  item.tabIndex = 0;
  item.dataset.spellId = spell.id;
  item.title = "Drag or click to add";
  item.innerHTML = `
    <div class="spell-icon-wrap">
      <img class="spell-icon" src="${iconUrl(spell)}" alt="" loading="lazy">
    </div>
    <div class="spell-meta">
      <p class="spell-name">${spell.name}</p>
      <p class="spell-school">${spell.school}${spell.kind ? ` · ${spell.kind}` : spell.talent ? " · Talent" : ""}${spell.macro ? ` · ${spell.macroScope === "account" ? "Account" : "Character"}` : ""}</p>
    </div>
    ${spell.macro
      ? '<span class="macro-marker" title="Macro">M</span>'
      : spell.talent
        ? '<span class="talent-star" title="Talent ability">✦</span>'
        : ""}
  `;

  item.addEventListener("dragstart", (event) => {
    dragPayload = { type: "spell", spellId: spell.id };
    event.dataTransfer.effectAllowed = "copy";
    event.dataTransfer.setData("text/plain", spell.id);
    hideTooltip();
  });
  item.addEventListener("dragend", () => {
    dragPayload = null;
  });
  item.addEventListener("click", () => addToNextSlot(spell.id));
  item.addEventListener("mouseenter", (event) => showTooltip(event, spell));
  item.addEventListener("mousemove", moveTooltip);
  item.addEventListener("mouseleave", hideTooltip);
  item.addEventListener("focus", (event) => showTooltip(event, spell));
  item.addEventListener("blur", hideTooltip);
  return item;
}

function renderSpellbook() {
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = spells.filter((spell) => {
    const matchesFilter = activeFilter === "All" || spell.school === activeFilter;
    const matchesQuery =
      !normalizedQuery ||
      spell.name.toLowerCase().includes(normalizedQuery) ||
      spell.school.toLowerCase().includes(normalizedQuery);
    return matchesFilter && matchesQuery;
  });

  spellList.replaceChildren(...filtered.map(makeSpellItem));
  spellCount.textContent = filtered.length;

  if (!filtered.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No abilities match that search.";
    spellList.append(empty);
  }
}

function makeSlot(bar, index) {
  const spellId = layout[bar][index];
  const spell = spellMap.get(spellId);
  const slot = document.createElement("div");
  slot.className = `action-slot${spell ? " filled" : ""}`;
  slot.dataset.bar = bar;
  slot.dataset.index = index;
  slot.draggable = Boolean(spell);
  slot.setAttribute("role", "button");
  slot.setAttribute("tabindex", "0");
  slot.setAttribute("aria-label", spell ? `${spell.name}, ${barKeys[bar][index]}` : `Empty slot ${barKeys[bar][index]}`);

  if (spell) {
    slot.innerHTML = `
      <img class="slot-icon" src="${iconUrl(spell)}" alt="">
      <span class="slot-key">${barKeys[bar][index]}</span>
      ${spell.macro ? '<span class="slot-macro-marker">M</span>' : ""}
    `;
    slot.addEventListener("mouseenter", (event) => showTooltip(event, spell));
    slot.addEventListener("mousemove", moveTooltip);
    slot.addEventListener("mouseleave", hideTooltip);
  } else {
    slot.innerHTML = `<span class="slot-key">${barKeys[bar][index]}</span>`;
  }

  slot.addEventListener("dragstart", (event) => {
    if (!spell) {
      event.preventDefault();
      return;
    }
    dragPayload = { type: "slot", spellId, sourceBar: bar, sourceIndex: index };
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", spellId);
    hideTooltip();
  });
  slot.addEventListener("dragend", () => {
    dragPayload = null;
    document.querySelectorAll(".drag-over").forEach((node) => node.classList.remove("drag-over"));
  });
  slot.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = dragPayload?.type === "spell" ? "copy" : "move";
    slot.classList.add("drag-over");
  });
  slot.addEventListener("dragleave", () => slot.classList.remove("drag-over"));
  slot.addEventListener("drop", (event) => {
    event.preventDefault();
    slot.classList.remove("drag-over");
    dropInto(bar, index);
  });
  slot.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    if (spell) clearSlot(bar, index);
  });
  slot.addEventListener("keydown", (event) => {
    if ((event.key === "Backspace" || event.key === "Delete") && spell) {
      clearSlot(bar, index);
    }
  });

  return slot;
}

function renderBars() {
  for (const [bar, size] of Object.entries(barSizes)) {
    const container = document.querySelector(`[data-bar="${bar}"]`);
    container.replaceChildren(
      ...Array.from({ length: size }, (_, index) => makeSlot(bar, index)),
    );
  }
}

function dropInto(targetBar, targetIndex) {
  if (!dragPayload) return;
  const targetValue = layout[targetBar][targetIndex];

  if (dragPayload.type === "slot") {
    const { sourceBar, sourceIndex, spellId } = dragPayload;
    if (sourceBar === targetBar && sourceIndex === targetIndex) return;
    layout[sourceBar][sourceIndex] = targetValue;
    layout[targetBar][targetIndex] = spellId;
  } else {
    layout[targetBar][targetIndex] = dragPayload.spellId;
  }

  saveLayout();
  renderBars();
}

function addToNextSlot(spellId) {
  for (const bar of Object.keys(barSizes)) {
    const index = layout[bar].findIndex((value) => value === null);
    if (index !== -1) {
      layout[bar][index] = spellId;
      saveLayout();
      renderBars();
      showToast(`${spellMap.get(spellId).name} added`);
      return;
    }
  }
  const totalSlots = Object.values(barSizes).reduce((total, size) => total + size, 0);
  showToast(`All ${totalSlots} slots are full`);
}

function clearSlot(bar, index) {
  layout[bar][index] = null;
  saveLayout();
  renderBars();
}

function showTooltip(event, spell) {
  hideTooltip();
  const tooltip = document.createElement("div");
  tooltip.className = "slot-tooltip";
  tooltip.id = "slotTooltip";
  tooltip.innerHTML = `
    <div class="tooltip-head">
      <img src="${iconUrl(spell)}" alt="">
      <div>
        <strong>${spell.name}</strong>
        <span>${spell.school} · ${spell.kind ?? (spell.talent ? "Talent" : "Paladin")}${spell.macro ? ` · ${spell.macroScope === "account" ? "Account" : "Character"}` : ""}</span>
      </div>
    </div>
    <p>${spell.description}</p>
    ${spell.macroText
      ? `<code class="tooltip-macro">${spell.macroText.split("\n").join("<br>")}</code>`
      : ""}
    <small>Drag to a slot · Right-click a slot to remove</small>
  `;
  document.body.append(tooltip);
  positionTooltip(event);
}

function moveTooltip(event) {
  const tooltip = document.querySelector("#slotTooltip");
  if (!tooltip) return;
  positionTooltip(event);
}

function positionTooltip(event) {
  const tooltip = document.querySelector("#slotTooltip");
  if (!tooltip) return;

  const anchor = event.currentTarget?.getBoundingClientRect();
  const pointerX = Number.isFinite(event.clientX) && event.clientX > 0
    ? event.clientX
    : anchor?.right ?? 20;
  const pointerY = Number.isFinite(event.clientY) && event.clientY > 0
    ? event.clientY
    : anchor?.top ?? 20;
  const margin = 14;
  const width = tooltip.offsetWidth;
  const height = tooltip.offsetHeight;

  let left = pointerX + margin;
  let top = pointerY + margin;
  if (left + width > window.innerWidth - 10) left = pointerX - width - margin;
  if (top + height > window.innerHeight - 10) top = pointerY - height - margin;

  tooltip.style.left = `${Math.max(10, left)}px`;
  tooltip.style.top = `${Math.max(10, top)}px`;
}

function hideTooltip() {
  document.querySelector("#slotTooltip")?.remove();
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1900);
}

async function applyPreset(presetId) {
  const presetPath = presetPaths[presetId];
  if (!presetPath) return;
  if (!window.confirm("Replace all three layouts with the Default preset?")) {
    presetSelect.value = "";
    return;
  }

  presetSelect.disabled = true;
  try {
    const response = await fetch(presetPath, { cache: "no-store" });
    if (!response.ok) throw new Error(`Preset request failed: ${response.status}`);
    const preset = await response.json();
    const sourceLayouts = preset.layouts;
    if (!sourceLayouts) throw new Error("Preset contains no layouts");

    layouts = Object.fromEntries(
      layoutModes.map((mode) => [mode, normalizeLayout(sourceLayouts[mode])]),
    );
    layout = layouts[activeMode];
    saveLayout();
    renderBars();
    showToast("Default preset applied");
  } catch (error) {
    console.error(error);
    showToast("Could not load preset");
  } finally {
    presetSelect.disabled = false;
    presetSelect.value = "";
  }
}

function clearAll(ask = true) {
  if (ask && !window.confirm(`Clear every ${modeNames[activeMode]} action bar slot?`)) return;
  layout = emptyLayout();
  saveLayout();
  renderBars();
  showToast(`${modeNames[activeMode]} bars cleared`);
}

function resetPlanner() {
  if (!window.confirm("Reset your saved layout and filters?")) return;
  localStorage.removeItem(STORAGE_KEY);
  activeMode = "pvp";
  layouts = {
    pvp: emptyLayout(),
    pve: emptyLayout(),
    pvpReckoning: emptyLayout(),
  };
  layout = layouts.pvp;
  activeFilter = "All";
  query = "";
  searchInput.value = "";
  document.querySelectorAll(".filter").forEach((filter) => {
    filter.classList.toggle("active", filter.dataset.filter === "All");
  });
  renderSpellbook();
  switchMode("pvp", false);
  showToast("Planner reset");
}

function readableLayout(sourceLayout) {
  const readable = {};
  for (const bar of Object.keys(barSizes)) {
    readable[bar] = sourceLayout[bar].map((id, index) => {
      const spell = spellMap.get(id);
      return {
        key: barKeys[bar][index],
        spell: spell?.name ?? null,
        id,
        ...(spell?.macro
          ? {
              macroScope: spell.macroScope ?? "character",
              macroText: spell.macroText,
              icon: spell.icon,
            }
          : {}),
      };
    });
  }
  return readable;
}

function serializeLayout() {
  return JSON.stringify(
    {
      app: "Grimar",
      game: "WoW Forever",
      build: "1.60.1.70707",
      layouts: {
        pvp: readableLayout(layouts.pvp),
        pve: readableLayout(layouts.pve),
        pvpReckoning: readableLayout(layouts.pvpReckoning),
      },
    },
    null,
    2,
  );
}

function zMacrosEscape(value) {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll("\n", "\\n")
    .replaceAll("\t", "\\t")
    .replaceAll("|", "\\p")
    .replaceAll("=", "\\e");
}

function assignedMacros() {
  const currentLayouts = {
    ...layouts,
    [activeMode]: normalizeLayout(layout),
  };
  const seen = new Set();
  const assigned = [];
  for (const mode of layoutModes) {
    for (const bar of Object.keys(barSizes)) {
      for (const id of currentLayouts[mode][bar]) {
        const spell = spellMap.get(id);
        if (!spell?.macro || seen.has(id)) continue;
        seen.add(id);
        assigned.push(spell);
      }
    }
  }
  return assigned;
}

function serializeZMacros(scope) {
  const lines = ["FMACROS1"];
  for (const spell of assignedMacros()) {
    const spellScope = spell.macroScope ?? "character";
    if (spellScope !== scope) continue;
    const name = macroExportNames[spell.id] ?? spell.name.replace(/[^A-Za-z0-9]/g, "").slice(0, 16);
    lines.push(`M:${zMacrosEscape(name)}=${zMacrosEscape(spell.macroText)}`);
  }
  return lines.join("\n");
}

async function copyTextarea(textarea, message) {
  try {
    await navigator.clipboard.writeText(textarea.value);
  } catch {
    textarea.select();
    document.execCommand("copy");
  }
  showToast(message);
}

function parseLayoutSource(source) {
  const imported = {};
  for (const bar of Object.keys(barSizes)) {
    imported[bar] = (source[bar] ?? []).map((entry) =>
      typeof entry === "string" || entry === null ? entry : entry.id,
    );
  }
  return normalizeLayout(imported);
}

function parseImport(text) {
  const parsed = JSON.parse(text);
  if (parsed.layouts) {
    return {
      pvp: parseLayoutSource(parsed.layouts.pvp ?? {}),
      pve: parseLayoutSource(parsed.layouts.pve ?? {}),
      pvpReckoning: parseLayoutSource(parsed.layouts.pvpReckoning ?? {}),
    };
  }
  return { [activeMode]: parseLayoutSource(parsed.layout ?? parsed) };
}

function switchMode(mode, announce = true) {
  if (!layouts[mode]) return;
  layouts = { ...layouts, [activeMode]: normalizeLayout(layout) };
  activeMode = mode;
  layout = normalizeLayout(layouts[mode]);
  layouts = { ...layouts, [mode]: layout };
  document.querySelector("#modeLabel").textContent = `${modeNames[mode]} loadout`;
  document.querySelectorAll(".mode-tab").forEach((tab) => {
    const selected = tab.dataset.mode === mode;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", String(selected));
  });
  saveLayout();
  renderBars();
  if (announce) showToast(`${modeNames[mode]} layout selected`);
}

document.querySelector("#filters").addEventListener("click", (event) => {
  const button = event.target.closest(".filter");
  if (!button) return;
  activeFilter = button.dataset.filter;
  document.querySelectorAll(".filter").forEach((filter) => {
    filter.classList.toggle("active", filter === button);
  });
  renderSpellbook();
});

searchInput.addEventListener("input", () => {
  query = searchInput.value;
  renderSpellbook();
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "/" &&
    document.activeElement !== searchInput &&
    !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
  ) {
    event.preventDefault();
    searchInput.focus();
  }
});

presetSelect.addEventListener("change", () => applyPreset(presetSelect.value));
document.querySelector("#clearButton").addEventListener("click", () => clearAll(true));
document.querySelector("#resetButton").addEventListener("click", resetPlanner);
document.querySelectorAll(".mode-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    if (tab.dataset.mode === activeMode) return;
    switchMode(tab.dataset.mode);
  });
});

document.querySelector("#exportButton").addEventListener("click", () => {
  exportText.value = serializeLayout();
  exportDialog.showModal();
});

document.querySelector("#macroExportButton").addEventListener("click", () => {
  accountMacrosText.value = serializeZMacros("account");
  characterMacrosText.value = serializeZMacros("character");
  macroExportDialog.showModal();
});

document.querySelector("#copyButton").addEventListener("click", () =>
  copyTextarea(exportText, "Layout copied"),
);
document.querySelector("#copyAccountMacrosButton").addEventListener("click", () =>
  copyTextarea(accountMacrosText, "Account macros copied"),
);
document.querySelector("#copyCharacterMacrosButton").addEventListener("click", () =>
  copyTextarea(characterMacrosText, "Character macros copied"),
);

document.querySelector("#importButton").addEventListener("click", () => {
  const text = window.prompt("Paste a Grimar layout:");
  if (!text) return;
  try {
    const imported = parseImport(text);
    if (imported.pvp) layouts.pvp = imported.pvp;
    if (imported.pve) layouts.pve = imported.pve;
    if (imported.pvpReckoning) layouts.pvpReckoning = imported.pvpReckoning;
    layout = layouts[activeMode];
    saveLayout();
    renderBars();
    exportDialog.close();
    showToast(
      imported.pvp && imported.pve && imported.pvpReckoning
        ? "All layouts imported"
        : "Layout imported",
    );
  } catch {
    showToast("That layout could not be imported");
  }
});

renderSpellbook();
switchMode(activeMode, false);
