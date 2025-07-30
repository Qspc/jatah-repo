export default function CoverPage({ children }: any) {
    return (
        <div className="relative flex flex-col items-center justify-center w-screen h-screen gap-10 overflow-hidden bg-center bg-cover over bg-palette">
            {children}
            <svg
                className="absolute top-0 right-0"
                width="865"
                height="720"
                viewBox="0 0 865 720"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M257.5 139C121.9 151.8 29.6667 51 0.5 -1L864.5 2.5V720.5H768C469.2 682.5 519.5 531 582 460C618.5 410.167 684.5 290.1 656.5 208.5C621.5 106.5 427 123 257.5 139Z"
                    fill="#264ECA"
                />
            </svg>

            <svg
                className="absolute bottom-0 left-0"
                width="480"
                height="480"
                viewBox="0 0 480 480"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="0" cy="480" r="480" fill="#264ECA" />
            </svg>
            <svg
                className="absolute bottom-0 left-0"
                width="360"
                height="360"
                viewBox="0 0 360 360"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="0" cy="360" r="360" fill="#244BC5" />
            </svg>
            <svg
                className="absolute bottom-0 left-0"
                width="219"
                height="219"
                viewBox="0 0 219 219"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="0" cy="219" r="219" fill="#264ECA" />
            </svg>
            {/* bg-[url('/assets/login.background.png')] */}
        </div>
    );
}
