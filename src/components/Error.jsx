import { useRouteError } from 'react-router-dom'

const Error = () => {
    const error = useRouteError();
  return (
    <div>
        <h3>Oops Something went wrong!!!</h3>
        <h4>{error.status} : {error.data}</h4>
    </div>
  )
}

export default Error
