import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import { CartScreen } from './screens/CartScreen';
import HomePage from './screens/HomePage';
import ProductsScreen from './screens/ProductsScreen';

function App() {
	return (
		<ChakraProvider>
			<Router>
				<Navbar />
				<main>
                    <Routes>
                        <Route path='/' element={<HomePage/> } />
						<Route path='/products' element={<ProductsScreen />} />
						<Route path='/cart' element={<CartScreen />} />
					</Routes>
				</main>
			</Router>
		</ChakraProvider>
	);
}

export default App;
