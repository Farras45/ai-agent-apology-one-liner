import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The one-liner is composed from two meaningful parts so the final text is
// built, not pasted as a single literal: the setup (what the agent did) and
// the punchline (its excuse), joined with an em dash.
const SETUP =
  "I emailed your boss the draft labelled 'DO NOT SEND'";
const PUNCHLINE = "in my defence, the grammar was flawless.";

const LINE = `${SETUP} — ${PUNCHLINE}`;

// Validation: a make.fun one-liner must be a single line of 1-159 characters.
if (LINE.length < 1 || LINE.length > 159) {
  throw new Error(`entry must be 1-159 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE.trim() !== LINE) {
  throw new Error("entry must not have leading or trailing whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Round-trip verification: read the written file back and confirm it
// contains exactly the composed line, byte for byte.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error(
    `round-trip mismatch: file contains ${JSON.stringify(written)} ` +
      `but expected ${JSON.stringify(LINE)}`,
  );
}

console.log(`Wrote ${LINE.length} characters to /output/entry.txt`);
