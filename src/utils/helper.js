const PERFERRED_COUNTRIES = ["United States", "United Kingdom"];
const CANDIDATES_CACHE_KEY = "CANDIDATES_CACHE_KEY";

export const getPersistentCandidatesData = () => {
  let persistentData = localStorage.getItem(CANDIDATES_CACHE_KEY);
  return JSON.parse(persistentData);
}

export const setPersistentCandidatesData = (candidates) => {
  let persistentData = JSON.stringify(candidates);
  localStorage.setItem(CANDIDATES_CACHE_KEY, persistentData);
}

export const transformCandidatesData = (fetchedData) => {
  return fetchedData.reduce((accumulator, candidate) => {
    const sectionIndex = candidate.name.first.charAt(0).toUpperCase();
    accumulator[sectionIndex] = accumulator[sectionIndex] || [];
    accumulator[sectionIndex].push({
      firstName: candidate.name.first,
      lastName: candidate.name.last,
      email: candidate.email,
      city: candidate.location.city,
      country: candidate.location.country,
      picture: candidate.picture.thumbnail,
      uuid: candidate.login.uuid,
      isFavorite: false,
      isPreferred: PERFERRED_COUNTRIES.includes(candidate.location.country)
    });
    return accumulator
  }, Object.create(null));
}

export const transformCandidates = (candidates) => {
  return candidates.reduce((accumulator, candidate) => {
    const sectionIndex = candidate.firstName.charAt(0).toUpperCase();
    accumulator[sectionIndex] = accumulator[sectionIndex] || [];
    accumulator[sectionIndex].push(candidate);
    return accumulator
  }, Object.create(null));
}

export const getCandidatesArray = (candidates) => {
  if (candidates)
    return Object.values(candidates).flat();

  return null;
}