import React from 'react';
import './EditRow.css';

const EditRow = (props) => {
  const { id, name, email, role, editId, handleInputChange } = props;

  const handleChange = (e) => {
    handleInputChange(editId, e.target.name, e.target.value);
  };

  if (id !== editId) {
    return (
      <>
        <td>{name}</td>
        <td>{email}</td>
        <td>{role}</td>
      </>
    );
  } else {
    return (
      <>
        <td className="edit">
          <input
            className="input-box"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </td>
        <td className="edit">
          <input
            className="input-box"
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </td>
        <td className="edit">
          <select
            className="input-box"
            id="role"
            name="role"
            value={role}
            onChange={handleChange}
          >
            <option value="member">member</option>
            <option value="admin">admin</option>
          </select>
        </td>
      </>
    );
  }
};

export default EditRow;
