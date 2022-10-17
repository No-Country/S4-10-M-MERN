function applyPath(path) {
  return "http://localhost:8080" + path;
}

export const API = {
  async login(email, password) {
    const raw = JSON.stringify({ email, password });

    const res = await fetch(applyPath("/api/v1/user/login"), {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: raw,
    });

    const finalResponse =
      res.status == 200 ? await res.json() : await res.text();
    return { status: res.status, response: finalResponse };
  },

  async register(email, password, fullname, username) {
    const raw = JSON.stringify({ email, password, fullname, username });

    const res = await fetch(applyPath("/api/v1/user/register"), {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: raw,
    });

    const finalResponse =
      res.status == 200 ? await res.json() : await res.text();
    return { status: res.status, response: finalResponse };
  },
};
