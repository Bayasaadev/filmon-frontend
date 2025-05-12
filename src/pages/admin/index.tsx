import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminHome() {
    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold">Welcome to Filmon Admin Panel</h1>
            <p className="mt-2 text-gray-600">Choose a section from the sidebar to begin.</p>
        </AdminLayout>
    )
}