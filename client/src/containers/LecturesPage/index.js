import React, { useEffect, useState } from "react";
import axios from "axios";
import LectureCard from "../../components/LectureCard";
import { LecturePageWrapper, Grid } from "./styles";
import Layout from "../Layout";
import FilterBar from "../../components/FilterBar";

const LecturesPage = (props) => {
  const [search, setSearch] = useState("");
  const [lectures, setLectures] = useState([{
    _id: "",
    description: "",
    imagen: "",
    modulo: "",
    title: "",
    video: []
  }]);

  const [module, setModule] = useState([{
    _id: "",
    description: "",
    lectures: [],
    order: "",
    title: "",
  }]);

  useEffect(() => {
    getLectures();
    getOneModule();
  }, []);

  const getLectures = () => {
    console.log(props);
    axios.get(`http://localhost:5000/modules/${props.match.params.moduloid}`)
      .then(res => {
        setModule(res.data);
      });
  };

  const getOneModule = () => {
    axios.get(`http://localhost:5000/lectures/?moduleid=${props.match.params.moduloid}`).then(
      res => {
        console.log(res);
        setLectures(res.data);
      });
  };

  const filteredLectures = lectures
    .filter(l => {
      if (search.length > 0) {
        return l.title.toLowerCase().includes(search.toLowerCase())
          || l.description.toLowerCase().includes(search.toLowerCase()) ?
          true
          : false;
      };
      return true;
    });

  return (
    <Layout>
      <FilterBar filters={[]} search={search} setSearch={setSearch} />
      <LecturePageWrapper>
        <Grid>
          {filteredLectures.map(l => <LectureCard key={l._id} lecture={l} />)}
        </Grid>
      </LecturePageWrapper>
    </Layout>
  );
};
export default LecturesPage;
