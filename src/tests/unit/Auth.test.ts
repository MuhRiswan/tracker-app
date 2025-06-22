import { describe, it, expect, beforeEach } from "vitest";

function simulateLogin(username: string, password: string): string | null {
  if (username === "admin" && password === "123456") {
    localStorage.setItem("role", "admin");
    return "admin";
  } else if (username === "user" && password === "123456") {
    localStorage.setItem("role", "viewer");
    return "viewer";
  } else {
    return null;
  }
}

describe("Auth Logic", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("sets admin role on correct admin credentials", () => {
    const role = simulateLogin("admin", "123456");
    expect(role).toBe("admin");
    expect(localStorage.getItem("role")).toBe("admin");
    console.log("User login as admin");
  });

  it("sets viewer role on correct user credentials", () => {
    const role = simulateLogin("user", "123456");
    expect(role).toBe("viewer");
    expect(localStorage.getItem("role")).toBe("viewer");
    console.log("User login as viewer");
  });

  it("does not set role on invalid credentials", () => {
    const role = simulateLogin("wrong", "wrongpass");
    expect(role).toBe(null);
    expect(localStorage.getItem("role")).toBe(null);
    console.log("User login failed");
  });
});
