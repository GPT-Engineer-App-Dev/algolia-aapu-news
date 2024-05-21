import { useEffect, useState } from "react";
import { Container, Text, VStack, Input, Button, Box, Spinner } from "@chakra-ui/react";
import axios from "axios";

const Index = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${query}`);
      setResults(response.data.hits);
    } catch (error) {
      console.error("Error fetching data from Algolia API", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Hacker News Aggregator</Text>
        <Input
          placeholder="Search Hacker News"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && fetchResults()}
        />
        <Button onClick={fetchResults} colorScheme="blue">Search</Button>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <VStack spacing={4} width="100%">
            {results.map((result) => (
              <Box key={result.objectID} p={4} borderWidth="1px" borderRadius="md" width="100%">
                <Text fontSize="lg" fontWeight="bold">
                  <a href={result.url} target="_blank" rel="noopener noreferrer">{result.title}</a>
                </Text>
                <Text fontSize="sm">Author: {result.author}</Text>
                <Text fontSize="sm">Points: {result.points} | Comments: {result.num_comments}</Text>
              </Box>
            ))}
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default Index;