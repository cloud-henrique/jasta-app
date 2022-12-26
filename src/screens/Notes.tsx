import React, { useEffect, useRef, useState } from 'react'
import { Keyboard, ListRenderItemInfo } from 'react-native'

import { Feather } from '@expo/vector-icons'
import firestore from '@react-native-firebase/firestore'
import {
  AlertDialog,
  Button,
  Center,
  Checkbox,
  Divider,
  FlatList,
  HStack,
  Icon,
  IconButton,
  Input,
  Pressable,
  Text,
  VStack,
  useToast,
} from 'native-base'

import { Header } from '@components/Header'

interface TaskProps {
  id: string
  description: string
  done: boolean
}

export function Notes() {
  const toast = useToast()
  const cancelDeleteRef = useRef(null)

  const [isLoading, setIsLoading] = useState(false)
  const [selectedTask, setSelectedTask] = useState('')
  const [newTaskInput, setNewTaskInput] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [tasks, setTasks] = useState<TaskProps[]>([])

  async function loadSavedTasks() {
    const subscribe = firestore()
      .collection('tasks')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(doc => {
          const data = doc.data()
          data.id = doc.id

          return { ...doc.data() }
        }) as TaskProps[]

        setTasks(data)
      })

    return () => subscribe
  }

  function handleOpenModal(id: string) {
    setIsModalVisible(true)
    setSelectedTask(id)
  }

  function handleCloseModal() {
    setIsModalVisible(false)
  }

  function onDeleteTask(id: string) {
    setIsLoading(true)

    firestore()
      .collection('tasks')
      .doc(id)
      .delete()
      .then(() => toast.show({ description: 'Tarefa excluída!', duration: 1000 }))
      .catch(error => console.error(error))
      .finally(() => handleCloseModal())

    setIsLoading(false)
  }

  function onToggleTask(id: string) {
    const tasksUpdated = tasks.map(task => {
      if (task.id === id) {
        firestore()
          .collection('tasks')
          .doc(id)
          .update({ done: !task.done })
          .then(() => {
            if (!task.done) toast.show({ description: 'Tarefa concluída!', duration: 1000 })
            else return
          })
          .catch(error => console.error(error))

        return { ...task, done: !task.done }
      }
      return task
    })
    setTasks(tasksUpdated)
  }

  function handleNewTask() {
    Keyboard.dismiss()
    if (!newTaskInput.trim()) return

    const newTasks = [...tasks, { id: '', description: newTaskInput.trim(), done: false }]

    setTasks(newTasks)

    setNewTaskInput('')

    firestore()
      .collection('tasks')
      .add({
        description: newTaskInput.trim(),
        done: false,
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => toast.show({ description: 'Tarefa criada!', duration: 1000 }))
      .catch(error => console.error(error))
  }

  function renderItem({ item }: ListRenderItemInfo<TaskProps>) {
    return (
      <HStack
        p={1.5}
        shadow='8'
        rounded='lg'
        bg='gray.500'
        borderWidth={1}
        alignItems='center'
        borderColor='gray.400'
        justifyContent='space-between'
      >
        <Checkbox value={item.description} onChange={() => onToggleTask(item.id)} w='80%' maxW='80%' minW='80%'>
          {item.description}
        </Checkbox>

        <IconButton
          onPress={() => handleOpenModal(item.id)}
          rounded='sm'
          bg='transparent'
          variant='solid'
          _pressed={{ bg: 'gray.400', _icon: { color: 'red.500' } }}
          icon={<Icon as={<Feather name='trash-2' />} color='gray.300' size={6} />}
        />
      </HStack>
    )
  }

  function renderListEmpty() {
    return (
      <>
        <Divider orientation='horizontal' bg='gray.400' />
        <Center h={240}>
          <Icon as={Feather} name='clipboard' size={20} color='gray.300' mb={2} />
          <Text color='gray.300' bold>
            Você ainda não tem tarefas cadastradas
          </Text>
          <Text color='gray.300'>Crie tarefas e organize seus itens a fazer</Text>
        </Center>
      </>
    )
  }

  function DeleteModal() {
    return (
      <AlertDialog isOpen={isModalVisible} leastDestructiveRef={cancelDeleteRef} onClose={handleCloseModal}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Excluir</AlertDialog.Header>
          <AlertDialog.Body>Deseja realmente excluir essa tarefa?</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space='2xl'>
              <Button variant='unstyled' onPress={handleCloseModal}>
                Não
              </Button>
              <Button colorScheme='danger' onPress={() => onDeleteTask(selectedTask)} isLoading={isLoading}>
                Sim
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    )
  }

  useEffect(() => {
    loadSavedTasks()
  }, [])

  return (
    <VStack bg='gray.600' flex={1}>
      <Header />

      <DeleteModal />

      <Input
        mx={6}
        top={-28}
        value={newTaskInput}
        onChangeText={setNewTaskInput}
        placeholder='Adicione uma nova tarefa'
        InputRightElement={
          <Pressable onPress={handleNewTask} bg='primary.700' size={14} alignItems='center' justifyContent='center'>
            <Icon as={<Feather name='plus-circle' />} size={6} color='white' />
          </Pressable>
        }
      />

      <HStack px={6}>
        <HStack w='full' justifyContent='space-between' pb={5}>
          <HStack alignItems='center' justifyContent='center'>
            <Text color='primary.500' bold mr={2}>
              Criadas
            </Text>
            <Center rounded='full' bg='gray.400' px={2} py={0.5}>
              <Text bold fontSize='xs'>
                {tasks.length}
              </Text>
            </Center>
          </HStack>

          <HStack alignItems='center' justifyContent='center'>
            <Text color='secondary.500' bold mr={2}>
              Concluídas
            </Text>
            <Center rounded='full' bg='gray.400' px={2} py={0.5}>
              <Text bold fontSize='xs'>
                {tasks.filter(item => item.done).length}
              </Text>
            </Center>
          </HStack>
        </HStack>
      </HStack>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={renderListEmpty}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
        ItemSeparatorComponent={() => <Divider orientation='horizontal' bg='transparent' h={4} />}
      />
    </VStack>
  )
}
