const login = async (username, password) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_PARTNERS_URL}/api/auth/login`;

    const rs = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({ username, password }),
    });
    const data = await rs.json();

    return data;
  } catch (error) {
    console.log("login error", error);
  }
};

export { login };
