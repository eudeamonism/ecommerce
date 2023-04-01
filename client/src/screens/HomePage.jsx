import React, { useState, useEffect } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Box, Center, Text, Image, Spinner, useColorModeValue, Link, Heading } from '@chakra-ui/react';

function Homepage() {
	const [quote, setQuote] = useState('');
	const [dogImageUrl, setDogImageUrl] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch('https://dog.ceo/api/breeds/image/random')
			.then((response) => response.json())
			.then((data) => setDogImageUrl(data.message))
			.catch((error) => console.error(error))
			.finally(() => setIsLoading(false));

		fetch('https://api.quotable.io/random')
			.then((response) => response.json())
			.then((data) => setQuote(data.content))
			.catch((error) => console.error(error));
	}, []);

	return (
		<Box py={{ base: '2', md: '8' }}>
			<Center>
				<Link
					as={ReactLink}
					color={useColorModeValue('orange.500', 'orange.300')}
					fontWeight='light'
					fontSize='lg'
					to='/'>
					<Center maxW={{ base: 'xs', md: 'full' }} textAlign='center'>
						<Heading>Back to Home Page</Heading>
					</Center>
				</Link>
			</Center>
			<Center>
				<Box maxW={{ base: 'md', md: 'xl' }} p={{ base: '4', md: '6' }} borderWidth='1px' borderRadius='lg'>
					<Center>
						{isLoading ? (
							<Spinner size={{ base: 'lg', md: 'xl' }} />
						) : (
							<Image src={dogImageUrl} alt='random dog' boxSize={{ base: 'auto', md: 'lg' }} />
						)}
					</Center>
					<Text fontSize={{ base: 'md', md: 'lg' }} fontStyle='italic' textAlign='center' my='4'>
						{quote}
					</Text>
				</Box>
			</Center>
		</Box>
	);
}

export default Homepage;
