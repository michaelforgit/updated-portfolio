import clientPromise from '../lib/mongodb'
import { Document, WithId } from 'mongodb'
import Tile from '../components/tile'

type Props = {
  className?: string;
  sectionKey: string;
  sectionTitle: string;
}

type Tile = {
	id: string;
	title: string;
	subHeader: string;
	description: string;
	date: string;
	features: string[],
}

export default async function TileSection( { sectionKey, sectionTitle, className } : Props ) {
  let itemsReq: WithId<Document>[] = []

  try{
    const client = await clientPromise
    const db = await client.db("information")
    itemsReq = await db.collection( sectionKey ).find({}).toArray()
  } catch (e) {
    console.log(e)
  }

  const items : Tile[] = itemsReq.map( (item) => ( {
    id: item._id.toString(),
    title: item.title,
    subHeader: item.subheader,
    description: item.description,
    date: item.date,
    features: item.features,
  } ) )

  return ( 
    <div className={ className }>
      <h1 className="font-bold text-2xl text-left">{ sectionTitle.charAt(0).toUpperCase() + sectionTitle.slice(1) }</h1>
      <div className="p-2 flex flex-col gap-3">
        {
          items.map( (item) => (
            <Tile key={ item.id } title={ item.title } subheader={ item.subHeader } description={ item.description } date={ item.date } features={ item.features }/>
          ) )
        }
      </div>
    </div> 
  )
}