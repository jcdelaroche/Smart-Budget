/* eslint-disable react/prop-types */
import './Input.css'

export default function Select(props) {
    const { name, label, value, onChange, error, options } = props;

    return (
        <>
            <div className={`form-group select`}>
                <div className='labelDiv'>
                    <label htmlFor={name}>{label ? label : name}</label>
                </div>
                <select
                    className="form-control"
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </>
    )
}