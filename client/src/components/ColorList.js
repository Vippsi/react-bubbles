import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const initialNewColor = {
  hex:'',
  color: '',
  id:''
}


const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const { push } = useHistory();
  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };
  const [newColor, setNewColor] = useState(initialNewColor)

  const saveEdit = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        const newColors = colors.map((color) => {
          if (color.id === res.data.id) {
            return res.data;
          } else return color;
        });
        updateColors([...newColors]);
        setEditing(false);
      });
      
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = (color) => {
    // e.preventDefault();
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then((res) => {
        const newColorArr = colors.filter(
          (singleColor) => singleColor.id !== res.data
        );
        updateColors([...newColorArr]);
      })
      .catch((err) => console.log(err));
    // make a delete request to delete this color
  };

  const handleChanges = e => {
    const name = e.target.name
    const value = e.target.value

    setNewColor({...newColor, [name]: value})
    console.log(newColor)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const newNewColor = {
      code: {
        hex: newColor.hex
      },
      color: newColor.color,
      id: new Date()
    }
    axiosWithAuth()
      .post(`/api/colors`, newNewColor)
      .then(res => {
        updateColors(res.data)
        setNewColor(initialNewColor)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <form onSubmit={handleSubmit}>
            <label> Color Name
                <input 
                type='text'
                name='color'
                value={newColor.color}
                onChange={handleChanges}
                />
            </label>
            <label> Hex value
                <input 
                type='text'
                name='hex'
                value={newColor.hex}
                onChange={handleChanges}
                />
            </label>
            <button>Add New Color</button>
        </form>
    </div>
  );
};

export default ColorList;
