import { useState } from "react";
import { useFormik } from "formik";
import { Link, Redirect } from "react-router-dom";

import Input from "../Input";
import Button from "../Button";

import billingAddressSchema from "./billing-address-schema";
import { useUsers } from "../Context/UserContext";
import Breadcrumbs from "../Breadcrumbs";

function FormBillingAddress() {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { address, city, zip, country, saveAddress } = useUsers();

  const formik = useFormik({
    initialValues: {
      address: address,
      city: city,
      zip: zip,
      country: country,
    },
    validationSchema: billingAddressSchema,
    onSubmit: (values, { setSubmitting }) => {
      saveAddress(values);
      setSubmitting(true);

      setTimeout(() => {
        setHasSubmitted(true);
      }, 500);
    },
  });

  return (
    <>
      <Breadcrumbs active="address"/>

      <div className="d-flex justify-content-between">
        <div>
          <b>Billing Address</b>
        </div>
        <div>Step 2 of 4</div>
      </div>
      <hr />

      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <Input
            type="text"
            label="Address*"
            id="address"
            name="address"
            value={formik.values.address}
            placeholder="Address"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            hasErrorMessage={formik.touched.address}
            errorMessage={formik.errors.address}
          />
        </div>
        <div className="form-group">
          <Input
            type="text"
            label="City*"
            id="city"
            name="city"
            value={formik.values.city}
            placeholder="City"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            hasErrorMessage={formik.touched.city}
            errorMessage={formik.errors.city}
          />
        </div>
        <div className="form-group">
          <Input
            type="text"
            label="Zip/post code*"
            id="zip"
            name="zip"
            value={formik.values.zip}
            placeholder="00000"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            hasErrorMessage={formik.touched.zip}
            errorMessage={formik.errors.zip}
          />
        </div>
        <div className="form-group">
          <label>Country/region*</label>
          <select
            name="country"
            id="country"
            className="form-control"
            onChange={formik.handleChange}
          >
            <option value="ES">Spain</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
            <option value="IT">Italy</option>
          </select>
        </div>
        <div className="row justify-content-between">
          <Link to="/checkout/step-1">
            <Button>Back to User Information</Button>
          </Link>
          <Button
            submitButton
            disabled={formik.isValidating || !formik.isValid}
          >
            {formik.isSubmitting ? "Submitting..." : "Continue to delivery"}
          </Button>
        </div>
      </form>

      {hasSubmitted && <Redirect to="/checkout/step-3" />}
    </>
  );
}

export default FormBillingAddress;
