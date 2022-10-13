export function getErrorMessage(error: unknown): { message: string } {
    if (error instanceof Error) return { message: error.message };
    return { message: String(error) };
}