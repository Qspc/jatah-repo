export default function ErrorMessage({ error }: { error: string | undefined }) {
    return (
        <div className="text-sm font-light text-red-500 capitalize">
            {error}
        </div>
    );
}
