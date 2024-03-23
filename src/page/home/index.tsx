import Madal from '@/components/shared/madal'
import { Button } from '@/components/ui/button'
import { useFolder } from '@/utils/zuztand'
import { useNavigate } from 'react-router-dom'
import Login from '../login'
const Home = () => {
	const { onOpen } = useFolder()
	const navigate = useNavigate()
	return (
		<div className='text-center'>
			<h1 className='text-5xl my-6'>Welcome to Home page</h1>
			<p className='opacity-80 mb-5'>Your gateway to knowledge!</p>
			<Button onClick={() => onOpen()}>Login now</Button>
			<Madal>
				<Login />
			</Madal>
		</div>
	)
}

export default Home
