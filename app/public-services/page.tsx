import Link from "next/link"

const page = () => {
  return (
      <div>public-services page
        <a href={`/auth/secure/gateway/login`}>ล็อคอิน</a>
      </div>
  )
}

export default page