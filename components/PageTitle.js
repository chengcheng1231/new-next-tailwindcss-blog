export default function PageTitle({ children }) {
  return (
    <h1 className="text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:leading-10 sm:text-2xl md:text-3xl md:leading-14">
      {children}
    </h1>
  )
}
