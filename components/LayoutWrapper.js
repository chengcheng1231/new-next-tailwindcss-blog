import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { useTheme } from 'next-themes'

const LayoutWrapper = ({ children }) => {
  const theme = useTheme();

  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label={siteMetadata.blogName}>
              <div className="flex items-center justify-between">
                <div className="mr-3 h-10 w-10 md:h-14 md:w-14">
                  <img src={siteMetadata.logoImage} alt="" className="h-full w-full" />
                </div>
                {typeof siteMetadata.blogName === 'string' ? (
                  <div className="h-6 text-l sm:text-xl md:text-2xl font-semibold sm:block leading-6">
                    {siteMetadata.blogName}
                  </div>
                ) : (
                  siteMetadata.blogName
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
