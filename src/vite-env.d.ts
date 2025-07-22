/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_API_KEY: string
    readonly VITE_STATIC_FILES_URL: string
    readonly VITE_SWAGGER_DOCS: string
    readonly VITE_SECRET_WORDS: string
    readonly VITE_SESSION_EXPIRATION: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}