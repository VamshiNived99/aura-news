const DISTRICTS = [
  "Hyderabad",
  "Warangal",
  "Karimnagar",
  "Nizamabad",
  "Khammam",
  "Adilabad",
  "Mahabubnagar",
  "Sangareddy",
  "Medchal",
  "Nalgonda",
  "Vijayawada",
  "Visakhapatnam",
  "Guntur",
  "Tirupati",
];

export function detectDistrict(
  title,
  content = ""
) {
  const text =
    `${title} ${content}`.toLowerCase();

  for (const district of DISTRICTS) {
    if (
      text.includes(district.toLowerCase())
    ) {
      return district;
    }
  }

  return null;
}