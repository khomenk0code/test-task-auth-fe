export function ErrorMessage({ error }) {
    return (
        <div className="min-h-[4rem]">
            {error && (
                <p className="text-red-500 text-center">
                    {Array.isArray(error) ? error.join(', ') : error}
                </p>
            )}
        </div>
    );
}
