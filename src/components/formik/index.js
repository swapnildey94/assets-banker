import {withFormik} from "formik/dist/index";

const MyForm = props => {
    const {
        state,
        selectAsset,
        selectedAsset,
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        dirty,
    } = props;
    return (
        <div onSubmit={handleSubmit}>
            <Row>
                <Col sm="12" md={{size: 11, offset: 1}}>
                    <SemForm>
                        <SemForm.Field required>
                            <label>Enter your Full name</label>
                            <input
                                id="fullName"
                                placeholder="FullName"
                                type="text"
                                value={values.fullName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                    errors.fullName && touched.fullName ? (
                                        'text-input error'
                                    ) : (
                                        'text-input'
                                    )
                                }
                            />
                            {errors.fullName &&
                            touched.fullName && (
                                <div className="input-feedback">{errors.fullName}</div>
                            )}
                        </SemForm.Field>
                        <SemForm.Field required>
                            <label>Enter your Email Address</label>
                            <input
                                id="email"
                                placeholder="Email Address"
                                type="text"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                    errors.email && touched.email ? (
                                        'text-input error'
                                    ) : (
                                        'text-input'
                                    )
                                }
                            />
                            {errors.email &&
                            touched.email && (
                                <div className="input-feedback">{errors.email}</div>
                            )}
                        </SemForm.Field>
                        <SemForm.Field required>
                            <label>Enter your phone number</label>
                            <input
                                id="mobileNumber"
                                placeholder="US based Phone Number e.g., 123-456-7890"
                                type="text"
                                value={values.mobileNumber}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                    errors.mobileNumber && touched.mobileNumber ? (
                                        'text-input error'
                                    ) : (
                                        'text-input'
                                    )
                                }
                            />
                            {errors.mobileNumber &&
                            touched.mobileNumber && (
                                <div className="input-feedback">{errors.mobileNumber}</div>
                            )}
                        </SemForm.Field>
                        <SemForm.Field required>
                            <label>Enter your Zip Code</label>
                            <input
                                id="zipCode"
                                placeholder="US Zip Code"
                                type="text"
                                value={values.zipCode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                    errors.zipCode && touched.zipCode ? (
                                        'text-input error'
                                    ) : (
                                        'text-input'
                                    )
                                }
                            />
                            {errors.zipCode &&
                            touched.zipCode && (
                                <div className="input-feedback">{errors.zipCode}</div>
                            )}
                        </SemForm.Field>
                        <SemForm.Field required>
                            <label>Type of Loan</label>
                            <select id="loanType"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.loanType}
                                    className={
                                        errors.loanType && touched.loanType ? (
                                            'text-input error'
                                        ) : (
                                            'text-input'
                                        )
                                    }>
                                <option value="Bridge Loan">Bridge Loan</option>
                                <option value="Sale Advance Loan">Sale Advance Loan</option>
                                <option value="Prepaid Debit Card">Prepaid Debit Crad</option>
                                <option value="Line of Credit">Line of Credit</option>
                            </select>
                            {errors.loanType &&
                            touched.loanType && (
                                <div className="input-feedback">{errors.loanType}</div>
                            )}
                        </SemForm.Field>
                        <Col sm="12" md={{size: 11, offset: 1}}>
                            <SelectGrid images={state.assets}
                                        selectAsset={selectAsset}
                                        selectedAssets={selectedAsset} />
                        </Col>
                    </SemForm>
                </Col>
            </Row>

            <button
                type="button"
                onClick={handleReset}
                disabled={!dirty || isSubmitting}
            >
                Reset
            </button>

            <button type="submit" disabled={isSubmitting} onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};

const MyEnhancedForm = withFormik({
    mapPropsToValues: () => (
        {
            fullName: '',
            email: '',
            mobileNumber: '',
            zipCode: '',
            loanType: '',
            asset: {
                type: '',
                category: '',
                model: '',
                brand: '',
                price: '',
                description: '',
                images: [
                    {
                        name: '',
                        base64src: ''
                    }
                ],
                desiredAmount: ''
            }
        }),

    // Custom sync validation
    validate: values => {
        let errors = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                values.email
            )
        ) {
            errors.email = 'Invalid email address';
        }

        if (!values.fullName) {
            errors.fullName = 'Required';
        }

        if (!values.mobileNumber) {
            errors.mobileNumber = 'Required';
        } else if (
            !/\d{3}[\-]\d{3}[\-]\d{4}/.test(
                values.mobileNumber
            )
        ) {
            errors.mobileNumber = 'Invalid Mobile Number'
        }

        if (!values.zipCode) {
            errors.zipCode = 'Required';
        } else if (
            !/(\d{5}([\-]\d{4})?)/.test(
                values.zipCode
            )
        ) {
            errors.zipCode = 'Invalid Zip Code'
        }

        /*if (!values.loanType) {
            errors.loanType = 'Required';
        }*/

        return errors;
    },

    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    },

    displayName: 'ApplicationForm', // helps with React DevTools
})(MyForm);