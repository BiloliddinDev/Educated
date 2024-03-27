import { Table, message, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { Button } from '../../../../components/ui/button'
import { baseurl } from '@/utils/axios'
import { PenSquare, Trash } from 'lucide-react'
import { useFolder, usePersonStore } from '@/utils/zuztand'

const TableGroup = () => {
	const [table, setTable] = useState([])
	const [update, setUpdate] = useState<any>({})
	const [student, setStudent] = useState([])
	const { updateFirstName, updateLastName } = usePersonStore()

	useEffect(() => {
		// Fetch groups
		baseurl
			.get('/groups')
			.then(res => setTable(res.data))
			.catch(err => console.error(err))

		// Fetch students
		baseurl
			.get('/students')
			.then(res => setStudent(res.data))
			.catch(err => console.error(err))
	}, [])

	const { onOpen } = useFolder()
	const data: any = []

	const Delete = (e: any) => {
		baseurl
			.delete(`/groups/${e._id}`)
			.then(res => {
				console.log(res), message.success('Group delete')
				setUpdate(1)
			})
			.catch(err => console.log(err))
	}

	const Update = (e: any) => {
		updateFirstName(e.name)
		updateLastName(e.description)
		onOpen()
	}

	table.map((e: any, i) => {
		data.push({
			...e,
			key: i,
			id: i + 1,
			teacher: (
				<div className='flex flex-col items-center'>
					<img src={e?.teacher?.profileImage?.path} width={100} height={100} />
					<h1>{e?.teacher?.name}</h1>
				</div>
			),
			description: e.description,
			action: (
				<div className='flex gap-4 justify-between'>
					<Button
						onClick={() => Delete(e)}
						className='bg-red-600 hover:bg-red-500'
					>
						<Trash />
					</Button>
					<Button
						onClick={() => Update(e)}
						className='bg-yellow-500 hover:bg-yellow-400'
					>
						<PenSquare />
					</Button>
				</div>
			),
			students: e.students.map((student: any) => student.name).join(', '), // Join student names as a string
		})
	})

	const columns: any = [
		{
			title: 'Id',
			dataIndex: 'id',
			key: 'id',
			sorter: (a: number, b: number) => a - b,
		},
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
			dataIndex: 'teacher',
			key: 'teacher',
		},
		{
			title: 'Students',
			dataIndex: 'students', // Use the new students field
			key: 'students',
		},
		{
			title: 'Actions',
			dataIndex: 'action',
			key: 'actions',
		},
	]

	// console.log(table);

	const [selectedStudents, setSelectedStudents] = useState<string[]>([])

	const handleStudentSelect = (value: string[]) => {
		setSelectedStudents(value)
	}

	const handleAddStudentsToGroup = (groupId: string) => {
		baseurl
			.post(`/groups/${groupId}/students`, { studentIds: selectedStudents })
			.then(res => {
				console.log(res)
				message.success('Students added to group successfully')
				// Refresh data after adding students
				baseurl
					.get('/groups')
					.then(res => setTable(res.data))
					.catch(err => console.error(err))
			})
			.catch(err => console.error(err))
	}

	// Studentlar uchun alohida jadval uchun ma'lumotlar
	const studentColumns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Created At',
			dataIndex: 'createdAt',
			key: 'createdAt',
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
		},
	]

	return (
		<div>
			{/* <h2>Student Information</h2> */}
			{/* <Table
        columns={studentColumns}
        dataSource={student}
        // rowKey={(record) => record[]._id}
      /> */}

			<h2>Group Information</h2>
			<Table
				expandable={{
					expandedRowRender: record => (
						<div className='w-full'>
							<div className='flex items-center justify-center gap-3'>
								<Select
									className='flex-3'
									mode='multiple'
									style={{ width: '100%' }}
									placeholder='Select students'
									onChange={handleStudentSelect}
									optionLabelProp='label'
									size='large'
									options={student.map((s: any) => ({
										value: s._id,
										label: s.name,
									}))}
								/>
								<Button
									onClick={() => handleAddStudentsToGroup(record._id)}
									className=' bg-green-500 hover:bg-green-600 flex-2'
								>
									Add Students
								</Button>
							</div>

							<Table columns={studentColumns} dataSource={table} />
						</div>
					),
				}}
				rowKey={columns.id}
				columns={columns}
				dataSource={data}
			/>
		</div>
	)
}

export default TableGroup
