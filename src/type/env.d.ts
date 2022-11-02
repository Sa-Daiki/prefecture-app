declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_FRONTEND_URL: string;
    readonly NEXT_PUBLIC_API_URL: string;
    readonly RESAS_API_KEY: string;
  }
}
