import Image from "next/image"

const page = () => {
  return (
    <div>บุคลากร ผู้บริหาร
      <Image
        src="/person1.png"
        width={500}
        height={500}
        alt="Picture of the author"
      />
    </div>
  )
}

export default page