export default function CoverPage({ children }: any) {
    return (
        <div className="bg-[#2148C0] bg-cover bg-center w-screen h-full min-h-screen flex flex-col gap-10 items-center justify-center">
            {children}
            {/* bg-[url('/assets/login.background.png')] */}
        </div>
    );
}
