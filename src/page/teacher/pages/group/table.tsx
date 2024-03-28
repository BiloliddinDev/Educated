import { baseurl } from '@/utils/axios'
import { useFolder, usePersonStore } from '@/utils/zuztand'
import { Badge, Button, Popconfirm, Select, Table, message } from 'antd'
import { PenSquare, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'

const TableGroup = () => {
	const [groups, setGroups] = useState([])
	const [students, setStudents] = useState([])
	const [selectedStudents, setSelectedStudents] = useState([])
	const [update, setUpdate] = useState(0)
	const { updateFirstName, updateLastName } = usePersonStore()
	const { onOpen } = useFolder()

	useEffect(() => {
		// Fetch groups
		baseurl
			.get('/groups')
			.then(res => setGroups(res.data))
			.catch(err => console.error(err))

		// Fetch students
		baseurl
			.get('/students')
			.then(res => setStudents(res.data))
			.catch(err => console.error(err))
	}, [update])

	const handleDeleteGroup = groupId => {
		baseurl
			.delete(`/groups/${groupId}`)
			.then(res => {
				console.log(res)
				message.success('Group deleted')
				setUpdate(update + 1)
			})
			.catch(err => console.error(err))
	}

	const handleUpdateGroup = group => {
		updateFirstName(group.name)
		updateLastName(group.description)
		onOpen()
	}

	const handleDeleteStudent = async (groupId, studentId) => {
		try {
			const response = await baseurl.delete(
				`/groups/${groupId}/students/${studentId}`
			)
			message.success(response.data.message)
			setUpdate(update + 1) // Trigger re-render to see the updated data
		} catch (err) {
			message.error('Failed to remove student from group')
			console.error(err)
		}
	}

	const handleStudentSelect = value => {
		setSelectedStudents(value)
	}

	const handleAddStudentsToGroup = async groupId => {
		try {
			const response = await baseurl.post(`/groups/${groupId}/students/`, {
				studentIds: selectedStudents,
			})
			message.success(response.data.message)
			setSelectedStudents([]) // Clear selected students after adding
			setUpdate(update + 1) // Trigger re-render to see the updated data
		} catch (err) {
			message.error('Failed to add students to group')
			console.error(err)
		}
	}

	const handleMarkAttendance = async (groupId, student) => {
		try {
			const payload = {
				groupId,
				students: [
					{
						id: student._id,
						isPresent: !student.isPresent, // Toggle the attendance status
					},
				],
			}

			const response = await (student.isPresent
				? baseurl.put('/attendance', payload)
				: baseurl.post('/attendance', payload))

			// Update the student's attendance status in the local state
			const updatedGroups = groups.map(group => {
				if (group._id === groupId) {
					return {
						...group,
						students: group.students.map(s => {
							if (s._id === student._id) {
								return { ...s, isPresent: !s.isPresent }
							}
							return s
						}),
					}
				}
				return group
			})
			setGroups(updatedGroups)

			message.success('Attendance updated successfully')
		} catch (error) {
			console.error('Error marking attendance:', error)
			message.error('Failed to mark attendance')
		}
	}

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Teacher',
			key: 'teacher',
			render: (_, { teacher }) => (
				<div className='flex items-center'>
					<img
						src={teacher?.profileImage?.path}
						width={50}
						height={50}
						alt={teacher?.name}
						className='rounded-full mr-2'
					/>
					<span>{teacher?.name}</span>
				</div>
			),
		},
		{
			title: 'Email',
			key: 'teacher',
			render: (_, { teacher }) => (
				<div className='flex items-center'>
					<span>{teacher?.email}</span>
				</div>
			),
		},
		{
			title: 'Actions',
			key: 'actions',
			render: (_, group) => (
				<div className='flex gap-2'>
					<Button
						onClick={() => handleDeleteGroup(group._id)}
						className='bg-red-600 hover:bg-red-700 text-white'
					>
						<Trash size={16} />
					</Button>
					<Button
						onClick={() => handleUpdateGroup(group)}
						className='bg-yellow-500 hover:bg-yellow-600 text-white'
					>
						<PenSquare size={16} />
					</Button>
				</div>
			),
		},
	]

	const studentColumns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Attendance',
			key: 'attendance',
			render: (_, record) => (
				<Badge
					status={record.isPresent ? 'success' : 'error'}
					text={record.isPresent ? 'Present' : 'Absent'}
				/>
			),
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Popconfirm
					title='Are you sure to delete this student from group?'
					onConfirm={() => handleDeleteStudent(record.groupId, record._id)}
					okText='Yes'
					cancelText='No'
				>
					<Button className='bg-red-600 hover:bg-red-700 text-white'>
						Remove
					</Button>
				</Popconfirm>
			),
		},
	]

	return (
		<div>
			<h2 className='text-2xl font-semibold mb-4'>Group Information</h2>
			<Table
				expandable={{
					expandedRowRender: record => (
						<div className='w-full'>
							<div className='flex items-center justify-center gap-3 mb-4'>
								<Select
									className='flex-1'
									mode='multiple'
									placeholder='Select students'
									optionLabelProp='label'
									size='large'
									options={students.map(s => ({
										value: s._id,
										label: s.name,
									}))}
									onChange={handleStudentSelect}
								/>
								<Button
									onClick={() => handleAddStudentsToGroup(record._id)}
									className='bg-green-500 hover:bg-green-600 text-white'
								>
									Add Students
								</Button>
							</div>

							<Table
								columns={studentColumns}
								dataSource={record.students}
								rowKey='_id'
								pagination={false}
								onRow={record => ({
									onClick: () => handleMarkAttendance(record.groupId, record),
								})}
							/>
						</div>
					),
				}}
				rowKey={record => record._id}
				columns={columns}
				dataSource={groups}
			/>
		</div>
	)
}

export default TableGroup
