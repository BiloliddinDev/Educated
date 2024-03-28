import { baseurl } from '@/utils/axios'
import { PlusOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, Modal, Select, Table } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

interface TimeBoard {
	_id: string
	lessonName: string
	lessonDateTime: string
	group: {
		_id: string
		name: string
	}
}

interface GroupData {
	_id: string
	name: string
}

const TimeBoard: React.FC = () => {
	const [timeBoards, setTimeBoards] = useState<TimeBoard[]>([])
	const [visible, setVisible] = useState<boolean>(false)
	const [form] = Form.useForm()
	const [groups, setGroups] = useState<GroupData[]>([])

	useEffect(() => {
		fetchTimeBoards()
		fetchGroups()
	}, [])

	const fetchTimeBoards = async () => {
		try {
			const response = await baseurl.get('/timeboard/teacher')
			setTimeBoards(response.data)
		} catch (error) {
			console.error(error)
		}
	}

	const fetchGroups = async () => {
		try {
			const response = await baseurl.get('/groups')
			setGroups(response.data)
		} catch (error) {
			console.error(error)
		}
	}

	const showModal = () => {
		setVisible(true)
	}

	const handleCancel = () => {
		setVisible(false)
		form.resetFields()
	}

	const handleCreate = async (values: any) => {
		try {
			const { lessonName, lessonDateTime, groupId } = values
			const response = await baseurl.post('/timeboard', {
				lessonName,
				lessonDateTime: moment(lessonDateTime).toISOString(),
				groupId,
			})
			setTimeBoards([...timeBoards, response.data])
			setVisible(false)
			form.resetFields()
		} catch (error) {
			console.error(error)
		}
	}

	const columns = [
		{
			title: 'Lesson name',
			dataIndex: 'lessonName',
			key: 'lessonName',
		},
		{
			title: 'Group',
			dataIndex: ['group', 'name'],
			key: 'groupName',
		},
		{
			title: 'Class time',
			dataIndex: 'lessonDateTime',
			key: 'lessonDateTime',
			render: (text: string) => (
				<span>{moment(text).format('YYYY-MM-DD HH:mm')}</span>
			),
		},
	]

	return (
		<div className='mx-auto p-4'>
			<div className='mb-4 flex justify-end'>
				<Button
					type='primary'
					onClick={showModal}
					icon={<PlusOutlined />}
					className='bg-green-700 text-white'
				>
					Add a lesson schedule
				</Button>
			</div>
			<Table dataSource={timeBoards} columns={columns} rowKey='_id' />
			<Modal
				title='Add a lesson schedule'
				open={visible}
				onCancel={handleCancel}
				footer={null}
			>
				<Form form={form} onFinish={handleCreate}>
					<Form.Item
						name='lessonName'
						label='Lesson name'
						rules={[
							{ required: true, message: 'Enter the name of the lesson' },
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name='lessonDateTime'
						label='Dars vaqti'
						rules={[{ required: true, message: 'Choose a lesson time' }]}
					>
						<DatePicker showTime />
					</Form.Item>
					<Form.Item
						name='groupId'
						label='Guruh'
						rules={[{ required: true, message: 'Select a group' }]}
					>
						<Select>
							{groups.map(group => (
								<Select.Option key={group._id} value={group._id}>
									{group.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item>
						<Button
							type='primary'
							htmlType='submit'
							className='bg-green-800 text-white'
						>
							Add
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	)
}

export default TimeBoard
