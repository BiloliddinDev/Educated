import { Outlet, useNavigate } from 'react-router-dom'
import { RxDashboard } from 'react-icons/rx'
import { PiStudent } from 'react-icons/pi'
import { FaChalkboardTeacher, FaChartPie } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import type { MenuProps } from 'antd'
import { Avatar, Menu } from 'antd'
import { Separator } from '@/components/ui/separator'

type MenuItem = Required<MenuProps>['items'][number]
import logo from '../../../public/e-center.svg'
function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: 'group'
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem
}

const items: MenuItem[] = [
	getItem('Dashboard', '/teacher', <RxDashboard size={20} />),
	getItem('Teachers', 'lesson', <FaChalkboardTeacher size={20} />),
	getItem('Students/ classes', 'groups', <PiStudent size={20} />),
	getItem('Settings and profile', 'profile', <IoMdSettings size={20} />),
	getItem('Exams', '/1234', <FaChartPie size={20} />),
]

const Teacher = () => {
	const navigation = useNavigate()

	return (
		<div className='w-full'>
			<div className='w-[240px] fixed top-0 left-0 h-screen bg-[#152259] flex flex-col items-center pt-[30px]'>
				<Avatar className='w-[65px] h-[65px] mb-4' src={logo} />
				<Separator className='bg-[#BDBDBD]' />
				<Menu
					onClick={({ key }) => {
						navigation(key)
					}}
					className='bg-transparent text-[14px] text-white mt-[25px]'
					defaultSelectedKeys={[window.location.pathname]}
					defaultOpenKeys={[window.location.pathname]}
					mode='inline'
					items={items}
				/>
			</div>
			<div className='ml-[240px]'>
				<Outlet />
			</div>
		</div>
	)
}

export default Teacher
