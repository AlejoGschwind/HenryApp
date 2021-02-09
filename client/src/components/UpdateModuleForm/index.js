import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { updateModuleSchema } from "../../yup";
import { updateModule } from "../../redux/actions/modulesActions";

import Input from '../Input';
import Loading from '../Loading';
import Select from '../Select';
import { UpdateModuleFormWrapper, UpdateButton } from './styles';

const UpdateModuleForm = ({ modalRef, moduleData }) => {

  const { register, handleSubmit, errors, trigger } = useForm({
    resolver: yupResolver(updateModuleSchema)
  });

  // TODO: necesito hacer un req para traer los datos del usuario ?
  // const { isAuth } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(updateModule(moduleData._id, data));
  };

  if (!moduleData)
    return <Loading />;

  console;

  return (
    <UpdateModuleFormWrapper onSubmit={handleSubmit(onSubmit)}>

      <Input
        type="text"
        name="title"
        label="Title"
        required
        autoComplete="off"
        defaultValue={moduleData.title}
        ref={register}
        onChange={() => trigger("title")}
        error={errors.title?.message}
      />

      <Input
        type="text"
        name="description"
        label="Description"
        required
        autoComplete="off"
        defaultValue={moduleData.description}
        ref={register}
        onChange={() => trigger("description")}
        error={errors.description?.message}
      />

      <UpdateButton>
        Editar Lecture
      </UpdateButton>
    </UpdateModuleFormWrapper>
  );
};

export default UpdateModuleForm;
