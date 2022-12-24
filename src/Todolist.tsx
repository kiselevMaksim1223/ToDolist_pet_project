import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./Components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (value: string) => void
}

export function Todolist(props: PropsType) {

    let [inputValue, setInputValue] = useState("")
    let [error, setError] = useState("")

    const addTAskHandler = () => {
        (inputValue.replace(/\b\s*\b/g,"") === "")
            ? setError("Ошибка! Ввведите что-тоююю!")
            :props.addTask(inputValue)
             setInputValue("")
    }

    const onChangeInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)

        error && setError("")
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTAskHandler()
        }
    }

    const removeTaskHandler = (t: string) => {
        props.removeTask(t)
    }

    // const changeFilterAll = () => {
    //     props.changeFilter("all")
    // }
    //
    // const changeFilterComplete = () => {
    //     props.changeFilter("completed")
    // }
    // const changeFilterActive = () => {
    //     props.changeFilter("active")
    // }

    const ChangeFilterUniversal = (value: FilterValuesType) => {
        props.changeFilter(value)
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={inputValue}
                   onChange={onChangeInputValueHandler}
                   onKeyDown={onKeyPressHandler}
            />
            <Button name="+" callBack={addTAskHandler}/>
        </div>
        <div>
            <span>{error}</span>
        </div>
        <ul>
            {
                props.tasks.map(t => {

                        //removeTaskHandler можно вынести сюда, но тогда мы загрязняем .map
                        //поэтому вынесли в компоненту Todolist

                        // const removeTaskHandler = () => {
                        //     props.removeTask(t.id)
                        // }

                        return (
                            <li key={t.id}>
                                <input type="checkbox" defaultChecked={t.isDone}/>
                                <span>{t.title}</span>
                                {/*<button onClick={() => removeTaskHandler(t.id) } >x</button>*/}
                                <Button name={"x"} callBack={() => removeTaskHandler(t.id)}/>
                            </li>
                        )
                    }
                )
            }
        </ul>
        <div>
            {/*<button onClick={()=> { ChangeFilterUniversal("all") } }>All</button>*/}
            <Button name={"All"} callBack={() => {
                ChangeFilterUniversal("all")
            }}/>
            <Button name={"Active"} callBack={() => {
                ChangeFilterUniversal("active")
            }}/>
            <Button name={"Complete"} callBack={() => {
                ChangeFilterUniversal("completed")
            }}/>
            {/*<button onClick={()=> { ChangeFilterUniversal("active") } }>Active</button>*/}
            {/*<button onClick={()=> { ChangeFilterUniversal("completed") } }>Completed</button>*/}
        </div>
    </div>
}
