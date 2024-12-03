import './style.css'
import { header } from './components/header'
import { toDoList } from './components/toDoList'
import { toDoForm } from './components/toDoForm'
import { footer } from './components/footer'
import { addTask } from './utilities/addTask'
import { delTask } from './utilities/delTask'


// localStorage.clear()
header();
toDoForm();
toDoList();
footer();
addTask();

