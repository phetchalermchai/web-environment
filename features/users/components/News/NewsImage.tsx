interface NewsImageProps {
    src: string;
    alt: string;
  }
  
  const NewsImage = ({ src, alt }:NewsImageProps) => {
    return (
      <div className="w-full sm:w-2/4">
        <div className="w-full shadow-md rounded-2xl">
          <figure>
            <img src={src} alt={alt} className="rounded-2xl block w-full" />
          </figure>
        </div>
      </div>
    );
  };
  
  export default NewsImage;
  