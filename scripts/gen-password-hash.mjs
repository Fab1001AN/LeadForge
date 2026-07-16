/**
 * Usage: node scripts/gen-password-hash.mjs "your-password-here"
 *
 * Prints the bcrypt hash to stdout. Copy the output and save it
 * as the ADMIN_PASSWORD_HASH secret in Replit Secrets.
 */
import { hash } from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/gen-password-hash.mjs \"your-password\"");
  process.exit(1);
}

const hashed = await hash(password, 12);
console.log("\nYour ADMIN_PASSWORD_HASH:\n");
console.log(hashed);
console.log("\nCopy the line above (starting with $2b$) into the ADMIN_PASSWORD_HASH secret.\n");
