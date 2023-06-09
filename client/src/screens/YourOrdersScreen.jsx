import {
	TableContainer,
	Stack,
	Spinner,
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Th,
	Td,
	Table,
	Tbody,
	Tr,
	Thead,
	Button,
	ListItem,
	UnorderedList,
	Wrap,
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';

import { getUserOrders } from '../redux/actions/userActions';

import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const YourOrdersScreen = () => {
	const user = useSelector((state) => state.user);
	const { loading, error, orders, userInfo } = user;
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		//Only if we have userInfo, meaning someone is logged in, will we retrive our orders
		if (userInfo) {
			dispatch(getUserOrders(userInfo));
		}
	}, []);
	return userInfo ? (
		<>
			{loading ? (
				<Wrap justify='center' direction='column' align='center' mt='20px' minH='100vh'>
					<Stack direction='row' spacing={4}>
						<Spinner mt={20} thickness='6px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
					</Stack>
				</Wrap>
			) : error ? (
				<Alert status='error'>
					<AlertIcon />
					<AlertTitle>Oops! We are sorry!</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			) : (
				orders && (
					<TableContainer minHeight='100vh'>
						<Table variant='striped'>
							<Thead>
								<Tr>
									<Th>Order Id</Th>
									<Th>Order Date</Th>
									<Th>Order Total</Th>
									<Th>Items</Th>
									<Th>Print Receipt</Th>
								</Tr>
							</Thead>
							<Tbody>
								{orders.map((order) => (
									<Tr key={order._id}>
										<Td>{order._id}</Td>
										<Td>{new Date(order.createdAt).toDateString()}</Td>
										<Td>
											${order.totalPrice} via {order.paymentMethod}
										</Td>
										<Td>
											{order.orderItems.map((item) => (
												<UnorderedList key={item._id}>
													<ListItem>
														{item.qty} x {item.name} (${item.price} each)
													</ListItem>
												</UnorderedList>
											))}
										</Td>
										<Td>
											<Button variant='outline'>Receipt</Button>
										</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</TableContainer>
				)
			)}
		</>
	) : (
		<Navigate to='/login' replace={true} state={{ from: location }} />
	);
};

export default YourOrdersScreen;
