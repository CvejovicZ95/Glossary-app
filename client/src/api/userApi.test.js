import { registerUser, loginUser, logoutUser } from "../api/userApi";

describe("User API", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("registerUser should return data on successful registration", async () => {
    const mockResponse = { success: true, message: "User registered" };
    const mockUser = { username: "testUser", password: "testPass" };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const data = await registerUser(mockUser);
    expect(data).toEqual(mockResponse);
  });

  test("registerUser should throw an error if registration fails", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Registration failed" }),
    });

    const mockUser = { username: "testUser", password: "testPass" };

    await expect(registerUser(mockUser)).rejects.toThrow("Registration failed");
  });

  test("loginUser should return data on successful login", async () => {
    const mockResponse = { token: "dummyToken" };
    const mockUsername = "testUser";
    const mockPassword = "testPass";

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const data = await loginUser(mockUsername, mockPassword);
    expect(data).toEqual(mockResponse);
  });

  test("loginUser should throw an error if login fails", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Invalid credentials" }),
    });

    await expect(loginUser("testUser", "wrongPass")).rejects.toThrow(
      "Invalid credentials",
    );
  });

  test("logoutUser should return data on successful logout", async () => {
    const mockResponse = { success: true };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const data = await logoutUser();
    expect(data).toEqual(mockResponse);
  });

  test("logoutUser should throw an error if logout fails", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Logout failed" }),
    });

    await expect(logoutUser()).rejects.toThrow("Logout failed");
  });
});
