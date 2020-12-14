import React from 'react';
import KeyCode from 'keycode-js';

function InputBox(props) {
    const { addNew } = props;

    const handleKeyUp = (e) => {
        const text = e.target.value.trim();
        if (e.keyCode === KeyCode.KEY_RETURN && text) {
            addNew(text);
            e.target.value = ''
        }
    }

    return (
        <input autoFocus
            type="text"
            className="form-control add-todo"
            onKeyUp={handleKeyUp}
            placeholder="Add New"
        />
    );
}

export default InputBox;
