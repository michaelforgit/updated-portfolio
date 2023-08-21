import { useContext, createServerContext } from 'react'
import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Tile from './components/tile'
import clientPromise from './lib/mongodb'

type HomePage = {
	title: string;
	subtitle: string;
	description: string;
}

type Tile = {
	id: string;
	title: string;
	subHeader: string;
	description: string;
	date: string;
	features: string[],
}

export default async function Home() {
	let client
	let db
	let experiences: Tile[] = []
	let homepage: HomePage[] = []
	try {
		client = await clientPromise
		db = await client.db("information")
		const experiencesReq = await db.collection('experiences').find({}).toArray()
		const homepageReq = await db.collection('homepage').find({}).toArray()
		homepage = homepageReq.map( (homepage) => ( {
			title: homepage.title,
			subtitle: homepage.subtitle,
			description: homepage.description,
		} ) )
		experiences = experiencesReq.map( (experience) => ( {
			id: experience._id.toString(),
			title: experience.title,
			subHeader: experience.subheader,
			description: experience.description,
			date: experience.date,
			features: experience.features,
		} ) )
	} catch (e) {
		console.log(e)
	}
	return (
		<div className="w-screen bg-primary-900">
			{ homepage && experiences && (
				<div className="max-w-screen-xl mx-auto flex justify-center">
					<div className="grid grid-cols-12 mt-32">

						<header className="col-span-12 md:col-span-6 px-10 py-5">
							<h1 className="text-left text-5xl font-bold">{ homepage?.find(e => e)?.title || "Title" }</h1>
							<p className="mt-3 text-left text-xl">{ homepage?.find(e => e)?.subtitle || "Subtitle" }</p>
							<p className="mt-3 text-left text-xl text-primary-400">{ homepage?.find(e => e)?.description || "Description" }</p>
						</header>

						<main className="col-span-12 md:col-span-6 px-10 py-5">
							<h1 className="text-3xl text-right">Experience</h1>
							<div>
								{
									experiences.map( (experience) => (
										<Tile key={ experience.id } className="mt-3" title={ experience.title } subheader={ experience.subHeader } description={ experience.description } date={ experience.date } features={ experience.features }/>
									) )
								}
							</div>
						</main>
					</div>
				</div>
			) }
		</div>
	)
}