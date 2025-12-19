
const UserStatusBadgeCell = ({ status }: { status: boolean }) => {
    return (
        <span
            className={`px-2 py-1 text-xs rounded font-medium ${status ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
        >
            {status ? "Blocked" : "Active"}
        </span>
    );
};

export default UserStatusBadgeCell;