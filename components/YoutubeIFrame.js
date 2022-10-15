export const YoutubeIFrameLayout = ({ source }) => (
  <div className="relative h-0 pb-[56.25%]">
    <iframe
      src={source}
      className="absolute top-0 left-0 h-full w-full"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen 
    />
  </div>
)
