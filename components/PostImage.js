import parse from 'html-react-parser';

export const PostImage = ({ source, description }) => (
  <>
    <img
      src={source}
      alt=""
      className="my-0 mx-auto"
    />
    <div
      className="text-center mt-2 mb-0"
    >
      {
        parse(description)
      }
    </div>
  </>
)
