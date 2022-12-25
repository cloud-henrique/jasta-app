import React, { useEffect, useRef, useState } from 'react'
import { Keyboard, ListRenderItemInfo } from 'react-native'

import { v4 as uuidv4 } from 'uuid'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  AlertDialog,
  Button,
  Center,
  Divider,
  FlatList,
  HStack,
  Icon,
  IconButton,
  Text,
  useToast,
  VStack,
} from 'native-base'

import { Input } from '@components/Input'
import { Header } from '@components/Header'

const STORAGE_KEY = '@jasta:savedTasks'

interface TaskProps {
  id: string
  description: string
  done: boolean
}

export function Notes() {
  const toast = useToast()
  const cancelDeleteRef = useRef(null)

  const [selectedTask, setSelectedTask] = useState('')
  const [newTaskInput, setNewTaskInput] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [tasks, setTasks] = useState<TaskProps[]>([])

  async function loadSavedTasks() {
    try {
      const savedTasks = await AsyncStorage.getItem(STORAGE_KEY)
      if (savedTasks !== null) setTasks(JSON.parse(savedTasks))
    } catch (error) {
      console.warn(error)
    }
  }

  async function setTasksAndSave(newTasks: TaskProps[]) {
    try {
      setTasks(newTasks)
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks))
    } catch (error) {
      console.warn(error)
    }
  }

  function handleOpenModal(id: string) {
    setIsModalVisible(true)
    setSelectedTask(id)
  }

  function handleCloseModal() {
    setIsModalVisible(false)
  }

  function onDeleteTask(id: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => task.id !== id)
    setTasksAndSave(tasksWithoutDeletedOne)
    handleCloseModal()
    toast.show({ description: 'Tarefa excluída!' })
  }

  function onToggleTask(id: string) {
    const tasksWithCheckedOne = tasks.map(task => {
      if (task.id === id) return { ...task, done: !task.done }
      return task
    })
    setTasksAndSave(tasksWithCheckedOne)
  }

  function handleNewTask() {
    Keyboard.dismiss()
    if (!newTaskInput.trim()) return

    const newTasks = [...tasks, { id: uuidv4(), description: newTaskInput.trim(), done: false }]

    setTasksAndSave(newTasks)

    setNewTaskInput('')
  }

  function renderDeleteModal() {
    return (
      <AlertDialog leastDestructiveRef={cancelDeleteRef} isOpen={isModalVisible} onClose={handleCloseModal}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header bgColor='gray.500' borderColor='transparent'>
            <Text color='gray.200' bold fontSize='md'>
              Confirmar exclusão
            </Text>
          </AlertDialog.Header>
          <AlertDialog.Body bgColor='gray.500'>
            <Text color='gray.200'>Deseja realmente excluir essa tarefa?</Text>
          </AlertDialog.Body>
          <AlertDialog.Footer bgColor='gray.500' borderColor='transparent'>
            <Button.Group space={2}>
              <Button variant='unstyled' onPress={handleCloseModal} ref={cancelDeleteRef}>
                <Text color='gray.200'>Cancelar</Text>
              </Button>
              <Button colorScheme='danger' onPress={() => onDeleteTask(selectedTask)}>
                <Text color='gray.200' fontWeight={600}>
                  Excluir
                </Text>
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    )
  }

  function renderItem({ item }: ListRenderItemInfo<TaskProps>) {
    return (
      <HStack p={1.5} shadow='8' rounded='lg' bg='gray.500' borderWidth={1} alignItems='center' borderColor='gray.400'>
        <IconButton
          onPress={() => onToggleTask(item.id)}
          rounded='sm'
          w='10%'
          size={8}
          variant='solid'
          bg='transparent'
          color='gray.300'
          _pressed={{ bg: 'gray.400', _icon: { color: item.done ? 'primary.700' : 'secondary.700' } }}
          icon={
            <Icon
              as={MaterialCommunityIcons}
              size={6}
              color={item.done ? 'primary.500' : 'secondary.500'}
              name={item.done ? 'check-circle-outline' : 'circle-outline'}
            />
          }
        />
        <Text color='gray.100' strikeThrough={item.done} flex={10} w='80%'>
          {item.description}
        </Text>

        <IconButton
          onPress={() => handleOpenModal(item.id)}
          w='10%'
          flex={1}
          rounded='sm'
          bg='transparent'
          variant='solid'
          color='gray.300'
          _pressed={{ bg: 'gray.400', _icon: { color: 'red.500' } }}
          icon={<Icon as={MaterialCommunityIcons} name='trash-can-outline' size={6} color='gray.300' />}
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

  useEffect(() => {
    loadSavedTasks()
  }, [])

  return (
    <VStack bg='gray.600' flex={1}>
      <Header />

      {renderDeleteModal()}

      <HStack top={-28} mx={6}>
        <Input
          blurOnSubmit
          value={newTaskInput}
          onChangeText={setNewTaskInput}
          onSubmitEditing={handleNewTask}
          placeholder='Adicione uma nova tarefa'
          flex={1}
        />
        <IconButton
          onPress={handleNewTask}
          size={14}
          rounded='lg'
          bg='secondary.700'
          variant='solid'
          color='gray.100'
          _pressed={{ bg: 'secondary.500' }}
          _icon={{ as: MaterialCommunityIcons, name: 'plus-circle-outline', size: 6 }}
        />
      </HStack>

      <VStack px={6}>
        <HStack w='full' justifyContent='space-between' pb={5}>
          <HStack alignItems='center' justifyContent='center'>
            <Text color='secondary.500' bold mr={2}>
              Criadas
            </Text>
            <Center rounded='full' bg='gray.400' px={2} py={0.5}>
              <Text color='gray.200' bold fontSize='xs'>
                {tasks.length}
              </Text>
            </Center>
          </HStack>

          <HStack alignItems='center' justifyContent='center'>
            <Text color='primary.500' bold mr={2}>
              Concluídas
            </Text>
            <Center rounded='full' bg='gray.400' px={2} py={0.5}>
              <Text color='gray.200' bold fontSize='xs'>
                {tasks.filter(item => item.done).length}
              </Text>
            </Center>
          </HStack>
        </HStack>
      </VStack>

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
