import React, { useState, useEffect } from 'react';
import { Box, Center, Heading, Text, Image, Spinner } from '@chakra-ui/react';

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
		<Box py='8'>
			<Center>
				<Box maxW='xl' p='6' borderWidth='1px' borderRadius='lg'>
					<Center>
						{isLoading ? <Spinner size='lg' /> : <Image src={dogImageUrl} alt='random dog' boxSize='lg' />}
					</Center>
					<Text fontSize='lg' fontStyle='italic' textAlign='center' my='4'>
						{quote}
					</Text>
				</Box>
			</Center>
		</Box>
	);
}

export default Homepage;
