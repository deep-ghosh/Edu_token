import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-lg font-semibold mb-4 md:mb-0">&copy; 2024 EduToken Project. All rights reserved.</p>
        <div className="flex space-x-4">
          <Link href="https://github.com/your-repo" className="hover:text-blue-300 transition-colors">
            GitHub
          </Link>
          <Link href="/docs" className="hover:text-blue-300 transition-colors">
            Documentation
          </Link>
        </div>
      </div>
    </footer>
  )
}

