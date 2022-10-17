import parse from 'html-react-parser';
import Image from '@/components/Image';

export const PostImage = ({ source, description }) => (
  <div className="my-0 w-[100%]">
    <img
      src={source}
      alt=""
      className="mx-auto mb-0"
    />
    <div
      className="text-center mt-2 mb-0"
    >
      {
        parse(description)
      }
    </div>
  </div>
)
