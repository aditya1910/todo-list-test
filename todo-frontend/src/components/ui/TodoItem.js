import React from 'react';
import CheckBox from './CheckBox';
import Button from './Button';

export default function TodoItem(props) {
    const { data, changeStatus, deleteTodo, addSubTask } = props;
    const handleChange = (checked) => changeStatus(data._id, checked);
    const className = 'todo-item ui-state-default ' + (data.status === 'COMPLETED' ? 'completed' : 'pending');

    return (
        <li className={className}>
            <div className="checkbox">
                <label>
                    <CheckBox checked={data.status === 'COMPLETED' ? true : false} onChange={handleChange} /> {data.todo}
                </label>
                <Button text='delete' _id={data._id} handleAction={deleteTodo}></Button>
            </div>
        </li >
    );
}
