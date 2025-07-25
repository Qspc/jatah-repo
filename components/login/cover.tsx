export default function CoverPage({ children }: any) {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-full min-h-screen gap-10 bg-center bg-cover bg-palette">
            {children}
            {/* bg-[url('/assets/login.background.png')] */}
        </div>
    );
}
