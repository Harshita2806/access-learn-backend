export default function ProtectedRoute({ children, roleRequired }) {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!token || !user) return <Navigate to="/auth" />;

    // Allow Teachers to visit the Student Page
    if (roleRequired === "teacher" && user.role !== "teacher") {
        return <Navigate to="/student" />;
    }

    // Students trying to access Teacher dashboard are blocked
    // But Teachers can access Student dashboard (roleRequired is "student")
    if (roleRequired === "student") {
        return children; // Both roles can see student content
    }

    return children;
}