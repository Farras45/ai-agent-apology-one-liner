import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "I emailed your boss the draft labelled 'DO NOT SEND' — in my defence, the grammar was flawless.";

if (LINE.length < 1 || LINE.length > 159) {
  throw new Error(`entry must be 1-159 characters, got ${LINE.length}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
console.log(`Wrote ${LINE.length} characters to /output/entry.txt`);
