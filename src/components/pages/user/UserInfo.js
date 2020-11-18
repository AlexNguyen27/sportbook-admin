import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, InputLabel, FormControl } from "@material-ui/core";
import { Row, Col } from "reactstrap";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from '@material-ui/icons/Save';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import moment from 'moment';
import MenuItem from '@material-ui/core/MenuItem';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker,
} from '@material-ui/pickers';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';

import {
  BASE_URL,
  GET_ERRORS,
  CLEAR_ERRORS,
  BASE_IMAGE_URL,
} from "../../../store/actions/types";
import {
  capitalizeSnakeCase,
  trimObjProperties,
} from "../../../utils/formatString";

import PageLoader from "../../custom/PageLoader";
import TextFieldInputWithHeader from "../../custom/TextFieldInputWithheader";
import ImageIcon from "@material-ui/icons/Image";
import { editUserInfo } from "../../../store/actions/user";
import { dateFnsLocalizer } from "react-big-calendar";
import DropdownV2 from "../../custom/DropdownV2";
import { GENDER } from "../../../utils/common";
import REGIONS from '../../locales/regions.json';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  info: {
    padding: theme.spacing(2),
    // textAlign: "",
    fontSize: "16px",
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%'
  },
}));

const UserInfo = ({
  current_user,
  user,
  errors,
  location,
  editUserInfo,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    dob: '',
    avatar: '',
    gender: '',
    favoriteFoot: '',
    playRole: '',
    createdAt: '',
    updatedAt: '',
  });

  const genderArr = Object.keys(GENDER).map(key => ({
    key: key,
    value: GENDER[key]
  }))

  // const regionObj = JSON.parse(REGIONS);
  // console.log('SDF00000000000000000000000000000', JSON.parse(REGIONS))
  const regionArr = Object.keys(REGIONS).map(key => ({
    code: REGIONS[key].code,
    name: REGIONS[key].name_with_type,
  }))

  console.log(regionArr);
  // status: 0: private, 1: public
  const [selectedDropdownData, setSelectedDropdownData] = useState({
    selectedGenderKey: user.gender ? GENDER[user.gender] : genderArr[0].id || "",
    selectedRegionCode: user.address ? JSON.parse(user.address).region_code : '',
  });

  const { selectedGenderKey, selectedRegionCode } = selectedDropdownData;

  const [image, setImage] = useState({
    name: "",
    file: "",
  });

  // const [isEdit, setIsEdit] = useState(false);
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    dob,
    avatar,
    gender,
    favoriteFoot,
    playRole,
    createdAt,
    updatedAt,
  } = formData;
  // Save on change input value
  const onChange = (e) => {
    console.log('cons sdfsd')
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSelectGender = (genderKey) => {
    setSelectedDropdownData({
      ...selectedDropdownData,
      selectedGenderKey: genderKey,
    });
  };

  // const [selectedDate, setSelectedDate] = React.useState(
  //   new Date("2014-08-18T21:11:54")
  // );

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   setformData({
  //     ...formData,
  //     dob: date,
  //   });
  // };

  const setInit = () => {
    if (window.location.pathname === "/my-account") {
      setformData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        dob: user.dob || '',
        avatar: user.avatar || '',
        favoriteFoot: user.favoriteFoot || '',
        playRole: user.playRole || '',
        createdAt: user.createdAt || '',
        updatedAt: user.updatedAt || '',
      });
    } else {
      // setformData({
      //   username: current_user.username || "",
      //   firstName: current_user.firstName || "",
      //   lastName: current_user.lastName || "",
      //   quote: current_user.quote || "",
      //   email: current_user.email || "",
      //   phone: current_user.phone || "",
      //   address: current_user.address || "",
      //   githubUsername: current_user.githubUsername || "",
      // });
    }
  };

  useEffect(() => {
    setInit();
    // getGithubAvatar();
  }, []);

  // const getGithubAvatar = () => {
  //   if (current_user && JSON.stringify(current_user) !== "{}") {
  //     getGithubProfile(current_user.id, current_user.githubUsername);
  //   } else {
  //     getGithubProfile(user.id, user.githubUsername);
  //   }
  // };
  const onSubmit = (e) => {
    const formatData = trimObjProperties(formData);

    let error = {};
    const notRequired = ['dob', 'avatar'];
    // Object.keys(formatData).map((key) => {
    //   if (formatData[key].trim() === "" && !notRequired.includes(key)) {
    //     error[key] = "This field is required";
    //   }
    // });
    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    console.log(error);
    if (GENDER[selectedGenderKey]) {
      formatData.gender = selectedGenderKey;
    }

    formatData.dob = moment(selectedDate).format('DD/MM/YYYY');
    formatData.address = {
      region_code: selectedRegionCode,
    }

    if (JSON.stringify(error) === "{}") {
      editUserInfo(setLoading, formatData);
      // getGithubAvatar();
    }
  };

  // useEffect(() => {
  //   getGithubAvatar();
  // }, [current_user && current_user.imageUrl]);

  // let imageUrl =
  //   window.location.pathname === "/user-info"
  //     ? user.imageUrl
  //     : current_user.imageUrl;
  const imageUrl = BASE_IMAGE_URL;

  // const handleCapture = ({ target }) => {
  //   const fileName = target.files[0].name;
  //   setLoading(true);
  //   editUserInfo(setLoading, {}, target.files[0]);
  //   if (target.accept.includes("image")) {
  //     setImage({
  //       name: fileName,
  //       file: target.files[0],
  //     });
  //   }
  // };

  const onCancel = () => {
    // setIsEdit(false);
    setInit();
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  const [selectedDate, setSelectedDate] = useState(new Date(user.dob || ''));

  const handleDateChange = (date) => {
    console.log(selectedDate, 'sdfsdfsdfsdf', moment(date).format('DD/MM/YYYY'))
    console.log('date-', date);
    setSelectedDate(date);
  };

  const onChangeRegion = (code) =>  {
    setSelectedDropdownData({
      ...selectedDropdownData,
      selectedRegionCode: code,
    });
  }

  return (
    <PageLoader loading={loading}>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Row>
              <Col xs="3">
                <Paper className={classes.paper}>
                  <img
                    src={imageUrl}
                    alt="Girl in a jacket"
                    width="100%"
                    height={200}
                  />
                  <h6 className="mt-2 mb-0 font-weight-bold">{firstName} {lastName}</h6>
                </Paper>
                {/* <Row style={{ marginTop: '20px', justifyContent: 'center'}}>
                  <Button
                    variant="contained"
                    className="ml-3"
                    component="label"
                  >
                    <ImageIcon className="mr-2" /> Update avatar
                    <input
                      accept="image/*"
                      type="file"
                      onChange={handleCapture}
                      style={{ display: "none" }}
                    />
                  </Button>
                </Row> */}
              </Col>
              <Col xs="9">
                <h4 className="text-center">User Information</h4>
                <form onSubmit={(e) => onSubmit(e)}>
                  <Row>
                    <Col xs={6}>
                      <TextFieldInputWithHeader
                        id="outlined-multiline-flexible"
                        name='firstName'
                        label="First name"
                        fullWidth
                        value={firstName}
                        onChange={onChange}
                        placeHolder="Enter first name"
                        error={errors.firstName}
                        variant="outlined"
                      />
                    </Col>
                    <Col xs={6}>
                      <TextFieldInputWithHeader
                        id="outlined-multiline-flexible"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        value={lastName}
                        onChange={onChange}
                        placeHolder="Enter last name"
                        error={errors.lastName}
                        variant="outlined"
                      />
                    </Col>
                    <Col>
                      <TextFieldInputWithHeader
                        id="outlined-multiline-flexible"
                        name='email'
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={onChange}
                        className="mt-4"
                        placeHolder="Enter first name"
                        error={errors.email}
                        variant="outlined"
                      />
                    </Col>
                    <Col className="mt-4">
                      <DropdownV2
                        fullWidth
                        label="Gender"
                        value={selectedGenderKey.toString()}
                        options={genderArr || []}
                        valueBasedOnProperty="key"
                        displayProperty="value"
                        onChange={(genderKey) => onSelectGender(genderKey)}
                      />
                      {/* <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-required"
                        value={gender}
                        onChange={() => { }}
                        style={{ width: '100%' }}
                        className={classes.selectEmpty}
                      >
                        <MenuItem value='male'>Male</MenuItem>
                        <MenuItem value='female'>Female</MenuItem>
                      </Select> */}
                    </Col>
                  </Row>


                  <Row className="mt-4">
                    <Col xs={6}>
                      <TextFieldInputWithHeader
                        id="outlined-multiline-flexible"
                        name='phone'
                        label="Phone"
                        fullWidth
                        value={phone}
                        onChange={onChange}
                        placeHolder="Enter Phone"
                        error={errors.phone}
                        variant="outlined"
                      />
                    </Col>
                    {/* TODO: JSON FOR ADDRESS */}
                    <Col xs={6}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          variant="inline"
                          style={{ width: '100%', margin: 0 }}
                          format="dd/MM/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Date of birth"
                          value={selectedDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Col>
                  </Row>
                  {/* <FormControl className={classes.formControl}> */}
                  <Row className="mt-4">
                    <Col xs={4}>
                      <DropdownV2
                        fullWidth
                        label="City / Province / Region"
                        value={selectedRegionCode.toString()}
                        options={regionArr || []}
                        valueBasedOnProperty="code"
                        displayProperty="name"
                        onChange={(code) => onChangeRegion(code)}
                      />
                    </Col>
                    <Col xs={4}>
                      <InputLabel id="demo-simple-select-outlined-label">District</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-required"
                        value={''}
                        onChange={() => { }}
                        style={{ width: '100%' }}
                        className={classes.selectEmpty}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </Col>
                    <Col xs={4}>
                      <InputLabel id="demo-simple-select-outlined-label">Ward</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-required"
                        value={''}
                        onChange={() => { }}
                        style={{ width: '100%' }}
                        className={classes.selectEmpty}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </Col>
                    <Col className="mt-4">
                      <TextFieldInputWithHeader
                        id="outlined-multiline-flexible"
                        name='address'
                        label="Address"
                        fullWidth
                        value={address}
                        onChange={onChange}
                        error={errors.address}
                        variant="outlined"
                      />
                    </Col>

                  </Row>
                  {/* </FormControl> */}
                  {/* Extra information */}
                  <h6 className="font-weight-bold mt-4">Extra information: </h6>
                  <Row className="mt-2">
                    <Col xs={6}>
                      <TextFieldInputWithHeader
                        id="outlined-multiline-flexible"
                        name='favoriteFoot'
                        label="Farovite Foot"
                        fullWidth
                        value={favoriteFoot}
                        onChange={onChange}
                        placeHolder="Enter Favorite foot"
                        error={errors.favoriteFoot}
                        variant="outlined"
                      />
                    </Col>
                    {/* TODO: JSON FOR ADDRESS */}
                    <Col xs={6}>
                      <TextFieldInputWithHeader
                        id="outlined-multiline-flexible"
                        name="playRole"
                        label="Play role"
                        fullWidth
                        value={playRole}
                        onChange={onChange}
                        placeHolder="Enter play role"
                        error={errors.playRole}
                        variant="outlined"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col xs={6}>
                      <TextFieldInputWithHeader
                        id="outlined-multiline-flexible"
                        name="createdAt"
                        label="Created Date"
                        fullWidth
                        value={moment(createdAt).format('DD/MM/YYYY HH:MM:ss')}
                        placeHolder="Enter created at"
                        error={errors.createdAt}
                        InputProps={{
                          readOnly: true,
                        }}
                        disabled
                        variant="outlined"
                      />
                    </Col>
                    {/* TODO: JSON FOR ADDRESS */}
                    <Col xs={6}>
                      <TextFieldInputWithHeader
                        id="outlined-multiline-flexible"
                        name="updatedAt"
                        label="Latest update At"
                        fullWidth
                        disabled
                        InputProps={{
                          readOnly: true,
                        }}
                        value={moment(updatedAt).format('DD/MM/YYYY HH:MM:ss')}
                        placeHolder="Enter created at"
                        variant="outlined"
                      />
                    </Col>
                  </Row>

                </form>
              </Col>
            </Row>
          </Grid>
          <Grid item xs={12} className="text-center">
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => onSubmit(e)}
            >
              <SaveIcon className="mr-2" /> Save
            </Button>
            <Button
              variant="contained"
              className="ml-4"
              onClick={() => onCancel()}
            >
              <RotateLeftIcon className="mr-2" /> Cancel
            </Button>
          </Grid>
        </Grid>
      </div>
    </PageLoader>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  user: state.auth.user
});
export default connect(mapStateToProps, { editUserInfo })(
  UserInfo
);
