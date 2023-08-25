import Tag from './tag'

type Props = {
  className?: string;
  title: string;
  date: string;
  subheader: string;
  description: string;
  features: string[];
}

const modifyString = ( str: string ) => {
  console.log( str )
  const textSplit = str.split('<br>')
  const res = textSplit.map( ( text ) => ( <span>{ text }</span> ) )
  return res
}

export default function Tile( { className, title, date, subheader, description, features  }: Props ) {
  return (
    <div className={"bg-black bg-opacity-20 p-5 hover:bg-opacity-60" + " " + className }>

      <div className="flex flex-wrap justify-between">
        <h1 className="text-lg font-bold">{ title }</h1>
        <p className="text-lg text-left lg:text-right">{ date }</p>
      </div>
      <div>
        <h2 className="text-lg mt-2 flex flex-col gap-2">{ modifyString( subheader ) }</h2>
        <p className="mt-3 text-slate-200">{ description }</p>
      </div>
      <div>
        <div className="mt-3">
          { features?.map( ( feature ) => ( <Tag key={ feature } className="mr-2 mb-2" text={ feature } /> ) ) }
        </div>
      </div>

    </div>
  )
}