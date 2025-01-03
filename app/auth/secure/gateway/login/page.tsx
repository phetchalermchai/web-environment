import FormLogin from "@/components/Login/FormLogin"
import Image from "next/image";

const page = () => {
  return (
    <div className="flex">
   
       <div className="hidden lg:inline-flex w-[60%]">
        <Image 
          src="https://picsum.photos/960/720" 
          alt="Sample" 
          width={960} 
          height={720} 
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0..." // ใส่ Blur Data URL
          className="w-full"
        />
      </div>
      {/* <img src="https://cdn.pixabay.com/photo/2019/09/16/18/36/recup-4481723_960_720.jpg" alt="" className="hidden lg:inline-flex w-[60%]" /> */}
      <FormLogin />
    </div>
  )
}

export default page
