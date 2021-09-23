import React, { useEffect, useState } from 'react'
import './style.css' 


function AddToDo({setNewTodos, todos, setShowAdd, showAdd, setEditing, editing, levelList,
    setFilterList
}) {
    const [newTodo, setNewTodo] = useState({
        id: 0,
        name: '',
        level: 'Nguy cấp'
    })

    const[isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (editing !== null) {
           setNewTodo(editing);
           setIsEdit(true);
        }
    },[editing])


    // const onChangeTodo = (e) => {

    //     const {name, value} = e.target;

	// 	setNewTodo({
    //         ...newTodo,
    //         [name]: value
    //     })
	// }



    const onChangeName = (e) => {
        setNewTodo({
            ...newTodo,
            name: e.target.value
        })
    }

    const onChangeLevel = (e) => {
        setNewTodo({
            ...newTodo,
            level: e.target.value
        })
    }

    const addNewTodo = () => {
        newTodo.id = todos.length +1;
        setNewTodos([...todos, newTodo])
        // setFilterList(todos);
        setNewTodo({
            id: 0,
            name: '',
            level: 'Nguy cấp'  // Để level đây là None thì không cần 2 dòng ở dưới nữa
        })
    }

    const handleEdit = () => {
        const index = todos.findIndex(todo => todo.id === newTodo.id);
        todos[index] = newTodo;
        setNewTodo({
            id: 0,
            name: '',
            level: 'Nguy cấp'
        })
        setIsEdit(false);
        setEditing(null);
        setNewTodos([...todos]);
        // setFilterList(todos);
    }

    return (
        <>
            <div className="box-addNewTodo">
                <h3>{ isEdit ? 'Sửa công việc' : 'Thêm công việc mới' }</h3>
                <label><b>Tên công việc: </b></label>
                <br></br>
                <input type="text" name="name" value={newTodo.name} onChange={onChangeName}/>
                <label><b>Mức độ: </b></label>
                <select id="mulSlect" name="level" onChange={onChangeLevel} value={newTodo.level}>
                    {
                        levelList.map((item) => 
                        <option value={item}>{item}</option> )
                    }
                </select>
                <div className="btn-addTodo">
                    <button class="btn" onClick={isEdit ? handleEdit : addNewTodo} /* disabled={!newTodo.name} */

                    >
                    { isEdit ? 'Sửa' : 'Thêm' }</button>
                    <button class="btn" onClick={()=> setShowAdd(!showAdd)}>Huỷ</button>
                </div>
            </div>
        </>
    )
}

export default AddToDo;