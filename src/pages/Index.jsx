import { Box, Button, Checkbox, Flex, Input, VStack, Heading, useColorModeValue, IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: tasks.length + 1,
        text: inputValue,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  const handleCompleteTask = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };

  const bg = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box bg={bg} minH="100vh" p={5}>
      <VStack spacing={4}>
        <Heading mb={6}>Todo List</Heading>
        <Flex>
          <Input
            placeholder="Add a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(event) => event.key === 'Enter' && handleAddTask()}
          />
          <Button onClick={handleAddTask} ml={2} colorScheme="blue">
            <FaPlus />
          </Button>
        </Flex>
        <VStack spacing={2} align="stretch">
          {tasks.map(task => (
            <Flex key={task.id} p={2} w="100%" justifyContent="space-between" alignItems="center">
              <Checkbox isChecked={task.completed} onChange={() => handleCompleteTask(task.id)}>
                {task.text}
              </Checkbox>
              <IconButton
                aria-label="Delete task"
                icon={<FaTrash />}
                onClick={() => handleDeleteTask(task.id)}
                colorScheme="red"
              />
            </Flex>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Index;