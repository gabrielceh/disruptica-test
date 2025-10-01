export interface SeedDataSource {
  generate(): Promise<boolean>;
}