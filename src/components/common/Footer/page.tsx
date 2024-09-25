import Logo from "@/assets/Logo"

export default function Footer() {
  return(
    <footer className="w-full h-[6em] bg-transparent text-black border-t-[1px] border-gray-600 flex justify-between items-center px-12 relative">
      <div>
          <Logo width={40} height={40} color={"#000000"} />
      </div>
      <div className="absolute right-[50%]">Footer</div>
    </footer>
  )
}
