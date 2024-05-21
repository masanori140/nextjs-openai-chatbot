import * as dotenv from "dotenv"

dotenv.config()

export const AWS_REGION = process.env.AWS_REGION || "us-east-1"
export const CDKTF_BACKEND_BUCKET = process.env.CDKTF_BACKEND_BUCKET || "your-s3-bucket-name"
export const ENV = (process.env.ENV as "dev" | "stg" | "prod") || "dev"
export const SERVICE = process.env.SERVICE || "openmetadata"
