import { Table, Button, Modal, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';

interface Group {
    _id: string;
    name: string;
    description: string;
    teacher: string;
    students: string[];
}

interface Student {
    _id: string;
    name: string;
}

interface TableGroupProps {
    groups: Group[];
    students: Student[];
    onEdit: (group: Group) => void;
    onDelete: (groupId: string) => void;
    onAddStudent: (groupId: string, studentId: string) => void;
    onRemoveStudent: (groupId: string, studentId: string) => void;
}

const TableGroup: React.FC<TableGroupProps> = ({
    groups,
    students,
    onEdit,
    onDelete,
    onAddStudent,
    onRemoveStudent,
}) => {
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
            dataIndex: 'teacher',
            key: 'teacher',
        },
        {
            title: 'Students',
            dataIndex: 'students',
            key: 'students',
            render: (students: string[], record: Group) => (
                <span>
                    {students.map(studentId => {
                        const student = students.find(student => student._id === studentId);
                        return <span key={studentId}>{student?.name}</span>;
                    })}
                </span>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text: any, record: Group) => (
                <span>
                    <Button type="primary" onClick={() => onEdit(record)}>
                        Edit
                    </Button>
                    <Button type="danger" onClick={() => onDelete(record._id)}>
                        Delete
                    </Button>
                </span>
            ),
        },
    ];

    return <Table columns={columns} dataSource={groups} />;
};

export default TableGroup;
