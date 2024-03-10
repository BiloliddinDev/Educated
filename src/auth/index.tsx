import { Navigate } from 'react-router-dom'

const user = {
	simple: 'ghost',
	student: 'student',
	admin: 'admin',
	teacher: 'teacher',
}

export const PuplickRoute = ({ children }: any) => {
	return <>{children}</>
}

export const StudentRoute = ({ children }: any) => {
	const curentUser = localStorage.getItem('role')

	if (
		curentUser === user.student &&
		curentUser !== user.admin &&
		curentUser !== user.teacher
	) {
		return <>{children}</>
	} else {
		return <Navigate to={'/'} />
	}
}

export const TeacherRoute = ({ children }: any) => {
	const curentUser = localStorage.getItem('role')

	if (curentUser === user.teacher) {
		return <>{children}</>
	} else {
		return <Navigate to={'/'} />
	}
}

export const AdminRoute = ({ children }: any) => {
	const curentUser = localStorage.getItem('role')

	if (curentUser === user.admin) {
		return <>{children}</>
	} else {
		return <Navigate to={'/'} />
	}
}
