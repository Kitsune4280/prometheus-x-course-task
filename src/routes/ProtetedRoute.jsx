import { Routes, Route, Navigate } from 'react-router-dom';

export default function ProtectedRoute({ user, children }) {
	//if (!user || user.length === 0) return <Navigate to='/signin' replace />;
	return !user || user.length === 0 ? (
		<Navigate to='/signin' replace />
	) : (
		children
	);
}
