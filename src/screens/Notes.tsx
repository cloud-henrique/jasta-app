import React, { useEffect, useRef, useState } from 'react'
import { Keyboard, ListRenderItemInfo } from 'react-native'

import firestore from '@react-native-firebase/firestore'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { Center, Divider, FlatList, HStack, Icon, IconButton, Text, useToast, VStack } from 'native-base'

import { Input } from '@components/Input'
import { Header } from '@components/Header'
import { AlertDialog } from '@components/Modals/AlertDialog'

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
    .then(() => toast.show({ description: 'Tarefa excluída!' }))
    .catch(error => console.error(error))
    .finally(() => handleCloseModal())
    
    setIsLoading(false)
  }

  function onToggleTask(id: string) {
    const tasksWithCheckedOne = tasks.map(task => {
      if (task.id === id) {
        firestore()
          .collection('tasks')
          .doc(id)
          .update({ done: !task.done })
          .then(() => {
            if (!task.done) toast.show({ description: 'Tarefa concluída!' })
            else return
          })
          .catch(error => console.error(error))

        return { ...task, done: !task.done }
      }
      return task
    })
    setTasks(tasksWithCheckedOne)
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
        // id: uuidv4(),
        description: newTaskInput.trim(),
        done: false,
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => toast.show({ description: 'Tarefa criada!' }))
      .catch(error => console.error(error))
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
          icon={
            <Icon
              as={MaterialCommunityIcons}
              size={6}
              color={item.done ? 'secondary.500' : 'primary.500'}
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

      <AlertDialog
        isLoading={isLoading}
        colorScheme='primary'
        isOpen={isModalVisible}
        onConfirm={() => onDeleteTask(selectedTask)}
        onClose={handleCloseModal}
        leastDestructiveRef={cancelDeleteRef}
        text={{ title: 'Excluir', content: 'Deseja excluir essa tarefa?', cancel: 'Não', confirm: 'Sim' }}
      />

      <HStack top={-28} mx={6}>
        <Input
          blurOnSubmit
          value={newTaskInput}
          onChangeText={setNewTaskInput}
          placeholder='Adicione uma nova tarefa'
          flex={1}
        />
        <IconButton
          ml={1}
          size={14}
          rounded='lg'
          bg='primary.700'
          variant='solid'
          onPress={handleNewTask}
          _pressed={{ bg: 'secondary.500' }}
          _icon={{ as: MaterialCommunityIcons, name: 'plus-circle-outline', size: 6 }}
        />
      </HStack>

      <VStack px={6}>
        <HStack w='full' justifyContent='space-between' pb={5}>
          <HStack alignItems='center' justifyContent='center'>
            <Text color='primary.500' bold mr={2}>
              Criadas
            </Text>
            <Center rounded='full' bg='gray.400' px={2} py={0.5}>
              <Text color='gray.200' bold fontSize='xs'>
                {tasks.length}
              </Text>
            </Center>
          </HStack>

          <HStack alignItems='center' justifyContent='center'>
            <Text color='secondary.500' bold mr={2}>
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
