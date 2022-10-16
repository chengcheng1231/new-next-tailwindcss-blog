import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
// import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        {/* <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="6" />
          <SocialIcon kind="github" href={siteMetadata.github} size="6" />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size="6" />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size="6" />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="6" />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size="6" />
        </div> */}
        <div className="mb-2 block sm:flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
          <div className="mb-2 flex justify-center">
            <div>
              {`© ${new Date().getFullYear()}`}
              &nbsp;
            </div>
            <Link
              className="text-stone-700 font-semibold hover:underline cursor-pointer"
              href="/"
            >
              {siteMetadata.blogName}
            </Link>
          </div>
          <div className="mb-2 flex justify-center">
            Credit to&nbsp;
            <Link
              href="https://github.com/timlrx/tailwind-nextjs-starter-blog"
              className="text-stone-700 font-semibold hover:underline cursor-pointer"
            >
              Tailwind Nextjs Theme
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
