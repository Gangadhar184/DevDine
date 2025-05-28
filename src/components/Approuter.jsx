
import { createBrowserRouter } from 'react-router-dom'
import App from '../App';
import Body from './Body';
import Contact from './Contact';    
import About from './About';
import Error from './Error';
import Menu from './Menu';
import Cart from './Cart';
import Login from './Login'

const Approuter = createBrowserRouter([

    {
        path: "/",
        element: <App/>,
        errorElement:<Error/>,
        children: [
            {
                path: "/",
                element:<Body/>
            },
           
            {
                path : "about",
                element:<About/>,
            },
            {
            path : "contact",
            element: <Contact/>
            },
            {
                path : "restaurants/:resId",
                element : <Menu/>
            },
            {
                path : "cart",
                element : <Cart/>
            },
            {
                path : "login",
                element : <Login/>
            }

        ]
    }
])

export default Approuter;
