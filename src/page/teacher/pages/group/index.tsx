import { Button, message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import TableGroup from './table'
// import Modal from '../../../../components/shared/madal'
import { Form, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { baseurl } from '@/utils/axios'

export interface Group {
	_id: string
	name: string
	description: string
	teacher: string
	students: string[]
}

export interface Student {
	_id: string
	name: string
}

const Groups = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [groups, setGroups] = useState<Group[]>([])
	const [students, setStudents] = useState<Student[]>([])
	const [form] = Form.useForm()
	const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
	const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

	useEffect(() => {
		getAllGroups()
		getAllStudents()
	}, [])

	const openModal = () => {
		setSelectedGroup(null)
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		form.resetFields()
	}

	const getAllGroups = async () => {
		try {
			const res = await baseurl.get('/groups')
			setGroups(res.data)
		} catch (error) {
			console.error('Error occurred while fetching groups:', error)
			message.error('Failed to fetch groups')
		}
	}

	const getAllStudents = async () => {
		try {
			const res = await baseurl.get('/students')
			setStudents(res.data)
		} catch (error) {
			console.error('Error occurred while fetching students:', error)
			message.error('Failed to fetch students')
		}
	}

	const createGroup = async (values: any) => {
		try {
			const res = await baseurl.post('/groups', values)
			setGroups([...groups, res.data])
			message.success('Group created successfully')
			closeModal()
		} catch (error) {
			console.error('Error occurred while creating group:', error)
			message.error('Failed to create group')
		}
	}

	const updateGroup = async (values: any) => {
		try {
			const res = await baseurl.put(`/groups/${selectedGroup?._id}`, values)
			const updatedGroups = groups.map(group =>
				group._id === res.data._id ? res.data : group
			)
			setGroups(updatedGroups)
			message.success('Group updated successfully')
			closeModal()
		} catch (error) {
			console.error('Error occurred while updating group:', error)
			message.error('Failed to update group')
		}
	}

	const deleteGroup = async (groupId: string) => {
		try {
			await baseurl.delete(`/groups/${groupId}`)
			const updatedGroups = groups.filter(group => group._id !== groupId)
			setGroups(updatedGroups)
			message.success('Group deleted successfully')
		} catch (error) {
			console.error('Error occurred while deleting group:', error)
			message.error('Failed to delete group')
		}
	}

	const addStudentToGroup = async (groupId: string, studentId: string) => {
		try {
			await baseurl.post(`/groups/${groupId}/students/${studentId}`)
			const updatedGroups = groups.map(group => {
				if (group._id === groupId) {
					group.students.push(studentId)
				}
				return group
			})
			setGroups(updatedGroups)
			message.success('Student added to the group successfully')
		} catch (error) {
			console.error('Error occurred while adding student to group:', error)
			message.error('Failed to add student to group')
		}
	}

	const removeStudentFromGroup = async (groupId: string, studentId: string) => {
		try {
			await baseurl.delete(`/groups/${groupId}/students/${studentId}`)
			const updatedGroups = groups.map(group => {
				if (group._id === groupId) {
					group.students = group.students.filter(id => id !== studentId)
				}
				return group
			})
			setGroups(updatedGroups)
			message.success('Student removed from the group successfully')
		} catch (error) {
			console.error('Error occurred while removing student from group:', error)
			message.error('Failed to remove student from group')
		}
	}

	const handleSubmit = (values: any) => {
		if (selectedGroup) {
			updateGroup(values)
		} else {
			createGroup(values)
		}
	}

	return (
		<div className='w-full'>
			<h1 className='text-2xl bg-orange-600 p-2 text-white font-bold'>
				Groups
			</h1>
			<div className='p-4'>
				<Button
					onClick={openModal}
					className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
				>
					Create New Group
				</Button>
			</div>
			<TableGroup
				groups={groups}
				students={students}
				onEdit={group => {
					setSelectedGroup(group)
					setIsModalOpen(true)
					form.setFieldsValue(group)
				}}
				onDelete={deleteGroup}
				onAddStudent={addStudentToGroup}
				onRemoveStudent={removeStudentFromGroup}
			/>
			<Modal
				title={selectedGroup ? 'Edit Group' : 'Create New Group'}
				open={isModalOpen}
				onCancel={closeModal}
				footer={null}
				className='max-w-md mx-auto'
			>
				<div className='flex flex-col justify-center items-center'>
					<Form
						form={form}
						name='group-form'
						onFinish={handleSubmit}
						autoComplete='off'
						className='flex flex-col justify-center w-full'
					>
						<h1 className='text-xl mb-2'>Name</h1>
						<Form.Item
							name='name'
							rules={[{ required: true, message: 'Please input group name!' }]}
						>
							<Input size='large' className='rounded-md' />
						</Form.Item>
						<h1 className='text-xl mb-2'>Description</h1>
						<Form.Item
							name='description'
							rules={[
								{ required: true, message: 'Please input group description!' },
							]}
						>
							<TextArea rows={4} className='rounded-md' />
						</Form.Item>
						<Button
							size={'lg'}
							type='primary'
							htmlType='submit'
							className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4'
						>
							Submit
						</Button>
					</Form>
				</div>
			</Modal>
		</div>
	)
}

export default Groups
