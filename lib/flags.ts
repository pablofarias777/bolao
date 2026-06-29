function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

const COUNTRY_CODES: Record<string, string> = {
  brasil: "br",
  argentina: "ar",
  japao: "jp",
  franca: "fr",
  alemanha: "de",
  espanha: "es",
  portugal: "pt",
  inglaterra: "gb-eng",
  escocia: "gb-sct",
  italia: "it",
  croacia: "hr",
  uruguai: "uy",
  mexico: "mx",
  "estados unidos": "us",
  eua: "us",
  "coreia do sul": "kr",
  coreia: "kr",
  holanda: "nl",
  "paises baixos": "nl",
  belgica: "be",
  colombia: "co",
  chile: "cl",
  paraguai: "py",
  peru: "pe",
  equador: "ec",
  bolivia: "bo",
  venezuela: "ve",
  canada: "ca",
  marrocos: "ma",
  senegal: "sn",
  gana: "gh",
  camaroes: "cm",
  nigeria: "ng",
  suica: "ch",
  servia: "rs",
  polonia: "pl",
  dinamarca: "dk",
  suecia: "se",
  noruega: "no",
  austria: "at",
  catar: "qa",
  qatar: "qa",
  "arabia saudita": "sa",
  australia: "au",
  "costa rica": "cr",
  panama: "pa",
  jamaica: "jm",
};

export function flagUrl(name: string): string | null {
  const code = COUNTRY_CODES[normalize(name)];
  return code ? `https://flagcdn.com/h120/${code}.png` : null;
}
