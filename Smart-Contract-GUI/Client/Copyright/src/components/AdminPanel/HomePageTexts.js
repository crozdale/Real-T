import React from "react";
import { TextField, Paper, FormLabel, Button } from "@material-ui/core";
import TextArea from "antd/lib/input/TextArea";
import { getTexts, updateTexts } from "../../api/admin";
import Loader from "../Loader";
import { DataContext } from "../../containers/Admin";

const HomePageTexts = () => {
  const [texts, setTexts] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [textToChange, setTextToChange] = React.useState({});
  const { data, setData } = React.useContext(DataContext);

  const handleChange = (e) => {
    const { value, name } = e.target
    setTextToChange({...textToChange, [name] : value })
  }

  React.useEffect(() => {
    getTexts().then((res) => {
      setTexts(res.data);
      setLoading(false);
    });
  }, [data.toggleUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    textToChange._id = texts._id;
    updateTexts(textToChange).then(() => {setData({ ...data, toggleUpdate: !data.toggleUpdate }); alert("Successfully updated the text")})
  };

  return loading ? (
    <div className="container mx-auto text-center">
      <Loader />
    </div>
  ) : (
    <Paper className="p-5">
      <form onSubmit={handleSubmit}>
        <div style={{ maxWidth: "70%" }}>
          <div className="border border-dark rounded p-3 m-3">
            <h4>Header:</h4>
            <div className="row mt-2 align-items-center">
              <FormLabel className="pr-2  ">Title: </FormLabel>
              <TextField
                required
                name="section1_title"
                defaultValue={texts.section1_title}
                onChange={handleChange}
              />
            </div>
            <div className="mt-2">
              <FormLabel>Description: </FormLabel>
              <TextArea
                required
                name="section1_description"
                defaultValue={texts.section1_description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="border border-dark rounded p-3 m-3">
            <h4>How it works:</h4>
            <div className="row mt-2 align-items-center">
              <FormLabel className="pr-2  ">Title: </FormLabel>
              <TextField
                required
                name="section2_title"
                defaultValue={texts.section2_title}
                onChange={handleChange}
              />
            </div>
            <div className="ml-3">
              <div className="mt-2">
                <FormLabel>Description line 1: </FormLabel>
                <TextArea
                  required
                  name="section2_description_line1"
                  defaultValue={texts.section2_description_line1}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <FormLabel>Description line 2: </FormLabel>
                <TextArea
                  required
                  name="section2_description_line2"
                  defaultValue={texts.section2_description_line2}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="ml-3">
              <h5>Steps</h5>
              <h6>Step 1:</h6>
              <div className="row mt-2 align-items-center">
                <FormLabel className="pr-2  ">Title: </FormLabel>
                <TextField
                  required
                  name="section2_steps_first_title"
                  defaultValue={texts.section2_steps_first_title}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <FormLabel>Description: </FormLabel>
                <TextArea
                  required
                  name="section2_steps_first_description"
                  defaultValue={texts.section2_steps_first_description}
                  onChange={handleChange}
                />
              </div>
              <h6>Step 2:</h6>
              <div className="row mt-2 align-items-center">
                <FormLabel className="pr-2  ">Title: </FormLabel>
                <TextField
                  required
                  name="section2_steps_second_title"
                  defaultValue={texts.section2_steps_second_title}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <FormLabel>Description: </FormLabel>
                <TextArea
                  required
                  name="section2_steps_second_description"
                  defaultValue={texts.section2_steps_second_description}
                  onChange={handleChange}
                />
              </div>
              <h6>Step 3:</h6>
              <div className="row mt-2 align-items-center">
                <FormLabel className="pr-2  ">Title: </FormLabel>
                <TextField
                  required
                  name="section2_steps_third_title"
                  defaultValue={texts.section2_steps_third_title}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <FormLabel>Description: </FormLabel>
                <TextArea
                  required
                  name="section2_steps_third_description"
                  defaultValue={texts.section2_steps_third_description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="border border-dark rounded p-3 m-3">
            <h4>Brief:</h4>
            <div className="row mt-2 align-items-center">
              <FormLabel className="pr-2  ">Title: </FormLabel>
              <TextField
                required
                name="section3_title"
                defaultValue={texts.section3_title}
                onChange={handleChange}
              />
            </div>
            <div className="mt-2">
              <FormLabel>Description: </FormLabel>
              <TextArea
                required
                name="section3_description"
                defaultValue={texts.section3_description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="border border-dark rounded p-3 m-3">
            <h4>Subscribe:</h4>
            <div className="row mt-2 align-items-center">
              <FormLabel className="pr-2  ">Title: </FormLabel>
              <TextField
                required
                name="section4_title"
                defaultValue={texts.section4_title}
                onChange={handleChange}
              />
            </div>
            <div className="row mt-2 align-items-center">
              <FormLabel className="pr-2  ">Subtitle: </FormLabel>
              <TextField
                required
                name="section4_subtitle"
                defaultValue={texts.section4_subtitle}
                onChange={handleChange}
              />
            </div>
            <div className="mt-2">
              <FormLabel>Description: </FormLabel>
              <TextArea
                required
                name="section4_description"
                defaultValue={texts.section4_description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="border border-dark rounded p-3 m-3">
            <h4>Why to choose us:</h4>
            <div className="row mt-2 align-items-center">
              <FormLabel className="pr-2  ">Title: </FormLabel>
              <TextField
                required
                name="section5_title"
                defaultValue={texts.section5_title}
                onChange={handleChange}
              />
            </div>
            <div className="row mt-2 align-items-center">
              <FormLabel className="pr-2  ">Subtitle: </FormLabel>
              <TextField
                required
                name="section5_subtitle"
                defaultValue={texts.section5_subtitle}
                onChange={handleChange}
              />
            </div>
            <div className="ml-3">
              <h5>Boxes</h5>
              <h6>First</h6>
              <div className="row mt-2 align-items-center">
                <FormLabel className="pr-2  ">Title: </FormLabel>
                <TextField
                  required
                  name="section5_first_title"
                  defaultValue={texts.section5_first_title}
                  onChange={handleChange}
                />
              </div>
              <div className="row mt-2 align-items-center">
                <FormLabel className="pr-2  ">Subtitle: </FormLabel>
                <TextField
                  required
                  name="section5_first_subtitle"
                  defaultValue={texts.section5_first_subtitle}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <FormLabel>Description: </FormLabel>
                <TextArea
                  required
                  name="section5_first_description"
                  defaultValue={texts.section5_first_description}
                  onChange={handleChange}
                />
              </div>
              <h6>Second</h6>
              <div className="row mt-2 align-items-center">
                <FormLabel className="pr-2  ">Title: </FormLabel>
                <TextField
                  required
                  name="section5_second_title"
                  defaultValue={texts.section5_second_title}
                  onChange={handleChange}
                />
              </div>
              <div className="row mt-2 align-items-center">
                <FormLabel className="pr-2  ">Subtitle: </FormLabel>
                <TextField
                  required
                  name="section5_second_subtitle"
                  defaultValue={texts.section5_second_subtitle}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <FormLabel>Description: </FormLabel>
                <TextArea
                  required
                  name="section5_second_description"
                  defaultValue={texts.section5_second_description}
                  onChange={handleChange}
                />
              </div>
              <h6>Third</h6>
              <div className="row mt-2 align-items-center">
                <FormLabel className="pr-2  ">Title: </FormLabel>
                <TextField
                  required
                  name="section5_third_title"
                  defaultValue={texts.section5_third_title}
                  onChange={handleChange}
                />
              </div>
              <div className="row mt-2 align-items-center">
                <FormLabel className="pr-2  ">Subtitle: </FormLabel>
                <TextField
                  required
                  name="section5_third_subtitle"
                  defaultValue={texts.section5_third_subtitle}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <FormLabel>Description: </FormLabel>
                <TextArea
                  required
                  name="section5_third_description"
                  defaultValue={texts.section5_third_description}
                  onChange={handleChange}
                />
              </div>
              <h6>Fourth</h6>
              <div className="row mt-2 align-items-center">
                <FormLabel className="pr-2  ">Title: </FormLabel>
                <TextField
                  required
                  name="section5_fourth_title"
                  defaultValue={texts.section5_fourth_title}
                  onChange={handleChange}
                />
              </div>
              <div className="row mt-2 align-items-center">
                <FormLabel className="pr-2  ">Subtitle: </FormLabel>
                <TextField
                  required
                  name="section5_fourth_subtitle"
                  defaultValue={texts.section5_fourth_subtitle}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-2">
                <FormLabel>Description: </FormLabel>
                <TextArea
                  required
                  name="section5_fourth_description"
                  defaultValue={texts.section5_fourth_description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="border border-dark rounded p-3 m-3">
            <h4>Footer:</h4>
            <div className="mt-2">
              <FormLabel>Line 1: </FormLabel>
              <TextArea
                required
                name="section6_line1"
                defaultValue={texts.section6_line1}
                onChange={handleChange}
              />
            </div>
            <div className="mt-2">
              <FormLabel>Line 2: </FormLabel>
              <TextArea
                required
                name="section6_line2"
                defaultValue={texts.section6_line2}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <Button style={{backgroundColor: "black", color:"white"}} type="submit">Submit</Button>
      </form>
    </Paper>
  );
};

export default HomePageTexts;
