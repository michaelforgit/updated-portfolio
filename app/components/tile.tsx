import Tag from './tag'

type Props = {
  className?: string;
  title?: string;
  date?: string;
  subheader?: string;
  description?: string;
  features?: string[];
}

const modifyString = ( str: string ) => {
  const textSplit = str.split('<br>')
  const res = textSplit.map( ( text, index ) => ( <span key={ index }>{ text }</span> ) )
  return res
}

export default function Tile( { className, title, date, subheader, description, features  }: Props ) {
  return (
    <div className={"bg-black bg-opacity-20 p-5 rounded-lg" + ( className ? " " + className : "") + ( title ? " hover:bg-opacity-60" : "") }>

      { title && <div className="flex flex-wrap justify-between">
        <h1 className="text-lg font-bold text-white">{ title }</h1>
        <p className="text-lg text-left lg:text-right text-white">{ date }</p>
      </div> }
      <div>
        { subheader && <h2 className="text-lg mt-2 flex flex-col gap-2 text-white">{ subheader !== undefined ? modifyString( subheader ) : <></> }</h2> }
        <p className={ "text-slate-200 " + ( title ? "mt-2" : "" ) }>{ description }</p>
      </div>
      { features && <div>
        <div className="mt-3">
          { features.map( ( feature ) => ( <Tag key={ feature } className="mr-2 mb-2" text={ feature } /> ) ) }
        </div>
      </div> }

    </div>
  )
}