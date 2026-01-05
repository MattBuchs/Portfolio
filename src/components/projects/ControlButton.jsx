const ControlButton = ({ isPaused, isPausedClicked, setIsPausedClicked }) => {
    return (
        <button
            onClick={() => setIsPausedClicked(!isPausedClicked)}
            aria-label="Pause/Play"
            title="Pause/Play"
            className="hidden md:flex absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full justify-center items-center shadow z-50 border border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors"
        >
            {isPausedClicked || isPaused ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    className="w-3/5 h-3/5 ml-0.5 mt-0.5"
                >
                    <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    className="w-3/5 h-3/5 mt-0.5"
                >
                    <path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
                </svg>
            )}
        </button>
    );
};

export default ControlButton;
