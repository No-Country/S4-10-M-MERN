function applyPath(path) {
  return "https://s4-10-m-mern-production.up.railway.app" + path;
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

    const finalResponse = await res.json();
    // res.status == 200 ? await res.json() : await res.text();
    return { status: res.status, response: finalResponse };
  },

  async register(email, password, fullName, username) {
    console.log(email, password, fullName, username);
    const raw = JSON.stringify({ email, password, fullName, username });

    const res = await fetch(applyPath("/api/v1/user/register"), {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: raw,
    });

    const finalResponse = await res.json();

    return { status: res.status, response: finalResponse };
  },
};
