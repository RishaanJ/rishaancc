#!/usr/bin/env node
import { pbkdf2Sync, randomBytes } from "node:crypto"
import readline from "node:readline"

const ITERATIONS = 600_000
const KEY_LEN = 32

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true })

function ask(q) {
  return new Promise((res) => {
    process.stdout.write(q)
    process.stdin.setRawMode?.(true)
    let buf = ""
    const onData = (chunk) => {
      for (const ch of chunk.toString("utf8")) {
        if (ch === "\n" || ch === "\r") {
          process.stdin.setRawMode?.(false)
          process.stdin.removeListener("data", onData)
          process.stdout.write("\n")
          res(buf)
          return
        }
        if (ch === "") {
          process.exit(1)
        }
        if (ch === "") {
          buf = buf.slice(0, -1)
          continue
        }
        buf += ch
      }
    }
    process.stdin.on("data", onData)
  })
}

const pw = await ask("Enter admin password (input hidden): ")
rl.close()

if (!pw || pw.length < 12) {
  console.error("Password must be at least 12 characters.")
  process.exit(1)
}

const salt = randomBytes(16)
const hash = pbkdf2Sync(pw, salt, ITERATIONS, KEY_LEN, "sha256")
const encoded = `pbkdf2.${ITERATIONS}.${salt.toString("base64url")}.${hash.toString("base64url")}`

const secret = randomBytes(32).toString("base64")

console.log("\nAdd these to .env.local (and Vercel project env):\n")
console.log(`ADMIN_PASSWORD_HASH='${encoded}'`)
console.log(`ADMIN_SESSION_SECRET='${secret}'`)
console.log("\nAlso set:")
console.log("ADMIN_EMAIL='your@email.com'")
console.log("RESEND_API_KEY='re_...' (https://resend.com)")
console.log("RESEND_FROM='you <you@yourdomain.com>' (optional; default is Resend's onboarding sender)")
