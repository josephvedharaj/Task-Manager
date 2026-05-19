interface SpinnerProps {
  fullScreen?: boolean
}

const Spinner = ({ fullScreen = false }: SpinnerProps) => {
  
    return (
    <div className={`flex justify-center items-center ${fullScreen ? "fixed inset-0 bg-white z-50" : "py-10"}`}>
      <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default Spinner