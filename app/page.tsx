import Tile from './components/tile'
import clientPromise from './lib/mongodb'
import { FaLinkedin, FaGithubSquare, FaEnvelopeSquare } from "react-icons/fa"
import Image from 'next/image'
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
		<div className="w-screen min-h-screen bg-primary-900 bg-opacity-0 relative">
				<Image
					alt="Background image of mountains."
					src="/background.jpg"
					className="z-[-1] object-cover"
					fill={ true }
 					quality={ 100 }
				/>
			{ homepage && experiences && (
				<div className="max-w-screen-2xl mx-auto flex justify-center">
					<div className="grid grid-cols-12 mt-16 md:mt-32">

						<header className="col-span-12 md:col-span-6 py-3 px-6 lg:px-10">
							<div className="flex flex-col lg:flex-row col-span-2 justify-between">
								<h1 className="md:text-left text-4xl xl:text-5xl font-bold text-center">{ homepage?.find(e => e)?.title || "Title" }</h1>
								<div className="flex justify-center md:justify-start h-10 mt-2">
									<FaLinkedin className="h-full w-auto" />
									<FaGithubSquare className="h-full w-auto" />
									<FaEnvelopeSquare className="h-full w-auto" />
								</div>
							</div>
							<p className="mt-2 text-center md:text-left text-xl">{ homepage?.find(e => e)?.subtitle || "Subtitle" }</p>
							<p className="mt-2 text-center md:text-left text-xl">{ homepage?.find(e => e)?.description || "Description" }</p>
						</header>

						<main className="col-span-12 md:col-span-6 py-5 px-6 lg:px-10">
							<h1 className="text-3xl text-left">Experience</h1>
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