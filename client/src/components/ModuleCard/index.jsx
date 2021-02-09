import React from "react";

import { ModuleCardWrapper, TopWrapper, Title, Description, LectureList, Button } from "./styles.js";
import LectureCard from "../LectureCard/index.js";

const ModuleCard = ({ module, lectures, available }) => {
  console.log(lectures);

  let firstLectures = lectures;
  if (lectures.length > 4) {
    firstLectures = lectures.slice(0, 4);
  }
  return (
    <ModuleCardWrapper>
      <Title>{module.title}</Title>
      <Description>{module.description}</Description>
      <LectureList>
        {firstLectures.map(l => <LectureCard lecture={l} />)}
      </LectureList>
      <Button to={`/modules/${module._id}`}>All Lectures ({lectures.length})</Button>
    </ModuleCardWrapper>
  );
};

export default ModuleCard;
