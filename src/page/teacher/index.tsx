import { Separator } from '@/components/ui/separator'
import type { MenuProps } from 'antd'
import { Avatar, Menu } from 'antd'
import { CgProfile } from 'react-icons/cg'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import { IoTimeOutline } from 'react-icons/io5'
import { TiGroupOutline } from 'react-icons/ti'
import { Outlet, useNavigate } from 'react-router-dom'
import logo from '../../../public/e-center.svg'

type MenuItem = Required<MenuProps>['items'][number]
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
	getItem('Timeboard', 'timeboard', <IoTimeOutline size={20} />),
	getItem('Teachers', 'lesson', <FaChalkboardTeacher size={20} />),
	getItem('Students & groups', 'groups', <TiGroupOutline size={20} />),
	getItem('Profile', 'profile', <CgProfile size={20} />),
	getItem('Logout', 'logout', <FiLogOut size={20} />),
]

const Teacher = () => {
	const navigation = useNavigate()

	const handleMenuClick = ({ key }: { key: React.Key }) => {
		if (key === 'logout') {
			localStorage.removeItem('token')
			localStorage.removeItem('role')
			navigation('/')
		} else {
			navigation(key as string)
		}
	}

	return (
		<div className='w-full'>
			<div className='w-[240px] fixed top-0 left-0 h-screen bg-[#152259] flex flex-col items-center pt-[30px]'>
				<Avatar className='w-[65px] h-[65px] mb-4' src={logo} />
				<Separator className='bg-[#BDBDBD]' />
				<Menu
					onClick={handleMenuClick}
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
