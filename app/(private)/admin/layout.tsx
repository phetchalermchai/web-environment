import Drawer from "@/features/admin/components/NavbarDrawer/Drawer"

// import components

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <>
            <Drawer>
                {children}
            </Drawer>
        </>
    )
}   