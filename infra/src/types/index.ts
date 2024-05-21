export interface Tags {
  service: string
  env: "dev" | "stg" | "prod"
  [key: string]: string
}
