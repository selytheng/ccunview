import backgroundImage from '../assets/images/background.png';
import Navbar_HomePage from "../components/Navbar_HomePage.tsx";
import {IoArrowBack} from "react-icons/io5";
import {Link} from "react-router-dom";

const Login = () => {
    return (
        <>
            <div
                className="flex min-h-screen flex-1 flex-col justify-center "
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 1)',
                }}
            >
                <Navbar_HomePage/>
                <div className="flex min-h-full flex-1 flex-col justify-center mb-12 px-6 py-12 lg:px-8">
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-2 p-10 rounded-lg shadow-md bg-white bg-opacity-60">
                        <form action="#" method="POST" className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-bold text-gray-900 ">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        placeholder="Email"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm/6 font-bold text-gray-900">
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        placeholder="Password"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center mt-8 rounded-md bg-[#071952] px-3 py-1.5 mb-5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Log in
                                </button>
                                <Link to="/home">
                                    <div className="flex items-center gap-2 mb-10"><IoArrowBack className='icon'/>
                                        <div className="text-xs font-bold">Back home</div>
                                    </div>
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
