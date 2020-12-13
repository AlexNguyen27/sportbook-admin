import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import { Row, Col } from "reactstrap";
import _ from "lodash";
import SaveIcon from "@material-ui/icons/Save";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";

import { MuiPickersUtilsProvider, DatePicker, s } from "@material-ui/pickers";
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  BASE_IMAGE_URL,
} from "../../../store/actions/types";
import { trimObjProperties } from "../../../utils/formatString";
import PageLoader from "../../custom/PageLoader";
import TextFieldInputWithHeader from "../../custom/TextFieldInputWithheader";
import { editUserInfo, getUserInfo } from "../../../store/actions/user";
import DropdownV2 from "../../custom/DropdownV2";
import {
  GENDER,
  ROLE,
  USER_STATUS_DISPLAY,
} from "../../../utils/common";
import REGIONS from "../../locales/regions.json";
import DISTRICTS from "../../locales/districts.json";
import WARDS from "../../locales/wards.json";

import { validateEmail } from "../../../utils/commonFunction";
import SocialNetworkForm from "./component/SocialNetworkForm";
import ExtraInfoForm from "./component/ExtraInfoForm";
import MomoUpload from "./component/MomoUpload";
import AvatarUpload from "./component/AvatarUpload";
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
    width: "100%",
  },
  image: {
    position: "relative",
  },
  btnUpload: {
    position: "absolute",
    right: "116px",
    top: "155px",
  },
  btnUploadMomo: {
    position: "absolute",
    right: "116px",
    top: "450px",
  },
  inputFile: {
    display: "none",
  },
}));

const UserInfo = ({
  current_user,
  user,
  errors,
  editUserInfo,
  getUserInfo,
  viewType,
  auth: {
    isAdmin,
    user: { id: authId },
  },
  isManager,
  match,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const imageUrl = BASE_IMAGE_URL;
  const [avatar, setAvatar] = useState("");
  const [momoQRCode, setMomoQRCode] = useState("");

  const [loading, setLoading] = useState(true);

  const statusArr = Object.keys(USER_STATUS_DISPLAY).map((key) => ({
    key: key,
    value: USER_STATUS_DISPLAY[key],
  }));
  const [selectedStatus, setSelectedStatus] = useState("");

  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    // playRole: "",
    createdAt: "",
    updatedAt: "",
  });

  const [socialNetworkForm, setSocialNetworkForm] = useState({
    facebook: "",
    zalo: "",
    twitter: "",
  });

  const [extraInfoForm, setExtraInfoForm] = useState({
    favoriteFoot: "",
    playRole: "",
    shirtNumber: "",
    teamName: "",
    favoritePlayTime: "",
  });

  const onChangeSocialNetworkForm = (e) => {
    setSocialNetworkForm({
      ...socialNetworkForm,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeExtraInfoForm = (e) => {
    setExtraInfoForm({
      ...extraInfoForm,
      [e.target.name]: e.target.value,
    });
  };

  const genderArr = Object.keys(GENDER).map((key) => ({
    key: key,
    value: GENDER[key],
  }));

  // const favoriteFootArr = Object.keys(FAVORITE_FOOT).map((key) => ({
  //   key: key,
  //   value: FAVORITE_FOOT[key],
  // }));

  const [selectedDropdownData, setSelectedDropdownData] = useState({
    selectedGenderKey: "",
    // selectedFavoriteFootKey: "",
    selectedRegionCode: "",
    selectedDistrictCode: "",
    selectedWardCode: "",
  });

  const {
    selectedGenderKey,
    selectedRegionCode,
    selectedDistrictCode,
    selectedWardCode,
    // selectedFavoriteFootKey,
  } = selectedDropdownData;

  const regionArr = Object.keys(REGIONS).map((key) => ({
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

    districts = _.filter(districtArray, ["parent_code", selectedRegionCode]);
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
    wards = _.filter(wardArray, ["parent_code", selectedDistrictCode]);
    return wards;
  };

  const {
    firstName,
    lastName,
    email,
    phone,
    address,
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
    if (viewType === "user") {
      const address = JSON.parse(user.address) || {};

      setformData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address ? address.address : "",
        // playRole: user.playRole || "",
        createdAt: moment(user.createdAt).format("DD/MM/YYYY HH:mm A") || "",
        updatedAt: moment(user.updatedAt).format("DD/MM/YYYY HH:mm A") || "",
      });

      setSelectedStatus(user.status || "");
      setSelectedDropdownData({
        selectedRegionCode: _.get(address, "regionCode") || "",
        selectedDistrictCode: _.get(address, "districtCode") || "",
        selectedWardCode: _.get(address, "wardCode") || "",
        // selectedFavoriteFootKey: _.get(user, "favoriteFoot") || "",
        selectedGenderKey: _.get(user, "gender", "") || "",
      });
      setAvatar(user.avatar || imageUrl);
      setMomoQRCode(user.momoQRCode || imageUrl);

      if (user.socialNetwork) {
        setSocialNetworkForm({
          ...JSON.parse(user.socialNetwork),
        });
      }
      if (user.extraInfo) {
        setExtraInfoForm({
          ...JSON.parse(user.extraInfo),
        });
      }
    } else {
      console.log(current_user, 'd-------------------')
      const address = JSON.parse(_.get(current_user, "address"));
      setformData({
        firstName: _.get(current_user, "firstName") || "",
        lastName: _.get(current_user, "lastName") || "",
        email: _.get(current_user, "email") || "",
        phone: _.get(current_user, "phone") || "",
        address: _.get(current_user, "address") ? address.address : "",
        avatar: _.get(current_user, "avatar") || "",
        // playRole: _.get(current_user, "playRole") || "",
        createdAt:
          moment(current_user.createdAt).format("DD/MM/YYYY HH:mm A") || "",
        updatedAt:
          moment(current_user.updatedAt).format("DD/MM/YYYY HH:mm A") || "",
      });
      setSelectedStatus(current_user.status || "");

      setSelectedDropdownData({
        selectedRegionCode: _.get(address, "regionCode") || "",
        selectedDistrictCode: _.get(address, "districtCode") || "",
        selectedWardCode: _.get(address, "wardCode") || "",
        // selectedFavoriteFootKey: _.get(current_user, "favoriteFoot") || "",
        selectedGenderKey: _.get(current_user, "gender", "") || "",
      });
      setAvatar(current_user.avatar || imageUrl);
      setMomoQRCode(current_user.momoQRCode || imageUrl);

      if (current_user.socialNetwork) {
        setSocialNetworkForm({
          ...JSON.parse(current_user.socialNetwork),
        });
      }
      if (current_user.extraInfo) {
        setExtraInfoForm({
          ...JSON.parse(current_user.extraInfo),
        });
      }
    }
  };

  useEffect(() => {
    if (viewType === ROLE.admin) {
      getUserInfo(match.params.userId, setLoading);
    } else {
      getUserInfo(user.id, setLoading);
    }
    setInit();
  }, [match?.params?.userId || viewType]);

  const onSubmit = (e) => {
    const formatData = trimObjProperties(formData);

    const notRequireds = ["avatar"];
    let error = {};
    Object.keys(formatData).map((key) => {
      if (formatData[key].trim() === "" && !notRequireds.includes(key)) {
        error[key] = "This field is required";
      }
    });

    if (JSON.stringify(error) === "{}" && !validateEmail(email)) {
      error.email = "Email is invalid!";
    }
    // if (!selectedFavoriteFootKey.trim()) {
    //   error.favoriteFoot = "This field is required";
    // }
    if (!selectedGenderKey.trim()) {
      error.gender = "This field is required";
    }

    if (!selectedStatus.trim()) {
      error.status = "This field is required";
    }
    let dob = moment(selectedDate || "").format("DD/MM/YYYY");
    if (!dob.trim() || !selectedDate) {
      error.dob = "This field is required";
    }

    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    if (GENDER[selectedGenderKey]) {
      formatData.gender = selectedGenderKey;
    }

    formatData.dob = moment(selectedDate).format("DD/MM/YYYY");
    formatData.regionCode = selectedRegionCode;
    formatData.districtCode = selectedDistrictCode;
    formatData.wardCode = selectedWardCode;
    formatData.extraInfo = { ...extraInfoForm };
    formatData.socialNetwork = { ...socialNetworkForm };
    formatData.status = selectedStatus;

    if (JSON.stringify(error) === "{}") {
      formatData.phone = formData.phone.replace(/\s/g, "");
      setLoading(true);
      editUserInfo(
        setLoading,
        formatData,
        viewType === "user" ? user.id : current_user.id
      );
    }
  };

  const onCancel = () => {
    setInit();
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  const [selectedDate, setSelectedDate] = useState(
    viewType === "user"
      ? user?.dob
        ? new Date(user.dob)
        : null
      : current_user.dob
      ? new Date(current_user.dob)
      : null
  );

  const onChangeRegion = (code) => {
    setSelectedDropdownData({
      ...selectedDropdownData,
      selectedRegionCode: code,
      selectedWardCode: "",
      selectedDistrictCode: "",
    });
  };

  const onChangeDistrict = (code) => {
    setSelectedDropdownData({
      ...selectedDropdownData,
      selectedDistrictCode: code,
      selectedWardCode: "",
    });
  };

  const onChangeWard = (code) => {
    setSelectedDropdownData({
      ...selectedDropdownData,
      selectedWardCode: code,
    });
  };

  // const onChangeFavoriteFoot = (code) => {
  //   setSelectedDropdownData({
  //     ...selectedDropdownData,
  //     selectedFavoriteFootKey: code,
  //   });
  // };

  console.log("viewtype===============", viewType);
  // console.log(isAdmin, match?.params?.userId,  authId)
  return (
    <PageLoader loading={loading}>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Row>
              <Col xs="3">
                <AvatarUpload
                  avatar={avatar}
                  setAvatar={setAvatar}
                  firstName={firstName}
                  lastName={lastName}
                  userId={viewType === "user" ? user.id : current_user.id}
                />
                {viewType === "user" && isManager && (
                  <MomoUpload
                    momoQRCode={momoQRCode}
                    setMomoQRCode={setMomoQRCode}
                    userId={viewType === "user" ? user.id : current_user.id}
                  />
                )}
                {!isAdmin ? null : (
                  <div className="mt-4">
                    <DropdownV2
                      fullWidth
                      label="Status"
                      value={selectedStatus.toString()}
                      options={statusArr || []}
                      valueBasedOnProperty="key"
                      displayProperty="value"
                      onChange={(status) => setSelectedStatus(status)}
                      error={errors.status || ""}
                      variant="outlined"
                    />
                  </div>
                )}
              </Col>

              <Col xs="9">
                <h4 className="text-center">User Information</h4>
                <form onSubmit={(e) => onSubmit(e)}>
                  <Row>
                    <Col xs={6}>
                      <TextFieldInputWithHeader
                        id="outlined-multiline-flexible"
                        name="firstName"
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
                        name="email"
                        label="Email"
                        fullWidth
                        disabled={isAdmin && match?.params?.userId !== authId}
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
                        error={errors.gender || ""}
                        variant="outlined"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col xs={6}>
                      <TextFieldInputWithHeader
                        id="outlined-multiline-flexible"
                        name="phone"
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
                          style={{ width: "100%", margin: 0 }}
                          format="dd/MM/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Date of birth"
                          disableFuture={true}
                          value={selectedDate}
                          onChange={(date) => setSelectedDate(date)}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          error={errors.dob}
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
                        name="address"
                        label="Address"
                        fullWidth
                        value={address}
                        onChange={onChange}
                        error={errors.address}
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

                  {current_user?.role === "user" ? (
                    <>
                      <ExtraInfoForm
                        formData={extraInfoForm}
                        onChange={onChangeExtraInfoForm}
                      />
                      <SocialNetworkForm
                        formData={socialNetworkForm}
                        onChange={onChangeSocialNetworkForm}
                      />
                    </>
                  ) : (
                    <SocialNetworkForm
                      formData={socialNetworkForm}
                      onChange={onChangeSocialNetworkForm}
                    />
                  )}
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
  isManager: state.auth.isManager,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  editUserInfo,
  getUserInfo,
})(UserInfo);
