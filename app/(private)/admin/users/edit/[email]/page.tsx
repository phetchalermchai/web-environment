"use client";

import UserEdit from "@/features/admin/components/UserForm/Edit/UserEdit";
import useEditUserForm from "@/features/admin/hooks/useEditUserForm";
import Image from "next/image";
import Link from "next/link";

const EditUserForm = () => {
  // const { handleChange, formData, errors, loading, message, fileUrl, handleSubmit, handleFileChange, handleCoverImageUpload } = useEditUserForm()

  return (
    <UserEdit/>
  );
};

export default EditUserForm;
