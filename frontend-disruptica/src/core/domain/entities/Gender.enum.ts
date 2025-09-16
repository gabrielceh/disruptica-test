export const Gender = {
    F : "F",
    M : "M",
    O : "O",
} as const;

export type GenderType = typeof Gender[keyof typeof Gender];