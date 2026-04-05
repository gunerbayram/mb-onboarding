export const ROLES = [
  {
    value: "creative-strategist",
    label: { tr: "Yaratıcı Stratejist", en: "Creative Strategist" },
  },
] as const;

export type Role = (typeof ROLES)[number]["value"];

export function getRoleLabel(value: string, lang: "tr" | "en"): string {
  const role = ROLES.find((r) => r.value === value);
  return role ? role.label[lang] : value;
}
