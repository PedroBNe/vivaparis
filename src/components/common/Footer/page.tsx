import Logo from "@/components/assets/Logo";

export default function Footer() {
    return(
        <footer className="w-full h-[6em] bg-black absolute flex justify-between items-center px-12 z-30">
            <div>
                <Logo width={40} height={40} color={"#ffffff"} />
            </div>
            <div>Footer</div>
        </footer>
    )
}