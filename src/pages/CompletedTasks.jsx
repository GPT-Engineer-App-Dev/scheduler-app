import { Box, Button, Flex, VStack, Heading, useColorModeValue, IconButton, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FaTrash, FaUndo } from 'react-icons/fa';

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks).filter(task => task.completed) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

  const handleDeleteTask = (id) => {
    const filteredTasks = completedTasks.filter(task => task.id !== id);
    setCompletedTasks(filteredTasks);
  };

  const handleRestoreTask = (id) => {
    const updatedTasks = completedTasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: false };
      }
      return task;
    });
    setCompletedTasks(updatedTasks);
  };

  const bg = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box bg={bg} minH="100vh" p={5}>
      <VStack spacing={4}>
        <Heading mb={6}>Completed Tasks</Heading>
        <VStack spacing={2} align="stretch">
          {completedTasks.length > 0 ? completedTasks.map(task => (
            <Flex key={task.id} p={2} w="100%" justifyContent="space-between" alignItems="center">
              <Text>{task.text}</Text>
              <Flex>
                <IconButton
                  aria-label="Restore task"
                  icon={<FaUndo />}
                  onClick={() => handleRestoreTask(task.id)}
                  colorScheme="green"
                  mr={2}
                />
                <IconButton
                  aria-label="Delete task"
                  icon={<FaTrash />}
                  onClick={() => handleDeleteTask(task.id)}
                  colorScheme="red"
                />
              </Flex>
            </Flex>
          )) : <Text>No completed tasks.</Text>}
        </VStack>
      </VStack>
    </Box>
  );
};

export default CompletedTasks;