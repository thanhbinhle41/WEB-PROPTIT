import React, { useState } from 'react'
import './ToDoList.css' 
import '../AddToDo/AddToDo'


function ToDoList({setNewTodos, todos, setShowAdd, showAdd, setEditing, levelList,
    filterList, setFilterList
}) {
    const [slecOp, setSlecOp] = useState('');
    const [searchInput, setSearch] = useState('');


    const getColor = (level) => {
        if (level === 'Nguy cấp')
            return 'red-description';
        else if (level === 'Mai làm cũng được')
            return 'green-description';
        else if (level === 'Nhắc nhở') 
            return 'orange-description';
    }


    const deleteTodo = (indexDelete) => {
        
        todos = todos.filter(item => item.id !== indexDelete)
        todos = todos.map ((item, index) => ({
            ...item,
            id: index + 1
        }))
        setNewTodos(todos);
        // setFilterList(todos);
    }

    const onChangeSlecOption = (e) => {
        setSlecOp(e.target.value);
    }


    const handleSort = () => {
        if (slecOp === 'ID') {
            filterList = [...filterList].sort((a,b) => a.id > b.id ? 1:-1);
        }
        else if (slecOp === 'name') {
            filterList = [...filterList].sort((a,b) => a.name.toUpperCase() >= b.name.toUpperCase() ? 1 : -1);
        }
        else if (slecOp === 'level') {
            filterList = [...filterList].sort((a,b) =>{
                const indexA = levelList.findIndex(item => item === a.level);
                const indexB = levelList.findIndex(item => item === b.level);
                return indexA >= indexB ? 1:-1;
            })
        }
        // setNewTodos(todos);
        setFilterList(filterList);
    }

    const nextLevel = (index, level) => {
        const i = todos.findIndex(todos => todos.id === index)
        let numLevel = (levelList.findIndex(item => item === level) + 1) % levelList.length;
        let strLevel = levelList[numLevel];
        todos[i]={
            ...todos[i],
            level: strLevel
        }
        setNewTodos([...todos]);
        // setFilterList(todos);
    }

    const filterLevel = (level) => {
        if (level === 'all')
            setFilterList(todos);
        else {
            const tmpTodo = todos.filter(item => item.level === level)
            setFilterList(tmpTodo);
        }
    }


    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleSearch = () => {
        console.log(searchInput);
        const tmpTodo = filterList.filter(item => {
            return (item.id.toString() === searchInput || item.name.includes(searchInput)) 
        })
        setFilterList(tmpTodo);
    }


    return (
        <>
            <div className="toDoList">
                <div className = 'features'>
                    <button className="btn btn-todolist" onClick={() => setShowAdd(!showAdd)}>
                    Thêm công việc mới
                    </button>

                    <select className = 'select-sort' onChange={onChangeSlecOption}> 
                        <option value='ID'>Sắp xếp theo ID</option>
                        <option value='name'>Sắp xếp theo tên</option>
                        <option value='level'>Sắp xếp theo mức độ</option>
                    </select>

                    <button className='btn' onClick={() => handleSort()}
                    >
                    Sắp xếp
                    </button>
                </div>
                <div className="Search">
                    <input type="text" className="input_search" onChange={onChangeSearch}></input>
                    <button className="btn btn_search"
                        onClick = {handleSearch}
                    >Tìm kiếm</button>
                </div>
                <div>
                    <table className="tableTodo">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên công việc</th>
                                <th>Mức độ</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {filterList.map((todo) =>
                                <tr>
                                    <td>{todo.id}</td>
                                    <td>{todo.name}</td>
                                    <td className = {getColor(todo.level)}
                                    onClick={() => nextLevel(todo.id, todo.level)}
                                    >
                                    {todo.level}
                                    </td>
                                    <td>
                                        <div className='btn-TodoTable'>
                                            <button onClick={() => deleteTodo(todo.id)}
                                            className = "btn btn-del">
                                            Xoá</button>
                                            <button onClick={() => {setEditing(todo); setShowAdd(true)}} 
                                            className='btn btn-edit'>
                                            Sửa</button>
                                        </div>
                                        

                                    </td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot></tfoot>
                        
                    </table>
                </div>
                <div className="wrapper-filter">
                    <button className="btn filter" onClick={() => filterLevel('all')}>Tất cả</button>
                    <button className="btn filter" onClick={() => filterLevel('Nguy cấp')}>Nguy cấp</button>
                    <button className="btn filter" onClick={() => filterLevel('Nhắc nhở')}>Nhắc nhở</button>
                    <button className="btn filter" onClick={() => filterLevel('Mai làm cũng được')}>Mai làm cũng được</button>
                </div>
            </div>
        </>
    )
}

export default ToDoList;