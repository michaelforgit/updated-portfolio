import Tile from './components/tile'
import TileSection from './components/tileSection'
import clientPromise from './lib/mongodb'
import { FaLinkedin, FaGithubSquare, FaEnvelopeSquare } from "react-icons/fa"
import { Document, WithId } from 'mongodb'


type HomePage = {
	title: string;
	subtitle: string;
	description: string;
}

export default async function Home() {
	const sectionDictionary = { experiences: "experience", projects: "projects", schools: "education" }  //Collection name is different than rendered name.
	let homepageReq: WithId<Document>[] = []

	try {
		const client = await clientPromise
		const db = await client.db("information")
		homepageReq = await db.collection('homepage').find({}).toArray()
	} catch (e) {
		console.log(e)
	}

	const homepage : HomePage[] = homepageReq.map( (homepage) => ( {
		title: homepage.title,
		subtitle: homepage.subtitle,
		description: homepage.description,
	} ) )

	return (
		<div className="min-h-screen bg-gradient-to-tr from-slate-900 to-slate-700">
			{ homepage && (
				<div className="max-w-screen-2xl mx-auto flex justify-center">
					<div className="grid grid-cols-12 mt-16 md:mt-32">

						<header className="col-span-12 md:col-span-6 py-3 px-6 lg:px-10">
							<div className="flex flex-col lg:flex-row col-span-2 justify-between">
								<h1 className="md:text-left text-4xl xl:text-5xl font-bold text-center bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">{ homepage?.find(e => e)?.title || "Title" }</h1>
								<div className="flex justify-center md:justify-start h-10 mt-2">
									<a href="https://www.linkedin.com/in/michael-ogorman" className="h-full w-auto">
										<FaLinkedin className="h-full w-auto" />
									</a>
									<a href="https://github.com/michaelforgit" className="h-full w-auto">
										<FaGithubSquare className="h-full w-auto" />
									</a>
									<a href="mailto:ogormanjmichael@gmail.com" className="h-full w-auto">
										<FaEnvelopeSquare className="h-full w-auto" />
									</a>
								</div>
							</div>
							<p className="mt-2 text-center md:text-left text-xl">{ homepage?.find(e => e)?.subtitle || "Subtitle" }</p>
							<p className="mt-2 text-center md:text-left text-xl">{ homepage?.find(e => e)?.description || "Description" }</p>
							<div className="mt-32">
								<TileSection sectionKey="about" sectionTitle="More About Me" />
							</div>
						</header>

						<main className="col-span-12 md:col-span-6 py-5 px-6 lg:px-10">
							{
								Object.entries( sectionDictionary ).map( ( [sectionKey, sectionTitle ] ) => (
									<TileSection key={ sectionKey } sectionKey={ sectionKey } sectionTitle={ sectionTitle } /> 
								) )
							}
						</main>
						
					</div>
				</div>
			) }
		</div>
	)
}