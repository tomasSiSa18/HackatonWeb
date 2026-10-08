import { Form } from "@base-ui/react"
import Link from "next/link"

export default function Navbar() {
    return (
        <div className="flex flex-wrap items-center gap-8 dark:bg-gray-800 p-4 bg-gray-900 scale-x-[-1]">
            <h1 className="text-2xl font-bold text-white">Navbar</h1>
            <Link href="/" className="flex items-center gap-2 text-white">
                home
            </Link>
            <Link href="/timer" className="flex items-center gap-2 text-white">
                timer
            </Link>
            <Link href="/form" className="flex items-center gap-2 text-white">
                form
            </Link>
            <Link href="/password" className="flex items-center gap-2 text-white">
                password
            </Link>
            <div className="margin-left-auto">
                <Form action="/" className="flex items-center gap-2">
                    {}
                    <input
                        placeholder="Search..."
                        name="query"
                        className="bg-gray-300 text-gray-800 placeholder:text-gray-500 border focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                        className="bg-gray-900 border-cyan-400 border hover:bg-blue-600 text-cyan-400 font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Submit
                    </button>
                </Form>
            </div>
        </div>
    )
}
