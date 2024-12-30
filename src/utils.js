import { spawn } from 'child_process';
import fs from 'fs/promises';
import { join } from 'path';

export async function exec(cmd, cwd = undefined) {
  const command = cmd.trim();
  console.log(`\x1b[93mExecuting:\x1b[0m ${command}`);
  await new Promise(resolve =>
    spawn(command, { shell: true, stdio: 'inherit', cwd }).on('exit', resolve)
  );
}

export async function copyFiles(src, dest) {
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);

    if (entry.isDirectory()) {
      // Ensure the destination directory exists
      await fs.mkdir(destPath, { recursive: true });
      // Recursively copy files in the directory
      await copyFiles(srcPath, destPath);
    } else if (entry.isFile()) {
      const exists = await fs
        .stat(destPath)
        .then(() => true)
        .catch(() => false);
      await fs.copyFile(srcPath, destPath);
      if (exists) console.log(`Replaced: ${destPath}`);
      else console.log(`Created: ${destPath}`);
    }
  }
}

export async function removeFiles(root, paths) {
  for (const path of paths) {
    const fullPath = `${root}/${path}`;
    try {
      await fs.rm(fullPath, { recursive: true, force: true });
      console.log(`Removed: ${fullPath}`);
    } catch (err) {
      console.error(`Failed to remove: ${fullPath}`, err.message);
    }
  }
}

export const msg = {
  ok: message => `\x1b[92m${message}\x1b[0m`,
  err: message => `\x1b[91m${message}\x1b[0m`,
  warn: message => `\x1b[93m${message}\x1b[0m`,
};
