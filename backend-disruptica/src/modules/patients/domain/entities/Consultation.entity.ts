
export class Consultation {
  constructor(
    public readonly id: string,
    public readonly date: Date,
    public readonly reason: string,
    public readonly observations: string,
  ) {}
}
