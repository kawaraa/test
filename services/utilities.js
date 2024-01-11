export async function request(url, method = "GET", data, type = "application/json", arg = {}) {
  const headers = { "Content-Type": type };
  let body = null;

  if (data) {
    if (data.token) headers.Authorization = `Bearer ${data.token}`;
    if (data.body) body = JSON.stringify(data.body);
    else if (method !== "GET" && data) body = JSON.stringify(data);
  }

  const response = await fetch(url, { method, body, headers, ...arg });
  if (response?.ok) return type.includes("json") ? response.json() : response.text();
  throw new Error(await response?.text());
}
