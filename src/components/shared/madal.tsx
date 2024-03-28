import { useFolder } from '@/utils/zuztand'
import { Modal } from 'antd'
import React from 'react'

interface madalType {
	children: React.ReactNode
}

const Madal = ({ children }: madalType) => {
	const { isOpen, onClose } = useFolder()
	return (
		<Modal open={isOpen} onCancel={onClose} className='m-[auto] w-96'>
			{children}
		</Modal>
	)
}

export default Madal
