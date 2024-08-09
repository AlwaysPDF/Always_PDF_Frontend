import { BounceLoader } from 'react-spinners'

const Loading = () => {
  return (
    <main className="flex justify-center items-center w-full h-screen">
    <div className="flex justify-center items-center h-full w-[90%]">
      <BounceLoader color="#25076B" size={120} />
    </div>
  </main>
  )
}

export default Loading
