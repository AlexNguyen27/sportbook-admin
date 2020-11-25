import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { clearErrors } from "../../../../store/actions/common";
import { TextField } from "@material-ui/core";
import _ from "lodash";

// COMPONENTS
import Button from "@material-ui/core/Button";
import TextFieldInputWithHeader from "../../../custom/TextFieldInputWithheader";
import REGIONS from "../../../locales/regions.json";
import DISTRICTS from "../../../locales/districts.json";
import WARDS from "../../../locales/wards.json";

import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import { GET_ERRORS } from "../../../../store/actions/types";
import PageLoader from "../../../custom/PageLoader";
import { getBenefits } from "../../../../store/actions/benefit";
import DropdownV2 from "../../../custom/DropdownV2";
import DropzoneAreaCustom from "../../../custom/DropzoneAreaCustom";
import ReactGoogleMaps from "../../../custom/ReactGoogleMaps";
import Benefits from "./Benefits";
import { getCategories } from "../../../../store/actions/category";
import { trimObjProperties } from "../../../../utils/formatString";
import { updateGround } from "../../../../store/actions/ground";

const EditGroundModal = ({
  errors,
  clearErrors,
  modal,
  setModal,
  getBenefits,
  getCategories,
  categories,
  ground,
  updateGround,
}) => {
  const dispatch = useDispatch();
  const categoryArr = Object.keys(categories).map((cateId) => ({
    ...categories[cateId],
  }));

  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = React.useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    phone: "",
    address: "",
  });
  const [selectedDropdownData, setSelectedDropdownData] = useState({
    selectedRegionCode: "",
    selectedDistrictCode: "",
    selectedWardCode: "",
    selectedCategoryId: "",
  });

  const [urls, setUrls] = useState([]);

  const initFormData = () => {
    if (ground) {
      const { title, description, phone, address, categoryId, image } = ground;
      const addressData = JSON.parse(address || "");
      const { regionCode, wardCode, districtCode } = addressData;
      setFormData({
        title,
        description,
        phone,
        address: addressData.address,
      });

      setSelectedDropdownData({
        selectedRegionCode: regionCode,
        selectedDistrictCode: districtCode,
        selectedWardCode: wardCode,
        selectedCategoryId: categoryId,
      });

      const formatImage = JSON.parse(image);
      if (formatImage.length > 0) {
        setUrls(formatImage.map((item) => item));
      }

      const benefit = ground.benefit
        .split(",")
        .map((benefitId) => ({ [benefitId]: true }));
      setChecked(benefit);
    }
  };

  useEffect(() => {
    if (modal) {
      getBenefits(setLoading).then(() => {
        setLoading(true);
        getCategories(setLoading);
        initFormData();
      });
    }
  }, [setModal, modal]);
  const {
    selectedRegionCode,
    selectedDistrictCode,
    selectedWardCode,
    selectedCategoryId,
  } = selectedDropdownData;

  const { title, description, phone, address } = formData;

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

  // CLOSE MODAL ACTION
  const closeModal = () => {
    setModal(false);
    clearErrors();
    setFormData({
      title: "",
      description: "",
      address: "",
    });
    setSelectedDropdownData({
      selectedRegionCode: "",
      selectedDistrictCode: "",
      selectedWardCode: "",
      selectedCategoryId: "",
    });
    setChecked({});
  };

  // HANDLE ON SUBMIT FROM ADD NEW GROUP
  const onSubmit = (e) => {
    e.preventDefault();

    const formatedData = trimObjProperties({
      ...formData,
      categoryId: selectedCategoryId,
      regionCode: selectedRegionCode,
      districtCode: selectedDistrictCode,
      wardCode: selectedWardCode,
    });

    const error = {};

    Object.keys(formatedData).map((key) => {
      if (!formatedData[key]) {
        error[key] = "This field is required";
      }
    });

    dispatch({
      type: GET_ERRORS,
      errors: error,
    });

    formatedData.benefit = Object.keys(checked).toString();
    formatedData.id = ground.id;
    if (JSON.stringify(error) === "{}") {
      setLoading(true);
      formatedData.image = JSON.stringify(urls);
      updateGround(setLoading, formatedData);
      closeModal();
    }
  };

  // Save on change input value
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

  const onChangeCategory = (id) => {
    setSelectedDropdownData({
      ...selectedDropdownData,
      selectedCategoryId: id,
    });
  };

  return (
    <Modal
      style={{ maxWidth: "700px", marginTop: "100px" }}
      isOpen={modal}
      toggle={() => closeModal()}
      centered={true}
    >
      <PageLoader loading={loading} noPadding>
        <ModalHeader toggle={() => closeModal()}>Edit Ground</ModalHeader>

        {/** MODAL BODY */}
        <Form onSubmit={(e) => onSubmit(e)}>
          <ModalBody>
            <Row>
              <Col xs="7">
                <DropdownV2
                  fullWidth
                  label="Category"
                  value={selectedCategoryId.toString() || ""}
                  options={categoryArr || []}
                  valueBasedOnProperty="id"
                  displayProperty="name"
                  onChange={(id) => onChangeCategory(id)}
                  error={errors.categoryId}
                />
              </Col>
              <Col xs="5">
                <TextFieldInputWithHeader
                  id="outlined-multiline-static"
                  label="Phone"
                  name="phone"
                  fullWidth
                  value={phone || ""}
                  onChange={(e) => onChange(e)}
                  error={errors.phone}
                />
              </Col>
              <Col xs="12" className="mt-4">
                <TextFieldInputWithHeader
                  id="outlined-multiline-flexible"
                  name="title"
                  label="Ground title"
                  fullWidth
                  value={title || ""}
                  onChange={(e) => onChange(e)}
                  error={errors.title}
                />
              </Col>
              <Col xs="12" className="mt-4">
                <TextField
                  id="outlined-multiline-static"
                  label="Enter ground description"
                  name="description"
                  fullWidth
                  value={description || ""}
                  multiline
                  rows={2}
                  onChange={onChange}
                  variant="outlined"
                  error={errors.description}
                />
              </Col>
              {/* BENEFIT */}
              <Col xs={12}>
                <Benefits checked={checked} setChecked={setChecked} />
              </Col>
              {/* ADDRESS */}
              <Col xs={4}>
                <DropdownV2
                  fullWidth
                  label="City / Province / Region"
                  value={selectedRegionCode.toString() || ""}
                  options={regionArr || []}
                  valueBasedOnProperty="code"
                  displayProperty="name"
                  onChange={(code) => onChangeRegion(code)}
                  error={errors.regionCode}
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
                  error={errors.districtCode}
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
                  error={errors.wardCode}
                />
              </Col>
              <Col xs={12} className="mt-4">
                <TextFieldInputWithHeader
                  id="outlined-multiline-flexible"
                  name="address"
                  label="Address"
                  fullWidth
                  value={address || ""}
                  onChange={(e) => onChange(e)}
                  error={errors.address}
                  variant="outlined"
                />
              </Col>
              {/* MAP */}
              <Col xs={12} className="mt-4">
                <ReactGoogleMaps />
              </Col>

              {/* IMAGE */}
              <Col xs={12} className="mt-4">
                <h6>Upload images:</h6>
                <DropzoneAreaCustom urls={urls} setUrls={setUrls} />
              </Col>
            </Row>
          </ModalBody>
          {/** MODAL FOOTER */}
          <ModalFooter>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
            <Button
              variant="contained"
              className="ml-2"
              onClick={() => closeModal()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </PageLoader>
    </Modal>
  );
};
const mapStateToProps = (state) => ({
  errors: state.errors,
  categories: state.category.categories,
});
export default connect(mapStateToProps, {
  clearErrors,
  getBenefits,
  getCategories,
  updateGround,
})(EditGroundModal);
