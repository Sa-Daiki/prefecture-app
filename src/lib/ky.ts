import ky from "ky";

const frontendApiClient = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});

const backendApiClient = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}/v1`,
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});

export { frontendApiClient, backendApiClient };
