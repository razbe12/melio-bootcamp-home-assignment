const FETCH_CANDIDATES_URL =
  "https://randomuser.me/api/?seed=abcd&nat=us,dk,fr,gb&results=50&page=1";

export const fetchCandidates = async () => {
  try {
    const response = await fetch(FETCH_CANDIDATES_URL);
    const result = await response.json();
    return result.results;
  } catch (error) {
    return error;
  }
}
