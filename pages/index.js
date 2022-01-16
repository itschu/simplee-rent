import Head from '../components/Head';
import Link from 'next/link'

export default function Home() {
	return (
		<>
			<Head currentPage="Home" />
			<Link href='/account/dashboard'>
				<a>Dashboard</a>
			</Link>
		</>
	)
}
