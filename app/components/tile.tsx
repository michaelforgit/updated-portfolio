import Tag from './tag'

type Props = {
  className?: string;
  title: string;
  date: string;
  subheader: string;
  description: string;
}

export default function Tile( { className, title, date, subheader, description  }: Props ) {
  return (
    <div className={"bg-black bg-opacity-20 p-5 hover:bg-opacity-60" + " " + className }>

      <div className="grid grid-cols-2">
        <h1 className="col-span-2 lg:col-span-1 text-lg">{ title }</h1>
        <p className="col-span-2 lg:col-span-1 text-lg text-left lg:text-right">{ date }</p>
      </div>
      <div>
        <h2 className="text-lg mt-2 font-bold">{ subheader }</h2>
        <p className="mt-3">{ description }</p>
      </div>
      <div>
        <div className="mt-3">
          <Tag className="mr-2 mb-2" text="TypeScript" />
          <Tag className="mr-2 mb-2" text="JavaScript" />
          <Tag className="mr-2 mb-2" text="React" />
          <Tag className="mr-2 mb-2" text="PostgreSQL" />
          <Tag className="mr-2 mb-2" text="React" />
          <Tag className="mr-2 mb-2" text="React" />
          <Tag className="mr-2 mb-2" text="React" />
          <Tag className="mr-2 mb-2" text="React" />
          <Tag className="mr-2 mb-2" text="React" />
        </div>
      </div>

    </div>
  )
}