"use client"

import ManagementPage from '@/features/admin/components/Management/ManagementPage';

const UsersPage = () => {
  return (
    <ManagementPage
      getsApi="/api/users"
      createLink="/admin/users/create"
      editLink="/admin/users/edit/"
      deleteApi="/api/users/delete/"
    />
  );
}

export default UsersPage;