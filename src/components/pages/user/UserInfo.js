import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import { Row, Col } from "reactstrap";
import Paper from "@material-ui/core/Paper";
import _ from 'lodash';
import SaveIcon from '@material-ui/icons/Save';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  BASE_IMAGE_URL,
} from "../../../store/actions/types";
import {
  trimObjProperties,
} from "../../../utils/formatString";
import PageLoader from "../../custom/PageLoader";
import TextFieldInputWithHeader from "../../custom/TextFieldInputWithheader";
import { editUserInfo, getUserInfo } from "../../../store/actions/user";
import DropdownV2 from "../../custom/DropdownV2";
import { GENDER, FAVORITE_FOOT } from "../../../utils/common";
import REGIONS from '../../locales/regions.json';
import DISTRICTS from '../../locales/districts.json';
import WARDS from '../../locales/wards.json';

import { validateEmail } from "../../../utils/commonFunction";
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
  editUserInfo,
  getUserInfo,
  viewType,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    avatar: '',
    gender: '',
    playRole: '',
    createdAt: '',
    updatedAt: '',
  });

  const genderArr = Object.keys(GENDER).map(key => ({
    key: key,
    value: GENDER[key]
  }))

  const favoriteFootArr = Object.keys(FAVORITE_FOOT).map(key => ({
    key: key,
    value: FAVORITE_FOOT[key]
  }))

  const [selectedDropdownData, setSelectedDropdownData] = useState({
    selectedGenderKey: "",
    selectedFavoriteFootKey: "",
    selectedRegionCode: '',
    selectedDistrictCode: '',
    selectedWardCode: ''
  });

  const {
    selectedGenderKey,
    selectedRegionCode,
    selectedDistrictCode,
    selectedWardCode,
    selectedFavoriteFootKey
  } = selectedDropdownData;

  const regionArr = Object.keys(REGIONS).map(key => ({
    code: REGIONS[key].code,
    name: REGIONS[key].name_with_type,
  }));

  const getDistricts = () => {
    let districts = [];
    if (!selectedRegionCode.trim()) {
      return districts;
    }

    const districtArray = _.map(DISTRICTS, (district) => {
      const newDistrict = {
        code: district.code,
        name: district.name_with_type,
        parent_code: district.parent_code,
      };
      return newDistrict;
    });

    districts = _.filter(districtArray, ['parent_code', selectedRegionCode]);
    return districts;
  };

  const getWards = () => {
    let wards = [];
    if (!selectedDistrictCode.trim()) {
      return wards;
    }
    const wardArray = _.map(WARDS, (ward) => {
      const newWard = {
        code: ward.code,
        name: ward.name_with_type,
        parent_code: ward.parent_code,
      };
      return newWard;
    });
    wards = _.filter(wardArray, ['parent_code', selectedDistrictCode]);
    return wards;
  };

  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    avatar,
    playRole,
    createdAt,
    updatedAt,
  } = formData;
  // Save on change input value
  const onChange = (e) => {
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

  const setInit = () => {
    if (viewType === 'user') {
      console.log('uer---------------', user);
      const address = JSON.parse(user.address) || {};
      console.log('uer---------------', address);

      setformData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address ? address.address : '',
        avatar: user.avatar || '',
        playRole: user.playRole || '',
        createdAt: user.createdAt || '',
        updatedAt: user.updatedAt || '',
      });
      setSelectedDropdownData({
        selectedRegionCode: _.get(address, 'regionCode') || '',
        selectedDistrictCode: _.get(address, 'districtCode') || '',
        selectedWardCode: _.get(address, 'wardCode') || '',
        selectedFavoriteFootKey: _.get(user, 'favoriteFoot') || '',
        selectedGenderKey: _.get(user, 'gender', '') || '',
      })
    } else {
      const address = JSON.parse(_.get(current_user, 'address'));
      setformData({
        firstName: _.get(current_user, 'firstName') || "",
        lastName: _.get(current_user, 'lastName') || "",
        email: _.get(current_user, 'email') || "",
        phone: _.get(current_user, 'phone') || "",
        address: _.get(current_user, 'address') ? address.address : '',
        avatar: _.get(current_user, 'avatar') || '',
        playRole: _.get(current_user, 'playRole') || '',
        createdAt: _.get(current_user, 'createdAt') || '',
        updatedAt: _.get(current_user, 'updatedAt') || '',
      });
      setSelectedDropdownData({
        selectedRegionCode: _.get(address, 'regionCode') || '',
        selectedDistrictCode: _.get(address, 'districtCode') || '',
        selectedWardCode: _.get(address, 'wardCode') || '',
        selectedFavoriteFootKey: _.get(current_user, 'favoriteFoot') || '',
        selectedGenderKey: _.get(current_user, 'gender', '') || '',
      })
    };
  }

  useEffect(() => {
    getUserInfo(user.id, setLoading);
    setInit();
  }, [viewType]);

  const onSubmit = (e) => {
    const formatData = trimObjProperties(formData);

    let error = {};
    const notRequired = ['avatar'];
    Object.keys(formatData).map((key) => {
      if (formatData[key].trim() === "" && !notRequired.includes(key)) {
        error[key] = "This field is required";
      }
    });

    if (JSON.stringify(error) === "{}" && !validateEmail(email)) {
      error.email = "Email is invalid!";
    }
    if (!selectedFavoriteFootKey.trim()) {
      error.favoriteFoot = 'This field is required';
    }
    if (!selectedGenderKey.trim()) {
      error.gender = 'This field is required';
    }

    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (GENDER[selectedGenderKey]) {
      formatData.gender = selectedGenderKey;
    }

    formatData.dob = moment(selectedDate).format('DD/MM/YYYY');
    formatData.regionCode = selectedRegionCode;
    formatData.districtCode = selectedDistrictCode;
    formatData.wardCode = selectedWardCode;
    formatData.favoriteFoot = selectedFavoriteFootKey;

    if (JSON.stringify(error) === "{}") {
      console.log('--------------------formated data', formatData);
      console.log('--------------------formated data', viewType === 'user');
      editUserInfo(setLoading, formatData, viewType === 'user' ? user.id : current_user.id);
    }
  };

  const imageUrl = BASE_IMAGE_URL;

  const onCancel = () => {
    setInit();
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  const [selectedDate, setSelectedDate] = useState(
    viewType === 'user' ?
      user.dob ? new Date(user.dob) : null
      : current_user.dob ? new Date(current_user.dob) : null);

  const onChangeRegion = (code) => {
    setSelectedDropdownData({
      ...selectedDropdownData,
      selectedRegionCode: code,
      selectedWardCode: '',
      selectedDistrictCode: ''
    });
  }

  const onChangeDistrict = (code) => {
    setSelectedDropdownData({
      ...selectedDropdownData,
      selectedDistrictCode: code,
      selectedWardCode: ''
    });
  }

  const onChangeWard = (code) => {
    setSelectedDropdownData({
      ...selectedDropdownData,
      selectedWardCode: code,
    });
  }


  const onChangeFavoriteFoot = (code) => {
    setSelectedDropdownData({
      ...selectedDropdownData,
      selectedFavoriteFootKey: code,
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
                        error={errors.gender || ''}
                      />
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
                          onChange={(date) => setSelectedDate(date)}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Col>
                  </Row>
                  {/* ADDRESS */}
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
                      <DropdownV2
                        fullWidth
                        label="District"
                        value={selectedDistrictCode.toString()}
                        options={getDistricts() || []}
                        valueBasedOnProperty="code"
                        displayProperty="name"
                        onChange={(code) => onChangeDistrict(code)}
                      />
                    </Col>
                    <Col xs={4}>
                      <DropdownV2
                        fullWidth
                        label="Ward"
                        value={selectedWardCode.toString()}
                        options={getWards() || []}
                        valueBasedOnProperty="code"
                        displayProperty="name"
                        onChange={(code) => onChangeWard(code)}
                      />
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
                  {/* Extra information */}
                  <h6 className="font-weight-bold mt-4">Extra information: </h6>
                  <Row className="mt-2">
                    <Col xs={6}>
                      <DropdownV2
                        fullWidth
                        label="Farovite Foot"
                        disabledPlaceholder="None"
                        value={selectedFavoriteFootKey.toString()}
                        options={favoriteFootArr || []}
                        valueBasedOnProperty="key"
                        displayProperty="value"
                        onChange={(code) => onChangeFavoriteFoot(code)}
                        error={errors.favoriteFoot || ''}
                      />
                    </Col>
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
                        value={createdAt}
                        placeHolder="Enter created at"
                        error={errors.createdAt}
                        InputProps={{
                          readOnly: true,
                        }}
                        disabled
                        variant="outlined"
                      />
                    </Col>
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
                        value={updatedAt}
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
  user: state.auth.user,
  current_user: state.user.current_user,
});
export default connect(mapStateToProps, { editUserInfo, getUserInfo })(
  UserInfo
);
