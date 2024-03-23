import { baseurl } from '@/utils/axios'
import { useEffect, useState } from 'react'
import { Button, Modal, Table, Form, Input, DatePicker } from 'antd'

interface Homework {
	id: string
	title: string
	description: string
	dueDate: Date
	group: string
}

interface Material {
	id: string
	title: string
	description: string
	group: string
	fileType: string
	file: string
}

const Lesson = () => {
	const [homeworkModalVisible, setHomeworkModalVisible] = useState(false)
	const [materialModalVisible, setMaterialModalVisible] = useState(false)
	const [homeworks, setHomeworks] = useState<Homework[]>([])
	const [materials, setMaterials] = useState<Material[]>([])
	const [currentHomework, setCurrentHomework] = useState<Homework | null>(null)
	const [currentMaterial, setCurrentMaterial] = useState<Material | null>(null)

	const [homeworkForm] = Form.useForm()
	const [materialForm] = Form.useForm()

	useEffect(() => {
		getAllHomework()
		getAllMaterials()
	}, [])

	const handleCreateHomework = () => {
		setCurrentHomework(null)
		setHomeworkModalVisible(true)
	}

	const handleCreateMaterial = () => {
		setCurrentMaterial(null)
		setMaterialModalVisible(true)
	}

	const handleSubmitHomework = async () => {
		try {
			const values = await homeworkForm.validateFields()
			const homework = {
				...values,
				dueDate: values.dueDate.toDate(),
			}
			const result = await baseurl.post('/api/homework', homework)
			setHomeworks([...homeworks, result.data])
			setHomeworkModalVisible(false)
			homeworkForm.resetFields()
		} catch (error) {
			console.error(error)
		}
	}

	const handleSubmitMaterial = async () => {
		try {
			const values = await materialForm.validateFields()
			const material = { ...values }
			const result = await baseurl.post('/api/material', material)
			setMaterials([...materials, result.data])
			setMaterialModalVisible(false)
			materialForm.resetFields()
		} catch (error) {
			console.error(error)
		}
	}

	const getAllHomework = async () => {
		try {
			const result = await baseurl.get('/homework')
			setHomeworks(result.data)
		} catch (error) {
			console.error(error)
		}
	}

	const getAllMaterials = async () => {
		try {
			const result = await baseurl.get('/material')
			setMaterials(result.data)
		} catch (error) {
			console.error(error)
		}
	}

	const handleDeleteHomework = async (id: string) => {
		try {
			await baseurl.delete(`/homework/${id}`)
			setHomeworks(homeworks.filter(homework => homework.id !== id))
		} catch (error) {
			console.error(error)
		}
	}

	const handleDeleteMaterial = async (id: string) => {
		try {
			await baseurl.delete(`/material/${id}`)
			setMaterials(materials.filter(material => material.id !== id))
		} catch (error) {
			console.error(error)
		}
	}

	// Modal for creating homework
	const homeworkModal = (
		<Modal
			title='Create Homework'
			visible={homeworkModalVisible}
			onCancel={() => setHomeworkModalVisible(false)}
			footer={[
				<Button
					key='cancel'
					onClick={() => setHomeworkModalVisible(false)}
					className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
				>
					Cancel
				</Button>,
				<Button
					key='submit'
					type='primary'
					onClick={handleSubmitHomework}
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
				>
					Create
				</Button>,
			]}
		>
			<Form form={homeworkForm} layout='vertical' className='max-w-md'>
				<Form.Item
					name='title'
					label='Title'
					rules={[{ required: true, message: 'Please enter a title' }]}
				>
					<Input placeholder='Enter homework title' />
				</Form.Item>
				<Form.Item
					name='description'
					label='Description'
					rules={[{ required: true, message: 'Please enter a description' }]}
				>
					<Input.TextArea placeholder='Enter homework description' rows={4} />
				</Form.Item>
				<Form.Item
					name='dueDate'
					label='Due Date'
					rules={[{ required: true, message: 'Please select a due date' }]}
				>
					<DatePicker />
				</Form.Item>
				<Form.Item
					name='group'
					label='Group'
					rules={[{ required: true, message: 'Please enter a group' }]}
				>
					<Input placeholder='Enter group name' />
				</Form.Item>
			</Form>
		</Modal>
	)

	const materialModal = (
		<Modal
			title='Create Material'
			visible={materialModalVisible}
			onCancel={() => setMaterialModalVisible(false)}
			footer={[
				<Button
					key='cancel'
					onClick={() => setMaterialModalVisible(false)}
					className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
				>
					Cancel
				</Button>,
				<Button
					key='submit'
					type='primary'
					onClick={handleSubmitMaterial}
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
				>
					Create
				</Button>,
			]}
		>
			<Form form={materialForm} layout='vertical' className='max-w-md'>
				<Form.Item
					name='title'
					label='Title'
					rules={[{ required: true, message: 'Please enter a title' }]}
				>
					<Input placeholder='Enter material title' />
				</Form.Item>
				<Form.Item
					name='description'
					label='Description'
					rules={[{ required: true, message: 'Please enter a description' }]}
				>
					<Input.TextArea placeholder='Enter material description' rows={4} />
				</Form.Item>
				<Form.Item
					name='group'
					label='Group'
					rules={[{ required: true, message: 'Please enter a group' }]}
				>
					<Input placeholder='Enter group name' />
				</Form.Item>
			</Form>
		</Modal>
	)

	// Table columns for displaying homeworks
	const homeworkColumns = [
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
			sorter: (a: Homework, b: Homework) => a.title.length - b.title.length,
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
			sorter: (a: Homework, b: Homework) =>
				a.description.length - b.description.length,
		},
		{
			title: 'Due Date',
			dataIndex: 'dueDate',
			key: 'dueDate',
			sorter: (a: Homework, b: Homework) =>
				new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
		},
		{
			title: 'Group',
			dataIndex: 'group',
			key: 'group',
			sorter: (a: Homework, b: Homework) => a.group.length - b.group.length,
		},
	]

	// Table columns for displaying materials
	const materialColumns = [
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
			sorter: (a: Material, b: Material) => a.title.length - b.title.length,
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
			sorter: (a: Material, b: Material) =>
				a.description.length - b.description.length,
		},
		{
			title: 'Group',
			dataIndex: 'group',
			key: 'group',
			sorter: (a: Material, b: Material) => a.group.length - b.group.length,
		},
		{
			title: 'File Type',
			dataIndex: 'fileType',
			key: 'fileType',
			sorter: (a: Material, b: Material) =>
				a.fileType.length - b.fileType.length,
		},
		{
			title: 'File',
			dataIndex: 'file',
			key: 'file',
			sorter: (a: Material, b: Material) => a.file.length - b.file.length,
		},
	]

	return (
		<div>
			<h1 className='bg-green-500 p-2'>Lesson</h1>
			<div className='flex m-2 gap-3'>
				<Button onClick={handleCreateHomework}>Create Homework</Button>
				<Button onClick={handleCreateMaterial}>Create Material</Button>
			</div>

			{/* Homework table */}
			<h2 className='text-xl mt-4'>Homeworks</h2>
			<Table
				dataSource={homeworks}
				columns={homeworkColumns}
				pagination={false}
			/>

			{/* Material table */}
			<h2 className='text-xl mt-4'>Materials</h2>
			<Table
				dataSource={materials}
				columns={materialColumns}
				pagination={false}
			/>

			{/* Modals */}
			{homeworkModal}
			{materialModal}
		</div>
	)
}

export default Lesson
