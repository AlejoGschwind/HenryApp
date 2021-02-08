import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "../../yup";
import Layout from "../../containers/Layout";
import Loading from '../Loading';
import UpdateProfileForm from "../UpdateProfile";
import ChangePasswordForm from "../ChangePasswordForm";

import { AvatarWrapper } from "./styles";

import { updateUser } from "../../redux/actions/usersActions";

const ProfileForm = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const { register, handleSubmit, errors, trigger } = useForm({
    resolver: yupResolver(profileSchema),
  });

  const dispatch = useDispatch();

  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(updateUser(data));
    history.push("/");
  };

  if (loading)
    return <Loading />;

  return (
    <Layout>
      <div>
        <AvatarWrapper>
          {user.avatar && (
            <img src={user.avatar} alt={user.firstName + " " + user.lastName} />
          )}
        </AvatarWrapper>
        <h1>
          {user.firstName} {user.lastName}
        </h1>
        <h2> {user.email} </h2>
      </div>
      <UpdateProfileForm />
      <ChangePasswordForm />
    </Layout>
  );
};

export default ProfileForm;
