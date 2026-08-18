export const ROLES = [
  {
    value: "creative-strategist",
    label: { tr: "Yaratıcı Stratejist", en: "Creative Strategist" },
  },
  {
    value: "growth-manager",
    label: { tr: "Büyüme Yöneticisi", en: "Growth Manager" },
  },
  {
    value: "user-acquisition-specialist",
    label: { tr: "Kullanıcı Kazanımı Uzmanı (Jr.)", en: "Jr. User Acquisition Specialist" },
  },
  {
    value: "ua-manager",
    label: { tr: "UA Yöneticisi", en: "UA Manager" },
  },
  {
    value: "marketing-content-creator",
    label: { tr: "Pazarlama İçerik Üreticisi", en: "Marketing Content Creator" },
  },
] as const;

export type Role = (typeof ROLES)[number]["value"];

export function getRoleLabel(value: string, lang: "tr" | "en"): string {
  const role = ROLES.find((r) => r.value === value);
  return role ? role.label[lang] : value;
}
