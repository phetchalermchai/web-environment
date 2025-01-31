interface ImageItem {
  src: string;
  caption?: string;
}

interface NewsImageProps {
  images: ImageItem[];
  alt: string;
}

const NewsImage = ({ images, alt }: NewsImageProps) => {
  return (
    <div className="w-full sm:w-2/4">
      <div className="w-full shadow-md rounded-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <figure key={index}>
              <img src={image.src} alt={`${alt} ${index + 1}`} className="rounded-2xl block w-full" />
              {/* ✅ แสดง caption ของแต่ละรูป */}
              {image.caption && <figcaption className="mt-2 text-sm text-gray-600 text-center">{image.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsImage;
