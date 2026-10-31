'use client';
import { useState } from "react"
import { IoClose, IoMenu } from "react-icons/io5"
import clsx from "clsx";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react"
import Image from "next/image";

export default function Navlink() {
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();

    return (
        <>
            {session?.user ? (
                <div className="flex items-center gap-2 justify-end md:order-2">
                    <div className="hidden text-sm bg-gray-50 border rounded-full md:me-0 md:block focus:ring-4 focus:ring-gray-300">
                        <Image src={session.user.image || "/avatar.svg"} width={64} height={64} alt="avatar" className="size-8 rounded-full" />
                    </div>
                    <div className="flex items-center">
                        <button onClick={() => signOut()} className="md:block hidden py-2 px-4 bg-white text-gray-700 hover:bg-gray-100 rounded-sm cursor-pointer">Sign Out</button>
                    </div>
                </div>
            ) : null}

            <button onClick={() => setOpen(!open)} className="inline-flex items-center p-2 justify-center text-sm text-white rounded-md md:hidden hover:bg-blue-200">
                {!open ? <IoMenu className="size-8" /> : <IoClose className="size-8" />}
            </button>
            <div className={clsx("w-full md:block md:w-auto", { "hidden": !open })}>
                <ul className="flex flex-col font-semibold text-sm uppercase p-4 mt-4 rounded-sm md:flex-row md:items-center md:space-x-10 md:p-0 md:mt-0 md:border-0 ">
                    {/* <li><Link href="/" className="block py-2 px-3 text-white hover:bg-blue-200 rounded-sm md:hover:bg-transparent md:p-0">Home</Link></li>
                    <li><Link href="/about" className="block py-2 px-3 text-white hover:bg-blue-200 rounded-sm md:hover:bg-transparent md:p-0">About</Link></li>
                    <li><Link href="/room" className="block py-2 px-3 text-white hover:bg-blue-200 rounded-sm md:hover:bg-transparent md:p-0">Room</Link></li>
                    <li><Link href="/contact" className="block py-2 px-3 text-white hover:bg-blue-200 rounded-sm md:hover:bg-transparent md:p-0">Contact</Link></li> */}

                    {session?.user.role === "admin" && (
                        <>
                            <li><Link href="/admin/dashboard" className="block py-2 px-3 text-white hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0">Dashboard</Link></li>
                            <li><Link href="/admin/barang" className="block py-2 px-3 text-white hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0">Barang</Link></li>
                        </>
                    )}

                    {/* {session ? (
                        <li className="pt-2 md:pt-0">
                            <button onClick={() => signOut()} className="md:hidden py-2.5 px-4 bg-red-400 text-white hover:bg-red-600 rounded-sm cursor-pointer">Sign Out</button>
                        </li>
                    ) : (
                        <li className="pt-2 md:pt-0">
                            <Link href="/signin" className="py-2.5 px-6 bg-red-400 text-white hover:bg-red-600 rounded-sm cursor-pointer">Sign In</Link>
                        </li>
                    )} */}
                </ul>
            </div>
        </>
    )
}