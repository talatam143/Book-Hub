import './index.css'

function FetchError(params) {
  const {retryFetch} = params
  const handleRetry = () => {
    retryFetch()
  }
  return (
    <div className="fetchErrorContainer">
      <img
        src="https://res.cloudinary.com/dh0pptyea/image/upload/v1658604707/fetchError_yi5ycf.png"
        alt="failure view"
        className="fetchErrorImage"
      />
      <p className="fetchErrorParagraph">
        Something went wrong, Please try again.
      </p>
      <button className="fetchErrorButton" type="button" onClick={handleRetry}>
        Try Again
      </button>
    </div>
  )
}

export default FetchError
