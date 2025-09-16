export const Roles = {
    user : "user",
    admin : "admin",
} as const;

export type RolesType = typeof Roles[keyof typeof Roles];