import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "../../yup";

import Input from "../Input";
import { Button } from "./styles";

import { autoLoginUser } from "../../redux/actions/authActions";
import { updateUser } from "../../redux/actions/usersActions";

const UpdateProfileForm = () => {
  const { user } = useSelector((state) => state.auth);
  const { register, handleSubmit, errors, trigger } = useForm({
    resolver: yupResolver(profileSchema),
  });

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    await dispatch(updateUser(user._id, data));
    await dispatch(autoLoginUser());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Update profile</h3>
      <Input
        type="text"
        name="firstName"
        label="First Name"
        ref={register}
        onChange={() => trigger("firstName")}
        error={errors.firstName?.message}
        defaultValue={user.firstName ? user.firstName : user.companyName}
      />

      <Input
        type="text"
        name="lastName"
        label="Last Name"
        ref={register}
        onChange={() => trigger("lastName")}
        error={errors.lastName?.message}
        defaultValue={user.lastName}
      />
      <Input
        type="text"
        name="githubUsername"
        label="Git Hub Username"
        ref={register}
        onChange={() => trigger("githubUsername")}
        error={errors.githubUsername?.message}
        defaultValue={user.githubUsername}
      />
      <Button>Save changes</Button>
    </form>
  );
};

export default UpdateProfileForm;
