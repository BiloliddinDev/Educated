import { baseurl } from '@/utils/axios'
import { useFolder, usePersonStore } from '@/utils/zuztand'
import { Select, Table, message, Popconfirm } from 'antd'
import { PenSquare, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../../../../components/ui/button'

const TableGroup = () => {
    const [table, setTable] = useState([])
    const [student, setStudent] = useState([])
    const [selectedStudents, setSelectedStudents] = useState<string[]>([])
    const [update, setUpdate] = useState(0)
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
    }, [update])

    const { onOpen } = useFolder()
    const data: any = []

    const handleDeleteGroup = (groupId: string) => {
        baseurl
            .delete(`/groups/${groupId}`)
            .then(res => {
                console.log(res)
                message.success('Group deleted')
                setUpdate(update + 1)
            })
            .catch(err => console.error(err))
    }

    const handleUpdateGroup = (group: any) => {
        updateFirstName(group.name)
        updateLastName(group.description)
        onOpen()
    }

    const handleDeleteStudent = async (groupId: string, studentId: string) => {
        try {
            const response = await baseurl.delete(`/groups/${groupId}/students/${studentId}`)
            message.success(response.data.message)
            setUpdate(update + 1) // Trigger re-render to see the updated data
        } catch (err) {
            message.error('Failed to remove student from group')
            console.error(err)
        }
    }

    const handleStudentSelect = (value: string[]) => {
        setSelectedStudents(value)
    }

    const handleAddStudentsToGroup = async (groupId: string) => {
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

    table.forEach((group: any, i) => {
        data.push({
            ...group,
            key: i,
            id: i + 1,
            teacher: (
                <div className='flex flex-col items-center'>
                    <img
                        src={group?.teacher?.profileImage?.path}
                        width={100}
                        height={100}
                        alt={group?.teacher?.name}
                    />
                    <h1>{group?.teacher?.name}</h1>
                </div>
            ),
            action: (
                <div className='flex gap-4 justify-between'>
                    <Button
                        onClick={() => handleDeleteGroup(group._id)}
                        className='bg-red-600 hover:bg-red-500'
                    >
                        <Trash />
                    </Button>
                    <Button
                        onClick={() => handleUpdateGroup(group)}
                        className='bg-yellow-500 hover:bg-yellow-400'
                    >
                        <PenSquare />
                    </Button>
                </div>
            ),
            students: group.students.map((student: any) => ({
                ...student,
                key: student._id,
                action: (
                    <Popconfirm
                        title='Are you sure to delete this student from group?'
                        onConfirm={() => handleDeleteStudent(group._id, student._id)}
                        okText='Yes'
                        cancelText='No'
                    >
                        <Button className='bg-red-600 hover:bg-red-500'>Remove</Button>
                    </Popconfirm>
                ),
            })),
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
            title: 'Actions',
            dataIndex: 'action',
            key: 'actions',
        },
    ]

    const studentColumns = [
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
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },
    ]

    return (
        <div>
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
                                    optionLabelProp='label'
                                    size='large'
                                    options={student.map((s: any) => ({
                                        value: s._id,
                                        label: s.name,
                                    }))}
                                    onChange={handleStudentSelect}
                                />
                                <Button
                                    onClick={() => handleAddStudentsToGroup(record._id)}
                                    className='bg-green-500 hover:bg-green-600 flex-2'
                                >
                                    Add Students
                                </Button>
                            </div>

                            <Table columns={studentColumns} dataSource={record.students} />
                        </div>
                    ),
                }}
                rowKey={record => record.id}
                columns={columns}
                dataSource={data}
            />
        </div>
    )
}

export default TableGroup
