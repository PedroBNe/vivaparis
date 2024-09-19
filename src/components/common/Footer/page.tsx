import Logo from "@/components/assets/Logo";

export default function Footer() {
    return(
        <footer className="w-full h-[6em] bg-black flex justify-between items-center px-12 relative">
            <div>
                <Logo width={40} height={40} color={"#ffffff"} />
            </div>
            <div className="absolute right-[50%]">Footer</div>
        </footer>
    )
}