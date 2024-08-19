export async function fetchData(setModal, setError, actionFn, params = {}) {
  try {
    const cancelRequest = await actionFn(params);
    setModal(false);
    return cancelRequest;
  } catch (error) {
    console.error("Error during action execution:", error);
    setError(error.message || "An error occurred");
    setModal(true);
  }
}
