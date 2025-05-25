export interface BluetoothSerial {
  list: () => Promise<string[]>;
  connect: (deviceId: string) => Promise<void>;
  write: (data: string) => Promise<void>;
  disconnect: () => Promise<void>;
}
