

function ShowLogo() {
    return (
        <div className="flex flex-col justify-between items-center h-screen bg-white dark:bg-black dark:text-white">
                <div className="flex flex-1 justify-center items-center">
                    <img
                        src="../src/assets/img/logoInstagram.webp"
                        alt="Instagram Logo"
                        className="w-[8rem]"
                    />
                </div>
                <div className="mb-6 text-center">
                    <p className="text-xs text-gray-500">from</p>
                    <img
                        src="../src/assets/img/logoMeta.webp"
                        alt="Meta Logo"
                        className="w-[5.2rem] mx-auto"
                    />
                </div>
            </div>
    );
}

export default ShowLogo;