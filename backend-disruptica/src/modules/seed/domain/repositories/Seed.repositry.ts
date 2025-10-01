export interface SeedDataRepository {
  generate(): Promise<boolean>;
}