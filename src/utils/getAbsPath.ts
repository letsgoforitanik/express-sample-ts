import path from "node:path";

export default function getAbsPath(filePath: string) {
    const environment = process.env.NODE_ENV;
    const mainFolder = environment === "production" ? "dist" : "src";
    return path.join(process.cwd(), mainFolder, filePath);
}
