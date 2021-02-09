import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { updateLectureSchema } from "../../yup";
import { updateLecture } from "../../redux/actions/lecturesActions";

import Input from '../Input';
import Loading from '../Loading';
import Select from '../Select';
import { UpdateLectureFormWrapper, UpdateButton } from './styles';

const UpdateLectureForm = ({ modalRef, lectureData }) => {

  const { register, handleSubmit, errors, trigger } = useForm({
    resolver: yupResolver(updateLectureSchema)
  });

  // TODO: necesito hacer un req para traer los datos del usuario ?
  // const { isAuth } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data) => {
    dispatch(updateLecture(lectureData._id, data));
  };

  if (!lectureData)
    return <Loading />;

  console;

  return (
    <UpdateLectureFormWrapper onSubmit={handleSubmit(onSubmit)}>

      <Input
        type="text"
        name="title"
        label="Title"
        required
        autoComplete="off"
        defaultValue={lectureData.title}
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
        defaultValue={lectureData.description}
        ref={register}
        onChange={() => trigger("description")}
        error={errors.description?.message}
      />

      <Input
        type="text"
        name="imagen"
        label="Image"
        required
        autoComplete="off"
        defaultValue={lectureData.imagen}
        ref={register}
        onChange={() => trigger("imagen")}
        error={errors.imagen?.message}
      />

      <Input
        type="text"
        name="urlLecture"
        label="Lecture URL"
        required
        autoComplete="off"
        defaultValue={lectureData.urlLecture}
        ref={register}
        onChange={() => trigger("urlLecture")}
        error={errors.urlLecture?.message}
      />

      <UpdateButton>
        Editar Lecture
      </UpdateButton>
    </UpdateLectureFormWrapper>
  );
};

export default UpdateLectureForm;
