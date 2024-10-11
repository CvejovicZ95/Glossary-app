import {
  getTerms,
  createTerm,
  deleteTerm,
  updateTerm,
} from "../api/glossaryApi";

describe("Terms API", () => {
  beforeEach(() => {
    global.fetch = jest.fn();

    global.localStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
      removeItem: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("getTerms should return data on success", async () => {
    const mockResponse = [{ id: 1, term: "term1", definition: "definition1" }];
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const data = await getTerms();
    expect(data).toEqual(mockResponse);
  });

  test("getTerms should throw an error if there is an error", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: true, message: "Error fetching terms" }),
    });

    await expect(getTerms()).rejects.toThrow("Error fetching terms");
  });

  test("createTerm should create a term when the user is logged in", async () => {
    const mockResponse = { success: true };
    const mockUser = { id: 1, token: "dummyToken" };

    global.localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockUser));

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await createTerm("term", "definition", false);
    expect(response).toEqual(mockResponse);
  });

  test("createTerm should throw an error when the user is not logged in", async () => {
    global.localStorage.getItem.mockReturnValueOnce(null);

    await expect(createTerm("term", "definition", false)).rejects.toThrow(
      "User is not logged in",
    );
  });

  test("deleteTerm should delete the term when the user is logged in", async () => {
    const mockResponse = { success: true };
    const mockUser = { id: 1, token: "dummyToken" };

    global.localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockUser));

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await deleteTerm(1);
    expect(response).toEqual(mockResponse);
  });

  test("deleteTerm should throw an error if the deletion fails", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Failed to delete term" }),
    });

    const mockUser = { id: 1, token: "dummyToken" };
    global.localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockUser));

    await expect(deleteTerm(1)).rejects.toThrow("Failed to delete term");
  });

  test("updateTerm should update the term when the user is logged in", async () => {
    const mockResponse = { success: true };
    const mockUser = { id: 1, token: "dummyToken" };

    global.localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockUser));

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await updateTerm(1, "newTerm", "newDefinition", false);
    expect(response).toEqual(mockResponse);
  });

  test("updateTerm should throw an error if the update fails", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Failed to update term" }),
    });

    const mockUser = { id: 1, token: "dummyToken" };
    global.localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockUser));

    await expect(
      updateTerm(1, "newTerm", "newDefinition", false),
    ).rejects.toThrow("Failed to update term");
  });
});
