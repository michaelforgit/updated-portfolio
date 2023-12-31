import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Michael O\'Gorman',
	description: 'Portfolio of Michael O\'Gorman, a software engineer from Minnesota.',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
return (
	<html lang="en">
		<body>{children}</body>
	</html>
)
}