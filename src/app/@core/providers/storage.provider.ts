import { Storage } from '@ionic/storage-angular';

export class StorageProvider<IData> {
  constructor(protected storageKey: string, protected storage: Storage) {}

  public async generateKey(): Promise<string> {
    return this.storageKey;
  }

  async get(): Promise<IData> {
    const storageKey = await this.generateKey();
    const valueString: string = await this.storage.get(storageKey);
    const value = valueString ? JSON.parse(valueString) : undefined;
    return value;
  }

  async set(value: IData) {
    const storageKey = await this.generateKey();
    const valueString = JSON.stringify(value);
    await this.storage.set(storageKey, valueString);
  }

  async remove() {
    const storageKey = await this.generateKey();
    await this.storage.remove(storageKey);
  }
}
