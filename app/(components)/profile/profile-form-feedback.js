export function ProfileFormFeedback({ error, success }) {
    return (
        <div className="min-h-[4rem]">
            {error && (
                <p className="text-red-500 text-center">
                    {Array.isArray(error) ? error.join(', ') : error}
                </p>
            )}
            {success && (
                <p className="text-green-500 text-center">
                    Profile updated successfully!
                </p>
            )}
        </div>
    );
}
