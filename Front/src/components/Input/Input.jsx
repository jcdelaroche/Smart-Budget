/* eslint-disable react/prop-types */
import './Input.css'

export default function Input(props) {
    const { type, name, label, value, onChange, error } = props;

    return (
        <>
            <div className={`form-group ${type === 'checkbox' && 'input-checkbox'}`}>
                <div className='labelDiv'>
                    <label htmlFor={name}>{label ? label : name}</label>
                </div>
                <input
                    type={type}
                    className="form-control"
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </>
    )
}