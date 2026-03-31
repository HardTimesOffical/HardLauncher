import path from 'node:path';
import fs from 'node:fs';
import { isVersionDownloaded } from './path.manager';

export interface GameInstance {
  id: string;           // уникальный id (slug модпака или uuid)
  name: string;         // отображаемое имя
  type: 'vanilla' | 'fabric' | 'forge' | 'neoforge' |'modpack';
  gameVersion: string;  // версия MC
  loaderVersion?: string;
  iconUrl?: string;
  description?: string;
  createdAt: string;
  lastPlayed?: string;
  modrinthProjectId?: string; // если это модпак с modrinth
  modrinthVersionId?: string;
  source?: 'custom' | 'mojang';
}

export class InstanceManager {
  private instancesDir: string;
  private registryPath: string;

  constructor(gamePath: string) {
    this.instancesDir = path.join(gamePath, 'instances');
    this.registryPath = path.join(gamePath, 'instances.json');
    if (!fs.existsSync(this.instancesDir)) {
      fs.mkdirSync(this.instancesDir, { recursive: true });
    }
  }

  getAll(): GameInstance[] {
    if (!fs.existsSync(this.registryPath)) return [];
    try {
      return JSON.parse(fs.readFileSync(this.registryPath, 'utf-8'));
    } catch {
      return [];
    }
  }

  get(id: string): GameInstance | undefined {
    return this.getAll().find(i => i.id === id);
  }

  save(instance: GameInstance): void {
    const all = this.getAll();
    const idx = all.findIndex(i => i.id === instance.id);
    if (idx >= 0) all[idx] = instance;
    else all.push(instance);
    fs.writeFileSync(this.registryPath, JSON.stringify(all, null, 2));
  }

  remove(id: string): void {
    const all = this.getAll().filter(i => i.id !== id);
    fs.writeFileSync(this.registryPath, JSON.stringify(all, null, 2));
    // Удаляем папку инстанса
    const dir = this.getInstanceDir(id);
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  }

  getInstanceDir(id: string): string {
    return path.join(this.instancesDir, id);
  }

  ensureInstanceDir(id: string): string {
    const dir = this.getInstanceDir(id);
    const subdirs = ['mods', 'resourcepacks', 'shaderpacks', 'config', 'saves'];
    for (const sub of subdirs) {
      fs.mkdirSync(path.join(dir, sub), { recursive: true });
    }
    return dir;
  }

  updateLastPlayed(id: string): void {
    const instance = this.get(id);
    if (instance) {
      instance.lastPlayed = new Date().toISOString();
      this.save(instance);
    }
  }


  isGameReady(instanceId: string, gamePath: string): boolean {
    const instance = this.get(instanceId);
    if (!instance) return false;
    
    // Проверяем установлен ли загрузчик (fabric/forge jar)
    const loaderId = instance.loaderVersion
    ? instance.type === 'forge'
      ? `forge-${instance.gameVersion}`
      : `fabric-latest-${instance.gameVersion}`
    : instance.gameVersion;
    
    return isVersionDownloaded(loaderId, gamePath);
  }
}
