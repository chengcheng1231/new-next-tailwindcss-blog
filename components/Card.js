import Image from './Image'
import Link from './Link'
import { format, parseISO } from 'date-fns'

const Card = ({ title, description, imgSrc, href, date }) => (
  <li className="w-full max-w-lg pb-4 mx-auto rounded-sm md:" style={{ maxWidth: '544px' }}>
    <div
      className={`${
        imgSrc && 'h-full'
      }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
    >
      {imgSrc &&
        (href ? (
          <Link href={`/blog/${href}`} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        ))}
      <div className="px-4">
        <div className="text-xl font-bold leading-8 tracking-tight mb-2">
          {href ? (
            <Link href={`/blog/${href}`} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </div>
        <dl>
          <dd className="text-sm italic leading-6 text-gray-400 dark:text-gray-400">
            <time dateTime="2021-03-16">{format(parseISO(date), 'MMM do, uuu')}</time>
          </dd>
        </dl>
        <p className="prose-sm mb-3 max-w-none text-gray-500 dark:text-gray-400 line-clamp-3">{description}</p>
      </div>
    </div>
  </li>
)

export default Card
