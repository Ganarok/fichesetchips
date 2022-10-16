export function getErrorMessage(error: unknown): { message: string, error: string } {
    if (error instanceof Error) return { message: error.message, error: error.name };
    return { message: String(error), error: "?" };
}