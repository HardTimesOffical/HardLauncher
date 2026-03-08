import path from 'node:path';
import fs from 'node:fs';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';

export type ModType = 'mod' | 'resourcepack' | 'shader' | 'modpack';

// Папка назначения в зависимости от типа
function getTargetSubdir(projectType: ModType): string {
  switch (projectType) {
    case 'mod': return 'mods';
    case 'resourcepack': return 'resourcepacks';
    case 'shader': return 'shaderpacks';
    default: return 'mods';
  }
}

export async function installMod(
  url: string,
  filename: string,
  projectType: ModType,
  gamePath: string,
  instanceId?: string  // если передан — ставим в инстанс, иначе в глобальную папку
): Promise<{ success: boolean; path: string; error?: string }> {
  try {
    const subdir = getTargetSubdir(projectType);

    // Определяем папку назначения
    let targetDir: string;
    if (instanceId) {
      targetDir = path.join(gamePath, 'instances', instanceId, subdir);
    } else {
      targetDir = path.join(gamePath, subdir);
    }

    fs.mkdirSync(targetDir, { recursive: true });
    const destPath = path.join(targetDir, filename);

    // Если уже скачан — не перескачиваем
    if (fs.existsSync(destPath)) {
      return { success: true, path: destPath };
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const writer = createWriteStream(destPath);
    await pipeline(Readable.fromWeb(res.body as any), writer);

    return { success: true, path: destPath };
  } catch (err: any) {
    return { success: false, path: '', error: err.message };
  }
}

export async function removeMod(
  filename: string,
  projectType: ModType,
  gamePath: string,
  instanceId?: string
): Promise<void> {
  const subdir = getTargetSubdir(projectType);
  const targetDir = instanceId
    ? path.join(gamePath, 'instances', instanceId, subdir)
    : path.join(gamePath, subdir);

  const filePath = path.join(targetDir, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

export function getInstalledMods(
  projectType: ModType,
  gamePath: string,
  instanceId?: string
): string[] {
  const subdir = getTargetSubdir(projectType);
  const targetDir = instanceId
    ? path.join(gamePath, 'instances', instanceId, subdir)
    : path.join(gamePath, subdir);

  if (!fs.existsSync(targetDir)) return [];
  return fs.readdirSync(targetDir).filter(f => f.endsWith('.jar') || f.endsWith('.zip'));
}
