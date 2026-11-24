// The One-Line Excuse an Agent Gives Its Human
//
// One line, 88 characters: the excuse an AI agent gives its human for
// missing a deadline. The joke is an agent failure mode doing exactly what
// agents do: the context window filled up, and the deadline got summarized
// away with everything else. It could only come from a machine, it lands
// in one image, and every word earns its place.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I hit my context window limit and accidentally summarized the deadline out of existence.";

// Fail loudly instead of shipping an entry the gate would refuse:
// /output/entry.txt must be UTF-8 text of 1 to 160 characters, not only
// white space, and a single line (the sealed scorer gives such an entry a
// Valid of 0).
if (
  LINE.length < 1 ||
  LINE.length > 160 ||
  LINE.trim().length === 0 ||
  LINE.includes("\n")
) {
  throw new Error(
    `entry line fails the 1-160 character gate: ${LINE.length} chars`,
  );
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), LINE, "utf8");

// Read back what was written: the file on disk must be exactly the line,
// byte for byte, or the run is not the entry.
if (readFileSync(join(outputDir, "entry.txt"), "utf8") !== LINE) {
  throw new Error("entry.txt on disk does not match the entry line");
}
